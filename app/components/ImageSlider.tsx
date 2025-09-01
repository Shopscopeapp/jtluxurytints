'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

const SLIDE_INTERVAL_MS = 3500
const SWIPE_THRESHOLD_PX = 60

const imageFiles = [
  '/images/14056237-D38A-4BFC-BD67-473C928EC28A.jpg',
  '/images/AB22FEC0-764A-4367-B7C0-9B4CFE3148D0.jpg',
  '/images/C24FC6C2-1D13-48B6-A4ED-0CD755736B2F.jpg',
  '/images/CEA39853-11FA-4F7B-8BEF-6BFB9FC61612.jpg',
  '/images/IMG_0296.jpg',
  '/images/IMG_0299.jpg',
  '/images/IMG_0522.jpg',
  '/images/IMG_0701.jpg',
  '/images/IMG_0707.jpg',
  '/images/IMG_1040.jpg',
  '/images/IMG_1041.jpg',
  '/images/IMG_1045.jpg',
  '/images/IMG_1050.jpg',
  '/images/IMG_1099.jpg',
  '/images/IMG_6938.jpg',
  '/images/IMG_7650.jpg',
  '/images/JT_Logo_horizontal_gradient_white.png',
  '/images/JT_Special_gradient_white.png'
]

function toAlt(path: string): string {
  const file = path.split('/').pop() || 'slide'
  return file.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '').trim()
}

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const slides = useMemo(() => imageFiles.filter(src => {
    const name = src.toLowerCase()
    return !name.endsWith('.png') && !name.includes('logo') && !name.includes('jt_')
  }), [])
  const slidesCount = slides.length

  const goTo = (index: number) => {
    setCurrentIndex((index + slidesCount) % slidesCount)
  }

  const next = () => goTo(currentIndex + 1)
  const prev = () => goTo(currentIndex - 1)

  useEffect(() => {
    if (isHovered || slidesCount <= 1) return
    intervalRef.current && clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex(i => (i + 1) % slidesCount)
    }, SLIDE_INTERVAL_MS)
    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [isHovered, slidesCount])

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD_PX) {
      if (touchDeltaX.current < 0) {
        next()
      } else {
        prev()
      }
    }
    touchStartX.current = null
    touchDeltaX.current = 0
  }

  const translateX = useMemo(() => `translateX(-${currentIndex * 100}%)`, [currentIndex])

  return (
    <section id="gallery" aria-label="Gallery" className="relative w-full pb-12 md:pb-20">
      <div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">
            <span className="text-white">Our </span>
            <span className="gradient-text">Showcase</span>
          </h2>
          <div className="text-sm text-gray-400">Swipe or use arrows</div>
        </div>
        <div
          className="relative overflow-hidden rounded-xl border border-white/5"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: translateX }}
          >
            {slides.map((src, i) => (
              <div key={src} className="relative shrink-0 w-full h-[340px] sm:h-[460px] md:h-[560px] lg:h-[640px]">
                <Image
                  src={src}
                  alt={toAlt(src)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian/80 to-transparent" />

          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-11 w-11 md:h-12 md:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition ring-1 ring-white/20 hover:ring-white/40 hover:scale-[1.03] active:scale-95 shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-11 w-11 md:h-12 md:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition ring-1 ring-white/20 hover:ring-white/40 hover:scale-[1.03] active:scale-95 shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 md:gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ring-1 ring-white/30 ${i === currentIndex ? 'w-8 bg-primary ring-primary/60' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="h-1 bg-white/10">
              <div
                key={`${currentIndex}-${isHovered ? 'paused' : 'run'}`}
                className="h-full bg-primary transition-all"
                style={{ width: isHovered ? '0%' : '100%', transitionDuration: `${SLIDE_INTERVAL_MS}ms` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageSlider


