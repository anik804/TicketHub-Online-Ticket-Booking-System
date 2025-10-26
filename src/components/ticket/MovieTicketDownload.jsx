"use client";

import Button from "@/ui/Button";
import { format, parseISO } from "date-fns";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function MovieTicketDownload({ movieTicket, paymentHistory }) {
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
    doc.text(`Ticket ID: ${movieTicket.id}`, 40, 90);

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
      headStyles: { halign: "center", fillColor: [217, 108, 44], textSize: 14 },
      body: [
        ["Title", movieTicket.title || "N/A"],
        ["Date & Time", movieTicket.eventDateTime || "N/A"],
        ["Venue", movieTicket.location || "N/A"],
        ["Seat", movieTicket.seats || "Not Assigned"],
      ],
    });

    // ====== Holder Info Table ======
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [[{ content: "Ticket Holder", colSpan: 2 }]],
      headStyles: { halign: "center", fillColor: [217, 108, 44], textSize: 14 },
      body: [
        ["Name", movieTicket.customerName || "N/A"],
        ["Email", movieTicket.customerEmail || "N/A"],
        ["Phone", movieTicket.customerPhone || "N/A"],
      ],
    });

    // ====== Payment Info Table ======
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "grid",
      head: [[{ content: "Payment Info", colSpan: 2 }]],
      headStyles: { halign: "center", fillColor: [217, 108, 44], textSize: 14 },
      body: [
        [
          "Amount",
          `${paymentHistory.amount || 0} ${paymentHistory.currency || "BDT"}`,
        ],
        ["Status", paymentHistory.status || "Pending"],
        ["Transaction ID", paymentHistory.tranId || "N/A"],
        [
          "Purchase Date",
          format(parseISO(paymentHistory.paidAt), "PPPPp") || "N/A",
        ],
      ],
    });

    // Save PDF
    doc.save(`${movieTicket.id}.pdf`);
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
          value={`${process.env.NEXT_PUBLIC_BASE_URL}/ticket/verify?ticket=movie&tranId=${paymentHistory.tranId}`}
          size={100}
        />
      </div>

      <Button
        className="w-40 md:w-45 lg:w-50"
        label="Download Ticket"
        onClick={handleDownload}
      />
    </>
  );
}
