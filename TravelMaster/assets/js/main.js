// Main JavaScript file for Wanderlust Travel website

// API Base URL
const API_BASE = 'api';

// DOM Elements
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');

// Mobile Navigation Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Tours API
const toursAPI = {
    getAll: () => apiRequest('tours.php'),
    getById: (id) => apiRequest(`tours.php?id=${id}`),
    book: (data) => apiRequest('book_tour.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
};

// Hotels API
const hotelsAPI = {
    getAll: () => apiRequest('hotels.php'),
    getById: (id) => apiRequest(`hotels.php?id=${id}`),
    book: (data) => apiRequest('book_hotel.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
};

// Contact API
const contactAPI = {
    send: (data) => apiRequest('contact.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
};

// Utility Functions
function showLoading(element) {
    element.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

function showError(element, message) {
    element.innerHTML = `<div class="error-message">${message}</div>`;
}

function showSuccess(element, message) {
    element.innerHTML = `<div class="success-message">${message}</div>`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function createStarRating(rating) {
    const stars = Math.floor(parseFloat(rating));
    let html = '';
    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            html += '<i class="fas fa-star" style="color: #fbbf24;"></i>';
        } else {
            html += '<i class="far fa-star" style="color: #d1d5db;"></i>';
        }
    }
    return html + ` <span style="color: #6b7280;">${rating}</span>`;
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateForm(formData, requiredFields) {
    const errors = [];
    
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        }
    });
    
    if (formData.email && !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return errors;
}

// Home Page Functions
function loadFeaturedTours() {
    const container = document.getElementById('featured-tours');
    if (!container) return;
    
    showLoading(container);
    
    toursAPI.getAll()
        .then(tours => {
            const featuredTours = tours.slice(0, 3);
            container.innerHTML = featuredTours.map(tour => `
                <div class="destination-card">
                    <div class="destination-image" style="background-image: url('${tour.image}')">
                        <div class="destination-overlay">
                            <h3>${tour.name}</h3>
                            <p>${tour.description}</p>
                        </div>
                    </div>
                    <div class="destination-content">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span class="destination-price">From $${tour.price}</span>
                            <a href="tours.html" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            showError(container, 'Failed to load featured tours. Please try again later.');
        });
}

// Tours Page Functions
function loadTours() {
    const container = document.getElementById('tours-table-body');
    const tourSelect = document.getElementById('preferredTour');
    if (!container) return;
    
    showLoading(container.parentElement);
    
    toursAPI.getAll()
        .then(tours => {
            container.innerHTML = tours.map(tour => `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <img src="${tour.image}" alt="${tour.name}" 
                                 style="width: 60px; height: 45px; border-radius: 8px; object-fit: cover; margin-right: 1rem;">
                            <div>
                                <div style="font-weight: 600;">${tour.name}</div>
                                <div style="font-size: 0.875rem; color: #6b7280;">${tour.description}</div>
                            </div>
                        </div>
                    </td>
                    <td>${tour.duration}</td>
                    <td style="font-weight: 600; color: #3b82f6;">$${tour.price}</td>
                    <td>${createStarRating(tour.rating)}</td>
                    <td>
                        <button class="btn btn-primary" onclick="selectTour('${tour.name}')">Book Now</button>
                    </td>
                </tr>
            `).join('');
            
            // Populate tour selection dropdown
            if (tourSelect) {
                tourSelect.innerHTML = '<option value="">Select tour</option>' + 
                    tours.map(tour => `<option value="${tour.name}">${tour.name}</option>`).join('');
            }
        })
        .catch(error => {
            showError(container.parentElement, 'Failed to load tours. Please try again later.');
        });
}

function selectTour(tourName) {
    const select = document.getElementById('preferredTour');
    if (select) {
        select.value = tourName;
        document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
    }
}

function handleTourBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    const errors = validateForm(data, ['fullName', 'email', 'phone', 'numberOfTravelers', 'preferredTour', 'preferredDate']);
    
    if (errors.length > 0) {
        showError(document.getElementById('tour-booking-message'), errors.join('<br>'));
        return;
    }
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    
    toursAPI.book(data)
        .then(response => {
            showSuccess(document.getElementById('tour-booking-message'), 'Tour booking submitted successfully! We\'ll contact you soon.');
            event.target.reset();
        })
        .catch(error => {
            showError(document.getElementById('tour-booking-message'), 'Failed to submit booking. Please try again.');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Hotels Page Functions
function loadHotels() {
    const container = document.getElementById('hotels-grid');
    const hotelSelect = document.getElementById('hotelSelection');
    if (!container) return;
    
    showLoading(container);
    
    hotelsAPI.getAll()
        .then(hotels => {
            container.innerHTML = hotels.map(hotel => `
                <div class="destination-card">
                    <div class="destination-image" style="background-image: url('${hotel.image}')">
                        <div style="position: absolute; top: 1rem; right: 1rem; background: white; padding: 0.5rem; border-radius: 8px;">
                            ${createStarRating(hotel.rating)}
                        </div>
                    </div>
                    <div class="destination-content">
                        <h3 style="margin-bottom: 0.5rem;">${hotel.name}</h3>
                        <div style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #6b7280;">
                            <i class="fas fa-map-marker-alt" style="margin-right: 0.5rem;"></i>
                            ${hotel.location}
                        </div>
                        <p style="color: #6b7280; margin-bottom: 1rem;">${hotel.description}</p>
                        <div style="margin-bottom: 1rem;">
                            ${hotel.amenities.slice(0, 3).map(amenity => 
                                `<span style="display: inline-block; background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; margin-right: 0.5rem; margin-bottom: 0.25rem;">${amenity}</span>`
                            ).join('')}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span class="destination-price">$${hotel.price_per_night}</span>
                                <span style="color: #6b7280;">/night</span>
                            </div>
                            <button class="btn btn-primary" onclick="selectHotel('${hotel.name}')">Book Now</button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Populate hotel selection dropdown
            if (hotelSelect) {
                hotelSelect.innerHTML = '<option value="">Choose hotel</option>' + 
                    hotels.map(hotel => `<option value="${hotel.name}">${hotel.name}</option>`).join('');
            }
        })
        .catch(error => {
            showError(container, 'Failed to load hotels. Please try again later.');
        });
}

function selectHotel(hotelName) {
    const select = document.getElementById('hotelSelection');
    if (select) {
        select.value = hotelName;
        document.getElementById('hotel-booking-form').scrollIntoView({ behavior: 'smooth' });
    }
}

function handleHotelBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    const errors = validateForm(data, ['guestName', 'email', 'phone', 'hotelSelection', 'checkInDate', 'checkOutDate']);
    
    if (errors.length > 0) {
        showError(document.getElementById('hotel-booking-message'), errors.join('<br>'));
        return;
    }
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Reserving...';
    submitButton.disabled = true;
    
    hotelsAPI.book(data)
        .then(response => {
            showSuccess(document.getElementById('hotel-booking-message'), 'Hotel reservation submitted successfully! We\'ll contact you soon.');
            event.target.reset();
        })
        .catch(error => {
            showError(document.getElementById('hotel-booking-message'), 'Failed to submit reservation. Please try again.');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Contact Page Functions
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    const errors = validateForm(data, ['firstName', 'lastName', 'email', 'message']);
    
    if (errors.length > 0) {
        showError(document.getElementById('contact-message'), errors.join('<br>'));
        return;
    }
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    contactAPI.send(data)
        .then(response => {
            showSuccess(document.getElementById('contact-message'), 'Message sent successfully! We\'ll get back to you soon.');
            event.target.reset();
        })
        .catch(error => {
            showError(document.getElementById('contact-message'), 'Failed to send message. Please try again.');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Initialize page-specific functions
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            loadFeaturedTours();
            break;
        case 'tours.html':
            loadTours();
            break;
        case 'hotels.html':
            loadHotels();
            break;
    }
    
    // Attach form event listeners
    const tourBookingForm = document.getElementById('tour-booking-form');
    if (tourBookingForm) {
        tourBookingForm.addEventListener('submit', handleTourBooking);
    }
    
    const hotelBookingForm = document.getElementById('hotel-booking-form');
    if (hotelBookingForm) {
        hotelBookingForm.addEventListener('submit', handleHotelBooking);
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});