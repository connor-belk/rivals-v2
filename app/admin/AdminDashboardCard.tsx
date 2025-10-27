import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  fromColor?: string;
  toColor?: string;
  viaColor?: string;
}

export default function AdminDashboardCard({
  children,
  fromColor,
  toColor,
  viaColor,
}: CardWrapperProps) {
  if (!fromColor) fromColor = "from-blue-900";
  if (!toColor) toColor = "to-blue-400";
  if (!viaColor) viaColor = "";

  return (
    <div
      className={clsx(
        "rounded-lg bg-gradient-to-r text-white p-4 hover:cursor-pointer hover:scale-[101%] transition-all duration-150 ease-in-out",
        fromColor,
        toColor,
        viaColor
      )}
    >
      <Link href={"#check"}>{children}</Link>
    </div>
  );
}
