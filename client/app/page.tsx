import Navbar from "./client_dashboard/components/Navbar";
import Home from "./client_dashboard/Home/Home";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Home />
      </main>
    </div>
  );
};

export default Page;
