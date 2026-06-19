"use client";

import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import Link from "next/link";

export default function Failed() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Ban className="size-16 text-red-400" />
      <h1 className="font-bold text-2xl">Payment Failed</h1>
      <Link href="/order">
        <Button className="cursor-pointer bg-green-400 hover:bg-green-600">
          Back to Order
        </Button>
      </Link>
    </div>
  );
}
