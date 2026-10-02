# UQ Waves Mobile App MVP Development Plan

## Project Overview

UQ Waves is a campus community mobile application designed specifically for University of Queensland (UQ) students, aiming to connect students, facilitate information sharing, and build a campus community. Based on existing UI designs, we will develop a fully-functional MVP (Minimum Viable Product).

## Technology Stack

### Frontend Technologies
- **React 18.3.1** - Primary UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling framework
- **Radix UI** - Accessible UI component library
- **Lucide React** - Icon library

### Core Dependencies
- **React Hook Form** - Form management
- **Sonner** - Notification system
- **Recharts** - Data visualization
- **Embla Carousel** - Carousel component

## Application Architecture

### Main Component Structure
```
src/
├── components/
│   ├── OnboardingScreen.tsx     # Onboarding page
│   ├── LoginScreen.tsx          # Login page
│   ├── HomeScreen.tsx           # Home (Discussion board)
│   ├── SubjectsScreen.tsx       # Subjects page
│   ├── ProfileScreen.tsx        # User profile
│   ├── LostFoundScreen.tsx      # Lost & Found
│   ├── SecondHandScreen.tsx     # Second-hand marketplace
│   ├── ActivityScreen.tsx       # Campus activities
│   ├── BottomNav.tsx            # Bottom navigation
│   ├── FloatingActionButton.tsx # Floating action button
│   └── PostCreationDialog.tsx   # Post creation dialog
└── ui/                          # UI component library
```

## MVP Core Features

### 1. User Authentication System
- **UQ SSO Login** - Integration with University of Queensland single sign-on system
- **Third-party Login** - Google, Facebook login options
- **Guest Mode** - Allow anonymous browsing of some content
- **User Onboarding** - New user onboarding flow

### 2. Discussion Board Features
- **Category System** - Study, events, second-hand, lost & found categories
- **Interaction Features** - Like, comment, share
- **Search & Filter** - Filter by content, category, time
- **Lost & Found** - Campus lost and found platform
- **Second-hand Market** - Student second-hand item trading
- **Campus Activities** - Activity information posting and participation

### 3. Course-related Features
- **Course Discussions** - Discussion forums organized by course
- **Study Resource Sharing** - Share notes and materials
- **Study Partner Matching** - Find study partners

### 4. Profile Center
- **Profile Management** - Avatar, username, major information
- **My Posts** - View and manage personal posts
- **Settings** - Dark mode, notification settings, etc.

### 5. Post Publishing
- Support text and image posting

## Data Model Design

### User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  faculty: string;
  year: number;
  isVerified: boolean;
  createdAt: Date;
}
```

### Post Model
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  category: 'General' | 'Study' | 'Events' | 'Second-hand' | 'Lost & Found';
  isAnonymous: boolean;
  images?: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Comment Model
```typescript
interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  isAnonymous: boolean;
  createdAt: Date;
}
```

## User Stories

### Core User Stories
1. **As a student, I want to** quickly log in to the app, **so that** I can start using campus community features
2. **As a student, I want to** post study-related questions, **so that** I can get help from classmates
3. **As a student, I want to** anonymously share campus life experiences, **so that** I can protect my privacy
4. **As a student, I want to** find course study partners, **so that** I can improve my study efficiency
5. **As a student, I want to** post lost item information, **so that** I can help recover lost items
6. **As a student, I want to** buy and sell second-hand items, **so that** I can save money
7. **As a student, I want to** learn about campus activities, **so that** I can participate in community life

## Development Phase Planning

### Phase 1: Foundation (2-3 weeks)
- [ ] Project initialization and environment setup
- [ ] UI component library setup
- [ ] Routing and state management
- [ ] Basic page framework
- [ ] User authentication system

### Phase 2: Core Features (3-4 weeks)
- [ ] Discussion board development
- [ ] Post creation and editing
- [ ] User interaction features (like, comment)
- [ ] Search and filter functionality
- [ ] Profile management

### Phase 3: Extended Features (2-3 weeks)
- [ ] Lost & Found functionality
- [ ] Second-hand marketplace functionality
- [ ] Campus activities functionality
- [ ] Course discussion forums
- [ ] Notification system

### Phase 4: Optimization and Testing (2 weeks)
- [ ] Performance optimization
- [ ] User experience optimization
- [ ] Security testing
- [ ] Compatibility testing
- [ ] Deployment preparation

## Technical Implementation Key Points

### 1. Responsive Design
- Mobile-first design philosophy
- Adapt to different screen sizes
- Touch-friendly interaction design

### 2. Performance Optimization
- Image lazy loading
- Virtual scrolling (long lists)
- Code splitting and lazy loading
- Caching strategy

### 3. Security
- JWT token authentication
- Input validation and sanitization
- XSS protection
- CSRF protection

### 4. Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Color contrast optimization
- Semantic HTML

## Deployment and Operations

### Development Environment
- Local development server
- Hot reload support
- Development tools integration

### Production Environment
- Static assets CDN
- Server-side rendering (if needed)
- Monitoring and logging system
- Automated deployment workflow

## Future Expansion Plans

### Short-term Expansion (3-6 months)
- Push notification system
- Real-time chat functionality
- File upload and sharing
- User recommendation system

### Long-term Expansion (6-12 months)
- AI content recommendations
- Multi-language support
- Cross-platform desktop application
- Data analytics dashboard

## Success Metrics

### User Metrics
- Daily Active Users (DAU)
- User retention rate
- Post frequency
- User engagement rate

### Technical Metrics
- Page load time
- Application crash rate
- API response time
- Error rate

## Risks and Challenges

### Technical Risks
- Third-party API dependencies
- Data security and privacy protection
- Performance optimization challenges
- Cross-platform compatibility

### Business Risks
- User adoption rate
- Content moderation and management
- Campus policy compliance
- Competitive pressure

## Conclusion

UQ Waves MVP will provide students with a safe and convenient campus community platform. Through phased development, we can quickly validate core features and continuously improve based on user feedback. The project uses a modern technology stack to ensure a good user experience and maintainability.

---

*This document will be continuously updated based on development progress and user feedback*
