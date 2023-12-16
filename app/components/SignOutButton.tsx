"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <DropdownMenuItem onClick={() => signOut()}>ログアウト</DropdownMenuItem>
  );
};
