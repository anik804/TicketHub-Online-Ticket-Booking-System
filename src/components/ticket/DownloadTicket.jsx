"use client";

import Button from "@/ui/Button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function DownloadTicket({ ticket }) {
  const qrRef = useRef();
  const titleRef = useRef();

  const handleDownload = async () => {
    const doc = new jsPDF("p", "pt", "a4");

    // ====== Title Image (Maintain Ratio) ======
    if (titleRef.current) {
      const imgElement = titleRef.current.querySelector("img");
      if (imgElement) {
        // create image to read natural size
        const img = new Image();
        img.src = imgElement.src;

        await new Promise((resolve) => {
          img.onload = () => {
            const naturalW = img.width;
            const naturalH = img.height;

            const targetH = 30; // desired height
            const targetW = (naturalW / naturalH) * targetH; // keep ratio

            doc.addImage(img, "PNG", 40, 40, targetW, targetH);
            resolve();
          };
        });
      }
    }

    // ====== Ticket ID (under logo) ======
    doc.setFontSize(12);
    doc.text(`Ticket ID: ${ticket.id || ticket.ticketId}`, 40, 90);

    // ====== QR Code (top-right) ======
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const qrDataUrl = canvas.toDataURL("image/png");
        doc.addImage(qrDataUrl, "PNG", 462, 40, 90, 90);
      }
    }

    // ====== Event Info Table ======
    autoTable(doc, {
      startY: 150,
      theme: "grid",
      head: [[{ content: "Event Details", colSpan: 2 }]],
      headStyles: { halign: "center", fillColor: [231, 0, 11], textSize: 14 },
      body: [
        ["Title", ticket.title || "N/A"],
        ["Date & Time", ticket.date || "N/A"],
        ["Venue", ticket.location || "N/A"],
        ["Seat", ticket.seat || "Not Assigned"],
      ],
    });

    // ====== Holder Info Table ======
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [[{ content: "Ticket Holder", colSpan: 2 }]],
      headStyles: { halign: "center", fillColor: [231, 0, 11], textSize: 14 },
      body: [
        ["Name", ticket.customerName || "N/A"],
        ["Email", ticket.customerEmail || "N/A"],
        ["Phone", ticket.customerPhone || "N/A"],
      ],
    });

    // ====== Payment Info Table ======
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [[{ content: "Payment Info", colSpan: 2 }]],
      headStyles: { halign: "center", fillColor: [231, 0, 11], textSize: 14 },
      body: [
        ["Amount", `${ticket.price || 0} ${ticket.currency || "BDT"}`],
        ["Status", ticket.status || "Pending"],
        ["Transaction ID", ticket.tranId || "N/A"],
        ["Purchase Date", ticket.purchaseDate || "N/A"],
      ],
    });

    // Save PDF
    doc.save(`${ticket.ticketId || ticket.id}.pdf`);
  };

  return (
    <>
      {/* Hidden Title Image */}
      <div ref={titleRef} style={{ display: "none" }}>
        <img src="/images/ticket-title.png" alt="logo" />
      </div>

      {/* Hidden QR */}
      <div ref={qrRef} style={{ display: "none" }}>
        <QRCodeCanvas
          value={`${process.env.NEXT_PUBLIC_BASE_URL}/ticket/verify?tranId=${ticket.tranId}`}
          size={100}
        />
      </div>

      <Button
        className="w-40 md:w-48 lg:w-56"
        label="Download Ticket"
        onClick={handleDownload}
      />
    </>
  );
}
