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
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">{session?.user?.name}</h4>
          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
