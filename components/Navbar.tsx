"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { nama: "Beranda", href: "/", icon: "🏠" },
    { nama: "Daftar Ekskul", href: "/ekskul", icon: "📚" },
    { nama: "Ekskul Saya", href: "/saya", icon: "⭐" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-red-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            EkskulKu
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          {menu.map((m) => {
            const isActive = pathname === m.href;

            return (
              <Link
                key={m.href}
                href={m.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-200"
                    : "text-slate-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.nama}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}