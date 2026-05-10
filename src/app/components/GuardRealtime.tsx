import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  CheckCircle, 
  Cancel, 
  DirectionsCar, 
  ExpandMore, 
  Group, 
  Warning, 
  Send, 
  Message,
  ArrowForwardIos
} from "@mui/icons-material"

interface AssignedStudent {
  id: string
  name: string
  career?: string
}

interface AccessRecord {
  id: number
  name: string
  role: string
  gate: string
  time: string
  status: "authorized" | "rejected" | "pending" | "anomaly"
  type: "peatonal" | "vehicular"
  plate?: string
  assignedStudents?: AssignedStudent[]
  anomalyDescription?: string
  adminSolution?: string
  photo?: string
}

const MOCK_ACCESSES: AccessRecord[] = [
  {
    id: 100, name: "Roberto Gómez S.", role: "Proveedor", gate: "Vehicular Norte",
    time: "Esperando...", status: "pending", type: "vehicular",
    plate: "ABC-1234",
    assignedStudents: [],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    id: 1, name: "Carlos Hernández L.", role: "Alumno", gate: "Principal",
    time: "Hace 5 min", status: "authorized", type: "vehicular",
    plate: "BCN-4521",
    assignedStudents: [
      { id: "s1", name: "Carlos Hernández L.", career: "Ing. Sistemas" },
      { id: "s2", name: "Mariana Hernández L.", career: "Lic. Diseño" },
    ],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop"
  },
  { 
    id: 2, name: "Luis Ramírez Vega", role: "Alumno", gate: "Estacionamiento D", 
    time: "Hace 10 min", status: "rejected", type: "peatonal",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
  },
  { 
    id: 4, name: "Roberto Mendoza", role: "Docente", gate: "Zona A", 
    time: "Hace 15 min", status: "authorized", type: "peatonal",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop"
  },
]

