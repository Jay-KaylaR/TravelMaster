# Wanderlust Travel - East African Coast Travel Website

A comprehensive 7-page travel booking website built with HTML, CSS, JavaScript, PHP, and MySQL, featuring interactive forms, data tables, multimedia content, and booking functionality for tours and hotels along the East African coast.

## Features

### 🌟 **Complete Website Pages**
- **Home Page**: Hero section with search functionality, featured tours, and promotional video
- **Tours Page**: Interactive data table with tour listings and booking forms
- **Hotels Page**: Hotel grid with detailed information and reservation system
- **Destinations Page**: East African coastal destinations showcase
- **Services Page**: Service packages with pricing tables
- **About Page**: Company information, team profiles, and statistics
- **Contact Page**: Contact form with interactive map and social media links

### 🎯 **Interactive Elements**
- **Forms**: Tour booking, hotel reservations, contact messages
- **Tables**: Dynamic tour listings with sorting and filtering
- **Multimedia**: Embedded videos and responsive image galleries
- **Maps**: Google Maps integration for location display
- **Navigation**: Responsive mobile-friendly navigation

### 🏖️ **East African Coast Focus**
- Destinations: Kenya, Tanzania, and Zanzibar
- Tours: Spice tours, dhow sailing, marine photography, cultural experiences
- Hotels: Coastal resorts and authentic accommodations
- Activities: Beach adventures, heritage sites, marine parks

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+ / MariaDB 10.3+
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome 6.0
- **Maps**: Google Maps Embed API

## Installation & Setup

### Prerequisites
- Web server (Apache/Nginx)
- PHP 7.4 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Web browser with JavaScript enabled

### Step 1: Server Setup
```bash
# For XAMPP (Windows/Mac/Linux)
1. Download and install XAMPP
2. Start Apache and MySQL services
3. Place project files in htdocs folder

# For LAMP (Linux)
sudo apt update
sudo apt install apache2 mysql-server php php-mysql
sudo systemctl start apache2 mysql
```

### Step 2: Database Setup
```bash
# Access MySQL
mysql -u root -p

# Create database and import schema
mysql -u root -p < database/schema.sql
```

Or use phpMyAdmin:
1. Open http://localhost/phpmyadmin
2. Create new database: `wanderlust_travel`
3. Import `database/schema.sql`

### Step 3: Configuration
```php
# Edit api/config.php with your database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'wanderlust_travel');
```

### Step 4: File Permissions
```bash
# Set appropriate permissions (Linux/Mac)
sudo chown -R www-data:www-data /path/to/project
sudo chmod -R 755 /path/to/project
sudo chmod -R 644 /path/to/project/api/*.php
```

### Step 5: Access Website
Open your web browser and navigate to:
- Local: `http://localhost/wanderlust-travel/`
- Custom domain: `http://yourdomain.com/`

## Project Structure

```
wanderlust-travel/
├── index.html              # Home page
├── tours.html              # Tours listing and booking
├── hotels.html             # Hotel reservations
├── destinations.html       # Destination showcase
├── services.html           # Service packages
├── about.html              # Company information
├── contact.html            # Contact form
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images/             # Local images (if any)
├── api/
│   ├── config.php          # Database configuration
│   ├── tours.php           # Tours API endpoint
│   ├── hotels.php          # Hotels API endpoint
│   ├── book_tour.php       # Tour booking handler
│   ├── book_hotel.php      # Hotel booking handler
│   └── contact.php         # Contact form handler
├── database/
│   └── schema.sql          # Database structure and sample data
└── README.md               # This file
```

## API Endpoints

### Tours
- `GET /api/tours.php` - Get all tours
- `GET /api/tours.php?id=1` - Get specific tour
- `POST /api/book_tour.php` - Create tour booking

### Hotels
- `GET /api/hotels.php` - Get all hotels
- `GET /api/hotels.php?id=1` - Get specific hotel
- `POST /api/book_hotel.php` - Create hotel reservation

### Contact
- `POST /api/contact.php` - Send contact message

## Database Schema

### Tables
- `users` - User accounts
- `tours` - Tour packages
- `hotels` - Hotel listings
- `tour_bookings` - Tour reservations
- `hotel_bookings` - Hotel reservations
- `contact_messages` - Contact form submissions

### Sample Data
The schema includes sample data for:
- 4 East African coastal tours
- 6 coastal hotels and resorts
- All with authentic East African destinations

## Features in Detail

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Flexible grid layouts
- Optimized images and content

### Form Validation
- Client-side JavaScript validation
- Server-side PHP validation
- Email format verification
- Phone number validation
- Required field checks

### Data Tables
- Dynamic tour listings
- Sortable columns
- Responsive table design
- Booking integration

### Multimedia Integration
- YouTube video embedding
- Responsive image galleries
- Google Maps integration
- Font Awesome icons

### Security Features
- SQL injection prevention with PDO
- Input sanitization
- CORS headers configuration
- XSS protection

## Customization

### Adding New Tours
```sql
INSERT INTO tours (name, description, duration, price, rating, image, destination) 
VALUES ('New Tour', 'Description', '5 Days', 1299.00, 4.5, 'image_url', 'Location');
```

### Adding New Hotels
```sql
INSERT INTO hotels (name, description, price_per_night, rating, image, location, amenities) 
VALUES ('Hotel Name', 'Description', 199.00, 4.7, 'image_url', 'Location', '["Amenity1", "Amenity2"]');
```

### Styling Customization
Edit `assets/css/style.css` to modify:
- Color schemes
- Typography
- Layout spacing
- Component styles

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization
- Optimized images with proper dimensions
- Minified CSS for production
- Efficient database queries
- Responsive image loading
- Font Awesome CDN integration

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Check database credentials in `api/config.php`
- Ensure MySQL service is running
- Verify database exists

**PHP Errors**
- Check PHP error logs
- Ensure PHP 7.4+ is installed
- Verify file permissions

**JavaScript Not Working**
- Check browser console for errors
- Ensure JavaScript is enabled
- Verify API endpoints are accessible

**Forms Not Submitting**
- Check network tab in browser dev tools
- Verify API endpoints return proper responses
- Check server error logs

### Support
For technical support or questions about this project, please check:
1. Browser console for JavaScript errors
2. Server error logs for PHP issues
3. Database connectivity and permissions
4. File and folder permissions

## License
This project is open source and available under the MIT License.

## Credits
- Images: Unsplash (https://unsplash.com)
- Icons: Font Awesome (https://fontawesome.com)
- Maps: Google Maps Platform
- Fonts: System fonts for optimal performance