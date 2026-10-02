import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Phone } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatTimeAgo } from '@/lib/utils';

interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  type: 'Lost' | 'Found';
  contact: string;
  images?: string[];
  isResolved: boolean;
}

const mockItems: LostFoundItem[] = [
  {
    id: '1',
    title: 'Black iPhone 14 Pro',
    description: 'Lost my iPhone near the Great Court. Has a clear case and UQ sticker on the back.',
    location: 'Great Court, St Lucia Campus',
    date: new Date('2024-01-15'),
    type: 'Lost',
    contact: 'john.doe@uq.edu.au',
    isResolved: false,
  },
  {
    id: '2',
    title: 'Blue Laptop Bag',
    description: 'Found a blue laptop bag in the library. Contains some notebooks and a water bottle.',
    location: 'Central Library, Level 2',
    date: new Date('2024-01-14'),
    type: 'Found',
    contact: 'sarah.smith@uq.edu.au',
    isResolved: false,
  },
  {
    id: '3',
    title: 'White AirPods Case',
    description: 'Lost my AirPods case (just the case, not the AirPods) somewhere on campus.',
    location: 'Unknown',
    date: new Date('2024-01-13'),
    type: 'Lost',
    contact: 'mike.wilson@uq.edu.au',
    isResolved: true,
  },
  {
    id: '4',
    title: 'Red Umbrella',
    description: 'Found a red umbrella left in the engineering building. Please contact if it\'s yours.',
    location: 'Engineering Building, Level 1',
    date: new Date('2024-01-12'),
    type: 'Found',
    contact: 'lisa.chen@uq.edu.au',
    isResolved: false,
  },
];

export function LostFoundScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Lost' | 'Found'>('All');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType && !item.isResolved;
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <h1 className="text-[#51247a] dark:text-[#7d4fb3] mb-4">Lost & Found</h1>
        
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

        {/* Type filter */}
        <div className="flex gap-2">
          {(['All', 'Lost', 'Found'] as const).map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="rounded-full"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Items list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="rounded-2xl shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={item.type === 'Lost' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {item.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(item.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                
                {/* Location and contact */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{item.contact}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="rounded-full flex-1">
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Add new item button */}
      <div className="p-4 border-t border-border bg-card">
        <Button className="w-full rounded-xl">
          Report Lost or Found Item
        </Button>
      </div>
    </div>
  );
}
