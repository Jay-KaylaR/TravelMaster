import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  image: text("image").notNull(),
  destination: text("destination").notNull(),
});

export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  image: text("image").notNull(),
  location: text("location").notNull(),
  amenities: text("amenities").array(),
});

export const tourBookings = pgTable("tour_bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  numberOfTravelers: integer("number_of_travelers").notNull(),
  preferredTour: text("preferred_tour").notNull(),
  preferredDate: text("preferred_date").notNull(),
  specialRequirements: text("special_requirements"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const hotelBookings = pgTable("hotel_bookings", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  hotelSelection: text("hotel_selection").notNull(),
  checkInDate: text("check_in_date").notNull(),
  checkOutDate: text("check_out_date").notNull(),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  travelInterest: text("travel_interest"),
  message: text("message").notNull(),
  newsletter: boolean("newsletter").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTourBookingSchema = createInsertSchema(tourBookings).omit({
  id: true,
  createdAt: true,
});

export const insertHotelBookingSchema = createInsertSchema(hotelBookings).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Tour = typeof tours.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;

export type TourBooking = typeof tourBookings.$inferSelect;
export type InsertTourBooking = z.infer<typeof insertTourBookingSchema>;

export type HotelBooking = typeof hotelBookings.$inferSelect;
export type InsertHotelBooking = z.infer<typeof insertHotelBookingSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
