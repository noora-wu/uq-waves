import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Image, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { generateId } from '@/lib/utils';
import { Post } from '@/types';

interface PostCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = ['General', 'Study', 'Events', 'Second-hand', 'Lost & Found'];

export function PostCreationDialog({ open, onOpenChange }: PostCreationDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const { currentUser, addPost } = useAppStore();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      authorId: currentUser?.id || 'anonymous',
      author: isAnonymous ? undefined : (currentUser || undefined),
      category: selectedCategory as Post['category'],
      isAnonymous,
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addPost(newPost);
    
    // Reset form
    setTitle('');
    setContent('');
    setSelectedCategory('General');
    setIsAnonymous(false);
    
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50">
      <Card className="w-full max-w-md mx-4 mb-4 rounded-t-2xl shadow-2xl border-border bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Create Post</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* User info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {isAnonymous ? 'Anonymous' : currentUser?.username || 'Guest User'}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isAnonymous ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {isAnonymous ? 'Anonymous' : 'Public'}
                </button>
              </div>
            </div>
          </div>

          {/* Category selection */}
          <div>
            <p className="text-sm font-medium mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Title input */}
          <div>
            <Input
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Content input */}
          <div>
            <textarea
              placeholder="Tell us more..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[100px] p-3 border border-input rounded-md bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Image className="h-4 w-4 mr-2" />
              Add Image
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim()}
              className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
