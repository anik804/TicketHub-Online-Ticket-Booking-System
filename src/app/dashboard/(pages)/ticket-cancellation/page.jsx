"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardSection from "../../components/shared/DashboardSection";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function TicketCancellation() {
  const queryClient = useQueryClient();

  // ✅ Fetch all pending cancel requests
  const { data: cancelTickets = [], isLoading } = useQuery({
    queryKey: ["cancelTickets"],
    queryFn: async () => {
      const res = await fetch("/api/payment/cancel");
      if (!res.ok) throw new Error("Failed to load cancel tickets");
      return res.json();
    },
  });

  // ✅ Approve or Reject mutation
  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const res = await fetch("/api/payment/cancel", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["cancelTickets"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });


  return (
    <DashboardSection role="organizer" title={"Ticket Cancellation"}>
      <Toaster position="top-right" />

      {isLoading ? (
        <p className="text-gray-400 text-center mt-5">Loading requests...</p>
      ) : cancelTickets.data.length === 0 ? (
        <p className="text-gray-400 text-center mt-5">No pending cancellation requests 🎫</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-x-auto mt-6"
        >
          <table className="table w-full text-white bg-gray-700 shadow">
            <thead>
              <tr className="bg-primary">
                <th>Tran ID</th>
                <th>Customer Email</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cancelTickets.data.map((t) => (
                <tr key={t._id}>
                  <td className="text-orange-400 font-semibold">{t.tranId}</td>
                  <td>{t.customerEmail}</td>
                  <td className="capitalize">{t.status}</td>
                  <td className="flex gap-3 justify-center">
                    <button
                      onClick={() => mutation.mutate({ id: t._id, action: "approve" })}
                      className="btn btn-sm shadow-none bg-green-500 hover:bg-green-400 text-black font-semibold"
                      disabled={mutation.isPending}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => mutation.mutate({ id: t._id, action: "reject" })}
                      className="btn btn-sm shadow-none bg-red-500 hover:bg-red-400 text-white font-semibold"
                      disabled={mutation.isPending}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </DashboardSection>
  );
}
