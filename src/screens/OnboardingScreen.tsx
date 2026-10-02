import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Users, MessageSquare, Star } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Users,
    title: 'Connect',
    description: 'Join the UQ community and connect with fellow students across campus.',
    color: '#51247a'
  },
  {
    icon: MessageSquare,
    title: 'Share',
    description: 'Share your thoughts, experiences, and items with the UQ community.',
    color: '#7d4fb3'
  },
  {
    icon: Star,
    title: 'Discover',
    description: 'Discover course reviews, campus events, and student insights.',
    color: '#9b7bc5'
  }
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-[#51247a] via-[#6d3599] to-[#8946b8] relative overflow-hidden">
      {/* Abstract wave patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q100,50 200,100 T400,100 L400,0 L0,0 Z" fill="white" opacity="0.3" />
          <path d="M0,250 Q100,200 200,250 T400,250 L400,150 L0,150 Z" fill="white" opacity="0.2" />
          <path d="M0,400 Q100,350 200,400 T400,400 L400,300 L0,300 Z" fill="white" opacity="0.1" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 mb-8">
          <Icon className="w-20 h-20 text-white" />
        </div>
        
        <h2 className="text-white text-3xl mb-4 text-center">{slide.title}</h2>
        <p className="text-white/90 text-center max-w-sm mb-12">
          {slide.description}
        </p>

        {/* Dots indicator */}
        <div className="flex gap-2 mb-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="p-6 relative z-10">
        <Button
          onClick={handleNext}
          className="w-full bg-white text-[#51247a] hover:bg-white/90 h-12 rounded-xl"
        >
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        
        {currentSlide < slides.length - 1 && (
          <Button
            onClick={onComplete}
            variant="ghost"
            className="w-full text-white hover:bg-white/10 mt-2"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}
