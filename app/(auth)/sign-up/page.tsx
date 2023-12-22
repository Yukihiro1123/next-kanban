import { authOptions } from "@/app/utils/auth";

import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { AuthForm } from "../_components/AuthForm";

const SignUp = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          アカウント作成
        </h1>
      </div>
      <AuthForm />
      <div className="text-gray-500 text-sm mt-2">
        アカウントをお持ちですか?{" "}
        <Link className="text-blue-500 hover:underline" href="/login">
          ログイン
        </Link>
      </div>
    </>
  );
};

export default SignUp;
