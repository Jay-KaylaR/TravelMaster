export interface Tour {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  rating: string;
  image: string;
  destination: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  pricePerNight: string;
  rating: string;
  image: string;
  location: string;
  amenities: string[];
}

export interface TourBookingForm {
  fullName: string;
  email: string;
  phone: string;
  numberOfTravelers: string;
  preferredTour: string;
  preferredDate: string;
  specialRequirements?: string;
}

export interface HotelBookingForm {
  guestName: string;
  email: string;
  phone: string;
  hotelSelection: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  travelInterest?: string;
  message: string;
  newsletter?: boolean;
}

export interface SearchFilters {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}
