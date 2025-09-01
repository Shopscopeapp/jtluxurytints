'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaSun, FaThermometerHalf, FaEye, FaCar, FaUsers } from 'react-icons/fa'
import ImageSlider from './ImageSlider'

const Services = () => {
  const carbonTints = [
    { percentage: '5%', description: 'Maximum Privacy & Heat Rejection' },
    { percentage: '10%', description: 'High Privacy with Excellent Performance' },
    { percentage: '15%', description: 'Balanced Privacy & Visibility' },
    { percentage: '20%', description: 'Subtle Tint with Good Protection' },
    { percentage: '35%', description: 'Light Tint for Enhanced Comfort' },
  ]

  const nanoCeramicTints = [
    { percentage: '15%', description: 'Ultimate Performance & Privacy' },
    { percentage: '20%', description: 'Superior Heat Rejection' },
    { percentage: '35%', description: 'Perfect Balance of Performance' },
    { percentage: '50%', description: 'Enhanced Comfort & Clarity' },
    { percentage: '70%', description: 'Maximum Clarity with Protection' },
  ]

  const serviceTypes = [
    {
      icon: <FaCar className="text-4xl text-primary" />,
      title: "Individual Customers",
      description: "Premium tinting services for your personal luxury vehicle",
      features: ["Lifetime Warranty", "Premium Materials", "Expert Installation"]
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Detailers",
      description: "Professional partnerships with automotive detailing businesses",
      features: ["Bulk Pricing", "Quick Turnaround", "Trade Support"]
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Dealerships",
      description: "Comprehensive tinting solutions for luxury car dealerships",
      features: ["Volume Discounts", "On-site Service", "Fast Processing"]
    }
  ]

  return (
    <section id="services" className="section-padding bg-obsidian-light">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-white">Premium </span>
            <span className="gradient-text">Tinting Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We specialize in high-quality carbon and nano ceramic window tints for luxury vehicles.
            Choose the perfect tint level for your needs.
          </p>
        </motion.div>

        {/* Service Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {serviceTypes.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-obsidian rounded-xl p-8 card-hover glow-primary"
            >
              <div className="text-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 text-center">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <FaShieldAlt className="text-primary mr-3 text-sm" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tint Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Carbon Window Tints */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-obsidian rounded-xl p-8"
          >
            <div className="text-center mb-8">
              <FaShieldAlt className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                Carbon Window Tint
              </h3>
              <p className="text-gray-300">
                Premium carbon window tint technology for superior performance and aesthetic
              </p>
            </div>

            <div className="space-y-4">
              {carbonTints.map((tint, index) => (
                <motion.div
                  key={tint.percentage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex justify-between items-center bg-obsidian-light rounded-lg p-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{tint.percentage}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{tint.percentage} VLT</p>
                      <p className="text-gray-400 text-sm">{tint.description}</p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm px-4 py-2">
                    Select
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Nano Ceramic Tints */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-obsidian rounded-xl p-8"
          >
            <div className="text-center mb-8">
              <FaSun className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                Nano Ceramic
              </h3>
              <p className="text-gray-300">
                Advanced nano-ceramic technology for maximum heat rejection and clarity
              </p>
            </div>

            <div className="space-y-4">
              {nanoCeramicTints.map((tint, index) => (
                <motion.div
                  key={tint.percentage}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex justify-between items-center bg-obsidian-light rounded-lg p-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{tint.percentage}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{tint.percentage} VLT</p>
                      <p className="text-gray-400 text-sm">{tint.description}</p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm px-4 py-2">
                    Select
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Image Slider */}
        <div className="mt-16">
          <ImageSlider />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary text-lg px-10 py-4">
            Get Custom Quote
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 