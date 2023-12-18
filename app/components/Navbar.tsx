// import Image from "next/image";
import { UserNav } from "./UserNav";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b-2 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-x-8">
        <Link href="/dashboard" className="w-32">
          Next Kanban
        </Link>
      </div>
      <div className="flex items-center gap-x-8">
        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
