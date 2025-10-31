import React from "react";
import Navbar from "@/components/Navbar";

export default function ApiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
