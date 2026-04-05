import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle, Cancel } from "@mui/icons-material"

const MOCK_ACCESSES = [
  { id: 1, name: "Carlos Hernández L.", role: "Alumno", gate: "Principal", time: "Justo ahora", status: "authorized", type: "peatonal" },
  { id: 2, name: "Luis Ramírez Vega", role: "Alumno", gate: "Estacionamiento D", time: "Hace 2 min", status: "rejected", type: "peatonal" },
  { id: 4, name: "Roberto Mendoza", role: "Docente", gate: "Zona A", time: "Hace 10 min", status: "authorized", type: "peatonal" },
  { id: 5, name: "Ana López Castillo", role: "Alumno", gate: "Principal (A y C)", time: "Hace 15 min", status: "authorized", type: "vehicular" },
]

export function GuardRealtime() {
  const [filter, setFilter] = useState<'todos' | 'peatonal' | 'vehicular'>('todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAccesses = MOCK_ACCESSES.filter(a => {
    const matchType = filter === 'todos' || a.type === filter
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.gate.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchSearch
  })

  const getRoleColor = (role: string) => {
    if (role === 'Alumno') return 'bg-[#2563EB] text-white'
    if (role === 'Docente') return 'bg-[#16A34A] text-white'
    return 'bg-[#64748B] text-white'
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col gap-4 mb-6 sticky top-0 bg-[#F8FAFC] z-10 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-[24px] font-bold text-[#0A1628] tracking-tight">Accesos en Vivo</h1>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#16A34A]/20">
            <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            En línea
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {['todos', 'peatonal', 'vehicular'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors capitalize border ${
                  filter === f 
                    ? 'bg-[#0A1628] text-white border-[#0A1628]' 
                    : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0A1628]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Buscar acceso..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredAccesses.map((access, i) => {
            // First item: Giant square card
            if (i === 0) {
              return (
                <motion.div
                  key={access.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="bg-white rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex flex-col items-center justify-center relative">
                    <div className={`w-[123px] h-[123px] rounded-[5px] flex items-center justify-center font-bold text-[48px] mb-4 ${getRoleColor(access.role)}`}>
                      {access.name.split(' ').slice(0,2).map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1 justify-center flex-wrap">
                      <h3 className="font-bold text-[#0A1628] text-[18px] leading-tight">{access.name}</h3>
                      <span className="text-[10px] font-bold text-[#64748B] whitespace-nowrap">{access.time}</span>
                    </div>
                    
                    <p className="text-[12px] text-[#64748B] font-medium mb-4">{access.role}</p>
                    
                    <div className="flex items-center gap-6 justify-center w-full">
                      <span className="font-semibold text-[#0A1628] text-[14px]">{access.gate}</span>
                      <div className="w-px h-[20px] bg-[#E2E8F0]" />
                      <span className="font-semibold text-[#0A1628] text-[14px] capitalize">{access.type}</span>
                    </div>
                  </div>
                  
                  <div className={`w-full py-3 flex items-center justify-center gap-2 text-[14px] font-bold text-white uppercase tracking-wider ${access.status === 'authorized' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}>
                    {access.status === 'authorized' ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />}
                    {access.status === 'authorized' ? 'APROBADO' : 'RECHAZADO'}
                  </div>
                </motion.div>
              )
            }

            // Second item: Large card with circular avatar
            if (i === 1) {
              return (
                <motion.div
                  key={access.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="bg-white rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col"
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center font-bold text-[18px] shrink-0 ${getRoleColor(access.role)}`}>
                      {access.name.split(' ').slice(0,2).map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                         <h3 className="font-bold text-[#0A1628] text-[18px] truncate pr-2">{access.name}</h3>
                         <span className="text-[12px] font-bold text-[#64748B] whitespace-nowrap">{access.time}</span>
                      </div>
                      <p className="text-[12px] text-[#64748B] font-medium">{access.role}</p>
                      <p className="text-[14px] font-semibold text-[#0A1628] mt-1">{access.gate}</p>
                    </div>
                  </div>
                  
                  <div className={`w-full py-2.5 flex items-center justify-center gap-2 text-[14px] font-bold text-white uppercase tracking-wider ${access.status === 'authorized' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}>
                    {access.status === 'authorized' ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />}
                    {access.status === 'authorized' ? 'APROBADO' : 'RECHAZADO'}
                  </div>
                </motion.div>
              )
            }

            // Compact cards
            return (
              <motion.div
                key={access.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className={`bg-white rounded-[12px] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border overflow-hidden flex items-center p-3 gap-3 ${
                  access.status === 'authorized' ? 'border-l-[4px] border-l-[#16A34A] border-y-[#E2E8F0] border-r-[#E2E8F0]' : 'border-l-[4px] border-l-[#DC2626] border-y-[#E2E8F0] border-r-[#E2E8F0]'
                }`}
              >
                <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 ${getRoleColor(access.role)}`}>
                  {access.name.split(' ').slice(0,2).map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 className="font-bold text-[#0A1628] text-[14px] truncate">{access.name}</h4>
                  <p className="text-[12px] text-[#64748B] truncate mt-0.5">{access.role} &middot; {access.gate}</p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[12px] font-bold text-[#64748B]">{access.time}</span>
                  {access.status === 'authorized' ? (
                    <CheckCircle fontSize="small" className="text-[#16A34A]" />
                  ) : (
                    <Cancel fontSize="small" className="text-[#DC2626]" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
