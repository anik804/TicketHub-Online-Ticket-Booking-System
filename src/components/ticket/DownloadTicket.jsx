"use client";

import Button from "@/ui/Button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function DownloadTicket({ ticket }) {
  const qrRef = useRef();

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Title
    doc.setFontSize(22);
    doc.text("E-Ticket", 200, 40);

    // Ticket ID
    doc.setFontSize(12);
    doc.text(`Ticket ID: ${ticket.id}`, 40, 70);

    // QR Code
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const qrDataUrl = canvas.toDataURL("image/png");
        doc.addImage(qrDataUrl, "PNG", 40, 100, 100, 100);
      }
    }

    // Event Info Table
    autoTable(doc, {
      startY: 220,
      theme: "grid",
      head: [["Event Details", ""]],
      body: [
        ["Title", ticket.title || "N/A"],
        ["Date & Time", ticket.date || "N/A"],
        ["Venue", ticket.location || "N/A"],
        ["Seat", ticket.seat || "Not Assigned"],
      ],
    });

    // Holder Info Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [["Ticket Holder", ""]],
      body: [
        ["Name", ticket.name || "N/A"],
        ["Email", ticket.email || "N/A"],
        ["Phone", ticket.phone || "N/A"],
      ],
    });

    // Payment Info Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [["Payment Info", ""]],
      body: [
        ["Amount", `${ticket.price || 0} ${ticket.currency || "BDT"}`],
        ["Status", ticket.status || "Pending"],
        ["Transaction ID", ticket.tranId || "N/A"],
        ["Purchase Date", ticket.purchaseDate || "N/A"],
      ],
    });

    doc.save(`${ticket.ticketId || ticket.id}.pdf`);
  };

  return (
    <div>
      {/* Hidden QR for PDF */}
      <div ref={qrRef} style={{ display: "none" }}>
        <QRCodeCanvas
          value={`${process.env.NEXT_PUBLIC_BASE_URL}/ticket/verify?tranId=${ticket.tranId}`}
          size={200}
        />
      </div>

      <Button
        className="w-40 md:w-48 lg:w-56"
        label="Download Ticket"
        onClick={handleDownload}
      />
    </div>
  );
}
