import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  } else {
    return redirect("/dashboard");
  }
};

export default Home;
