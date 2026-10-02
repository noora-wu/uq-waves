import { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: 'subject' | 'teacher' | 'event';
  onSubmit: (rating: number, comment?: string) => void;
}

export function RatingDialog({ 
  open, 
  onOpenChange, 
  title, 
  type,
  onSubmit 
}: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (rating > 0) {
      setIsSubmitted(true);
      onSubmit(rating);
      
      // Auto close after 1.5 seconds
      setTimeout(() => {
        setRating(0);
        setHoverRating(0);
        setIsSubmitted(false);
        onOpenChange(false);
      }, 1500);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setHoverRating(0);
    setIsSubmitted(false);
    onOpenChange(false);
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'subject': return 'Subject';
      case 'teacher': return 'Teacher';
      case 'event': return 'Event';
      default: return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[280px] p-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-sm font-bold text-center">
            Rate {getTypeLabel()}
          </DialogTitle>
          <p className="text-xs text-muted-foreground text-center pt-1 line-clamp-1">
            {title}
          </p>
        </DialogHeader>

        <div className="px-4 py-3">
          {isSubmitted ? (
            // Success message
            <div className="py-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-base font-bold text-purple-600 mb-1">Rating Submitted!</p>
              <p className="text-xs text-muted-foreground">Thank you for your feedback</p>
            </div>
          ) : (
            // Rating stars
            <>
              <div 
                ref={containerRef}
                className="flex items-center justify-center gap-1"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const displayRating = hoverRating || rating;
                  const fillWidth = Math.max(0, Math.min(100, (displayRating - (starIndex - 1)) * 100));
                  
                  return (
                    <div
                      key={starIndex}
                      className="relative cursor-pointer"
                      style={{ 
                        width: '32px', 
                        height: '32px',
                        flexShrink: 0
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const isLeftHalf = x < rect.width / 2;
                        const newRating = isLeftHalf ? starIndex - 0.5 : starIndex;
                        if (newRating !== hoverRating) {
                          setHoverRating(newRating);
                        }
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const isLeftHalf = x < rect.width / 2;
                        setRating(isLeftHalf ? starIndex - 0.5 : starIndex);
                      }}
                    >
                      {/* Background star - always rendered */}
                      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
                        <Star
                          className="text-gray-300"
                          fill="none"
                          strokeWidth={2}
                          width={32}
                          height={32}
                        />
                      </div>
                      
                      {/* Filled star overlay - always rendered, controlled by width */}
                      <div 
                        className="absolute inset-0 overflow-hidden"
                        style={{ 
                          width: `${fillWidth}%`,
                          pointerEvents: 'none',
                          transition: 'none'
                        }}
                      >
                        <Star
                          className="text-yellow-400 fill-yellow-400"
                          strokeWidth={2}
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="h-8 flex items-center justify-center">
                {(hoverRating || rating) > 0 && (
                  <p className="text-lg font-bold text-purple-600">
                    {(hoverRating || rating).toFixed(1)}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {!isSubmitted && (
          <DialogFooter className="px-4 pb-4 pt-0 flex-row gap-2 sm:space-x-0">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 rounded-full text-xs h-8"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 rounded-full text-xs h-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Submit
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
