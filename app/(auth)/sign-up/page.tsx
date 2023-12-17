import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { authOptions } from "@/app/utils/auth";

import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <AuthForm />
      <div className="text-gray-500 text-sm mt-2">
        Alredy Have a account?{" "}
        <Link className="text-blue-500 hover:underline" href="/login">
          Log in
        </Link>
      </div>
    </>
  );
};

export default SignUp;
