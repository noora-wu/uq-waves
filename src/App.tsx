import { useState, useEffect } from 'react';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { SubjectsScreen } from '@/screens/SubjectsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { BottomNav } from '@/components/layout/BottomNav';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { PostCreationDialog } from '@/components/posts/PostCreationDialog';
import { useAppStore } from '@/store/useAppStore';

export default function App() {
  const {
    showOnboarding,
    setShowOnboarding,
    isLoggedIn,
    setLoggedIn,
    activeTab,
    setActiveTab,
    isDarkMode,
    toggleDarkMode,
  } = useAppStore();

  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };


  // Show onboarding first
  if (showOnboarding) {
    return (
      <div className="h-screen w-screen">
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen">
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }


  // Main app interface
  return (
    <div className="h-screen w-screen flex flex-col bg-background max-w-md mx-auto">
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'subjects' && <SubjectsScreen />}
        {activeTab === 'profile' && (
          <ProfileScreen
            onToggleDarkMode={handleToggleDarkMode}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Floating Action Button (only on home tab) */}
      {activeTab === 'home' && (
        <FloatingActionButton onClick={() => setIsPostDialogOpen(true)} />
      )}

      {/* Post Creation Dialog */}
      <PostCreationDialog
        open={isPostDialogOpen}
        onOpenChange={setIsPostDialogOpen}
      />
    </div>
  );
}
