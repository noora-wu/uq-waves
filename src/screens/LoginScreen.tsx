import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-[#51247a] via-[#6d3599] to-[#8946b8] relative overflow-hidden">
      {/* Abstract wave patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q100,50 200,100 T400,100 L400,0 L0,0 Z" fill="white" opacity="0.3" />
          <path d="M0,250 Q100,200 200,250 T400,250 L400,150 L0,150 Z" fill="white" opacity="0.2" />
          <path d="M0,400 Q100,350 200,400 T400,400 L400,300 L0,300 Z" fill="white" opacity="0.1" />
          <path d="M0,550 Q100,500 200,550 T400,550 L400,450 L0,450 Z" fill="white" opacity="0.05" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        {/* Logo area */}
        <div className="mb-12 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-4 inline-block">
            <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
              <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-white text-4xl mb-2">UQ Waves</h1>
          <p className="text-white/80">Your Campus Community</p>
        </div>

        {/* Login options */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={onLogin}
            className="w-full bg-white text-[#51247a] hover:bg-white/90 h-12 rounded-xl"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            Login with UQ Account (SSO)
          </Button>

          <div className="relative">
            <Separator className="bg-white/30" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#51247a] px-3 text-white/80 text-sm">
              or
            </span>
          </div>

          <Button
            onClick={onLogin}
            variant="outline"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 rounded-xl"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <Button
            onClick={onLogin}
            variant="outline"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 rounded-xl"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </Button>

          <Button
            onClick={onLogin}
            variant="ghost"
            className="w-full text-white hover:bg-white/10"
          >
            Continue as Guest
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center relative z-10">
        <p className="text-white/60 text-sm">
          By continuing, you agree to UQ Waves Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
