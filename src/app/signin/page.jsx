"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Input, Button } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries());
    const {  email, password } = userData;
    const { data, error } = await authClient.signIn.email({
    email, // required
    password, // required
    rememberMe: true,
    callbackURL: "/",
});
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border border-white/10 bg-zinc-950">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-gray-400">
              Sign in to your HireLoop account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              className="text-white placeholder:text-gray-500 w-full"
              name="email"
              type="email"
              label="Email"
              placeholder="john@example.com"
              variant="bordered"
              required
            />

            <Input
              className="text-white placeholder:text-gray-500 w-full"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter password"
              variant="bordered"
              required
            />

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                {success}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </section>
  );
}
