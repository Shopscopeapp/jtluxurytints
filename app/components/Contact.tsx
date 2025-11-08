'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCar, FaUsers, FaBuilding } from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  phone: string
  vehicle: string
  service: string
  customerType: string
  message: string
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mblqrday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          vehicle: data.vehicle,
          service: data.service,
          customerType: data.customerType,
          message: data.message,
          _subject: `New Quote Request from ${data.name} (${data.customerType})`,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-primary" />,
      title: "Phone",
      details: ["0424 718 151", "Available 7 days a week"]
    },
    {
      icon: <FaEnvelope className="text-2xl text-primary" />,
      title: "Email",
      details: ["info@jtluxurytints.com.au", "Quotes within 2 hours"]
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-primary" />,
      title: "Location",
      details: ["Melbourne, Victoria", "Mobile service available"]
    },
    {
      icon: <FaClock className="text-2xl text-primary" />,
      title: "Hours",
      details: ["Mon-Fri: 8AM-6PM", "Sat-Sun: 9AM-4PM"]
    }
  ]

  const services = [
    "Carbon Window Tint - 5%",
    "Carbon Window Tint - 10%",
    "Carbon Window Tint - 15%",
    "Carbon Window Tint - 20%",
    "Carbon Window Tint - 35%",
    "Nano Ceramic Tint - 10%",
    "Nano Ceramic Tint - 25%",
    "Nano Ceramic Tint - 35%",
    "Nano Ceramic Tint - 50%",
    "Nano Ceramic Tint - 75%",
    "Custom Quote"
  ]

  const customerTypes = [
    { value: "individual", label: "Individual Customer", icon: <FaCar /> },
    { value: "detailer", label: "Detailer/Business", icon: <FaUsers /> },
    { value: "dealership", label: "Dealership", icon: <FaBuilding /> }
  ]

  return (
    <section id="contact" className="section-padding bg-obsidian-light">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-white">Get Your Free </span>
            <span className="gradient-text">Quote Today</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to enhance your vehicle with premium window tinting? 
            Contact us for a personalized quote and expert advice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-obsidian rounded-2xl p-8"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Request Your Quote
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Customer Type Selection */}
              <div>
                <label className="block text-white font-semibold mb-3">I am a:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {customerTypes.map((type) => (
                    <label key={type.value} className="relative">
                      <input
                        type="radio"
                        value={type.value}
                        {...register('customerType', { required: 'Please select customer type' })}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-center p-4 border-2 border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors peer-checked:border-primary peer-checked:bg-primary/10">
                        <div className="text-center">
                          <div className="text-primary mb-2">{type.icon}</div>
                          <span className="text-white text-sm font-medium">{type.label}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.customerType && (
                  <p className="text-red-400 text-sm mt-1">{errors.customerType.message}</p>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 bg-obsidian-light border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full px-4 py-3 bg-obsidian-light border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 bg-obsidian-light border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Vehicle Make & Model</label>
                <input
                  type="text"
                  {...register('vehicle')}
                  className="w-full px-4 py-3 bg-obsidian-light border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., BMW X5, Mercedes C-Class"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Preferred Service</label>
                <select
                  {...register('service')}
                  className="w-full px-4 py-3 bg-obsidian-light border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Additional Message</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 bg-obsidian-light border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your requirements, timeline, or any questions you have..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Get Free Quote'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-600/20 border border-green-600 rounded-lg p-4 text-green-400">
                  Thank you! We'll contact you within 2 hours with your personalized quote.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 text-red-400">
                  Something went wrong. Please try again or call us directly.
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-obsidian rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
              <h4 className="text-xl font-display font-bold text-white mb-4">
                Need Immediate Assistance?
              </h4>
              <p className="text-gray-300 mb-6">
                For urgent quotes or same-day bookings, call us directly or send a WhatsApp message.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0424718151"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/61424718151"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>📱</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-obsidian rounded-2xl p-8">
              <h4 className="text-xl font-display font-bold text-white mb-4">
                Service Areas
              </h4>
              <div className="space-y-2 text-gray-300">
                <p>• Melbourne CBD</p>
                <p>• Eastern Suburbs</p>
                <p>• Western Suburbs</p>
                <p>• Northern Suburbs</p>
                <p>• Southern Suburbs</p>
                <p>• Bayside Areas</p>
              </div>
              <p className="text-primary text-sm mt-4">
                Mobile service available for dealerships and fleet installations
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 