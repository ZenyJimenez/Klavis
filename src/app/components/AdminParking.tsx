import { useState } from "react"
import { motion } from "motion/react"
import LocalParkingIcon from "@mui/icons-material/LocalParking"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import mapBg from "figma:asset/1caab0845029f1bb8715de60c70b29e9d572c288.png"

const ZONES = [
  { id: "A", name: "Estacionamiento A", desc: "Estacionamiento Administrativo", type: "PAVIMENTADO", cap: 40, occ: 28, violations: 0, peak: "08:00", trend: "up", diff: "+5", top: "45.9%", left: "31.6%" },
  { id: "B", name: "Estacionamiento B", desc: "Estacionamiento Maestros", type: "PAVIMENTADO", cap: 35, occ: 35, violations: 1, peak: "07:30", trend: "up", diff: "+2", top: "51.6%", left: "22.0%" },
  { id: "C", name: "Estacionamiento C", desc: "Cafetería / Edificio G", type: "PAVIMENTADO", cap: 30, occ: 18, violations: 2, peak: "13:00", trend: "down", diff: "-4", top: "82.1%", left: "31.6%" },
  { id: "D", name: "Estacionamiento D", desc: "Edificio M", type: "PAVIMENTADO", cap: 25, occ: 20, violations: 0, peak: "08:30", trend: "up", diff: "+1", top: "82.1%", left: "49.5%" },
  { id: "E", name: "Estacionamiento E", desc: "Edificio CI", type: "PAVIMENTADO", cap: 20, occ: 12, violations: 0, peak: "09:00", trend: "down", diff: "-2", top: "82.1%", left: "69.6%" },
  { id: "T1", name: "Zona Tierra 1", desc: "Norte", type: "TIERRA", cap: 15, occ: 12, violations: 0, peak: "08:15", trend: "up", diff: "+3", top: "39.2%", left: "6.6%" },
  { id: "T2", name: "Zona Tierra 2", desc: "Sur", type: "TIERRA", cap: 15, occ: 15, violations: 0, peak: "07:45", trend: "up", diff: "+1", top: "0%", left: "22.0%" },
  { id: "T3", name: "Zona Tierra 3", desc: "Este", type: "TIERRA", cap: 15, occ: 8, violations: 0, peak: "14:00", trend: "down", diff: "-1", top: "27.9%", left: "31.6%" },
  { id: "T4", name: "Zona Tierra 4", desc: "Oeste", type: "TIERRA", cap: 15, occ: 10, violations: 0, peak: "10:00", trend: "up", diff: "+2", top: "66.2%", left: "80.8%" },
]

const OCCUPANCY_DATA = [
  { name: "Est A", hoy: 70, ayer: 65 },
  { name: "Est B", hoy: 100, ayer: 95 },
  { name: "Est C", hoy: 60, ayer: 75 },
  { name: "Est D", hoy: 80, ayer: 78 },
  { name: "Est E", hoy: 60, ayer: 70 },
]

const HISTORY_DATA = [
  { time: "07:00", A: 10, B: 20, C: 5 },
  { time: "08:00", A: 35, B: 35, C: 10 },
  { time: "09:00", A: 40, B: 35, C: 15 },
  { time: "10:00", A: 38, B: 35, C: 18 },
  { time: "11:00", A: 35, B: 30, C: 20 },
  { time: "12:00", A: 30, B: 25, C: 25 },
  { time: "13:00", A: 28, B: 20, C: 30 },
]

const VIOLATIONS_DATA = [
  { day: "Lun", viol: 2 },
  { day: "Mar", viol: 5 },
  { day: "Mie", viol: 3 },
  { day: "Jue", viol: 1 },
  { day: "Vie", viol: 4 },
  { day: "Sab", viol: 0 },
  { day: "Dom", viol: 0 },
]