export function GuardRealtime() {
  const [accesses, setAccesses] = useState<AccessRecord[]>(MOCK_ACCESSES)
  const [filter, setFilter] = useState<'todos' | 'peatonal' | 'vehicular'>('todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  
  const [reportingId, setReportingId] = useState<number | null>(null)
  const [reportText, setReportText] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleApprove = (id: number) => {
    setAccesses(prev => prev.map(a => a.id === id ? { ...a, status: 'authorized', time: 'Justo ahora' } : a))
  }

  const handleReject = (id: number) => {
    setAccesses(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected', time: 'Justo ahora' } : a))
  }

  const handleSendAnomaly = (id: number) => {
    setIsSending(true)
    setTimeout(() => {
      setAccesses(prev => prev.map(a => a.id === id ? { ...a, status: 'anomaly', anomalyDescription: reportText } : a))
      setIsSending(false)
      setReportingId(null)
      setReportText('')
      setTimeout(() => {
        setAccesses(prev => prev.map(a => a.id === id ? { ...a, adminSolution: "El proveedor tiene permiso temporal. Favor de autorizar el acceso vehicular." } : a))
      }, 5000)
    }, 1000)
  }

  const filteredAccesses = accesses.filter(a => {
    const matchType = filter === 'todos' || a.type === filter
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.gate.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchSearch
  })

  const getRoleColor = (role: string) => {
    if (role === 'Alumno') return 'bg-[#2563EB] text-white'
    if (role === 'Docente') return 'bg-[#16A34A] text-white'
    if (role === 'Proveedor') return 'bg-[#F59E0B] text-white'
    return 'bg-[#64748B] text-white'
  }

  const initials = (name: string) => name.split(' ').slice(0, 2).map(n => n[0]).join('')

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-[24px] font-bold text-[#0A1628] tracking-tight">Accesos en Vivo</h1>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#16A34A]/20">
            <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            En línea
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['todos', 'peatonal', 'vehicular'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-5 py-1.5 rounded-full text-sm font-bold transition-colors capitalize border shrink-0 ${
                filter === f
                  ? 'bg-[#0A1628] text-white border-[#0A1628]'
                  : 'bg-white border-[#E2E8F0] text-[#64748B]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredAccesses.map((access, index) => {
            const isLatest = index === 0;
            
            return (
              <motion.div
                key={access.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm ${
                  isLatest && access.status === 'pending' ? 'ring-2 ring-[#2563EB] ring-offset-2' : ''
                }`}
              >
                <div className={`flex ${isLatest ? 'flex-col' : 'flex-row items-center p-3 gap-4'}`}>
                  {/* Photo Section */}
                  <div className={`relative ${isLatest ? 'w-full aspect-square sm:aspect-video bg-gray-100' : 'w-16 h-16 rounded-2xl overflow-hidden shrink-0'}`}>
                    {access.photo ? (
                      <img src={access.photo} alt={access.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center font-bold text-white ${getRoleColor(access.role)} ${isLatest ? 'text-6xl' : 'text-xl'}`}>
                        {initials(access.name)}
                      </div>
                    )}
                    
                    {isLatest && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg ${getRoleColor(access.role)}`}>
                          {access.role}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className={`flex-1 ${isLatest ? 'p-6' : 'min-w-0'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className={`font-bold text-[#0A1628] truncate ${isLatest ? 'text-[22px]' : 'text-[15px]'}`}>
                          {access.name}
                        </h3>
                        {isLatest && <p className="text-[14px] text-gray-500 font-medium">{access.role} &middot; {access.time}</p>}
                      </div>
                      {!isLatest && <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap">{access.time}</span>}
                    </div>

                    {!isLatest && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-[#64748B] bg-gray-100 px-2 py-0.5 rounded">{access.gate}</span>
                        {access.plate && <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">{access.plate}</span>}
                      </div>
                    )}

                    {isLatest && (
                      <>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ubicación</p>
                            <p className="text-[15px] font-bold text-[#0A1628]">{access.gate}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Vehículo</p>
                            <p className="text-[15px] font-bold text-[#2563EB] font-mono">{access.plate || 'Peatonal'}</p>
                          </div>
                        </div>

                        {/* Anomalies and Solutions */}
                        <AnimatePresence>
                          {access.status === 'anomaly' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-6 space-y-4">
                              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                                <div className="flex items-center gap-2 mb-2">
                                  <Warning className="text-amber-600" fontSize="small" />
                                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest">Anomalía Reportada</span>
                                </div>
                                <p className="text-[14px] text-amber-900 italic font-medium">"{access.anomalyDescription}"</p>
                              </div>
                              {access.adminSolution && (
                                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-4 bg-white border border-green-200 rounded-2xl shadow-sm">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Message className="text-green-600" style={{ fontSize: 16 }} />
                                    <span className="text-[11px] font-bold text-green-700 uppercase tracking-widest">Instrucción Administrativa</span>
                                  </div>
                                  <p className="text-[14px] text-gray-800 font-bold">{access.adminSolution}</p>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Actions for latest if pending or needs decision */}
                        {(access.status === 'pending' || (access.status === 'anomaly' && access.adminSolution)) && (
                          <div className="grid grid-cols-3 gap-3 mt-8">
                            <button onClick={() => handleApprove(access.id)} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-100">
                              <CheckCircle className="mb-1" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">Aprobar</span>
                            </button>
                            <button onClick={() => handleReject(access.id)} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-100">
                              <Cancel className="mb-1" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">Rechazar</span>
                            </button>
                            {access.status === 'pending' && (
                              <button onClick={() => setReportingId(access.id)} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-500 text-white hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-100">
                                <Warning className="mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Anomalía</span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* Completed Status */}
                        {access.status !== 'pending' && access.status !== 'anomaly' && (
                          <div className={`mt-8 w-full py-4 flex items-center justify-center gap-3 text-[14px] font-bold text-white uppercase tracking-widest rounded-2xl shadow-lg ${
                            access.status === 'authorized' ? 'bg-[#16A34A] shadow-green-100' : 'bg-[#DC2626] shadow-red-100'
                          }`}>
                            {access.status === 'authorized' ? <CheckCircle /> : <Cancel />}
                            {access.status === 'authorized' ? 'Acceso Autorizado' : 'Acceso Denegado'}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {!isLatest && (
                    <div className="pr-4 text-gray-300">
                      <ArrowForwardIos style={{ fontSize: 14 }} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Anomaly Modal */}
      <AnimatePresence>
        {reportingId && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#0A1628]/60 backdrop-blur-sm">
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl">
              <div className="p-8 bg-[#0A1628] text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    <Warning />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Reportar Anomalía</h3>
                    <p className="text-white/60 text-xs">Se notificará a la administración</p>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <textarea 
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Detalla lo sucedido..."
                  className="w-full h-32 p-5 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-amber-500 transition-all text-[15px] outline-none resize-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setReportingId(null)} className="h-14 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancelar</button>
                  <button disabled={!reportText || isSending} onClick={() => handleSendAnomaly(reportingId)} className="h-14 bg-amber-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-600 disabled:opacity-50 transition-all shadow-lg shadow-amber-100">
                    {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send fontSize="small" />Enviar Aviso</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
