"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { LogoGithub, LogoGooglePlay } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast, Zoom } from "react-toastify";

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signUpData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      

    })
    if (!error) {
       toast.success('অ্যাকাউন্ট খোলা সফল হয়েছে। স্বাগতম!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
      redirect('/')
    }
    else {
      setErrorMessage(error.message as string)
    }
  };

  const handleGoogleSignIn = async () => {
    const googleSignInData = await signIn.social({
      provider: 'google'
    })
  }

  const handleGithubSignIn = async () => {
    const githubSingInData = await signIn.social({
      provider: 'github'
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 py-10 sm:px-6 lg:py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm leading-6 text-gray-600 sm:text-base">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>
      <Form className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-[#e1e9e2] bg-white px-5 py-6 shadow-lg shadow-green-950/5 sm:px-8 sm:py-8" onSubmit={onSubmit}>
        <p
          role="alert"
          className={errorMessage ? "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" : "hidden"}
        >
          {errorMessage}
        </p>
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label className="text-base font-semibold text-gray-800">নাম</Label>
          <Input placeholder="...." />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="text-base font-semibold text-gray-800">ইমেইল</Label>
          <Input placeholder="....com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className="text-base font-semibold text-gray-800">পাসওয়ার্ড</Label>
          <Input placeholder="●●●●●" />
          <Description>অবশ্যই অন্তত ৮টি অক্ষরের হতে হবে, যার মধ্যে একটি বড় হাতের অক্ষর ও একটি সংখ্যা থাকতে হবে।</Description>
          <FieldError />
        </TextField>
        <div className="flex w-full justify-center pt-1">
          <Button className="btn w-full rounded-xl bg-[#008a45] py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#00763b]" type="submit">

            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </div>
        <div className="flex items-center gap-3 py-1 text-gray-500">
          <span className="h-px flex-1 bg-gray-300" />
          <span>অথবা</span>
          <span className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={handleGoogleSignIn} className="btn w-full flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"> <LogoGooglePlay /> Google দিয়ে এগিয়ে যান</Button>
          <Button onClick={handleGithubSignIn} className="btn w-full flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"><LogoGithub />Github দিয়ে এগিয়ে যান</Button>
        </div>
        <p className="text-center text-sm text-gray-600">অ্যাকাউন্ট আছে? <Link className="font-semibold text-[#008a45] underline underline-offset-2" href='/sign-in'>সাইন ইন করুন</Link></p>
      </Form>
    </div>
  );
};

export default SignUpPage;