export function AdminParking() {
  const [filterType, setFilterType] = useState<"ALL" | "PAVIMENTADO" | "TIERRA">("ALL")
  const [selectedZone, setSelectedZone] = useState<typeof ZONES[0] | null>(null)

  const getStatusColor = (occ: number, cap: number, violations: number) => {
    if (violations > 0) return "bg-[#D97706]" // Naranja
    const percent = occ / cap
    if (percent >= 1) return "bg-[#DC2626]" // Rojo
    if (percent > 0.7) return "bg-[#EAB308]" // Amarillo
    return "bg-[#16A34A]" // Verde
  }

  const getStatusColorText = (occ: number, cap: number) => {
    const percent = occ / cap
    if (percent >= 1) return "text-[#DC2626]"
    if (percent > 0.7) return "text-[#EAB308]"
    return "text-[#16A34A]"
  }

  const filteredZones = ZONES.filter(z => filterType === "ALL" || z.type === filterType)

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Estacionamiento</h1>
          <p className="text-[#64748b] mt-1">Monitoreo de capacidad y gestión de espacios del campus.</p>
        </div>
        <div className="flex gap-2 bg-[#f8fafc] p-1 rounded-lg border border-[#e2e8f0]">
          <button 
            onClick={() => setFilterType("ALL")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === 'ALL' ? 'bg-white text-[#0A1628] shadow-sm' : 'text-[#64748b] hover:text-[#0A1628]'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilterType("PAVIMENTADO")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === 'PAVIMENTADO' ? 'bg-white text-[#2563eb] shadow-sm' : 'text-[#64748b] hover:text-[#2563eb]'}`}
          >
            Pavimentado
          </button>
          <button 
            onClick={() => setFilterType("TIERRA")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === 'TIERRA' ? 'bg-white text-[#d97706] shadow-sm' : 'text-[#64748b] hover:text-[#d97706]'}`}
          >
            Tierra
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white p-6 rounded-[14px] border border-[#f8fafc] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden">
        <h3 className="font-bold text-[#0A1628] mb-4 flex items-center gap-2">
          <LocalParkingIcon className="text-gray-400" />
          Mapa Esquemático
        </h3>
        <div className="relative w-full overflow-hidden rounded-[14px] border-2 border-[#e2e8f0]" style={{ aspectRatio: '1130/527' }}>
          <img src={mapBg} alt="Mapa Campus" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0">
            {ZONES.map((zone) => {
              const isVisible = filterType === "ALL" || filterType === zone.type;
              return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`absolute flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isVisible ? 'hover:scale-105 opacity-100 z-10' : 'opacity-40 hover:opacity-60 z-0 grayscale'}`}
                style={{
                  top: zone.top,
                  left: zone.left,
                  width: 'min(8%, 80px)',
                  aspectRatio: '80/60'
                }}
              >
                <div className={`w-full h-full rounded-[10px] shadow-md border-2 border-white flex flex-col items-center justify-center ${getStatusColor(zone.occ, zone.cap, zone.violations)} text-white`}>
                  <span className="font-bold text-[clamp(10px,1.5vw,18px)] leading-none mb-0.5">{zone.id}</span>
                  <span className="text-[clamp(8px,1vw,12px)] opacity-90 leading-none">{Math.round((zone.occ/zone.cap)*100)}%</span>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredZones.map(zone => {
          const pct = Math.round((zone.occ / zone.cap) * 100)
          const isFull = pct >= 100
          const isWarning = pct >= 80 && pct < 100
          const colorText = isFull ? 'text-[#dc2626]' : isWarning ? 'text-[#d97706]' : 'text-[#16a34a]'
          const colorBg = isFull ? 'bg-[#dc2626]' : isWarning ? 'bg-[#d97706]' : 'bg-[#16a34a]'

          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-[21px] rounded-[14px] border border-[#f8fafc] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col gap-4 relative overflow-hidden"
            >
              {zone.violations > 0 && (
                <div className="absolute top-0 left-0 right-0 bg-[#D97706] text-white text-[10px] font-bold uppercase tracking-[0.5px] text-center py-[4px]">
                  Requiere atención ({zone.violations} incidentes)
                </div>
              )}
              <div className={`flex justify-between items-start ${zone.violations > 0 ? 'mt-3' : ''}`}>
                <div className="space-y-1">
                  <h3 className="font-bold text-[18px] text-[#0A1628] leading-[27px]">{zone.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#64748b] leading-[16px]">{zone.desc}</span>
                    <span className={`px-[8px] py-[2px] rounded-[4px] text-[10px] font-bold uppercase tracking-[0.5px] leading-[15px] bg-[#f8fafc] ${
                      zone.type === "PAVIMENTADO" ? "text-[#2563eb]" : "text-[#d97706]"
                    }`}>
                      {zone.type}
                    </span>
                  </div>
                </div>
                {zone.violations > 0 && (
                  <WarningAmberIcon className="text-[#D97706]" />
                )}
              </div>

              <div className="space-y-1 mt-2 mb-2">
                <div className="flex justify-between items-start text-sm font-medium">
                  <span className="text-[14px] text-[#64748b] font-medium leading-[20px]">Ocupación</span>
                  <span className={`text-[14px] font-medium leading-[20px] ${colorText}`}>
                    {pct}%
                  </span>
                </div>
                <div className="h-[8px] w-full bg-[#f8fafc] rounded-[33554400px] overflow-hidden flex items-start">
                  <div 
                    className={`h-full rounded-[33554400px] ${colorBg}`} 
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-end pt-1">
                  <span className={`flex items-center gap-[4px] text-[12px] font-medium ${colorText} leading-[16px]`}>
                    {zone.trend === 'up' ? <TrendingUpIcon style={{fontSize: '14px'}}/> : <TrendingDownIcon style={{fontSize: '14px'}}/>}
                    {zone.diff} que ayer
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-[21px] rounded-[14px] border border-[#f8fafc] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
          <span className="text-[12px] text-[#64748b] font-medium uppercase tracking-[0.6px] block mb-2 leading-[16px]">Zona más congestionada</span>
          <span className="text-[18px] font-bold text-[#DC2626] leading-[28px]">Estacionamiento B</span>
        </div>
        <div className="bg-white p-[21px] rounded-[14px] border border-[#f8fafc] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
          <span className="text-[12px] text-[#64748b] font-medium uppercase tracking-[0.6px] block mb-2 leading-[16px]">Total Incidentes</span>
          <span className="text-[18px] font-bold text-[#D97706] leading-[28px]">3 esta semana</span>
        </div>
        <div className="bg-white p-[21px] rounded-[14px] border border-[#f8fafc] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
          <span className="text-[12px] text-[#64748b] font-medium uppercase tracking-[0.6px] block mb-2 leading-[16px]">Tierra más usada</span>
          <span className="text-[18px] font-bold text-[#0f172a] leading-[28px]">Zona Tierra 2</span>
        </div>
      </div>
      {/* Modal de Detalles de Zona */}
      {selectedZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1628]/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[14px] w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className={`p-6 text-white relative ${getStatusColor(selectedZone.occ, selectedZone.cap, selectedZone.violations)}`}>
              <button 
                onClick={() => setSelectedZone(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <h2 className="text-2xl font-bold mb-1">{selectedZone.name}</h2>
              <p className="text-white/90">{selectedZone.desc}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0]">
                  <p className="text-[12px] text-[#64748b] font-medium uppercase tracking-[0.5px] mb-1">Ocupación</p>
                  <p className="text-[18px] font-bold text-[#0a1628]">{selectedZone.occ} / {selectedZone.cap}</p>
                  <p className="text-[12px] text-[#64748b] mt-1">{Math.round((selectedZone.occ / selectedZone.cap) * 100)}% lleno</p>
                </div>
              </div>

              {selectedZone.violations > 0 && (
                <div className="bg-[#fffbeb] border border-[#fcd34d] p-4 rounded-xl flex gap-3 items-start">
                  <WarningAmberIcon className="text-[#d97706] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#92400e] text-[14px]">Requiere Atención</h4>
                    <p className="text-[#b45309] text-[13px] mt-1">Se han reportado {selectedZone.violations} incidentes recientes en esta zona que requieren revisión del personal de seguridad.</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  onClick={() => setSelectedZone(null)}
                  className="px-4 py-2 text-[#64748b] font-medium hover:bg-[#f8fafc] rounded-lg transition-colors text-sm"
                >
                  Cerrar
                </button>
                <button 
                  onClick={() => setSelectedZone(null)}
                  className="px-4 py-2 bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8] rounded-lg transition-colors text-sm shadow-sm"
                >
                  Ver Detalles Completos
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
