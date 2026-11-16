"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", teks: "Beranda" },
  { href: "/eskul", teks: "Ekskul" },
  { href: "/saya", teks: "Saya" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b bg-white px-6 py-3 shadow-sm">
      <Link href="/" className="text-lg font-bold text-blue-600">EkskulKu</Link>

      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname === item.href || (item.href === "/eskul" && pathname.startsWith("/eskul/"))
              ? "font-semibold text-blue-600"
              : "text-slate-600 hover:text-blue-600"
          }
        >
          {item.teks}
        </Link>
      ))}
    </nav>
  );
}
