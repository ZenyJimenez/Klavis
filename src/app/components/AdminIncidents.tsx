import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import InventoryIcon from "@mui/icons-material/Inventory"
import BuildIcon from "@mui/icons-material/Build"
import AddIcon from "@mui/icons-material/Add"
import ShieldIcon from "@mui/icons-material/Shield"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import TableViewIcon from "@mui/icons-material/TableView"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type Severity = "Alta" | "Media" | "Baja"
type Status = "Pendiente" | "En revisión" | "Resuelto"
type IncidentType = "Mal estacionado" | "Objeto perdido" | "Vandalismo" | "Acceso no autorizado" | "Otro"

interface Incident {
  id: string
  folio: string
  type: IncidentType
  description: string
  reportedBy: string
  location: string
  datetime: string
  severity: Severity
  status: Status
  assignedTo?: string
}

const INITIAL_MOCK: Incident[] = [
  {
    id: "1",
    folio: "INC-2026-001",
    type: "Mal estacionado",
    description: "Vehículo obstruyendo paso peatonal",
    reportedBy: "Carlos Hernández",
    location: "Est. A",
    datetime: "Hoy 08:25",
    severity: "Alta",
    status: "Pendiente",
  },
  {
    id: "2",
    folio: "INC-2026-002",
    type: "Acceso no autorizado",
    description: "Intento de acceso por zona restringida",
    reportedBy: "María García",
    location: "Entrada Principal",
    datetime: "Hoy 07:10",
    severity: "Alta",
    status: "Resuelto",
    assignedTo: "Juan Sánchez"
  },
  {
    id: "3",
    folio: "INC-2026-003",
    type: "Vandalismo",
    description: "Graffiti en muro lateral",
    reportedBy: "Luis Ramírez",
    location: "Est. C",
    datetime: "Ayer 22:40",
    severity: "Media",
    status: "En revisión",
  },
  {
    id: "4",
    folio: "INC-2026-004",
    type: "Objeto perdido",
    description: "Mochila negra olvidada en banca",
    reportedBy: "Ana López",
    location: "Edificio F",
    datetime: "Hoy 11:00",
    severity: "Baja",
    status: "Pendiente",
  }
]

const TYPE_DATA = [
  { name: "Mal estacionado", value: 12 },
  { name: "Objeto perdido", value: 8 },
  { name: "Vandalismo", value: 3 },
  { name: "Acceso", value: 5 },
  { name: "Otro", value: 2 },
]

const MONTH_DATA = [
  { day: "1", value: 2 },
  { day: "5", value: 5 },
  { day: "10", value: 3 },
  { day: "15", value: 7 },
  { day: "20", value: 4 },
  { day: "25", value: 8 },
  { day: "30", value: 6 },
]

