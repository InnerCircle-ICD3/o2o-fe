"use client";

import Counter from "@/components/sample/Counter";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <Counter />

      <Button>임시 버튼</Button>
    </div>
  );
}
