"use client";

import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <div
      className="-mx-2 flex items-start space-x-4 rounded-md p-4 transition-all hover:bg-accent hover:text-accent-foreground"
      onClick={() => signOut()}
    >
      Sign out
    </div>
  );
};
