'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaThermometerHalf, FaEye, FaCar, FaStar, FaPhone } from 'react-icons/fa'
import Image from 'next/image'

const Benefits = () => {
  const benefits = [
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "UV Protection",
      description: "Block up to 99% of harmful UV rays to protect your skin and prevent interior fading.",
      stats: "99% UV Block"
    },
    {
      icon: <FaThermometerHalf className="text-4xl text-primary" />,
      title: "IRR HEAT REJECTION",
      description: "Reduce interior temperature by up to 96% for a more comfortable driving experience.",
      stats: "96% Heat Rejection"
    },
    {
      icon: <FaEye className="text-4xl text-primary" />,
      title: "Glare Reduction",
      description: "Minimize eye strain and improve visibility during bright daylight and night driving.",
      stats: "85% Glare Reduction"
    },
    {
      icon: <FaCar className="text-4xl text-primary" />,
      title: "Interior Protection",
      description: "Preserve your vehicle's interior from sun damage and extend its lifespan.",
      stats: "Long-term Protection"
    }
  ]

  const whyChooseUs = [
    "Premium carbon & nano ceramic films",
    "Certified professional technicians",
    "Comprehensive warranty included",
    "Mobile service available",
    "Competitive pricing for all customers",
    "Melbourne-wide coverage"
  ]

  return (
    <section id="benefits" className="section-padding bg-obsidian">
      <div className="max-w-7xl mx-auto">
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
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text">Window Tinting?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional window tinting offers numerous benefits beyond just aesthetics. 
            Protect your investment and enhance your driving experience.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-obsidian-light rounded-xl p-6 card-hover text-center"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {benefit.description}
              </p>
              <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                {benefit.stats}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-obsidian-light to-obsidian rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Why Choose <span className="gradient-text">JT Luxury Tints?</span>
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We're Melbourne's premier automotive tinting specialists, trusted by luxury car owners, 
                detailers, and dealerships across the city. Our commitment to excellence sets us apart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn-primary text-center">
                  Get Free Quote
                </a>
                <a href="tel:0424718151" className="btn-secondary text-center flex items-center justify-center space-x-2">
                  <FaPhone />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              {whyChooseUs.map((reason, index) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <FaStar className="text-white text-xs" />
                  </div>
                  <span className="text-gray-300">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Benefits 