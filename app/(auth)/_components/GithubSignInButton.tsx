"use client";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

export const GithubSignInButton = () => {
  return (
    <Button onClick={() => signIn("github")} variant="outline" size="default">
      <GithubIcon />
      Githubでログイン
    </Button>
  );
};
