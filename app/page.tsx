import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomeContent } from "./home-client";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HomeContent />
      <Footer />
    </main>
  );
}
