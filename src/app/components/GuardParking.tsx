import { useState } from "react"
import { Warning } from "@mui/icons-material"

export function GuardParking() {
  const [filter, setFilter] = useState<"Todos" | "Pavimento" | "Tierra">("Todos")

  const zones = [
    { id: "A", name: "Estacionamiento A — Edificio L", type: "Pavimento", cap: 40, occ: 28, alert: false, status: "open" },
    { id: "B", name: "Estacionamiento B — Plaza Bic.", type: "Pavimento", cap: 35, occ: 35, alert: true, status: "full" },
    { id: "C", name: "Estacionamiento C — Principal", type: "Pavimento", cap: 60, occ: 45, alert: false, status: "open" },
    { id: "D", name: "Estacionamiento D", type: "Pavimento", cap: 50, occ: 20, alert: false, status: "open" },
    { id: "E", name: "Estacionamiento E", type: "Pavimento", cap: 40, occ: 10, alert: false, status: "open" },
    { id: "T1", name: "Zona Tierra 1", type: "Tierra", cap: 15, occ: 5, alert: false, status: "open" },
    { id: "T2", name: "Zona Tierra 2", type: "Tierra", cap: 20, occ: 12, alert: false, status: "open" },
  ]

  const filteredZones = zones.filter(z => filter === "Todos" || z.type === filter)

  return (
    <div className="p-4 md:p-6 space-y-4 font-sans">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-[#0A1628]">Estacionamiento</h1>
        
        <div className="flex gap-2">
          {["Todos", "Pavimento", "Tierra"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-[#0A1628] text-white' 
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0A1628]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm">
        <span className="w-2.5 h-2.5 bg-[#16A34A] rounded-full animate-pulse"></span>
        Lugares disponibles en total: {zones.reduce((acc, z) => acc + (z.cap - z.occ), 0)} / {zones.reduce((acc, z) => acc + z.cap, 0)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredZones.map((z, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-[#E2E8F0] relative overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-[#0A1628] text-lg leading-tight mb-1">{z.name}</h3>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded inline-block ${z.type === 'Pavimento' ? 'text-[#2563EB] bg-blue-50' : 'text-[#D97706] bg-amber-50'}`}>
                  {z.type}
                </span>
              </div>
              <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${z.status === 'full' ? 'bg-[#DC2626]' : 'bg-[#16A34A]'}`} title={z.status === 'full' ? 'Lleno' : 'Abierto'} />
            </div>

            <div className="space-y-1.5 mt-auto pt-4 border-t border-gray-50">
              <div className="flex justify-between text-sm font-bold text-[#0A1628]">
                <span>{Math.round((z.occ/z.cap)*100)}% ocupado</span>
                <span className="text-[#64748B] font-medium">{z.cap - z.occ} disp. ({z.occ}/{z.cap})</span>
              </div>
              <div className="h-2.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${z.status === 'full' ? 'bg-[#DC2626]' : 'bg-[#16A34A]'}`}
                  style={{width: `${(z.occ/z.cap)*100}%`}}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
