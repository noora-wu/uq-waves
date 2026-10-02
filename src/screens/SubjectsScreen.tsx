import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Users, MessageSquare, Star, User, GraduationCap, Calendar, MapPin, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingDialog } from '@/components/subjects/RatingDialog';

interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  semester: string;
  posts: number;
  members: number;
  color: string;
  rating: number;
  reviewCount: number;
}

interface Teacher {
  id: string;
  name: string;
  department: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  avatar?: string;
  description: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  category: 'Academic' | 'Social' | 'Sports' | 'Cultural' | 'Career';
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  rating: number;
  reviewCount: number;
  color: string;
}

const mockSubjects: Subject[] = [
  {
    id: '1',
    code: 'COMP3506',
    name: 'Algorithms & Data Structures',
    description: 'Advanced algorithms and data structures for computer science',
    semester: 'Semester 2, 2024',
    posts: 24,
    members: 156,
    color: '#3b82f6',
    rating: 4.2,
    reviewCount: 45
  },
  {
    id: '2',
    code: 'MATH2001',
    name: 'Advanced Calculus',
    description: 'Multivariable calculus and vector analysis',
    semester: 'Semester 2, 2024',
    posts: 18,
    members: 89,
    color: '#10b981',
    rating: 3.8,
    reviewCount: 32
  },
  {
    id: '3',
    code: 'BIOL3001',
    name: 'Cell Biology',
    description: 'Molecular and cellular biology fundamentals',
    semester: 'Semester 2, 2024',
    posts: 32,
    members: 124,
    color: '#f59e0b',
    rating: 4.5,
    reviewCount: 28
  },
  {
    id: '4',
    code: 'PSYC1001',
    name: 'Introduction to Psychology',
    description: 'Foundational concepts in psychology',
    semester: 'Semester 2, 2024',
    posts: 45,
    members: 234,
    color: '#8b5cf6',
    rating: 4.0,
    reviewCount: 67
  },
  {
    id: '5',
    code: 'ECON2000',
    name: 'Microeconomics',
    description: 'Principles of microeconomic analysis',
    semester: 'Semester 2, 2024',
    posts: 21,
    members: 167,
    color: '#ef4444',
    rating: 3.6,
    reviewCount: 41
  }
];

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    subjects: ['COMP3506', 'COMP3505', 'COMP4501'],
    rating: 4.3,
    reviewCount: 52,
    description: 'Expert in algorithms and machine learning. Very helpful and clear explanations.'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    department: 'Mathematics',
    subjects: ['MATH2001', 'MATH3001', 'MATH4001'],
    rating: 4.1,
    reviewCount: 38,
    description: 'Great lecturer with excellent problem-solving approaches. Assignments are challenging but fair.'
  },
  {
    id: '3',
    name: 'Dr. Emma Wilson',
    department: 'Biology',
    subjects: ['BIOL3001', 'BIOL2001', 'BIOL4001'],
    rating: 4.6,
    reviewCount: 29,
    description: 'Passionate about teaching. Very supportive and provides great feedback.'
  },
  {
    id: '4',
    name: 'Dr. James Rodriguez',
    department: 'Psychology',
    subjects: ['PSYC1001', 'PSYC2001', 'PSYC3001'],
    rating: 3.9,
    reviewCount: 73,
    description: 'Interesting lectures and engaging discussions. Fair grading system.'
  },
  {
    id: '5',
    name: 'Prof. Lisa Anderson',
    department: 'Economics',
    subjects: ['ECON2000', 'ECON3000', 'ECON4000'],
    rating: 4.0,
    reviewCount: 44,
    description: 'Clear explanations of complex economic concepts. Helpful office hours.'
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Hackathon 2024',
    description: 'Annual UQ Hackathon - Build innovative solutions in 24 hours',
    category: 'Academic',
    date: 'Nov 15, 2024',
    time: '9:00 AM - 9:00 AM (Next Day)',
    location: 'Advanced Engineering Building',
    organizer: 'UQ Computing Society',
    attendees: 87,
    maxAttendees: 120,
    rating: 4.5,
    reviewCount: 23,
    color: '#3b82f6'
  },
  {
    id: '2',
    title: 'Career Fair 2024',
    description: 'Meet top employers and explore career opportunities',
    category: 'Career',
    date: 'Nov 20, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Great Court',
    organizer: 'UQ Careers Centre',
    attendees: 234,
    maxAttendees: 500,
    rating: 4.2,
    reviewCount: 67,
    color: '#10b981'
  },
  {
    id: '3',
    title: 'International Food Festival',
    description: 'Celebrate diversity with food from around the world',
    category: 'Cultural',
    date: 'Nov 18, 2024',
    time: '11:00 AM - 3:00 PM',
    location: 'Union Complex',
    organizer: 'International Students Association',
    attendees: 156,
    maxAttendees: 300,
    rating: 4.7,
    reviewCount: 42,
    color: '#f59e0b'
  },
  {
    id: '4',
    title: 'Research Symposium',
    description: 'Showcase of undergraduate research projects',
    category: 'Academic',
    date: 'Nov 22, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Biological Sciences Library',
    organizer: 'Faculty of Science',
    attendees: 45,
    maxAttendees: 80,
    rating: 4.0,
    reviewCount: 18,
    color: '#8b5cf6'
  },
  {
    id: '5',
    title: 'Sports Carnival',
    description: 'Compete in various sports and win prizes',
    category: 'Sports',
    date: 'Nov 25, 2024',
    time: '8:00 AM - 5:00 PM',
    location: 'UQ Sports Centre',
    organizer: 'UQ Sport',
    attendees: 198,
    maxAttendees: 250,
    rating: 4.4,
    reviewCount: 56,
    color: '#ef4444'
  },
  {
    id: '6',
    title: 'Networking Night',
    description: 'Connect with alumni and industry professionals',
    category: 'Social',
    date: 'Nov 28, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Customs House',
    organizer: 'UQ Alumni Network',
    attendees: 67,
    maxAttendees: 100,
    rating: 3.9,
    reviewCount: 31,
    color: '#ec4899'
  }
];

