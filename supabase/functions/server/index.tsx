import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ce9c7d1f/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize queue state if not exists
async function initializeQueue() {
  const queueState = await kv.get("queue_state");
  if (!queueState) {
    await kv.set("queue_state", {
      currentServing: 0,
      lastTicket: 0,
      queue: []
    });
  }
}
initializeQueue();

// Get current queue state
app.get("/make-server-ce9c7d1f/queue", async (c) => {
  try {
    const queueState = await kv.get("queue_state");
    return c.json(queueState || { currentServing: 0, lastTicket: 0, queue: [] });
  } catch (error) {
    console.log("Error fetching queue state:", error);
    return c.json({ error: "Failed to fetch queue state" }, 500);
  }
});

// Join queue
app.post("/make-server-ce9c7d1f/queue/join", async (c) => {
  try {
    const { name, phone, guestCount } = await c.req.json();

    if (!name || !phone) {
      return c.json({ error: "Name and phone are required" }, 400);
    }

    const queueState = await kv.get("queue_state");
    const newTicket = queueState.lastTicket + 1;

    const queueEntry = {
      ticketNumber: newTicket,
      name,
      phone,
      guestCount: guestCount || 1,
      joinedAt: new Date().toISOString(),
      status: "waiting"
    };

    queueState.lastTicket = newTicket;
    queueState.queue.push(queueEntry);

    await kv.set("queue_state", queueState);

    return c.json({
      success: true,
      ticketNumber: newTicket,
      position: queueState.queue.filter(q => q.status === "waiting").length,
      estimatedWait: queueState.queue.filter(q => q.status === "waiting").length * 5
    });
  } catch (error) {
    console.log("Error joining queue:", error);
    return c.json({ error: "Failed to join queue" }, 500);
  }
});

// Update serving number (advance queue)
app.post("/make-server-ce9c7d1f/queue/next", async (c) => {
  try {
    const queueState = await kv.get("queue_state");

    const waitingQueue = queueState.queue.filter(q => q.status === "waiting");
    if (waitingQueue.length > 0) {
      const nextCustomer = waitingQueue[0];
      const index = queueState.queue.findIndex(q => q.ticketNumber === nextCustomer.ticketNumber);
      queueState.queue[index].status = "serving";
      queueState.currentServing = nextCustomer.ticketNumber;
    }

    await kv.set("queue_state", queueState);

    return c.json({ success: true, currentServing: queueState.currentServing });
  } catch (error) {
    console.log("Error updating queue:", error);
    return c.json({ error: "Failed to update queue" }, 500);
  }
});

// Get all bookings
app.get("/make-server-ce9c7d1f/bookings", async (c) => {
  try {
    const bookings = await kv.getByPrefix("booking_");
    return c.json(bookings);
  } catch (error) {
    console.log("Error fetching bookings:", error);
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

// Create booking
app.post("/make-server-ce9c7d1f/bookings", async (c) => {
  try {
    const { name, phone, date, time, guestCount, tablePreference, specialRequests } = await c.req.json();

    if (!name || !phone || !date || !time) {
      return c.json({ error: "Name, phone, date, and time are required" }, 400);
    }

    // Check for existing bookings at the same time
    const existingBookings = await kv.getByPrefix("booking_");
    const conflictingBooking = existingBookings.find(b =>
      b.date === date && b.time === time && b.status === "confirmed"
    );

    if (conflictingBooking && existingBookings.filter(b => b.date === date && b.time === time).length >= 5) {
      return c.json({ error: "No tables available for this time slot" }, 400);
    }

    const bookingId = `BK${Date.now()}`;
    const booking = {
      bookingId,
      name,
      phone,
      date,
      time,
      guestCount: guestCount || 2,
      tablePreference: tablePreference || "Indoor",
      specialRequests: specialRequests || "",
      createdAt: new Date().toISOString(),
      status: "confirmed"
    };

    await kv.set(`booking_${bookingId}`, booking);

    return c.json({
      success: true,
      booking
    });
  } catch (error) {
    console.log("Error creating booking:", error);
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// Get restaurant status
app.get("/make-server-ce9c7d1f/status", async (c) => {
  try {
    const queueState = await kv.get("queue_state");
    const waitingCount = queueState?.queue?.filter(q => q.status === "waiting").length || 0;

    let status = "Free";
    if (waitingCount > 10) status = "Busy";
    else if (waitingCount > 5) status = "Moderate";

    return c.json({ status, waitingCount });
  } catch (error) {
    console.log("Error fetching restaurant status:", error);
    return c.json({ error: "Failed to fetch status" }, 500);
  }
});

// Get all reviews
app.get("/make-server-ce9c7d1f/reviews", async (c) => {
  try {
    const reviews = await kv.getByPrefix("review_");
    return c.json(reviews.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  } catch (error) {
    console.log("Error fetching reviews:", error);
    return c.json({ error: "Failed to fetch reviews" }, 500);
  }
});

// Create review
app.post("/make-server-ce9c7d1f/reviews", async (c) => {
  try {
    const { name, email, rating, title, comment, visitDate } = await c.req.json();

    if (!name || !email || !rating || !title || !comment) {
      return c.json({ error: "All fields except visit date are required" }, 400);
    }

    const reviewId = `RV${Date.now()}`;
    const review = {
      id: reviewId,
      name,
      email,
      rating,
      title,
      comment,
      visitDate: visitDate || null,
      createdAt: new Date().toISOString(),
      helpful: 0
    };

    await kv.set(`review_${reviewId}`, review);

    return c.json({ success: true, review });
  } catch (error) {
    console.log("Error creating review:", error);
    return c.json({ error: "Failed to create review" }, 500);
  }
});

// Get all orders
app.get("/make-server-ce9c7d1f/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order_");
    return c.json(orders.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  } catch (error) {
    console.log("Error fetching orders:", error);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
});

// Create order
app.post("/make-server-ce9c7d1f/orders", async (c) => {
  try {

    const { name, phone, specialInstructions, paymentMethod, items, totalItems } = await c.req.json();

    if (!name || !phone || !items || items.length === 0) {
      return c.json({ error: "Name, phone, and items are required" }, 400);
    }

    const orderId = `ORD${Date.now()}`;
    const order = {
      orderId,
      name,
      phone,
      specialInstructions: specialInstructions || "",
      paymentMethod: paymentMethod || "Pay at Counter",
      items,
      totalItems: totalItems || items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    await kv.set(`order_${orderId}`, order);

    return c.json({
      success: true,
      order
    });
  } catch (error) {
    console.log("Error creating order:", error);
    return c.json({ error: "Failed to create order" }, 500);
  }
});

Deno.serve(app.fetch);