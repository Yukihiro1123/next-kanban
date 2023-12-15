import { AuthForm } from "@/app/components/AuthForm";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to log in
        </p>
      </div>
      <AuthForm />
      <div className="text-gray-500 text-sm mt-2">
        Not have an account?{" "}
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Login;
