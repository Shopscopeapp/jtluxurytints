'use client'

import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Benefits from './components/Benefits'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CallToAction from './components/CallToAction'

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Header />
      <Hero />
      <Services />
      <Benefits />
      <About />
      <CallToAction />
      <Contact />
      <Footer />
    </main>
  )
} 