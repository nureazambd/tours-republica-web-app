# Tours Republica - Dominican Republic Tour Booking Platform

A complete Next.js application with Tailwind CSS and MongoDB that replicates a professional tour booking platform for the Dominican Republic. This project features a modern, responsive design with full booking functionality, user authentication, and comprehensive tour management.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Professional design matching Figma specifications
- **Interactive Components**: Dynamic forms, modals, and user interactions
- **SEO Optimized**: Next.js App Router with proper meta tags
- **Performance Optimized**: Image optimization and lazy loading

### Pages & Functionality
- **Homepage**: Hero section, featured tours, destinations, testimonials
- **Tours Page**: Advanced filtering, search, and tour listings
- **Locations Page**: Destination showcase with detailed information
- **Booking Page**: Multi-step booking process with validation
- **About Page**: Company information, team, and values
- **Contact Page**: Contact form, office information, and FAQ
- **Profile Page**: User dashboard with booking history
- **Car Booking Page**: Vehicle rental with fleet showcase
- **Authentication**: Login and signup with form validation

### Backend Features
- **MongoDB Integration**: Complete database setup with collections
- **API Routes**: RESTful APIs for tours, bookings, users, and contact
- **Authentication**: Secure user registration and login with bcrypt
- **Data Validation**: Input validation and error handling
- **Sample Data**: Pre-populated database with realistic tour information

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tours-republica
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tours-republica
   MONGODB_DB=tours-republica
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Seed the database (optional)**
   Visit `http://localhost:3000/api/seed` (POST request) to populate with sample data

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
tours-republica/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── tours/         # Tours API
│   │   │   ├── bookings/      # Bookings API
│   │   │   ├── users/         # Authentication API
│   │   │   ├── contact/       # Contact form API
│   │   │   └── seed/          # Database seeding
│   │   ├── about/             # About page
│   │   ├── booking/           # Booking page
│   │   ├── book-a-car/        # Car booking page
│   │   ├── contact/           # Contact page
│   │   ├── locations/         # Locations page
│   │   ├── login/             # Login page
│   │   ├── profile/           # Profile page
│   │   ├── signup/            # Signup page
│   │   ├── tours/             # Tours page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── auth/              # Authentication components
│   │   ├── booking/           # Booking components
│   │   ├── car-booking/       # Car booking components
│   │   ├── contact/           # Contact components
│   │   ├── home/              # Homepage components
│   │   ├── layout/            # Layout components
│   │   ├── profile/           # Profile components
│   │   ├── tours/             # Tours components
│   │   └── ui/                # UI components
│   ├── lib/                   # Utility functions
│   │   ├── mongodb.ts         # Database connection
│   │   ├── seed-data.ts       # Sample data
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript types
│       └── index.ts           # Type definitions
├── public/                    # Static assets
│   └── images/               # Image assets
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Teal (#14B8A6)
- **Accent**: Orange (#F59E0B)
- **Gray Scale**: Various shades for text and backgrounds

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular and medium weights
- **Responsive**: Fluid typography scaling

### Components
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Consistent styling with validation states
- **Cards**: Shadow-based elevation system
- **Navigation**: Responsive header with mobile menu

## 🗄️ Database Schema

### Collections

#### Tours
```javascript
{
  title: String,
  description: String,
  category: String, // 'adventure', 'cultural', 'beach', 'nature'
  location: String,
  duration: Number, // hours
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviewCount: Number,
  maxGroupSize: Number,
  images: [String],
  highlights: [String],
  included: [String],
  notIncluded: [String],
  itinerary: [Object],
  availability: Object,
  featured: Boolean,
  popular: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Users
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  country: String,
  password: String, // hashed
  subscribeNewsletter: Boolean,
  isVerified: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Bookings
```javascript
{
  userId: ObjectId,
  tourId: ObjectId,
  bookingReference: String,
  travelers: Object,
  totalAmount: Number,
  status: String, // 'pending', 'confirmed', 'cancelled'
  paymentStatus: String,
  bookingDate: Date,
  tourDate: Date,
  specialRequests: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 API Endpoints

### Tours
- `GET /api/tours` - Get tours with filtering and pagination
- `POST /api/tours` - Create new tour (admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking

### Users
- `POST /api/users` - Register/login user

### Contact
- `GET /api/contact` - Get contact submissions (admin)
- `POST /api/contact` - Submit contact form

### Utilities
- `POST /api/seed` - Seed database with sample data

## 🎯 Key Features Implemented

### Homepage
- Hero section with search functionality
- Featured tours carousel
- Popular destinations grid
- Transport services section
- Travel style categories
- Customer testimonials
- Trust indicators and statistics

### Tours Page
- Advanced filtering (category, location, price, rating, duration)
- Search functionality
- Grid/list view toggle
- Sorting options
- Pagination
- Tour detail cards with booking buttons

### Booking System
- Multi-step booking form
- Traveler information collection
- Booking summary with pricing
- Payment integration ready
- Booking confirmation

### Authentication
- User registration with validation
- Secure login system
- Password hashing with bcrypt
- Form validation and error handling
- Social login UI (ready for integration)

### Profile Management
- User dashboard
- Booking history
- Account settings
- Notification preferences

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start production server:
   ```bash
   npm start
   ```

## 🔒 Environment Variables

Required environment variables for production:

```env
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=tours-republica
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=your-production-url
```

## 🧪 Testing

The application has been thoroughly tested for:
- Responsive design across devices
- Form validation and error handling
- API endpoint functionality
- Database operations
- User authentication flow
- Booking process
- Navigation and routing

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Touch-friendly interface
- Optimized images and performance
- Responsive navigation menu
- Mobile-optimized forms

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for design system changes
- Update `globals.css` for global styles
- Component-level styling in individual files

### Content
- Update sample data in `src/lib/seed-data.ts`
- Modify text content in component files
- Replace images in `public/images/`

### Functionality
- Add new API routes in `src/app/api/`
- Create new pages in `src/app/`
- Extend components in `src/components/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern travel platforms
- Next.js and React communities
- Tailwind CSS for the utility-first approach
- MongoDB for flexible data storage

## 📞 Support

For support and questions:
- Email: support@toursrepublica.com
- Phone: +1 (829) 618 5692
- WhatsApp: +1 (829) 618 5692

---

**Tours Republica** - Discover the magic of the Dominican Republic! 🇩🇴

