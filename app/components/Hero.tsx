'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 90%, rgba(245, 115, 15, 0.2) 100%)'
          }} 
        />
        <div 
          className="w-full h-full" 
          style={{ 
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 80%, rgba(245, 115, 15, 0.3) 100%)'
          }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
          >
            <span className="text-white">Melbourne's </span>
            <span className="gradient-text">Premier</span>
            <br />
            <span className="text-white">Luxury </span>
            <span className="gradient-text">Tinting</span>
            <span className="text-white"> Specialists</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Professional carbon & nano ceramic window tinting for luxury vehicles.
            <br className="hidden md:block" />
            Serving individuals, detailers, and dealerships across Melbourne.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a href="#contact" className="btn-primary text-lg px-10 py-4">
              Get Free Quote
            </a>
            <a href="tel:+61424718151" className="btn-secondary text-lg px-10 py-4 flex items-center space-x-2">
              <FaPhone />
              <span>Call Now</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 text-white">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <span className="text-lg">Melbourne Wide</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white">
              <FaPhone className="text-primary text-xl" />
              <span className="text-lg">24/7 Support</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <FaEnvelope className="text-primary text-xl" />
              <span className="text-lg">Professional Service</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 