"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  Input,
  Button,
  Description,
  Label,
  Radio,
  RadioGroup,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignupPage() {
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
    const { name, email, password, photoURL, role } = userData;
    const { data, error } = await authClient.signUp.email({
      name, // required
      email, // required
      password, // required
      role,
      image: photoURL || "https://example.com/image.png",
      callbackURL: "/",
    });
    if (error) {
      alert(`error: ${error.message}`);
    }
    if (data) {
      alert("Account created successfully!");
      redirect("/");
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border border-white/10 bg-zinc-950">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="mt-2 text-gray-400">Join HireLoop today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* name */}
            <Input
              name="name"
              className="text-white placeholder:text-gray-500 w-full"
              label="Full Name"
              placeholder="Full Name"
              variant="bordered"
              required
            />
            {/* email */}
            <Input
              className="text-white placeholder:text-gray-500 w-full"
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              variant="bordered"
              required
            />
            {/* password */}
            <Input
              className="text-white placeholder:text-gray-500 w-full"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter password"
              variant="bordered"
              required
            />
            {/* Photo URL */}
            <Input
              className="text-white placeholder:text-gray-500 w-full"
              name="photoURL"
              type="url"
              label="Photo URL"
              placeholder="Photo URL"
              variant="bordered"
            />
            {/* Role */}
            <RadioGroup defaultValue="seeker" name="role">
              <Label>Role</Label>
              <Description>Choose the role that suits you best</Description>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                  <Description>Includes 100 messages per month</Description>
                </Radio.Content>
              </Radio>
              <Radio selected value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                  <Description>Includes 200 messages per month</Description>
                </Radio.Content>
              </Radio>
             
            </RadioGroup>

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
              Sign Up
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </section>
  );
}
