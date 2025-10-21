import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <p>HomePage</p>
        <Link href="/admin" className="px-4 py-2 rounded-lg bg-slate-700">
          Admin
        </Link>
      </main>
    </>
  );
}
