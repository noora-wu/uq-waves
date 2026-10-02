import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-xl z-50 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-110 transition-all duration-200"
      size="icon"
    >
      <Plus className="h-6 w-6 text-white" />
    </Button>
  );
}
