import React, { useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <AuthForm mode={authMode} onModeChange={setAuthMode} />
      </div>
    </div>
  );
};

export default Index;
