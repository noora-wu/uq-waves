import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Bell, Shield, HelpCircle, LogOut, Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface ProfileScreenProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function ProfileScreen({ onToggleDarkMode, isDarkMode }: ProfileScreenProps) {
  const { currentUser, setLoggedIn, setCurrentUser } = useAppStore();

  const user = currentUser || {
    id: '1',
    username: 'John Doe',
    email: 'john.doe@uq.edu.au',
    faculty: 'Engineering, Architecture & Information Technology',
    year: 3,
    isVerified: true,
    createdAt: new Date('2022-01-01'),
  };

  const handleSignOut = () => {
    // Clear user data and return to login screen
    setCurrentUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-transparent to-blue-100/30 dark:from-purple-800/10 dark:via-transparent dark:to-blue-800/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Profile
              </h1>
              <p className="text-xs text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="flex-1 overflow-y-auto">
        {/* User info card */}
        <Card className="m-4 rounded-2xl shadow-sm border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {user.username.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold">{user.username}</h2>
                  {user.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.faculty}</p>
                <p className="text-sm text-muted-foreground">Year {user.year}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full rounded-xl">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="px-4 mb-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="rounded-xl shadow-sm border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-sm border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-sm border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">89</div>
                <div className="text-xs text-muted-foreground">Comments</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Settings */}
        <Card className="m-4 rounded-2xl shadow-sm border-border">
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dark mode toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={onToggleDarkMode}
              />
            </div>

            <Separator />

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Manage notification preferences</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Privacy */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Privacy</p>
                  <p className="text-sm text-muted-foreground">Control your privacy settings</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Other options */}
        <Card className="m-4 rounded-2xl shadow-sm border-border">
          <CardContent className="p-0">
            <div className="space-y-0">
              <Button variant="ghost" className="w-full justify-start rounded-none p-4">
                <User className="h-5 w-5 mr-3" />
                Account Settings
              </Button>
              <Separator />
              <Button variant="ghost" className="w-full justify-start rounded-none p-4">
                <HelpCircle className="h-5 w-5 mr-3" />
                Help & Support
              </Button>
              <Separator />
              <Button 
                variant="ghost" 
                className="w-full justify-start rounded-none p-4 text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
