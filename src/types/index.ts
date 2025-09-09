export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  country: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  passportNo?: string;
  passportExpiry?: Date;
  passportCountry?: string;
  nationality: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Tour {
  _id?: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  duration: string;
  location: string;
  pickup: string;
  category: 'nature' | 'adventure' | 'culture' | 'marine';
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[];
  availability: string[];
  maxGuests: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Destination {
  _id?: string;
  name: string;
  image: string;
  description?: string;
  tourCount?: number;
}

export interface Booking {
  _id?: string;
  userId: string;
  tourId?: string;
  carBookingId?: string;
  type: 'tour' | 'car';
  travelerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
  pickupInfo?: {
    location: string;
    remarks?: string;
  };
  bookingDetails: {
    date: Date;
    duration: string;
    travelers: {
      adults: number;
      children: number;
      infants: number;
    };
  };
  paymentDetails: {
    method: 'cash' | 'paypal' | 'card';
    total: number;
    breakdown: {
      adults: number;
      children: number;
      infants: number;
    };
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CarBooking {
  _id?: string;
  userId: string;
  from: string;
  to: string;
  date: Date;
  time: string;
  passengers: number;
  vehicleType: 'couples' | 'groups' | 'luxury';
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  _id?: string;
  userId: string;
  tourId: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

