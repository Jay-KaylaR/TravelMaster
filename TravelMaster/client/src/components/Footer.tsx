import { Link } from "wouter";
import { Compass, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Wanderlust Travel</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating unforgettable travel experiences around the world since 2008.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-white transition-colors duration-300">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-white transition-colors duration-300">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors duration-300">
                  Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Flight Booking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Hotel Reservations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Travel Insurance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Visa Assistance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                hello@wanderlusttravel.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                123 Travel Street, Adventure City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Wanderlust Travel. All rights reserved. | Privacy Policy |
            Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
