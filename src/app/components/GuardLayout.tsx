import imgKlavisLogo1 from "figma:asset/da9c5f090346b090388c669d3e7c116edcd58dfb.png"
import { Outlet, Link, useLocation } from "react-router"
import { Shield, AccessTime, Event, Notifications, Logout, Menu, ReportProblem, LocalParking, Close } from "@mui/icons-material"
import { useState } from "react"

export function GuardLayout() {
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const tabs = [
    { id: "accesses", icon: Shield, label: "Accesos", path: "/guard" },
    { id: "history", icon: AccessTime, label: "Historial", path: "/guard/history" },
    { id: "calendar", icon: Event, label: "Calendario", path: "/guard/calendar" },
    { id: "incidents", icon: ReportProblem, label: "Incidencias", path: "/guard/incidents" },
    { id: "parking", icon: LocalParking, label: "Parking", path: "/guard/parking" },
    { id: "notices", icon: Notifications, label: "Avisos", path: "/guard/notices" },
  ]

  const SidebarContent = () => (
    <>
      <div className="h-[89px] shrink-0 w-full border-b border-[rgba(255,255,255,0.1)] flex gap-[12px] items-center pl-[24px]">
        <div className="bg-[#1e3a5f] h-[40px] w-[36px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 flex items-center justify-center overflow-hidden relative">
          <img alt="Klavis Logo" className="absolute h-[199.26%] left-[-53.66%] max-w-none top-[-41.79%] w-[206.92%]" src={imgKlavisLogo1} />
        </div>
        <span className="font-['Inter'] font-bold leading-[28px] text-[20px] text-white tracking-[2px]">KLAVIS</span>
      </div>
      
      <nav className="flex-[778_0_0] min-h-px min-w-px relative w-full pt-[24px] px-[16px] flex flex-col gap-[4px] overflow-y-auto">
        {tabs.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/guard" && location.pathname.startsWith(item.path))
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              className={`h-[44px] relative rounded-[8px] flex items-center pl-[16px] gap-[12px] transition-colors group ${
                isActive
                  ? "bg-[#2563EB] text-white"
                  : "text-[#64748B] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
              }`}
            >
              <item.icon fontSize="small" className={isActive ? "text-white" : "inherit"} />
              <span className={`font-['Inter'] font-medium text-[14px] leading-[20px] ${isActive ? 'text-white' : 'text-[#64748b] group-hover:text-white'}`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="h-[77px] relative shrink-0 w-full border-t border-[rgba(255,255,255,0.1)] flex flex-col items-start pt-[17px] px-[16px]">
        <Link to="/" className="h-[44px] relative rounded-[8px] w-full flex items-center pl-[16px] gap-[12px] text-[#64748B] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors group">
          <Logout fontSize="small" />
          <span className="font-['Inter'] font-medium text-[14px] leading-[20px] text-[#64748B] group-hover:text-white">Cerrar Sesión</span>
        </Link>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[280px] bg-[#0A1628] text-white shadow-xl z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-[#0A1628]/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-[#0A1628] text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
          onClick={() => setDrawerOpen(false)}
          className="absolute top-6 right-4 text-[#64748B] hover:text-white"
        >
          <Close />
        </button>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Fixed Header */}
        <header className="h-16 bg-[#FFFFFF] border-b border-[#E2E8F0] flex items-center justify-between px-4 md:px-6 z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDrawerOpen(true)}
              className="p-2 -ml-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg md:hidden"
            >
              <Menu />
            </button>
            <div className="bg-[#2563EB] p-1.5 rounded text-white md:hidden ml-2">
              <Shield fontSize="small" />
            </div>
            <h1 className="font-bold text-[#0F172A] tracking-wider md:hidden ml-2">KLAVIS</h1>
            <span className="hidden md:inline-block font-semibold text-[#0F172A]">Panel de Seguridad</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#0F172A]">Guardia Turno 1</p>
              <p className="text-xs text-[#64748B]">José Pérez</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-sm">
              JP
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