const facultyCategories = ['All', 'Engineering', 'Business', 'Science', 'Arts', 'Medicine'];
const eventCategories = ['All', 'Academic', 'Social', 'Sports', 'Cultural', 'Career'];

export function SubjectsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'subjects' | 'teachers' | 'events'>('subjects');
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [selectedEventCategory, setSelectedEventCategory] = useState('All');
  
  // Rating dialog state
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [ratingItem, setRatingItem] = useState<{
    id: string;
    title: string;
    type: 'subject' | 'teacher' | 'event';
  } | null>(null);

  const filteredSubjects = mockSubjects.filter(subject => {
    const matchesSearch = searchQuery === '' || 
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFaculty = selectedFaculty === 'All' || 
      (selectedFaculty === 'Engineering' && (subject.code.startsWith('COMP') || subject.code.startsWith('ENGG'))) ||
      (selectedFaculty === 'Business' && subject.code.startsWith('ECON')) ||
      (selectedFaculty === 'Science' && (subject.code.startsWith('MATH') || subject.code.startsWith('PHYS'))) ||
      (selectedFaculty === 'Arts' && subject.code.startsWith('ARTS')) ||
      (selectedFaculty === 'Medicine' && subject.code.startsWith('MED'));
    return matchesSearch && matchesFaculty;
  });

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = searchQuery === '' || 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedEventCategory === 'All' || event.category === selectedEventCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle opening rating dialog
  const handleOpenRating = (id: string, title: string, type: 'subject' | 'teacher' | 'event') => {
    setRatingItem({ id, title, type });
    setRatingDialogOpen(true);
  };

  // Handle rating submission
  const handleRatingSubmit = (rating: number, comment?: string) => {
    console.log('Rating submitted:', {
      item: ratingItem,
      rating,
      comment
    });
    // Here you would typically send this to your backend API
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-transparent to-blue-100/30 dark:from-purple-800/10 dark:via-transparent dark:to-blue-800/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Academic Hub
              </h1>
              <p className="text-xs text-muted-foreground">Explore subjects and connect with teachers</p>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={
              selectedCategory === 'subjects' ? "Search subjects..." : 
              selectedCategory === 'teachers' ? "Search teachers..." : 
              "Search events..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-input-background border-0"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center justify-between relative z-20">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant={selectedCategory === 'subjects' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                console.log('Subjects button clicked');
                setSelectedCategory('subjects');
              }}
              className="rounded-full whitespace-nowrap"
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Subjects
            </Button>
            <Button
              variant={selectedCategory === 'teachers' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                console.log('Teachers button clicked');
                setSelectedCategory('teachers');
              }}
              className="rounded-full whitespace-nowrap"
            >
              <GraduationCap className="h-3 w-3 mr-1" />
              Teachers
            </Button>
            <Button
              variant={selectedCategory === 'events' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                console.log('Events button clicked');
                setSelectedCategory('events');
              }}
              className="rounded-full whitespace-nowrap"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Events
            </Button>
          </div>
        </div>
      </div>

      {/* Faculty filter (only for subjects) */}
      {selectedCategory === 'subjects' && (
        <div className="border-b border-border">
          <div className="flex gap-2 p-4 pb-2 overflow-x-auto scrollbar-hide">
            {facultyCategories.map((faculty) => (
              <Badge
                key={faculty}
                variant={selectedFaculty === faculty ? 'default' : 'outline'}
                className={`cursor-pointer px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  selectedFaculty === faculty 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-105'
                }`}
                onClick={() => setSelectedFaculty(faculty)}
              >
                {faculty}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Event category filter (only for events) */}
      {selectedCategory === 'events' && (
        <div className="border-b border-border">
          <div className="flex gap-2 p-4 pb-2 overflow-x-auto scrollbar-hide">
            {eventCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedEventCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  selectedEventCategory === category 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-105'
                }`}
                onClick={() => setSelectedEventCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Content list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {selectedCategory === 'subjects' ? (
            // Subjects list
            <>
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="rounded-2xl shadow-sm border-border hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: subject.color }}
                        >
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{subject.code}</h3>
                          <p className="text-sm text-muted-foreground">{subject.name}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {subject.code.startsWith('COMP') || subject.code.startsWith('ENGG') ? 'Engineering' :
                         subject.code.startsWith('ECON') ? 'Business' :
                         subject.code.startsWith('MATH') || subject.code.startsWith('PHYS') ? 'Science' :
                         subject.code.startsWith('ARTS') ? 'Arts' :
                         subject.code.startsWith('MED') ? 'Medicine' : 'General'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground mb-3">{subject.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{subject.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({subject.reviewCount} reviews)</span>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{subject.posts} posts</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{subject.members} members</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full"
                          onClick={() => handleOpenRating(subject.id, `${subject.code} - ${subject.name}`, 'subject')}
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Rate
                        </Button>
                        <Button size="sm" className="rounded-full">
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredSubjects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No subjects found matching your search.</p>
                </div>
              )}
            </>
          ) : selectedCategory === 'teachers' ? (
            // Teachers list
            <>
              {filteredTeachers.map((teacher) => (
                <Card key={teacher.id} className="rounded-2xl shadow-sm border-border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{teacher.name}</h3>
                          <p className="text-sm text-muted-foreground">{teacher.department}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {teacher.subjects.length} subjects
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground mb-3">{teacher.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{teacher.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({teacher.reviewCount} reviews)</span>
                    </div>
                    
                    {/* Subjects taught */}
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Subjects taught:</p>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{teacher.reviewCount} reviews</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full"
                          onClick={() => handleOpenRating(teacher.id, teacher.name, 'teacher')}
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Rate Professor
                        </Button>
                        <Button size="sm" className="rounded-full">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredTeachers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No teachers found matching your search.</p>
                </div>
              )}
            </>
          ) : (
            // Events list
            <>
              {filteredEvents.map((event) => (
                <Card key={event.id} className="rounded-2xl shadow-sm border-border hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: event.color }}
                        >
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-xs text-muted-foreground">{event.organizer}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    
                    {/* Event details */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({event.reviewCount} reviews)</span>
                    </div>
                    
                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees}/{event.maxAttendees} attending</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full"
                          onClick={() => handleOpenRating(event.id, event.title, 'event')}
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Rate Event
                        </Button>
                        <Button size="sm" className="rounded-full">
                          Register
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No events found matching your search.</p>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Rating Dialog */}
      {ratingItem && (
        <RatingDialog
          open={ratingDialogOpen}
          onOpenChange={setRatingDialogOpen}
          title={ratingItem.title}
          type={ratingItem.type}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
}
