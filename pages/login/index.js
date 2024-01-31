import Link from "next/link";
import React, { useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // Redirect to home page upon successful sign-in
      router.push("/");
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-4">
        <form
          className="bg-white p-6 rounded shadow-xl"
          onSubmit={submitHandler}
        >
          <h1 className="mb-4 text-2xl font-semibold">Login</h1>

          <div className="mb-4">
            <label htmlFor="email_field" className="block text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email_field"
              className="form-input mt-1 block w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password_field" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-input mt-1 block w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Sign in
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default Login;
