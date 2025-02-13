import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";

export const generatePDF = (service, measurements) => {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Invoice - Elegant Tailors", 20, 20);
  doc.setFontSize(16);
  doc.text(`Service: ${service.title}`, 20, 40);
  doc.text(`Price: $${service.price}`, 20, 50);
  doc.setFont("helvetica", "normal");
  doc.text("Measurements:", 20, 70);

  let y = 80;
  Object.entries(measurements).forEach(([key, value]) => {
    doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value} inches`, 20, y);
    y += 10;
  });

  doc.setFont("helvetica", "bold");
  doc.text(`Total: $${service.price}`, 20, y + 10);
  doc.save("invoice.pdf");

  return doc.output("blob");
};

export const sendInvoiceByEmail = async (service, measurements) => {
  const pdfBlob = generatePDF(service, measurements);
  const pdfFile = new File([pdfBlob], "invoice.pdf", { type: "application/pdf" });

  const emailParams = {
    to_email: "gprakhar860@gmail.com",
    subject: "Your Invoice from Elegant Tailors",
    message: "Attached is your invoice for your recent purchase.",
    attachment: pdfFile,
  };

  try {
    await emailjs.send("service_5u5dgco", "template_sousy2e", emailParams, "WDcxyMV5-IcRP3_zr");
    alert("Invoice sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Failed to send invoice. Please try again.");
  }
};
