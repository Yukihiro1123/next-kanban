import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { SignOutButton } from "../components/SignOutButton";
("");

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <SignOutButton />
    </div>
  );
};

export default Dashboard;
