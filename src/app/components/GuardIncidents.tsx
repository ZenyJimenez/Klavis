import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ReportProblem, Close } from "@mui/icons-material"

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
  status: string;
  sev: string;
  reportedBy: string;
  date: string;
  resolution?: Resolution;
}

export function GuardIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 1, folio: "INC-2026-042", type: "Mal estacionado", loc: "Est. A", status: "Pendiente", sev: "Alta", reportedBy: "Carlos Hernández", date: "Hoy 08:25" },
    { id: 2, folio: "INC-2026-043", type: "Objeto perdido", loc: "Edificio L", status: "En revisión", sev: "Baja", reportedBy: "Ana López", date: "Hoy 09:10" },
  ])

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [filter, setFilter] = useState("Todas")

  // Resolution form state
  const [isResolving, setIsResolving] = useState(false)
  const [resolvedBy, setResolvedBy] = useState("")
  const [solution, setSolution] = useState("")
  
  const now = new Date()
  // format to YYYY-MM-DDThh:mm
  const defaultDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  const [resolveDateTime, setResolveDateTime] = useState(defaultDateTime)

  const filteredIncidents = incidents.filter(inc => {
    if (filter === "Todas") return true
    if (filter === "Pendientes") return inc.status === "Pendiente"
    if (filter === "En Revisión") return inc.status === "En revisión"
    if (filter === "Resueltas") return inc.status === "Resuelto"
    return true
  })

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedIncident) return

    const newResolution: Resolution = {
      resolvedBy,
      solution,
      datetime: resolveDateTime
    }

    setIncidents(incidents.map(i => i.id === selectedIncident.id ? {
      ...i, 
      status: "Resuelto",
      resolution: newResolution
    } : i))
    
    setSelectedIncident(null)
    setIsResolving(false)
    setResolvedBy("")
    setSolution("")
  }

  const openIncident = (inc: Incident) => {
    setSelectedIncident(inc)
    setIsResolving(false)
    setResolvedBy("Guardia Turno 1") // default name
    setSolution("")
    setResolveDateTime(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16))
  }

  return (
    <div className="p-4 md:p-6 space-y-4 font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-[#0A1628]">Incidentes</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["Todas", "Pendientes", "En Revisión", "Resueltas"].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
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
            className="bg-white p-4 rounded-xl shadow-sm border border-[#E2E8F0] active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{inc.folio}</span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                inc.status === 'Pendiente' ? 'bg-amber-100 text-amber-700' : 
                inc.status === 'Resuelto' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {inc.status}
              </span>
            </div>
            <div className="flex gap-3 mt-2">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <ReportProblem className="text-[#64748B]" fontSize="small" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0A1628] text-sm">{inc.type}</h4>
                <p className="text-xs text-[#64748B] mt-0.5">{inc.loc} · {inc.date}</p>
                <p className="text-xs font-medium text-[#64748B] mt-1">Por: {inc.reportedBy}</p>
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
                {!isResolving ? (
                  <>
                    <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                      <span className="text-[#64748B] font-medium text-sm">Foto adjunta</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Folio</span>
                        <span className="font-mono text-[#0A1628] font-medium text-sm">{selectedIncident.folio}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Estatus</span>
                        <span className={`font-bold text-sm ${
                          selectedIncident.status === 'Pendiente' ? 'text-amber-600' : 
                          selectedIncident.status === 'Resuelto' ? 'text-green-600' :
                          'text-blue-600'
                        }`}>{selectedIncident.status}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Tipo</span>
                        <span className="font-bold text-[#0A1628]">{selectedIncident.type}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Ubicación</span>
                        <span className="text-[#0A1628] text-sm">{selectedIncident.loc}</span>
                      </div>
                    </div>

                    {selectedIncident.status === "Resuelto" && selectedIncident.resolution && (
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100 space-y-3">
                        <h4 className="font-bold text-green-800 text-sm flex items-center gap-2">
                          Detalles de Resolución
                        </h4>
                        <div className="grid grid-cols-1 gap-2 text-sm text-green-900">
                          <div><span className="font-semibold">Responsable:</span> {selectedIncident.resolution.resolvedBy}</div>
                          <div><span className="font-semibold">Fecha y Hora:</span> {new Date(selectedIncident.resolution.datetime).toLocaleString()}</div>
                          <div><span className="font-semibold">Solución:</span> {selectedIncident.resolution.solution}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <form id="resolve-form" onSubmit={handleResolveSubmit} className="space-y-4">
                    <h4 className="font-bold text-[#0A1628] border-b border-gray-100 pb-2">Hacerse responsable y resolver</h4>
                    
                    <div>
                      <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Nombre del que resolvió</label>
                      <input 
                        type="text" 
                        required
                        value={resolvedBy}
                        onChange={e => setResolvedBy(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Fecha y Hora</label>
                      <input 
                        type="datetime-local" 
                        required
                        value={resolveDateTime}
                        onChange={e => setResolveDateTime(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Solución aplicada</label>
                      <textarea 
                        required
                        value={solution}
                        onChange={e => setSolution(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]" 
                        placeholder="Describe cómo se solucionó el incidente..."
                      />
                    </div>
                  </form>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-100 shrink-0 bg-white">
                {!isResolving ? (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedIncident.status !== "Resuelto" ? (
                      <>
                        <button 
                          onClick={() => setIncidents(incidents.map(i => i.id === selectedIncident.id ? {...i, status: "En revisión"} : i))}
                          className="bg-blue-50 text-[#2563EB] font-bold py-3 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors text-sm"
                        >
                          En Revisión
                        </button>
                        <button 
                          onClick={() => setIsResolving(true)}
                          className="bg-[#16A34A] text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors text-sm shadow-sm"
                        >
                          Resolver Incidente
                        </button>
                      </>
                    ) : (
                       <button 
                         onClick={() => setSelectedIncident(null)}
                         className="col-span-2 bg-[#F1F5F9] text-[#0A1628] font-bold py-3 rounded-xl hover:bg-[#E2E8F0] transition-colors text-sm"
                       >
                         Cerrar
                       </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsResolving(false)}
                      className="bg-white text-[#64748B] border border-[#E2E8F0] font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      form="resolve-form"
                      className="bg-[#16A34A] text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors text-sm shadow-sm"
                    >
                      Guardar Resolución
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
