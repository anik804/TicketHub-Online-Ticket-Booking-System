import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <main className="flex min-h-dvh w-full justify-center items-center">
      <Image
        src="/images/loading.svg"
        width={500}
        height={500}
        alt="Loading..."
        className="size-18 md:size-22 lg:size-28"
      />
    </main>
  );
}
