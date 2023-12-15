import Image from "next/image";
import { UserNav } from "./UserNav";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center justify-between">
      <div className="flex items-center gap-x-8">
        Next Kanban
        {/* <Link href="/home" className="w-32">
          <Image src={Logo} alt="Netflix logo" priority />
        </Link> */}
      </div>
      <div className="flex items-center gap-x-8">
        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
