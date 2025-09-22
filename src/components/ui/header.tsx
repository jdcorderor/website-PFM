import { ChevronLeft } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-[5vw] bg-gradient-to-b from-[#4B0C0C] to-[#7A1F1F] py-[6px]">
      <div className="flex h-16 items-center justify-start">
        <div className="flex-1">
            <img src="/logo-header.png" alt="Programa de Formación Musical - Maestro José Calabrese" className="w-12 h-12" />
        </div>
        <nav className="flex gap-6 justify-end">
          <button className="flex bg-[#C19310] px-4 py-1 gap-2 rounded-full items-center justify-center text-xs font-montserrat text-white font-medium cursor-pointer">
            <ChevronLeft className="w-4 h-4"></ChevronLeft>Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  )
}