import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MessageSquare, Heart, Share2, Eye, Reply, Flag } from 'lucide-react';
import { formatTimeAgo, getInitials } from '@/lib/utils';
import { Post, Comment } from '@/types';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onLike: (postId: string) => void;
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    authorId: '2',
    author: {
      id: '2',
      username: 'Sarah Chen',
      email: 'sarah.chen@uq.edu.au',
      faculty: 'Engineering',
      year: 2,
      isVerified: true,
      createdAt: new Date('2023-01-01'),
    },
    content: 'I\'m also taking COMP3506! Would love to join the study group. When are you thinking of meeting?',
    isAnonymous: false,
    createdAt: new Date('2024-01-15T11:00:00'),
  },
  {
    id: '2',
    postId: '1',
    authorId: '3',
    author: {
      id: '3',
      username: 'Anonymous',
      email: '',
      faculty: '',
      year: 0,
      isVerified: false,
      createdAt: new Date(),
    },
    content: 'Same here! The assignments are getting tough. Maybe we could meet in the library this weekend?',
    isAnonymous: true,
    createdAt: new Date('2024-01-15T11:30:00'),
  },
  {
    id: '3',
    postId: '1',
    authorId: '4',
    author: {
      id: '4',
      username: 'Mike Wilson',
      email: 'mike.wilson@uq.edu.au',
      faculty: 'Science',
      year: 3,
      isVerified: true,
      createdAt: new Date('2022-01-01'),
    },
    content: 'I have some notes from last semester if anyone needs them. Happy to share!',
    isAnonymous: false,
    createdAt: new Date('2024-01-15T12:15:00'),
  },
];

export function PostDetail({ post, onBack, onLike }: PostDetailProps) {
  const [comments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    onLike(post.id);
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Here you would normally add the comment to the store
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-[#51247a] dark:text-[#7d4fb3] flex-1">Post Details</h1>
        <Button variant="ghost" size="sm" className="rounded-full">
          <Flag className="h-4 w-4" />
        </Button>
      </div>

      {/* Post Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Original Post */}
          <Card className="rounded-2xl shadow-lg border-border bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author?.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.isAnonymous ? '?' : getInitials(post.author?.username || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {post.isAnonymous ? 'Anonymous' : post.author?.username || 'Unknown'}
                      </p>
                      {post.isAnonymous && (
                        <Badge variant="secondary" className="text-xs px-2 py-0">Anon</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(post.createdAt)}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">{post.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <h2 className="text-lg font-semibold mb-3">{post.title}</h2>
              <p className="text-sm mb-4 whitespace-pre-wrap">{post.content}</p>
              
              {/* Post actions */}
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <div className="flex items-center gap-4">
                  <button 
                    className={`flex items-center gap-1 hover:text-primary transition-colors ${
                      isLiked ? 'text-red-500' : ''
                    }`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{comments.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
                <button className="hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
            
            {/* Add Comment */}
            <Card className="rounded-2xl shadow-sm border-border mb-4">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full min-h-[80px] p-3 border border-input rounded-md bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        size="sm"
                        className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((comment) => (
                <Card key={comment.id} className="rounded-2xl shadow-sm border-border">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author?.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {comment.isAnonymous ? '?' : getInitials(comment.author?.username || 'U')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">
                            {comment.isAnonymous ? 'Anonymous' : comment.author?.username || 'Unknown'}
                          </p>
                          {comment.isAnonymous && (
                            <Badge variant="secondary" className="text-xs px-2 py-0">Anon</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
