-- Wanderlust Travel Database Schema
-- MySQL/MariaDB database structure

CREATE DATABASE IF NOT EXISTS wanderlust_travel;
USE wanderlust_travel;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tours table
CREATE TABLE tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    image VARCHAR(500) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hotels table
CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    image VARCHAR(500) NOT NULL,
    location VARCHAR(255) NOT NULL,
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tour bookings table
CREATE TABLE tour_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    number_of_travelers INT NOT NULL,
    preferred_tour VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL,
    special_requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hotel bookings table
CREATE TABLE hotel_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    hotel_selection VARCHAR(255) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    travel_interest VARCHAR(100),
    message TEXT NOT NULL,
    newsletter BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample tours data
-- Insert sample tours data (20 items, Kenyan Coast only)
INSERT INTO tours (name, description, duration, price, rating, image, destination) VALUES
('Diani Beach Luxury Escape', 'Relax on Diani Beach with snorkeling, spa, and fine dining', '7 Days', 1899.00, 4.9, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Diani Beach, Kenya'),
('Mombasa City & Fort Jesus Tour', 'Discover Old Town, spice markets, and the historic Fort Jesus', '3 Days', 799.00, 4.7, 'https://images.unsplash.com/photo-1617196033898-9b6d4fbc8f48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Mombasa, Kenya'),
('Watamu Marine Safari', 'Glass-bottom boat, snorkeling, and dolphin watching at Watamu Marine Park', '4 Days', 1099.00, 4.8, 'https://images.unsplash.com/photo-1526481280691-823ef7d36cda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu, Kenya'),
('Lamu Heritage & Dhow Sailing', 'Cultural tours of Lamu Old Town with sunset dhow cruises', '5 Days', 1299.00, 4.6, 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Lamu Island, Kenya'),
('Chale Island Private Retreat', 'Stay on a private island with kayaking, diving, and spa treatments', '6 Days', 2299.00, 4.9, 'https://images.unsplash.com/photo-1625635244500-bc2ff16fdf9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Chale Island, Kenya'),
('Kilifi Creek Adventure', 'Explore Kilifi Creek with dhow rides, fishing, and beach picnics', '4 Days', 999.00, 4.5, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Kilifi, Kenya'),
('Tiwi Beach Getaway', 'Unwind at the quiet Tiwi Beach with lagoon swims and nature walks', '5 Days', 899.00, 4.4, 'https://images.unsplash.com/photo-1585647347479-1d0db1aab5c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Tiwi, Kenya'),
('Malindi Cultural & Beach Tour', 'Tour Malindi town, Vasco da Gama Pillar, and enjoy pristine beaches', '5 Days', 1199.00, 4.7, 'https://images.unsplash.com/photo-1559767944-1f346807f649?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Malindi, Kenya'),
('Shimoni Dolphin & Wasini Island Tour', 'Dolphin watching, snorkeling, and Swahili lunch on Wasini Island', '2 Days', 699.00, 4.6, 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Shimoni, Kenya'),
('Shanzu Beach Family Fun', 'Beach activities, kids clubs, and family excursions on Shanzu Beach', '4 Days', 999.00, 4.5, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Shanzu, Mombasa, Kenya'),
('Gede Ruins & Watamu Tour', 'Step back in time at Gede Ruins, followed by Watamu beach relaxation', '3 Days', 799.00, 4.6, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu, Kenya'),
('Mida Creek Eco Tour', 'Mangrove canoe rides, bird watching, and sunset views at Mida Creek', '2 Days', 649.00, 4.5, 'https://images.unsplash.com/photo-1625684123485-35fdb8c7d89d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu, Kenya'),
('Mombasa North Coast Explorer', 'Visit Nyali and Bamburi beaches with aquarium and Haller Park tours', '4 Days', 899.00, 4.6, 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2105f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Nyali & Bamburi, Mombasa, Kenya'),
('Funzi Island Day Trip', 'Boat rides through mangroves and pristine beaches on Funzi Island', '1 Day', 499.00, 4.3, 'https://images.unsplash.com/photo-1625635244500-bc2ff16fdf9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Funzi Island, Kenya'),
('Swahili Coast Culinary Tour', 'Taste authentic Swahili dishes with a guided food tour in Mombasa', '2 Days', 559.00, 4.7, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Mombasa, Kenya'),
('Marine Park & Coral Reefs Dive', 'Scuba diving and snorkeling in Kenya’s coral reef hotspots', '3 Days', 1299.00, 4.8, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu & Diani, Kenya'),
('Lamu Cultural Festival Tour', 'Join the annual cultural festival with parades, dhow races, and dances', '4 Days', 1499.00, 4.9, 'https://images.unsplash.com/photo-1576669792024-3d8bb2a36a2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Lamu Island, Kenya'),
('Chale Island Romantic Honeymoon', 'Luxury overwater bungalows, spa sessions, and private beaches', '6 Days', 2499.00, 5.0, 'https://images.unsplash.com/photo-1606663889134-bcd1fbd7be3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Chale Island, Kenya'),
('Diani Beach Yoga & Wellness Retreat', 'Wellness-focused beach holiday with yoga, meditation, and spa', '7 Days', 1699.00, 4.8, 'https://images.unsplash.com/photo-1585647347479-1d0db1aab5c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Diani Beach, Kenya'),
('Pemba Channel Fishing Safari', 'Big game fishing off the Kenyan Coast near Shimoni', '3 Days', 1399.00, 4.7, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Shimoni, Kenya');

-- Insert sample hotels data Insert sample hotels data (20 items, Kenyan Coast only)


INSERT INTO hotels (name, description, price_per_night, rating, image, location, amenities) VALUES
('Zanzibar Serena Hotel', 'Luxury beachfront resort with Swahili charm', 289.00, 4.9, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Mombasa, Kenya', '["Ocean View", "Spa", "Pool", "Fine Dining"]'),
('Diani Reef Beach Resort', 'All-inclusive paradise on Kenya\'s pristine Diani Beach', 219.00, 4.8, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Diani Beach, Kenya', '["Beachfront", "All-Inclusive", "Water Sports", "Kids Club"]'),
('Watamu Turtle Bay Beach Resort', 'Eco-friendly resort near marine national park', 189.00, 4.6, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu, Kenya', '["Marine Park", "Eco-Friendly", "Snorkeling", "Spa"]'),
('Lamu House Hotel', 'Historic Swahili mansion with authentic architecture', 179.00, 4.5, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Lamu Island, Kenya', '["Historic Building", "Swahili Culture", "Rooftop Terrace", "Traditional Cuisine"]'),
('The Sands at Nomad', 'Boutique luxury resort with private beach villas', 309.00, 4.9, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Diani Beach, Kenya', '["Private Villas", "Beach Bar", "Yoga Retreat", "Scuba Diving"]'),
('Sarova Whitesands Beach Resort', 'Iconic family-friendly resort in Mombasa', 259.00, 4.7, 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2105f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Mombasa, Kenya', '["Multiple Pools", "Kids Zone", "Spa", "Nightlife"]'),
('Hemingways Watamu', 'Luxury 5-star hotel overlooking Watamu Marine Park', 349.00, 4.9, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu, Kenya', '["Fine Dining", "Deep Sea Fishing", "Spa", "Private Beach"]'),
('Medina Palms', 'Elegant suites and villas with Moroccan-inspired design', 279.00, 4.8, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu, Kenya', '["Suites", "Pools", "Spa", "Luxury Dining"]'),
('Kilifi Bay Beach Resort', 'Secluded retreat with pristine sandy beaches', 199.00, 4.5, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Kilifi, Kenya', '["Quiet Location", "Oceanfront", "Restaurant", "Bar"]'),
('Diamond Dream of Africa', 'Malindi’s luxury beachfront resort with Italian flair', 269.00, 4.7, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Malindi, Kenya', '["All-Inclusive", "Wellness Spa", "Romantic Getaway", "Water Sports"]'),
('Peponi Hotel', 'Legendary beachfront hotel with ocean-facing rooms', 229.00, 4.8, 'https://images.unsplash.com/photo-1576669792024-3d8bb2a36a2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Lamu, Kenya', '["Oceanfront", "Seafood Dining", "Cultural Tours", "Water Sports"]'),
('Coconut Beach Boutique Hotel', 'Tropical boutique stay with palm gardens and pools', 169.00, 4.6, 'https://images.unsplash.com/photo-1585647347479-1d0db1aab5c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Tiwi, Kenya', '["Beach Access", "Gardens", "Outdoor Pool", "Local Cuisine"]'),
('Kizingo Eco Lodge', 'Rustic barefoot luxury with eco-friendly practices', 149.00, 4.4, 'https://images.unsplash.com/photo-1526481280691-823ef7d36cda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Lamu Island, Kenya', '["Eco-Lodge", "Solar Power", "Fishing Trips", "Yoga"]'),
('Afrochic Diani', 'Exclusive luxury villa hotel with only 10 suites', 399.00, 4.9, 'https://images.unsplash.com/photo-1606663889134-bcd1fbd7be3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Diani Beach, Kenya', '["Exclusive Villas", "Private Chef", "Infinity Pool", "Spa"]'),
('Temple Point Resort', 'Seaside resort at the Mida Creek, near Watamu', 209.00, 4.5, 'https://images.unsplash.com/photo-1625684123485-35fdb8c7d89d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Watamu, Kenya', '["Creek Views", "Water Sports", "All-Inclusive", "Cultural Tours"]'),
('Sandies Tropical Village', 'Malindi resort with tropical gardens and beach bar', 189.00, 4.4, 'https://images.unsplash.com/photo-1559767944-1f346807f649?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Malindi, Kenya', '["Beachfront", "Garden Suites", "Pool", "Bar"]'),
('Baobab Beach Resort & Spa', 'Large all-inclusive resort with entertainment options', 229.00, 4.7, 'https://images.unsplash.com/photo-1585647347479-1d0db1aab5c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Diani Beach, Kenya', '["All-Inclusive", "Entertainment", "Spa", "Multiple Pools"]'),
('Chale Island Resort', 'Private island resort with white sand beaches and lagoons', 319.00, 4.8, 'https://images.unsplash.com/photo-1625635244500-bc2ff16fdf9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Chale Island, Kenya', '["Private Island", "Marine Park", "Kayaking", "Romantic Getaway"]'),
('Shimoni Reef Lodge', 'Rustic oceanfront lodge with dolphin tours', 139.00, 4.3, 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Shimoni, Kenya', '["Dolphin Tours", "Rustic Design", "Diving", "Eco-Friendly"]'),
('PrideInn Flamingo Beach Resort', 'Family-friendly resort with Swahili flair', 179.00, 4.5, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 'Shanzu, Mombasa, Kenya', '["Family Suites", "Pool", "Animation Team", "Beachfront"]');


-- sample data for contact messages table -- 

INSERT INTO contact_messages 
(first_name, last_name, email, phone, travel_interest, message, newsletter) 
VALUES
('Alice', 'Kamau', 'alice.kamau@example.com', '+254712345678', 'Diani Beach', 'I would love more details on the Diani Beach luxury packages.', TRUE),
('Brian', 'Mutiso', 'brian.mutiso@example.com', '+254723456789', 'Lamu Island', 'Please send me information about dhow sailing tours in Lamu.', FALSE),
('Cynthia', 'Otieno', 'cynthia.otieno@example.com', '+254734567890', 'Watamu', 'Interested in snorkeling and marine park tours in Watamu.', TRUE),
('David', 'Mwangi', 'david.mwangi@example.com', '+254745678901', 'Mombasa', 'Looking for a weekend getaway in Mombasa with family.', FALSE),
('Esther', 'Wanjiru', 'esther.wanjiru@example.com', '+254756789012', 'Malindi', 'Could you recommend cultural tours in Malindi?', TRUE),
('Felix', 'Omondi', 'felix.omondi@example.com', '+254767890123', 'Shimoni', 'Interested in dolphin watching and Wasini Island tours.', TRUE),
('Grace', 'Njeri', 'grace.njeri@example.com', '+254778901234', 'Kilifi', 'Looking for adventure tours and dhow rides in Kilifi.', FALSE),
('Henry', 'Kariuki', 'henry.kariuki@example.com', '+254789012345', 'Chale Island', 'Do you have honeymoon packages on Chale Island?', TRUE),
('Irene', 'Mwende', 'irene.mwende@example.com', '+254790123456', 'Tiwi Beach', 'I need pricing for a 4-day holiday at Tiwi Beach.', FALSE),
('James', 'Mutua', 'james.mutua@example.com', '+254701234567', 'Nyali Beach', 'Interested in hotels with ocean views in Nyali.', TRUE);

-- hotel bokings
INSERT INTO hotel_bookings 
(guest_name, email, phone, hotel_selection, check_in_date, check_out_date, special_requests) 
VALUES
('Alice Kamau', 'alice.kamau@example.com', '+254712345678', 'Diani Reef Beach Resort', '2025-10-05', '2025-10-10', 'Ocean view room, vegetarian meals'),
('Brian Mutiso', 'brian.mutiso@example.com', '+254723456789', 'Zanzibar Serena Hotel', '2025-11-01', '2025-11-07', 'Late check-in, airport pickup'),
('Cynthia Otieno', 'cynthia.otieno@example.com', '+254734567890', 'Watamu Turtle Bay Beach Resort', '2025-09-20', '2025-09-25', 'Need snorkeling gear rental'),
('David Mwangi', 'david.mwangi@example.com', '+254745678901', 'The Slipway Hotel', '2025-12-15', '2025-12-20', 'Business center access'),
('Esther Wanjiru', 'esther.wanjiru@example.com', '+254756789012', 'Lamu House Hotel', '2025-08-10', '2025-08-14', 'Traditional Swahili dinner'),
('Felix Omondi', 'felix.omondi@example.com', '+254767890123', 'Nungwi Dreams Hotel', '2025-10-18', '2025-10-24', 'Sunset dhow ride booking'),
('Grace Njeri', 'grace.njeri@example.com', '+254778901234', 'Kilifi Bay Resort', '2025-09-28', '2025-10-03', 'Family room with extra bed'),
('Henry Kariuki', 'henry.kariuki@example.com', '+254789012345', 'Serena Beach Resort & Spa', '2025-11-12', '2025-11-18', 'Spa package for two'),
('Irene Mwende', 'irene.mwende@example.com', '+254790123456', 'Baobab Beach Resort', '2025-07-22', '2025-07-29', 'All-inclusive meals'),
('James Mutua', 'james.mutua@example.com', '+254701234567', 'Leopard Beach Resort', '2025-09-05', '2025-09-09', 'Early check-in requested');
