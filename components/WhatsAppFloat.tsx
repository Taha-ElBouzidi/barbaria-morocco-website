"use client";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "./Navbar";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
