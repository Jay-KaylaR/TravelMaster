import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTourBookingSchema, 
  insertHotelBookingSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tours
  app.get("/api/tours", async (_req, res) => {
    try {
      const tours = await storage.getTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });

  // Get single tour
  app.get("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tour = await storage.getTour(id);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour" });
    }
  });

  // Get all hotels
  app.get("/api/hotels", async (_req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  // Get single hotel
  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const hotel = await storage.getHotel(id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel" });
    }
  });

  // Create tour booking
  app.post("/api/bookings/tours", async (req, res) => {
    try {
      const validatedData = insertTourBookingSchema.parse(req.body);
      const booking = await storage.createTourBooking(validatedData);
      res.status(201).json({ 
        message: "Tour booking created successfully", 
        booking 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid booking data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create tour booking" });
    }
  });

  // Create hotel booking
  app.post("/api/bookings/hotels", async (req, res) => {
    try {
      const validatedData = insertHotelBookingSchema.parse(req.body);
      const booking = await storage.createHotelBooking(validatedData);
      res.status(201).json({ 
        message: "Hotel booking created successfully", 
        booking 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid booking data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create hotel booking" });
    }
  });

  // Create contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ 
        message: "Message sent successfully", 
        contactMessage: message 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid message data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Get tour bookings (admin endpoint)
  app.get("/api/bookings/tours", async (_req, res) => {
    try {
      const bookings = await storage.getTourBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour bookings" });
    }
  });

  // Get hotel bookings (admin endpoint)
  app.get("/api/bookings/hotels", async (_req, res) => {
    try {
      const bookings = await storage.getHotelBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel bookings" });
    }
  });

  // Get contact messages (admin endpoint)
  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
