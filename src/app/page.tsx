import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-muted h-screen flex justify-center items-center flex-col space-y-4">
      <h1 className="text-4xl font-semibold">Welcome Adhitya Ramadhan Putra</h1>
      <Link href="/admin">
        <Button className="bg-teal-500 text-white p-2 rounded">
          Access to Dashboard
        </Button>
      </Link>
    </div>
  );
}
