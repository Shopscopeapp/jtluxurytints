'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaCar, FaUsers, FaStar, FaAward, FaShieldAlt } from 'react-icons/fa'
import Image from 'next/image'

const About = () => {
  const stats = [
    {
      number: '500+',
      label: 'Vehicles Tinted',
      icon: <FaCar className="text-4xl text-primary" />
    },
    {
      number: '5+',
      label: 'Years Experience',
      icon: <FaAward className="text-4xl text-primary" />
    },
    {
      number: '100%',
      label: 'Satisfaction Rate',
      icon: <FaStar className="text-4xl text-primary" />
    },
    {
      number: '24/7',
      label: 'Customer Support',
      icon: <FaShieldAlt className="text-4xl text-primary" />
    }
  ]

  const features = [
    {
      title: 'Premium Materials',
      description: 'Only the finest carbon and nano ceramic films from leading manufacturers.',
      icon: <FaAward className="text-2xl text-primary" />
    },
    {
      title: 'Expert Technicians',
      description: 'Certified professionals with years of experience in luxury vehicle tinting.',
      icon: <FaUsers className="text-2xl text-primary" />
    },
    {
      title: 'Warranty Included',
      description: 'Comprehensive warranty on all installations and materials.',
      icon: <FaShieldAlt className="text-2xl text-primary" />
    },
    {
      title: 'Mobile Service',
      description: 'We come to you for ultimate convenience and flexibility.',
      icon: <FaCar className="text-2xl text-primary" />
    }
  ]

  return (
    <section id="about" className="section-padding bg-obsidian-light">
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
            <span className="text-white">About </span>
            <span className="gradient-text">JT Luxury Tints</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Melbourne's premier automotive tinting specialists, dedicated to providing exceptional 
            service and superior results for luxury vehicle owners, detailers, and dealerships.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Melbourne's Most Trusted Tinting Specialists
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                At JT Luxury Tints, we've built our reputation on delivering exceptional automotive 
                window tinting services to Melbourne's most discerning customers. Our expertise 
                spans individual luxury vehicle owners, professional detailers, and high-end dealerships.
              </p>
              <p>
                We understand that your vehicle is more than just transportation—it's an investment, 
                a statement, and often a source of pride. That's why we treat every project with the 
                same level of care and attention to detail, regardless of whether it's a single 
                vehicle or a fleet installation.
              </p>
              <p>
                Our state-of-the-art facility and experienced technicians ensure that every 
                installation meets the highest standards of quality and precision. We stay current 
                with the latest tinting technologies and techniques to provide you with the best 
                possible results.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                Get Started Today
              </a>
              <a href="tel:0424718151" className="btn-secondary flex items-center justify-center space-x-2">
                <FaPhone />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-obsidian-light rounded-2xl p-8"
          >
            <h4 className="text-2xl font-display font-bold text-white mb-8 text-center">
              Why Choose Us?
            </h4>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">{feature.title}</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Location & Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center"
        >
          <FaCar className="text-5xl text-primary mx-auto mb-6" />
          <h3 className="text-3xl font-display font-bold text-white mb-4">
            Serving Melbourne & Surrounding Areas
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Conveniently located to serve customers across Melbourne. We also offer on-site 
            services for dealerships and large fleet installations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center space-x-3 text-gray-300">
              <FaCar className="text-primary" />
              <span>Melbourne, Victoria</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <FaPhone className="text-primary" />
              <span>0424 718 151</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 