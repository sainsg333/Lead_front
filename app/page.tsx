"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [secret,setSecret] = useState("");
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://lead-management-79hs.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otp, secret: secret }),
      });
      if (!res.ok) throw new Error("Invalid OTP");
      localStorage.setItem("isLoggedIn", "true");
      router.push("/home");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/home");
    }
  }, [router]);

  const handleSubmit1 = async (e: React.FormEvent) => {

    e.preventDefault();
    try {
      const res = await fetch("https://lead-management-79hs.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json","Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setSecret(data.secret);
      if (!res.ok) throw new Error("Login failed");
    } catch (err) {
      setError1("Invalid email or password");
    }
    setIsButtonActive(true); 
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit1} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error1 && <p className="text-red-500">{error1}</p>}
            <Button type="submit">Login</Button>
          </form>
          <div className="mt-4"><Link href='/auth/register' className="mt-4">Register by Clicking Here</Link></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>Enter the OTP from your authenticator app.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>OTP</Label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button 
            disabled={!isButtonActive}
            className={isButtonActive ? "bg-blue-500" : "bg-gray-300"}
            type="submit">Verify OTP</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
