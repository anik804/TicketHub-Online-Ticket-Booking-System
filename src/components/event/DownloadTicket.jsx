"use client";

import Button from "@/ui/Button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function DownloadTicket({ ticket }) {
  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Title
    doc.setFontSize(22);
    doc.text("E-Ticket", 200, 40);

    // Ticket ID
    doc.setFontSize(12);
    doc.text(`Ticket ID: ${ticket.id}`, 40, 70);

    // Event Info Table
    autoTable(doc, {
      startY: 100,
      theme: "grid",
      head: [["Event Details", ""]],
      body: [
        ["Title", ticket.event.title],
        ["Date & Time", new Date(ticket.event.eventAt).toLocaleString()],
        ["Venue", ticket.event.venue],
        ["Seat", ticket.seat || "Not Assigned"],
      ],
    });

    // Holder Info Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [["Ticket Holder", ""]],
      body: [
        ["Name", ticket.holder.name],
        ["Email", ticket.holder.email],
        ["Phone", ticket.holder.phone],
      ],
    });

    // Payment Info Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [["Payment Info", ""]],
      body: [
        ["Amount", `${ticket.payment.price} ${ticket.payment.currency}`],
        ["Status", ticket.payment.status],
        ["Transaction ID", ticket.payment.transactionId || "N/A"],
        [
          "Purchase Date",
          ticket.payment.purchaseDate
            ? new Date(ticket.payment.purchaseDate).toLocaleString()
            : "N/A",
        ],
      ],
    });

    // Save PDF
    doc.save(`${ticket.id}.pdf`);
  };

  return (
    <Button
      className="w-40 md:w-48 lg:w-56"
      label="Download Ticket"
      onClick={handleDownload}
    />
  );
}
