'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaCalendarAlt, FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'

const CallToAction = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary-light rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/JT_Special_gradient_white.png"
              alt="JT Luxury Tints"
              width={100}
              height={35}
              className="h-9 w-auto"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-white">Ready to </span>
            <span className="gradient-text">Transform</span>
            <br />
            <span className="text-white">Your Vehicle?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of satisfied customers across Melbourne who trust JT Luxury Tints 
            for professional automotive window tinting.
          </p>
        </motion.div>

        {/* CTA Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.a
            href="tel:0424718151"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-obsidian rounded-xl p-8 text-center card-hover glow-primary group"
          >
            <FaPhone className="text-4xl text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-display font-bold text-white mb-2">Call Now</h3>
            <p className="text-gray-300 text-sm mb-4">Speak directly with our experts</p>
            <div className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
              0424 718 151
            </div>
          </motion.a>

          <motion.a
            href="https://wa.me/61424718151"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-obsidian rounded-xl p-8 text-center card-hover glow-primary group"
          >
            <FaWhatsapp className="text-4xl text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-display font-bold text-white mb-2">WhatsApp</h3>
            <p className="text-gray-300 text-sm mb-4">Quick quotes and updates</p>
            <div className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Message Us
            </div>
          </motion.a>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-obsidian rounded-xl p-8 text-center card-hover glow-primary group"
          >
            <FaEnvelope className="text-4xl text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-display font-bold text-white mb-2">Email Quote</h3>
            <p className="text-gray-300 text-sm mb-4">Detailed written estimates</p>
            <div className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Get Quote
            </div>
          </motion.a>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-obsidian rounded-xl p-8 text-center card-hover glow-primary group"
          >
            <FaCalendarAlt className="text-4xl text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-display font-bold text-white mb-2">Book Online</h3>
            <p className="text-gray-300 text-sm mb-4">Schedule your appointment</p>
            <div className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Schedule Now
            </div>
          </motion.a>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Lifetime Warranty</p>
                <p className="text-gray-400 text-sm">On all installations</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">★</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">1000+ Happy Customers</p>
                <p className="text-gray-400 text-sm">5-star rated service</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Same Day Service</p>
                <p className="text-gray-400 text-sm">Most jobs completed today</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CallToAction 