import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, DollarSign } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTimeAgo } from '@/lib/utils';

interface SecondHandItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  images?: string[];
  sellerId: string;
  seller: {
    id: string;
    username: string;
    avatar?: string;
  };
  isAvailable: boolean;
  createdAt: Date;
}

const mockItems: SecondHandItem[] = [
  {
    id: '1',
    title: 'MacBook Pro 13" 2022',
    description: 'Excellent condition MacBook Pro with M2 chip. Barely used, comes with original charger.',
    price: 1800,
    category: 'Electronics',
    condition: 'Like New',
    sellerId: '1',
    seller: {
      id: '1',
      username: 'TechGuru',
      avatar: undefined,
    },
    isAvailable: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Calculus Textbook - Stewart',
    description: 'MATH2001 textbook in good condition. Some highlighting but all pages intact.',
    price: 45,
    category: 'Books',
    condition: 'Good',
    sellerId: '2',
    seller: {
      id: '2',
      username: 'MathStudent',
      avatar: undefined,
    },
    isAvailable: true,
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    title: 'Office Chair - Ergonomic',
    description: 'Comfortable office chair perfect for long study sessions. Adjustable height and backrest.',
    price: 120,
    category: 'Furniture',
    condition: 'Good',
    sellerId: '3',
    seller: {
      id: '3',
      username: 'StudyBuddy',
      avatar: undefined,
    },
    isAvailable: true,
    createdAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    title: 'Coffee Maker - Keurig',
    description: 'Single-serve coffee maker, perfect for dorm rooms. Comes with reusable K-cup.',
    price: 60,
    category: 'Appliances',
    condition: 'Good',
    sellerId: '4',
    seller: {
      id: '4',
      username: 'CoffeeLover',
      avatar: undefined,
    },
    isAvailable: true,
    createdAt: new Date('2024-01-12'),
  },
];

const categories = ['All', 'Electronics', 'Books', 'Furniture', 'Clothing', 'Appliances', 'Sports'];

export function SecondHandScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'price-low' | 'price-high'>('latest');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.isAvailable;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <h1 className="text-[#51247a] dark:text-[#7d4fb3] mb-4">Second-hand Market</h1>
        
        {/* Search bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-input-background border-0"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 flex-1">
            {categories.slice(0, 3).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            More
          </Button>
        </div>

        {/* Sort options */}
        <div className="flex gap-2 mt-2">
          {[
            { key: 'latest', label: 'Latest' },
            { key: 'price-low', label: 'Price: low' },
            { key: 'price-high', label: 'Price: high' },
          ].map((option) => (
            <Button
              key={option.key}
              variant={sortBy === option.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy(option.key as any)}
              className="rounded-full text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Items grid */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {sortedItems.map((item) => (
            <Card key={item.id} className="rounded-2xl shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.seller.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {item.seller.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.seller.username}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(item.createdAt)}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                
                {/* Price and condition */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">${item.price}</span>
                  </div>
                  <Badge 
                    variant={item.condition === 'New' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {item.condition}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-full flex-1">
                    Contact Seller
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {sortedItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Add new item button */}
      <div className="p-4 border-t border-border bg-card">
        <Button className="w-full rounded-xl">
          Sell an Item
        </Button>
      </div>
    </div>
  );
}
