import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  organizer: string;
  category: 'Academic' | 'Social' | 'Sports' | 'Cultural';
  attendees: number;
  maxAttendees?: number;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'UQ Computing Society Meetup',
    description: 'Join us for networking, pizza, and tech talks. All CS students welcome!',
    location: 'Advanced Engineering Building, Room 49-201',
    date: new Date('2024-01-20T18:00:00'),
    organizer: 'UQ Computing Society',
    category: 'Academic',
    attendees: 45,
    maxAttendees: 60,
  },
  {
    id: '2',
    title: 'Campus Food Festival',
    description: 'Taste food from different cultures around the world. Free entry, food available for purchase.',
    location: 'Great Court, St Lucia Campus',
    date: new Date('2024-01-22T12:00:00'),
    organizer: 'UQ International Students Association',
    category: 'Cultural',
    attendees: 120,
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    description: 'Inter-faculty basketball tournament. Teams of 5, registration required.',
    location: 'UQ Sport Fitness Centre',
    date: new Date('2024-01-25T14:00:00'),
    organizer: 'UQ Sport',
    category: 'Sports',
    attendees: 32,
    maxAttendees: 40,
  },
  {
    id: '4',
    title: 'Study Group: MATH2001',
    description: 'Collaborative study session for MATH2001 students. Bring your notes and questions!',
    location: 'Central Library, Study Room 3',
    date: new Date('2024-01-18T16:00:00'),
    organizer: 'Mathematics Student Association',
    category: 'Academic',
    attendees: 15,
    maxAttendees: 20,
  },
  {
    id: '5',
    title: 'Movie Night: Sci-Fi Classics',
    description: 'Watch classic science fiction movies with fellow students. Popcorn and drinks provided.',
    location: 'Student Union Building, Cinema Room',
    date: new Date('2024-01-19T19:30:00'),
    organizer: 'UQ Film Society',
    category: 'Social',
    attendees: 28,
    maxAttendees: 50,
  },
];

const categories = ['All', 'Academic', 'Social', 'Sports', 'Cultural'];

export function ActivityScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'upcoming' | 'popular'>('upcoming');

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = searchQuery === '' || 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortBy === 'upcoming') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return b.attendees - a.attendees;
    }
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays < 7) return `${diffInDays} days`;
    
    return date.toLocaleDateString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <h1 className="text-[#51247a] dark:text-[#7d4fb3] mb-4">Campus Events</h1>
        
        {/* Search bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-input-background border-0"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 flex-1">
            {categories.slice(0, 4).map((category) => (
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
        </div>

        {/* Sort options */}
        <div className="flex gap-2 mt-2">
          <Button
            variant={sortBy === 'upcoming' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('upcoming')}
            className="rounded-full text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Upcoming
          </Button>
          <Button
            variant={sortBy === 'popular' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('popular')}
            className="rounded-full text-xs"
          >
            <Users className="h-3 w-3 mr-1" />
            Popular
          </Button>
        </div>
      </div>

      {/* Events list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {sortedActivities.map((activity) => (
            <Card key={activity.id} className="rounded-2xl shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{activity.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        by {activity.organizer}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                
                {/* Event details */}
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(activity.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {activity.attendees} attending
                      {activity.maxAttendees && ` / ${activity.maxAttendees} max`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-full flex-1">
                    Join Event
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {sortedActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Add new event button */}
      <div className="p-4 border-t border-border bg-card">
        <Button className="w-full rounded-xl">
          Create New Event
        </Button>
      </div>
    </div>
  );
}
