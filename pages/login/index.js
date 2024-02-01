import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      throw new Error(result.error);
    }

    // Redirect to home page upon successful sign-in
    router.push("/");
  } catch (error) {
    console.error("Sign in failed:", error.message);
    setError("Invalid email or password. Please try again.");
  }
};

  return (
    <div className="min-w-screen min-h-screen py-8 flex flex-col items-center justify-start gap-y-8 px-5">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <div className="mr-4">
            <Image
              src={"/images/logo1.png"}
              width={75}
              height={75}
              alt="School Logo"
            />
          </div>
          <h1 className="text-3xl md:text-5xl text-green-800 font-bold py-2">
            PIA Model Higher Secondary School
          </h1>
        </div>

        <h5 className="text-lg md:text-3xl text-green-800 font-bold">
          Fees Voucher System
        </h5>
      </div>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full  overflow-hidden"
          style={{ maxWidth: 1000 }}
        >
          <div className="md:flex w-full">
            <div className="flex md:flex-col sm:flex-row md:w-1/2 bg-gray-200 py-10 px-10 justify-center items-center">
              <Image
                className="mx-auto"
                src={"/images/login.svg"}
                width={200}
                height={160}
                priority
                alt="Picture of the author"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Login</h1>
                <p>Enter your credentials to login</p>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold px-1"
                    >
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <MdOutlineEmail className="text-gray-400 text-lg" />
                      </div>
                      <input
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-700"
                        placeholder="school@example.com"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold px-1"
                    >
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <MdLockOutline className="text-gray-400 text-lg" />
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-700"
                        placeholder="************"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      onClick={submitHandler}
                      type="submit"
                      className="block w-full max-w-xs mx-auto bg-green-700 hover:bg-green-900 focus:bg-green-900 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Sign In
                    </button>
                    {error && (
                      <p className="text-red-500 text-sm font-medium text-center mt-2 tracking-wide">
                        {error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
