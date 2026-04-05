import { useState, useEffect } from "react"
import { motion } from "motion/react"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import RadarIcon from "@mui/icons-material/Radar"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import PersonIcon from "@mui/icons-material/Person"

type AccessStatus = "AUTORIZADO" | "RECHAZADO" | "PENDIENTE"
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
}

const MOCK_RECORDS: AccessRecord[] = [
  { id: "1", name: "Carlos Mendoza", initials: "CM", userType: "Docente", door: "Principal", time: "08:15", status: "AUTORIZADO", type: "Peatonal" },
  { id: "2", name: "Ana Sofia Reyes", initials: "AR", userType: "Alumno", door: "Vehicular Norte", time: "08:18", status: "AUTORIZADO", type: "Vehicular", plate: "ABC-123" },
  { id: "3", name: "Luis Fernandez", initials: "LF", userType: "Administrativo", door: "Secundaria", time: "08:20", status: "PENDIENTE", type: "Peatonal" },
  { id: "4", name: "Maria Garcia", initials: "MG", userType: "Visitante", door: "Principal", time: "08:22", status: "RECHAZADO", type: "Peatonal" },
  { id: "5", name: "Roberto Diaz", initials: "RD", userType: "Alumno", door: "Vehicular Sur", time: "08:25", status: "AUTORIZADO", type: "Vehicular", plate: "XYZ-789" },
  { id: "6", name: "Elena Rojas", initials: "ER", userType: "Docente", door: "Principal", time: "08:30", status: "AUTORIZADO", type: "Peatonal" },
  { id: "7", name: "Jorge Silva", initials: "JS", userType: "Administrativo", door: "Vehicular Norte", time: "08:33", status: "RECHAZADO", type: "Vehicular", plate: "MNO-456" },
  { id: "8", name: "Lucia Ortiz", initials: "LO", userType: "Alumno", door: "Secundaria", time: "08:35", status: "AUTORIZADO", type: "Peatonal" },
  { id: "9", name: "Fernando Lopez", initials: "FL", userType: "Visitante", door: "Vehicular Sur", time: "08:40", status: "PENDIENTE", type: "Vehicular", plate: "DEF-321" },
  { id: "10", name: "Carmen Ruiz", initials: "CR", userType: "Docente", door: "Principal", time: "08:42", status: "AUTORIZADO", type: "Peatonal" },
  { id: "11", name: "Diego Torres", initials: "DT", userType: "Alumno", door: "Vehicular Norte", time: "08:45", status: "AUTORIZADO", type: "Vehicular", plate: "GHI-654" },
  { id: "12", name: "Patricia Vega", initials: "PV", userType: "Administrativo", door: "Principal", time: "08:50", status: "AUTORIZADO", type: "Peatonal" },
  { id: "13", name: "Ricardo Salas", initials: "RS", userType: "Visitante", door: "Secundaria", time: "08:55", status: "RECHAZADO", type: "Peatonal" },
  { id: "14", name: "Valeria Castro", initials: "VC", userType: "Alumno", door: "Vehicular Sur", time: "09:00", status: "AUTORIZADO", type: "Vehicular", plate: "JKL-987" },
  { id: "15", name: "Andres Morales", initials: "AM", userType: "Docente", door: "Vehicular Norte", time: "09:05", status: "PENDIENTE", type: "Vehicular", plate: "PQR-123" },
  { id: "16", name: "Silvia Navarro", initials: "SN", userType: "Administrativo", door: "Principal", time: "09:10", status: "AUTORIZADO", type: "Peatonal" },
  { id: "17", name: "Hector Luna", initials: "HL", userType: "Alumno", door: "Secundaria", time: "09:15", status: "AUTORIZADO", type: "Peatonal" },
  { id: "18", name: "Gabriela Rios", initials: "GR", userType: "Visitante", door: "Vehicular Sur", time: "09:20", status: "RECHAZADO", type: "Vehicular", plate: "STU-456" },
  { id: "19", name: "Oscar Peña", initials: "OP", userType: "Docente", door: "Principal", time: "09:25", status: "AUTORIZADO", type: "Peatonal" },
  { id: "20", name: "Daniela Cruz", initials: "DC", userType: "Alumno", door: "Vehicular Norte", time: "09:30", status: "AUTORIZADO", type: "Vehicular", plate: "VWX-789" },
]

export function AdminRealTime() {
  const [statusFilter, setStatusFilter] = useState<"Todos" | AccessStatus>("Todos")
  const [typeFilter, setTypeFilter] = useState<"General" | AccessType>("General")
  const [lastUpdate, setLastUpdate] = useState("hace 5s")

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(prev => {
        if (prev === "hace 5s") return "hace 10s"
        if (prev === "hace 10s") return "hace 15s"
        return "hace 5s" // simulate a refresh
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredRecords = MOCK_RECORDS.filter(record => {
    const matchStatus = statusFilter === "Todos" || record.status === statusFilter
    const matchType = typeFilter === "General" || record.type === typeFilter
    return matchStatus && matchType
  })

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
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
          <span className="text-sm font-medium">En vivo · Última actualización: {lastUpdate}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700 w-16">Estatus:</span>
          {(["Todos", "AUTORIZADO", "RECHAZADO", "PENDIENTE"] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-[#2563EB] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status === "AUTORIZADO" ? "Autorizados" : status === "RECHAZADO" ? "Denegados" : status === "PENDIENTE" ? "Pendientes" : "Todos"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700 w-16">Tipo:</span>
          {(["General", "Peatonal", "Vehicular"] as const).map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                typeFilter === type
                  ? "bg-[#2563EB] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0A1628]/10 text-[#0A1628] flex items-center justify-center font-bold text-lg">
                    {record.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A1628]">{record.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      {record.type === "Vehicular" ? (
                        <DirectionsCarIcon className="w-4 h-4" />
                      ) : (
                        <PersonIcon className="w-4 h-4" />
                      )}
                      {record.userType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-700">{record.time}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between text-sm">
                <span className="text-gray-600">Puerta:</span>
                <span className="font-medium text-gray-900">{record.door}</span>
              </div>

              <div className="flex items-center gap-2 mt-auto pt-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${
                  record.status === "AUTORIZADO" ? "bg-green-100 text-green-700" :
                  record.status === "RECHAZADO" ? "bg-red-100 text-red-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {record.status}
                </span>
                {record.type === "Vehicular" && record.plate && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wide bg-blue-50 text-[#2563EB] border border-blue-100">
                    {record.plate}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-sm h-64">
          <RadarIcon className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No hay accesos registrados en este momento</h3>
          <p className="text-gray-500">Prueba cambiando los filtros de búsqueda o espera nuevos registros.</p>
        </div>
      )}
    </div>
  )
}
