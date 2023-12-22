import { GithubSignInButton } from "./GithubSignInButton";
import { GoogleSignInButton } from "./GoogleSignInButton";

export const AuthForm = () => {
  return (
    <>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            もしくは
          </span>
        </div>
      </div> */}
      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        <GithubSignInButton />
        <GoogleSignInButton />
      </div>
    </>
  );
};
