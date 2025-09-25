"use client";

import Button from "@/ui/Button";
import { useRouter } from "next/router";

export default function BuyTicket() {
  const router = useRouter();
  return (
    <Button
      className="w-20 md:w-26 lg:w-32"
      label="Buy Ticket"
      onClick={() => router.push("/ticket-details")}
    />
  );
}
