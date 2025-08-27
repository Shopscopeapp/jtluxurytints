'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'Carbon Window Tint',
    'Nano Ceramic Tint',
    'Individual Customers',
    'Detailer Services',
    'Dealership Solutions',
    'Mobile Service'
  ]

  const areas = [
    'Melbourne CBD',
    'Eastern Suburbs',
    'Western Suburbs',
    'Northern Suburbs',
    'Southern Suburbs',
    'Bayside Areas'
  ]

  return (
    <footer className="bg-obsidian border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <div className="mb-4">
                  <Image
                    src="/images/JT_Special_gradient_white.png"
                    alt="JT Luxury Tints"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Melbourne's premier automotive window tinting specialists. 
                  Professional service for luxury vehicles, detailers, and dealerships.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaPhone className="text-primary" />
                  <span>+61 400 000 000</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaEnvelope className="text-primary" />
                  <span>info@jtluxurytints.com.au</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>Melbourne, Victoria</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-obsidian-light rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-obsidian-light rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-obsidian-light rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-display font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-display font-bold text-white mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Service Areas */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-display font-bold text-white mb-6">Service Areas</h3>
              <ul className="space-y-3">
                {areas.map((area) => (
                  <li key={area}>
                    <span className="text-gray-300">{area}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-sm text-primary font-semibold mb-2">Business Hours:</p>
                <p className="text-gray-300 text-sm">Mon-Fri: 8AM-6PM</p>
                <p className="text-gray-300 text-sm">Sat-Sun: 9AM-4PM</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-300 text-sm"
            >
              © {currentYear} JT Luxury Tints. All rights reserved.
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex space-x-6 text-sm"
            >
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Warranty Info
              </a>
            </motion.div>
          </div>
        </div>

        {/* SEO Footer Content */}
        <div className="border-t border-primary/20 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mx-auto">
              JT Luxury Tints is Melbourne's leading automotive window tinting specialist, offering premium carbon and nano ceramic window films for luxury vehicles. Our professional services cater to individual customers, automotive detailers, and car dealerships across Melbourne and surrounding areas. We provide lifetime warranties, expert installation, and superior customer service for all your window tinting needs. Contact us today for a free quote on carbon window tint (5%, 10%, 15%, 20%, 35%) or nano ceramic tint (10%, 25%, 35%, 50%, 75%) installation.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 