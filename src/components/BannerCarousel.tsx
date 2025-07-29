import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bannerCollaboration from '@/assets/banner-collaboration.jpg';
import bannerNetworking from '@/assets/banner-networking.jpg';
import bannerAchievement from '@/assets/banner-achievement.jpg';
import bannerApp from '@/assets/banner-app.jpg';

const bannerSlides = [
  {
    id: 1,
    image: bannerCollaboration,
    title: "Join Our Community",
    subtitle: "Connect with fellow professionals"
  },
  {
    id: 2,
    image: bannerNetworking,
    title: "Connect & Grow",
    subtitle: "Expand your network through challenges"
  },
  {
    id: 3,
    image: bannerAchievement,
    title: "Unlock Your Potential",
    subtitle: "Achieve success through gamification"
  },
  {
    id: 4,
    image: bannerApp,
    title: "Gamify Your Success",
    subtitle: "Track progress with our mobile app"
  }
];

export const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
      <div className="relative w-full h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="banner-overlay">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                <p className="text-sm opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors duration-200"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors duration-200"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};