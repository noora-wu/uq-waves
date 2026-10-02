import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User, Post, Activity, LostFoundItem, SecondHandItem, TabType } from '@/types';
import { mockPosts, mockActivities, mockLostFoundItems, mockSecondHandItems } from '@/data/mockData';

interface AppStore extends AppState {
  // Actions
  setCurrentUser: (user: User | null) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setShowOnboarding: (show: boolean) => void;
  setActiveTab: (tab: TabType) => void;
  toggleDarkMode: () => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  addActivity: (activity: Activity) => void;
  addLostFoundItem: (item: LostFoundItem) => void;
  addSecondHandItem: (item: SecondHandItem) => void;
  likePost: (postId: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      currentUser: null,
      isLoggedIn: false,
      showOnboarding: true,
      activeTab: 'home',
      isDarkMode: false,
      posts: mockPosts,
      activities: mockActivities,
      lostFoundItems: mockLostFoundItems,
      secondHandItems: mockSecondHandItems,

      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),
      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setShowOnboarding: (show) => set({ showOnboarding: show }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      updatePost: (id, updates) => set((state) => ({
        posts: state.posts.map(post => post.id === id ? { ...post, ...updates } : post)
      })),
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter(post => post.id !== id)
      })),
      
      addActivity: (activity) => set((state) => ({ activities: [activity, ...state.activities] })),
      addLostFoundItem: (item) => set((state) => ({ lostFoundItems: [item, ...state.lostFoundItems] })),
      addSecondHandItem: (item) => set((state) => ({ secondHandItems: [item, ...state.secondHandItems] })),
      
      likePost: (postId) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      })),
    }),
    {
      name: 'uq-waves-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
        showOnboarding: state.showOnboarding,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
