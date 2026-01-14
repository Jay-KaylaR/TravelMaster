import { 
  users, tours, hotels, tourBookings, hotelBookings, contactMessages,
  type User, type InsertUser, type Tour, type Hotel,
  type TourBooking, type InsertTourBooking,
  type HotelBooking, type InsertHotelBooking,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tour methods
  getTours(): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  
  // Hotel methods
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  
  // Booking methods
  createTourBooking(booking: InsertTourBooking): Promise<TourBooking>;
  createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Get bookings
  getTourBookings(): Promise<TourBooking[]>;
  getHotelBookings(): Promise<HotelBooking[]>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tours: Map<number, Tour>;
  private hotels: Map<number, Hotel>;
  private tourBookings: Map<number, TourBooking>;
  private hotelBookings: Map<number, HotelBooking>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentTourBookingId: number;
  private currentHotelBookingId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.tours = new Map();
    this.hotels = new Map();
    this.tourBookings = new Map();
    this.hotelBookings = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentTourBookingId = 1;
    this.currentHotelBookingId = 1;
    this.currentContactMessageId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize sample tours
    const sampleTours: Tour[] = [
      {
        id: 1,
        name: "Zanzibar Spice & Culture Tour",
        description: "Explore Stone Town and aromatic spice plantations",
        duration: "7 Days",
        price: "1899",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        destination: "Zanzibar"
      },
      {
        id: 2,
        name: "Kenyan Coast Beach Safari",
        description: "Diani Beach relaxation and Watamu marine adventures",
        duration: "10 Days",
        price: "2299",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        destination: "Kenya"
      },
      {
        id: 3,
        name: "Tanzania Coastal Discovery",
        description: "Dar es Salaam city tour and pristine coastal exploration",
        duration: "8 Days",
        price: "1699",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        destination: "Tanzania"
      },
      {
        id: 4,
        name: "Lamu Island Heritage Experience",
        description: "UNESCO World Heritage site and dhow sailing adventures",
        duration: "5 Days",
        price: "1299",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        destination: "Kenya"
      }
    ];

    sampleTours.forEach(tour => this.tours.set(tour.id, tour));

    // Initialize sample hotels
    const sampleHotels: Hotel[] = [
      {
        id: 1,
        name: "Zanzibar Serena Hotel",
        description: "Luxury beachfront resort in Stone Town with traditional architecture",
        pricePerNight: "289",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        location: "Stone Town, Zanzibar",
        amenities: ["Ocean View", "Spa", "Pool", "Spice Restaurant"]
      },
      {
        id: 2,
        name: "Diani Reef Beach Resort",
        description: "All-inclusive paradise on Kenya's pristine Diani Beach",
        pricePerNight: "219",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        location: "Diani Beach, Kenya",
        amenities: ["Beachfront", "All-Inclusive", "Water Sports", "Kids Club"]
      },
      {
        id: 3,
        name: "Watamu Turtle Bay Beach Resort",
        description: "Eco-friendly resort near marine national park",
        pricePerNight: "189",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        location: "Watamu, Kenya",
        amenities: ["Marine Park", "Eco-Friendly", "Snorkeling", "Spa"]
      },
      {
        id: 4,
        name: "The Slipway Hotel",
        description: "Contemporary waterfront hotel with harbor views",
        pricePerNight: "159",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        location: "Dar es Salaam, Tanzania",
        amenities: ["Harbor View", "Modern Design", "Marina", "Business Center"]
      },
      {
        id: 5,
        name: "Lamu House Hotel",
        description: "Historic Swahili mansion with authentic architecture",
        pricePerNight: "179",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        location: "Lamu Island, Kenya",
        amenities: ["Historic Building", "Swahili Culture", "Rooftop Terrace", "Traditional Cuisine"]
      },
      {
        id: 6,
        name: "Nungwi Dreams Hotel",
        description: "Boutique beachfront hotel with sunset dhow views",
        pricePerNight: "249",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        location: "Nungwi, Zanzibar",
        amenities: ["Beach Access", "Dhow Trips", "Sunset Views", "Beach Bar"]
      }
    ];

    sampleHotels.forEach(hotel => this.hotels.set(hotel.id, hotel));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Tour methods
  async getTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }

  async getTour(id: number): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  // Hotel methods
  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  // Booking methods
  async createTourBooking(insertBooking: InsertTourBooking): Promise<TourBooking> {
    const id = this.currentTourBookingId++;
    const booking: TourBooking = {
      ...insertBooking,
      id,
      createdAt: new Date(),
      specialRequirements: insertBooking.specialRequirements || null,
    };
    this.tourBookings.set(id, booking);
    return booking;
  }

  async createHotelBooking(insertBooking: InsertHotelBooking): Promise<HotelBooking> {
    const id = this.currentHotelBookingId++;
    const booking: HotelBooking = {
      ...insertBooking,
      id,
      createdAt: new Date(),
      specialRequests: insertBooking.specialRequests || null,
    };
    this.hotelBookings.set(id, booking);
    return booking;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      phone: insertMessage.phone || null,
      travelInterest: insertMessage.travelInterest || null,
      newsletter: insertMessage.newsletter || null,
    };
    this.contactMessages.set(id, message);
    return message;
  }

  // Get bookings
  async getTourBookings(): Promise<TourBooking[]> {
    return Array.from(this.tourBookings.values());
  }

  async getHotelBookings(): Promise<HotelBooking[]> {
    return Array.from(this.hotelBookings.values());
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
