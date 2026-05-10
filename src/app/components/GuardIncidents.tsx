import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ReportProblem, Close, Add, Warning, Map, Person, AccessTime } from "@mui/icons-material"

interface Resolution {
  resolvedBy: string;
  solution: string;
  datetime: string;
}

interface Incident {
  id: number;
  folio: string;
  type: string;
  loc: string;
  status: "Pendiente" | "Accedió" | "Anomalía" | "Rechazado";
  sev: string;
  reportedBy: string;
  date: string;
  resolution?: Resolution;
  comment?: string;
}

export function GuardIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 1, folio: "ACC-2026-042", type: "Acceso Proveedor", loc: "Vehicular Norte", status: "Pendiente", sev: "Alta", reportedBy: "Sistema", date: "Hoy 08:25" },
    { id: 2, folio: "ACC-2026-043", type: "Acceso Alumno", loc: "Principal", status: "Accedió", sev: "Baja", reportedBy: "Guardia Turno 1", date: "Hoy 09:10", comment: "Entró con material de laboratorio" },
  ])

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [filter, setFilter] = useState("Todas")
  const [isRegistering, setIsRegistering] = useState(false)

  // New incident form state
  const [newType, setNewType] = useState("")
  const [newLoc, setNewLoc] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [isSendingNew, setIsSendingNew] = useState(false)

  // Resolution form state
  const [solution, setSolution] = useState("")

  const filteredIncidents = incidents.filter(inc => {
    if (filter === "Todas") return true
    return inc.status === filter || (filter === "Pendientes" && inc.status === "Pendiente")
  })

  const handleUpdateStatus = (id: number, newStatus: "Accedió" | "Anomalía" | "Rechazado", commentText: string) => {
    setIncidents(prev => prev.map(i => i.id === id ? { 
      ...i, 
      status: newStatus, 
      comment: commentText,
      date: "Hoy " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : i))
    setSelectedIncident(null)
    setSolution("")
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingNew(true)
    setTimeout(() => {
      const newInc: Incident = {
        id: Date.now(),
        folio: `INC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        type: newType,
        loc: newLoc,
        status: "Anomalía",
        sev: "Media",
        reportedBy: "Guardia Turno 1",
        date: "Hoy " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        comment: newDesc
      }
      setIncidents([newInc, ...incidents])
      setIsRegistering(false)
      setIsSendingNew(false)
      setNewType("")
      setNewLoc("")
      setNewDesc("")
    }, 1000)
  }

  const openIncident = (inc: Incident) => {
    setSelectedIncident(inc)
    setSolution("")
  }

  return (
    <div className="p-4 md:p-6 space-y-4 font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-[#0A1628]">Incidentes</h1>
        <button 
          onClick={() => setIsRegistering(true)}
          className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Add fontSize="small" />
          Registrar Incidente
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["Todas", "Pendientes", "Accedió", "Anomalía", "Rechazado"].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${
              filter === f ? "bg-[#0A1628] text-white border-[#0A1628]" : "bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#0A1628]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredIncidents.map(inc => (
          <div 
            key={inc.id} 
            onClick={() => openIncident(inc)}
            className="bg-white p-4 rounded-xl shadow-sm border border-[#E2E8F0] active:scale-[0.98] transition-transform cursor-pointer hover:border-[#2563EB]/30"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{inc.folio}</span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-sm ${
                inc.status === 'Pendiente' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                inc.status === 'Accedió' ? 'bg-green-100 text-green-700 border border-green-200' :
                inc.status === 'Rechazado' ? 'bg-red-100 text-red-700 border border-red-200' :
                'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>
                {inc.status}
              </span>
            </div>
            <div className="flex gap-3 mt-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                inc.status === 'Accedió' ? 'bg-green-50 text-green-600' : 
                inc.status === 'Rechazado' ? 'bg-red-50 text-red-600' : 
                'bg-gray-50 text-gray-400'
              }`}>
                <ReportProblem fontSize="small" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0A1628] text-sm truncate">{inc.type}</h4>
                <p className="text-xs text-[#64748B] mt-0.5 font-medium">{inc.loc} &middot; {inc.date}</p>
                
                {inc.comment && (
                  <div className="mt-2 p-2 bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg">
                    <p className="text-[11px] text-[#64748B] italic">"{inc.comment}"</p>
                  </div>
                )}

                {inc.status === "Resuelto" && inc.resolution && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded text-xs text-green-800">
                    <span className="font-bold">Resuelto por:</span> {inc.resolution.resolvedBy}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredIncidents.length === 0 && (
           <div className="text-center py-10 text-[#64748B]">
             No se encontraron incidentes.
           </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <div className="fixed inset-0 z-50 bg-[#0A1628]/40 flex justify-center items-end md:items-center p-0 md:p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="bg-white w-full max-w-lg rounded-t-2xl md:rounded-2xl flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden shadow-xl"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                <h3 className="font-bold text-lg text-[#0A1628]">Detalle de Incidente</h3>
                <button onClick={() => setSelectedIncident(null)} className="p-1 text-[#64748B] hover:text-[#0A1628] transition-colors"><Close /></button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-5">
                <div className="w-full h-40 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
                  <span className="text-[#64748B] font-bold text-sm">Sin imagen adjunta</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Folio</span>
                    <span className="font-mono text-[#0A1628] font-bold text-sm bg-gray-50 px-2 py-1 rounded">{selectedIncident.folio}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Estatus Actual</span>
                    <span className={`font-bold text-sm ${
                      selectedIncident.status === 'Pendiente' ? 'text-blue-600' : 
                      selectedIncident.status === 'Accedió' ? 'text-green-600' :
                      selectedIncident.status === 'Rechazado' ? 'text-red-600' :
                      'text-amber-600'
                    }`}>{selectedIncident.status}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Tipo de Registro</span>
                    <span className="font-bold text-[#0A1628] text-lg">{selectedIncident.type}</span>
                  </div>
                </div>

                {selectedIncident.status === "Pendiente" && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Comentarios / Notas</label>
                      <textarea 
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder="Escribe alguna observación sobre este acceso..."
                        className="w-full h-24 p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <button 
                        onClick={() => handleUpdateStatus(selectedIncident.id, "Accedió", solution)}
                        className="w-full h-12 bg-[#16A34A] text-white font-bold rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                      >
                        Marcar que ACCEDIÓ
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => handleUpdateStatus(selectedIncident.id, "Rechazado", solution)}
                          className="h-12 bg-[#DC2626] text-white font-bold rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                        >
                          RECHAZAR
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(selectedIncident.id, "Anomalía", solution)}
                          className="h-12 bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-100 hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                        >
                          ANOMALÍA
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedIncident.comment && selectedIncident.status !== "Pendiente" && (
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2">
                    <h4 className="font-bold text-[#64748B] text-[10px] uppercase tracking-widest">Nota del Guardia</h4>
                    <p className="text-sm text-[#0A1628] font-medium italic">"{selectedIncident.comment}"</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-100 shrink-0 bg-white">
                <button 
                   onClick={() => setSelectedIncident(null)}
                   className="w-full h-12 bg-gray-100 text-[#0A1628] font-bold rounded-xl hover:bg-gray-200 transition-all"
                 >
                   Cerrar
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {isRegistering && (
          <div className="fixed inset-0 z-50 bg-[#0A1628]/40 flex justify-center items-end md:items-center p-0 md:p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="bg-white w-full max-w-lg rounded-t-[32px] md:rounded-[32px] flex flex-col max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="p-8 bg-[#0A1628] text-white shrink-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                      <Warning />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Nuevo Incidente</h3>
                      <p className="text-white/60 text-xs">Reportar anomalía detectada</p>
                    </div>
                  </div>
                  <button onClick={() => setIsRegistering(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
                    <Close />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto flex-1">
                <form id="new-incident-form" onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                      <ReportProblem className="text-amber-500" sx={{ fontSize: 14 }} />
                      Tipo de Incidente
                    </label>
                    <select 
                      required
                      value={newType}
                      onChange={e => setNewType(e.target.value)}
                      className="w-full h-14 bg-gray-50 border-none rounded-2xl px-5 text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none transition-all appearance-none"
                    >
                      <option value="">Seleccionar tipo...</option>
                      <option value="Vehículo Mal Estacionado">Vehículo Mal Estacionado</option>
                      <option value="Objeto Perdido">Objeto Perdido</option>
                      <option value="Comportamiento Sospechoso">Comportamiento Sospechoso</option>
                      <option value="Daño a Propiedad">Daño a Propiedad</option>
                      <option value="Acceso No Autorizado">Acceso No Autorizado</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                      <Map className="text-blue-500" sx={{ fontSize: 14 }} />
                      Ubicación
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Ej. Estacionamiento C, Pasillo 3..."
                      value={newLoc}
                      onChange={e => setNewLoc(e.target.value)}
                      className="w-full h-14 bg-gray-50 border-none rounded-2xl px-5 text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                      Descripción de los hechos
                    </label>
                    <textarea 
                      required
                      placeholder="Describe lo ocurrido con el mayor detalle posible..."
                      value={newDesc}
                      onChange={e => setNewDesc(e.target.value)}
                      className="w-full h-32 bg-gray-50 border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none resize-none transition-all"
                    />
                  </div>
                </form>
              </div>

              <div className="p-8 border-t border-gray-100 bg-white grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="h-14 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  form="new-incident-form"
                  disabled={isSendingNew}
                  className="h-14 bg-[#2563EB] text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                >
                  {isSendingNew ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Reportar Ahora"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