export function AdminIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_MOCK)
  const [statusFilter, setStatusFilter] = useState<"Todas" | Status>("Todas")
  const [typeFilter, setTypeFilter] = useState<"Todas" | IncidentType>("Todas")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filtered = incidents.filter(inc => {
    const stMatch = statusFilter === "Todas" || inc.status === statusFilter
    const tyMatch = typeFilter === "Todas" || inc.type === typeFilter
    return stMatch && tyMatch
  })

  const kpis = {
    total: incidents.filter(i => i.datetime.includes("Hoy")).length,
    pendientes: incidents.filter(i => i.status === "Pendiente").length,
    revision: incidents.filter(i => i.status === "En revisión").length,
    resueltas: incidents.filter(i => i.status === "Resuelto").length,
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "Mal estacionado": return <DirectionsCarIcon className="text-gray-500" />
      case "Acceso no autorizado": return <PersonOffIcon className="text-gray-500" />
      case "Vandalismo": return <BuildIcon className="text-gray-500" />
      case "Objeto perdido": return <InventoryIcon className="text-gray-500" />
      default: return <HelpOutlineIcon className="text-gray-500" />
    }
  }

  const handleResolve = (id: string) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: "Resuelto" as Status } : inc))
  }

  const toggleSelect = (id: string) => {
    const newSel = new Set(selectedIds)
    if (newSel.has(id)) newSel.delete(id)
    else newSel.add(id)
    setSelectedIds(newSel)
  }

  const resolveSelected = () => {
    setIncidents(prev => prev.map(inc => selectedIds.has(inc.id) ? { ...inc, status: "Resuelto" } : inc))
    setSelectedIds(new Set())
  }

  const [formData, setFormData] = useState({
    type: "Otro" as IncidentType,
    description: "",
    location: "",
    severity: "Media" as Severity,
    assignedTo: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newInc: Incident = {
      id: Date.now().toString(),
      folio: `INC-2026-00${incidents.length + 1}`,
      type: formData.type,
      description: formData.description,
      reportedBy: "Admin",
      location: formData.location,
      severity: formData.severity,
      status: "Pendiente",
      assignedTo: formData.assignedTo || undefined,
      datetime: "Ahora"
    }
    setIncidents(prev => [newInc, ...prev])
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Módulo de Incidentes</h1>
          <p className="text-gray-500 mt-1">Gestión avanzada de reportes y eventos de seguridad.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#0A1628] rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm">
            <PictureAsPdfIcon fontSize="small" className="text-red-600" />
            PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#0A1628] rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm">
            <TableViewIcon fontSize="small" className="text-green-600" />
            Excel
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2563EB] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm font-medium whitespace-nowrap"
          >
            <AddIcon fontSize="small" />
            Nuevo Incidente
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Hoy</span>
          <span className="text-2xl font-bold text-[#0A1628] mt-1">{kpis.total}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-[#D97706] font-bold uppercase tracking-wider">Pendientes</span>
          <span className="text-2xl font-bold text-[#D97706] mt-1">{kpis.pendientes}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-[#2563EB] font-bold uppercase tracking-wider">En Revisión</span>
          <span className="text-2xl font-bold text-[#2563EB] mt-1">{kpis.revision}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-[#16A34A] font-bold uppercase tracking-wider">Resueltas</span>
          <span className="text-2xl font-bold text-[#16A34A] mt-1">{kpis.resueltas}</span>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Estatus:</span>
            {(["Todas", "Pendiente", "En revisión", "Resuelto"] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  statusFilter === st
                    ? "bg-[#0A1628] text-white border-[#0A1628]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Tipo:</span>
            {(["Todas", "Mal estacionado", "Objeto perdido", "Vandalismo", "Acceso no autorizado", "Otro"] as const).map(ty => (
              <button
                key={ty}
                onClick={() => setTypeFilter(ty)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  typeFilter === ty
                    ? "bg-[#2563EB] text-white border-[#2563EB]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {ty}
              </button>
            ))}
          </div>
        </div>
        
        {selectedIds.size > 0 && (
          <button
            onClick={resolveSelected}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm animate-pulse"
          >
            <CheckBoxIcon fontSize="small" />
            Marcar seleccionadas ({selectedIds.size}) como resueltas
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.length > 0 ? (
            filtered.map(inc => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white p-4 rounded-xl border ${selectedIds.has(inc.id) ? 'border-[#2563EB] ring-1 ring-[#2563EB]' : 'border-gray-100'} shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <button 
                    onClick={() => toggleSelect(inc.id)}
                    className="mt-1 text-gray-400 hover:text-[#2563EB] transition-colors"
                  >
                    {selectedIds.has(inc.id) ? <CheckBoxIcon className="text-[#2563EB]" /> : <CheckBoxOutlineBlankIcon />}
                  </button>
                  <div className="p-3 bg-gray-50 rounded-full shrink-0">
                    {getIcon(inc.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{inc.folio}</span>
                      <h3 className="font-bold text-[#0A1628] text-lg leading-none">{inc.type}</h3>
                    </div>
                    <p className="text-gray-700">{inc.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{inc.reportedBy}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">{inc.location}</span>
                      <span>&bull;</span>
                      <span>{inc.datetime}</span>
                    </div>
                    {inc.assignedTo && (
                      <div className="text-sm mt-1">
                        <span className="text-gray-500">Atendido por: </span>
                        <span className="font-medium text-gray-800">{inc.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 pl-10 md:pl-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide border ${
                      inc.severity === "Alta" ? "bg-red-50 text-red-700 border-red-200" :
                      inc.severity === "Media" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {inc.severity.toUpperCase()}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide border ${
                      inc.status === "Resuelto" ? "bg-green-50 text-green-700 border-green-200" :
                      inc.status === "En revisión" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {inc.status.toUpperCase()}
                    </span>
                  </div>

                  {inc.status !== "Resuelto" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleResolve(inc.id)}
                        className="px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                      >
                        Resolver
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center shadow-sm"
            >
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                <ShieldIcon sx={{ fontSize: 40 }} />
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">No hay incidentes</h3>
              <p className="text-gray-500 max-w-md">No se encontraron resultados para los filtros aplicados.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#0A1628] mb-4">Incidentes por tipo (Semana)</h3>
          <div className="h-48 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
              <BarChart accessibilityLayer={false} id="incidents-bar" data={TYPE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#0A1628] mb-4">Incidentes por día (Mes)</h3>
          <div className="h-48 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
              <LineChart accessibilityLayer={false} id="incidents-line" data={MONTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#DC2626" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Modal Nuevo Incidente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A1628]/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-[#0A1628]">Registrar Incidente (Manual)</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Evento</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as IncidentType })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                >
                  <option value="Mal estacionado">Mal estacionado</option>
                  <option value="Objeto perdido">Objeto perdido</option>
                  <option value="Vandalismo">Vandalismo</option>
                  <option value="Acceso no autorizado">Acceso no autorizado</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[80px]"
                  placeholder="Describe los detalles..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    placeholder="Ej. Est. A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Severidad</label>
                  <select
                    value={formData.severity}
                    onChange={e => setFormData({ ...formData, severity: e.target.value as Severity })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Responsable Asignado</label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="Nombre del guardia o área"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0A1628] hover:bg-[#112240] text-white font-medium rounded-lg transition-colors shadow-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
