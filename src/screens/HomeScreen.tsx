import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, TrendingUp, Clock, MessageSquare, Heart, Share2, Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/store/useAppStore';
import { formatTimeAgo } from '@/lib/utils';
import { PostDetail } from '@/components/posts/PostDetail';
import { Post } from '@/types';

const categories = ['All', 'General', 'Study', 'Events', 'Second-hand', 'Lost & Found'];

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const { posts, likePost } = useAppStore();

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  // Show post detail if a post is selected
  if (selectedPost) {
    return <PostDetail post={selectedPost} onBack={handleBackToList} onLike={likePost} />;
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-transparent to-blue-100/30 dark:from-purple-800/10 dark:via-transparent dark:to-blue-800/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Discussion Board
              </h1>
              <p className="text-xs text-muted-foreground">Connect with your campus community</p>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-input-background border-0"
          />
        </div>

        {/* Sort and filter */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'latest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('latest')}
              className="rounded-full"
            >
              <Clock className="h-3 w-3 mr-1" />
              Latest
            </Button>
            <Button
              variant={sortBy === 'popular' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('popular')}
              className="rounded-full"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={() => {
              // TODO: Implement filter functionality
              console.log('Filter clicked');
            }}
          >
            <Filter className="h-3 w-3 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-border">
        <div className="flex gap-2 p-4 pb-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                  : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-105'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Posts feed */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found. Be the first to share something!</p>
            </div>
          ) : (
            sortedPosts.map((post) => (
              <Card 
                key={post.id} 
                className="rounded-2xl shadow-sm border-border hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                onClick={() => handlePostClick(post)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author?.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {post.isAnonymous ? '?' : (post.author?.username || 'U').charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm">{post.isAnonymous ? 'Anonymous' : post.author?.username || 'Unknown'}</p>
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
                  <h3 className="mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.content}</p>
                  
                  {/* Post actions */}
                  <div className="flex items-center justify-between text-muted-foreground text-sm">
                    <div className="flex items-center gap-4">
                      <button 
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          likePost(post.id);
                        }}
                      >
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostClick(post);
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    <button 
                      className="hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
