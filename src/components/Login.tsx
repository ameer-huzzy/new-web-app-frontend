import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Bike, AlertCircle } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
}

export function Login({ onLogin }: LoginProps) {
  const [error, setError] = useState("");

  // ✅ Hardcoded credentials
  const hardcodedEmail = "admin@riderapp.com";
  const hardcodedPassword = "admin123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = onLogin(hardcodedEmail, hardcodedPassword);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                  <Bike className="h-10 w-10" />
                </div>
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl">RiderApp</CardTitle>
              <CardDescription className="mt-2">Management System</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* ✅ Removed input fields */}
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <div className="mt-6 p-4 bg-muted rounded-lg space-y-2 text-center">
                <p className="text-xs">Auto login enabled:</p>
                <p className="text-xs">
                  <strong>Email:</strong> {hardcodedEmail}
                </p>
                <p className="text-xs">
                  <strong>Password:</strong> {hardcodedPassword}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
