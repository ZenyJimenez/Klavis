import { useState, useMemo } from "react"
import { Outlet, Link, useLocation } from "react-router"
import {
  Dashboard,
  People,
  PersonAdd,
  LocalShipping,
  MonitorHeart,
  LocalParking,
  BarChart,
  ReportProblem,
  Settings,
  Logout,
  Menu,
  Close,
  DirectionsCar,
  Sensors,
  ExpandMore,
  GroupWork,
  Memory,
  Insights
} from "@mui/icons-material"

import imgKlavisLogo1 from "figma:asset/da9c5f090346b090388c669d3e7c116edcd58dfb.png"

interface NavItem { icon: any; label: string; path: string }
interface NavGroup { id: string; label: string; icon: any; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  {
    id: "principal", label: "Principal", icon: Dashboard,
    items: [
      { icon: Dashboard, label: "Panel Principal", path: "/admin" },
      { icon: MonitorHeart, label: "Monitoreo", path: "/admin/real-time" },
    ],
  },
  {
    id: "personas", label: "Personas", icon: GroupWork,
    items: [
      { icon: People, label: "Usuarios", path: "/admin/users" },
      { icon: PersonAdd, label: "Visitantes", path: "/admin/visitors" },
      { icon: LocalShipping, label: "Proveedores", path: "/admin/providers" },
    ],
  },
  {
    id: "infraestructura", label: "Infraestructura", icon: Memory,
    items: [
      { icon: DirectionsCar, label: "Vehículos", path: "/admin/vehicles" },
      { icon: Sensors, label: "Sensores", path: "/admin/sensors" },
      { icon: LocalParking, label: "Estacionamiento", path: "/admin/parking" },
    ],
  },
  {
    id: "operacion", label: "Operación", icon: Insights,
    items: [
      { icon: BarChart, label: "Reportes", path: "/admin/reports" },
      { icon: ReportProblem, label: "Incidentes", path: "/admin/incidents" },
    ],
  },
  {
    id: "sistema", label: "Sistema", icon: Settings,
    items: [
      { icon: Settings, label: "Configuración", path: "/admin/settings" },
    ],
  },
]

export function AdminLayout() {
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isItemActive = (path: string) =>
    location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path))

  const activeGroupId = useMemo(() => {
    const g = NAV_GROUPS.find(group => group.items.some(i => isItemActive(i.path)))
    return g?.id || "principal"
  }, [location.pathname])

  const [openGroup, setOpenGroup] = useState<string>(activeGroupId)

  const handleToggle = (id: string) => setOpenGroup(prev => (prev === id ? "" : id))

  const SidebarContent = () => (
    <>
      <div className="h-[89px] shrink-0 w-full border-b border-[rgba(255,255,255,0.1)] flex gap-[12px] items-center pl-[24px]">
        <div className="bg-[#1e3a5f] h-[40px] w-[36px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 flex items-center justify-center overflow-hidden relative">
          <img alt="Klavis Logo" className="absolute h-[199.26%] left-[-53.66%] max-w-none top-[-41.79%] w-[206.92%]" src={imgKlavisLogo1} />
        </div>
        <span className="font-['Inter'] font-bold leading-[28px] text-[20px] text-white tracking-[2px]">KLAVIS</span>
      </div>

      <nav className="flex-1 min-h-px min-w-px relative w-full pt-[16px] px-[12px] flex flex-col gap-[2px] overflow-y-auto">
        {NAV_GROUPS.map(group => {
          const isOpen = openGroup === group.id
          const hasActive = group.items.some(i => isItemActive(i.path))
          return (
            <div key={group.id} className="flex flex-col">
              <button
                onClick={() => handleToggle(group.id)}
                className={`h-[42px] rounded-[8px] flex items-center justify-between pl-[16px] pr-[12px] gap-[12px] transition-colors group ${
                  hasActive ? "text-white" : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-[12px]">
                  <group.icon fontSize="small" className={hasActive ? "text-[#2563EB]" : "inherit"} />
                  <span className="font-['Inter'] font-bold text-[11px] uppercase tracking-[1.2px] leading-[14px]">{group.label}</span>
                </span>
                <ExpandMore fontSize="small" className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? `${group.items.length * 44 + 8}px` : "0px" }}
              >
                <div className="pt-1 pb-1 pl-3 flex flex-col gap-[2px] border-l border-[rgba(255,255,255,0.08)] ml-[26px]">
                  {group.items.map(item => {
                    const isActive = isItemActive(item.path)
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setDrawerOpen(false)}
                        className={`h-[40px] rounded-[8px] flex items-center pl-[14px] gap-[10px] transition-colors group ${
                          isActive
                            ? "bg-[#2563EB] text-white"
                            : "text-[#64748B] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                        }`}
                      >
                        <item.icon style={{ fontSize: 16 }} className={isActive ? "text-white" : "inherit"} />
                        <span className={`font-['Inter'] font-medium text-[13px] leading-[18px] ${isActive ? "text-white" : "text-[#64748b] group-hover:text-white"}`}>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
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
      <aside className="hidden md:flex flex-col w-[280px] bg-[#0A1628] text-white shadow-xl z-20">
        <SidebarContent />
      </aside>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-[#0A1628]/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-[#0A1628] text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-6 right-4 text-[#64748B] hover:text-white"
        >
          <Close />
        </button>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden bg-[#FFFFFF] h-16 flex items-center px-4 border-b border-[#E2E8F0] z-10 flex-shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 -ml-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
          >
            <Menu />
          </button>
          <span className="ml-2 font-bold text-[#0F172A] tracking-wider">KLAVIS</span>
        </header>

        <main className="flex-1 overflow-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
