import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "../_components/AuthForm";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">ログイン</h1>
        {/* <p className="text-sm text-muted-foreground">
          メールアドレスでログイン
        </p> */}
      </div>
      <AuthForm />
      <div className="text-gray-500 text-sm mt-2">
        アカウントをお持ちではありませんか?{" "}
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          会員登録
        </Link>
      </div>
    </>
  );
};

export default Login;
