export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  faculty: string;
  year: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: User;
  category: 'General' | 'Study' | 'Events' | 'Second-hand' | 'Lost & Found';
  isAnonymous: boolean;
  images?: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: User;
  content: string;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface Activity {
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

export interface LostFoundItem {
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

export interface SecondHandItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  images?: string[];
  sellerId: string;
  seller?: User;
  isAvailable: boolean;
  createdAt: Date;
}

export type TabType = 'home' | 'subjects' | 'profile';

export interface AppState {
  currentUser: User | null;
  isLoggedIn: boolean;
  showOnboarding: boolean;
  activeTab: TabType;
  isDarkMode: boolean;
  posts: Post[];
  activities: Activity[];
  lostFoundItems: LostFoundItem[];
  secondHandItems: SecondHandItem[];
}
