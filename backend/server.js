// ============================================
//  absolute BACKEND - SERVER.JS
// Simple Express backend for beginners
// ============================================

// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// Enable CORS - allows frontend to talk to backend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ============================================
// MONGODB CONNECTION (OPTIONAL)
// ============================================

// If you want to use MongoDB, uncomment this:
/*
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ absolute', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();
*/

// ============================================
// DATA MODELS (Simple in-memory storage for now)
// ============================================

// Store contact form submissions in memory
let contactSubmissions = [];

// Store newsletter subscriptions in memory
let newsletterSubscriptions = [];

// ============================================
// API ROUTES
// ============================================

// Test route - check if server is working
app.get("/", (req, res) => {
  res.json({
    message: " absolute Backend API is running!",
    status: "success",
    endpoints: {
      "GET /": "This message",
      "POST /api/contact": "Submit contact form",
      "POST /api/newsletter": "Subscribe to newsletter",
      "GET /api/contact": "Get all contact submissions (admin)",
      "GET /api/newsletter": "Get all newsletter subscriptions (admin)",
    },
  });
});

// ============================================
// CONTACT FORM ENDPOINT
// ============================================

app.post("/api/contact", (req, res) => {
  try {
    // Get data from request body
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Create contact submission object
    const contactData = {
      id: Date.now(), // Simple ID using timestamp
      name,
      email,
      phone: phone || "Not provided",
      message,
      submittedAt: new Date().toISOString(),
    };

    // Store in memory (in production, you'd save to database)
    contactSubmissions.push(contactData);

    // Log to console (for development)
    console.log("📧 New Contact Form Submission:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "N/A"}`);
    console.log(`Message: ${message}`);
    console.log("---");

    // Send success response
    res.status(201).json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
      data: contactData,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
});

// ============================================
// NEWSLETTER SUBSCRIPTION ENDPOINT
// ============================================

app.post("/api/newsletter", (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Check if email already subscribed
    const alreadySubscribed = newsletterSubscriptions.find(
      (sub) => sub.email === email
    );
    if (alreadySubscribed) {
      return res.status(400).json({
        success: false,
        message: "This email is already subscribed to our newsletter",
      });
    }

    // Create subscription object
    const subscription = {
      id: Date.now(),
      email,
      subscribedAt: new Date().toISOString(),
    };

    // Store in memory
    newsletterSubscriptions.push(subscription);

    // Log to console
    console.log("📰 New Newsletter Subscription:", email);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      data: subscription,
    });
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your subscription",
    });
  }
});

// ============================================
// ADMIN ENDPOINTS (Get all submissions)
// ============================================

// Get all contact form submissions
app.get("/api/contact", (req, res) => {
  res.json({
    success: true,
    count: contactSubmissions.length,
    data: contactSubmissions,
  });
});

// Get all newsletter subscriptions
app.get("/api/newsletter", (req, res) => {
  res.json({
    success: true,
    count: newsletterSubscriptions.length,
    data: newsletterSubscriptions,
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler - route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server",
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("");
  console.log("🚀 ====================================");
  console.log(`    absolute Backend is running!`);
  console.log(`   Server: http://localhost:${PORT}`);
  console.log("   ====================================");
  console.log("");
});
