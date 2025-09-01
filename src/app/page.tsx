import MobileHeader from "@/components/home/mobile-header";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <>
      <Header />
      <MobileHeader />
      <main className="flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-72px)]">
        <h1 className="sm:text-lg md:text-xl lg:text-2xl">Home Page Text</h1>
      </main>
    </>
  );
}
