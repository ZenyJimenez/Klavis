import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import RadarIcon from "@mui/icons-material/Radar"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import PersonIcon from "@mui/icons-material/Person"
import WarningIcon from "@mui/icons-material/Warning"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"
import MessageIcon from "@mui/icons-material/Message"

type AccessStatus = "AUTORIZADO" | "RECHAZADO" | "PENDIENTE" | "ANOMALIA"
type AccessType = "Peatonal" | "Vehicular"

interface AccessRecord {
  id: string
  name: string
  initials: string
  userType: string
  door: string
  time: string
  status: AccessStatus
  type: AccessType
  plate?: string
  anomalyDescription?: string
}

interface Notice {
  id: string
  guardName: string
  description: string
  accessId: string
  time: string
  subject: string
}

const MOCK_RECORDS: AccessRecord[] = [
  { id: "100", name: "Roberto Gómez S.", initials: "RG", userType: "Proveedor", door: "Vehicular Norte", time: "Justo ahora", status: "ANOMALIA", type: "Vehicular", plate: "ABC-1234", anomalyDescription: "El proveedor indica que su QR expiró hace 10 minutos por retraso en tráfico." },
  { id: "1", name: "Carlos Mendoza", initials: "CM", userType: "Docente", door: "Principal", time: "08:15", status: "AUTORIZADO", type: "Peatonal" },
  { id: "2", name: "Ana Sofia Reyes", initials: "AR", userType: "Alumno", door: "Vehicular Norte", time: "08:18", status: "AUTORIZADO", type: "Vehicular", plate: "ABC-123" },
]

export function AdminRealTime() {
  const [records, setRecords] = useState<AccessRecord[]>(MOCK_RECORDS)
  const [statusFilter, setStatusFilter] = useState<"Todos" | AccessStatus>("Todos")
  const [typeFilter, setTypeFilter] = useState<"General" | AccessType>("General")
  const [lastUpdate, setLastUpdate] = useState("hace 5s")
  
  // Notices states
  const [notices, setNotices] = useState<Notice[]>([
    { id: "n1", guardName: "José Pérez", subject: "Anomalía en Acceso", description: "El proveedor Roberto Gómez indica que su QR expiró hace 10 minutos por retraso en tráfico.", accessId: "100", time: "Ahora" }
  ])
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [solutionText, setSolutionText] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(prev => {
        if (prev === "hace 5s") return "hace 10s"
        if (prev === "hace 10s") return "hace 15s"
        return "hace 5s"
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSendSolution = () => {
    // In a real app, this would notify the guard
    setNotices(prev => prev.filter(n => n.id !== selectedNotice?.id))
    setSelectedNotice(null)
    setSolutionText("")
    // Mocking the result in the records list
    setRecords(prev => prev.map(r => r.id === selectedNotice?.accessId ? { ...r, status: 'PENDIENTE' } : r))
  }

  const filteredRecords = records.filter(record => {
    const matchStatus = statusFilter === "Todos" || record.status === statusFilter
    const matchType = typeFilter === "General" || record.type === typeFilter
    return matchStatus && matchSearch(record)
  })

  function matchSearch(r: AccessRecord) {
    return true // Simplified for now
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1628]">Monitoreo en Tiempo Real</h1>
            <p className="text-gray-500 mt-1">Supervisión de accesos en vivo en todas las puertas.</p>
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full border border-red-100 shadow-sm">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center justify-center"
            >
              <FiberManualRecordIcon className="w-3 h-3 text-red-600" />
            </motion.div>
            <span className="text-sm font-medium">En vivo · {lastUpdate}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700 w-16">Estatus:</span>
            {(["Todos", "AUTORIZADO", "RECHAZADO", "PENDIENTE", "ANOMALIA"] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? "bg-[#2563EB] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecords.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white border rounded-xl p-5 shadow-sm flex flex-col gap-4 ${record.status === 'ANOMALIA' ? 'border-amber-400 ring-1 ring-amber-100' : 'border-gray-100'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${record.status === 'ANOMALIA' ? 'bg-amber-100 text-amber-700' : 'bg-[#0A1628]/10 text-[#0A1628]'}`}>
                    {record.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A1628]">{record.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      {record.type === "Vehicular" ? <DirectionsCarIcon className="w-4 h-4" /> : <PersonIcon className="w-4 h-4" />}
                      {record.userType}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700">{record.time}</span>
              </div>

              {record.anomalyDescription && (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-xs font-bold text-amber-700 uppercase mb-1 flex items-center gap-1">
                    <WarningIcon style={{ fontSize: 12 }} /> Anomalía reportada
                  </p>
                  <p className="text-[13px] text-amber-900 italic">"{record.anomalyDescription}"</p>
                </div>
              )}

              <div className="flex items-center gap-2 mt-auto pt-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${
                  record.status === "AUTORIZADO" ? "bg-green-100 text-green-700" :
                  record.status === "RECHAZADO" ? "bg-red-100 text-red-700" :
                  record.status === "ANOMALIA" ? "bg-amber-500 text-white" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {record.status}
                </span>
                {record.plate && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wide bg-blue-50 text-[#2563EB] border border-blue-100">
                    {record.plate}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notices Sidebar */}
      <aside className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
          <div className="p-4 bg-[#0A1628] text-white flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <MessageIcon fontSize="small" />
              Avisos del Personal
            </h3>
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {notices.length} NUEVO
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {notices.length > 0 ? (
              notices.map(notice => (
                <button 
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">{notice.subject}</span>
                    <span className="text-[10px] text-gray-400">{notice.time}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#0A1628] mb-1">{notice.guardName}</h4>
                  <p className="text-[12px] text-gray-500 line-clamp-2">{notice.description}</p>
                </button>
              ))
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center opacity-40">
                <CheckCircle sx={{ fontSize: 40 }} className="text-gray-300 mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">Sin avisos pendientes</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Solution Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Responder a Aviso</h3>
                  <p className="text-xs text-gray-500">De: {selectedNotice.guardName}</p>
                </div>
                <button onClick={() => setSelectedNotice(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">Problema reportado</p>
                  <p className="text-sm text-amber-900 leading-relaxed italic">"{selectedNotice.description}"</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Enviar Solución al Guardia</label>
                  <textarea 
                    value={solutionText}
                    onChange={(e) => setSolutionText(e.target.value)}
                    placeholder="Indica las instrucciones para el guardia..."
                    className="w-full h-32 p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedNotice(null)}
                    className="flex-1 h-12 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    Cerrar
                  </button>
                  <button 
                    disabled={!solutionText}
                    onClick={handleSendSolution}
                    className="flex-1 h-12 bg-[#2563EB] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md"
                  >
                    <SendIcon fontSize="small" />
                    Enviar Solución
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
