import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { SignOutButton } from "./SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const UserNav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session?.user?.image ?? "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>{session?.user?.name ?? "User"}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>{session?.user?.name}</CardTitle>
            <CardDescription>{session?.user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <SignOutButton />
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
