'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-obsidian text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src="/images/JT_Special_gradient_white.png"
                alt="JT Luxury Tints"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Melbourne's premier automotive tinting specialists, providing exceptional 
              service and superior results for luxury vehicle owners, detailers, and dealerships.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#benefits" className="text-gray-300 hover:text-primary transition-colors">Benefits</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span className="text-gray-300">+61 424 718 151</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span className="text-gray-300">info@jtluxurytints.com.au</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-gray-300">Melbourne, Victoria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 JT Luxury Tints. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 