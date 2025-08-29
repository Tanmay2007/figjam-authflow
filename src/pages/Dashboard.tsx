import React from 'react';
import { AuthButton } from '@/components/ui/auth-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const handleLogout = () => {
    // For now, just redirect back to login
    // When Supabase is connected, this will include actual logout logic
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back!</p>
          </div>
        </div>
        
        <AuthButton 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </AuthButton>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground mb-2">
                🎉 I have logged in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">
                You have successfully authenticated and accessed your dashboard.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Empty Dashboard Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="p-12 text-center">
              <div className="text-4xl text-muted-foreground mb-4">📊</div>
              <p className="text-muted-foreground">Dashboard widgets will go here</p>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 border-muted">
            <CardContent className="p-12 text-center">
              <div className="text-4xl text-muted-foreground mb-4">📈</div>
              <p className="text-muted-foreground">Analytics section</p>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 border-muted">
            <CardContent className="p-12 text-center">
              <div className="text-4xl text-muted-foreground mb-4">⚙️</div>
              <p className="text-muted-foreground">Settings panel</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;