export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-[5vw] bg-gradient-to-b from-[#4B0C0C] to-[#7A1F1F] py-[6px]">
      <div className="flex h-16 items-center justify-start">
        <div className="flex-1">
            <a href="/"><img src="/logo-header.png" alt="Academia Internacional de Música - Maestro José Calabrese" className="w-12 h-12" /></a>
        </div>
      </div>
    </header>
  )
}