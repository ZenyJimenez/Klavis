import { useState } from "react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import DownloadIcon from "@mui/icons-material/Download"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import TableViewIcon from "@mui/icons-material/TableView"

const puertaData = [
  { name: "Principal", value: 17 },
  { name: "Secundaria", value: 8 },
  { name: "Vehicular N", value: 12 },
  { name: "Vehicular S", value: 6 },
]

const usuarioData = [
  { name: "Alumnos", value: 16 },
  { name: "Docentes", value: 8 },
  { name: "Admin", value: 4 },
  { name: "Visitantes", value: 2 },
]

const horarioData = [
  { time: "06:00", value: 2 },
  { time: "08:00", value: 14 },
  { time: "10:00", value: 5 },
  { time: "12:00", value: 3 },
  { time: "14:00", value: 12 },
  { time: "16:00", value: 4 },
]

const proporcionData = [
  { name: "Autorizados", value: 92 },
  { name: "Rechazados", value: 8 },
]
const COLORS = ["#10B981", "#EF4444", "#3B82F6", "#F59E0B"]

const HISTORIAL_MOCK = Array.from({ length: 10 }, (_, i) => ({
  id: `H-${1000 + i}`,
  nombre: ["Juan Perez", "Maria Garcia", "Carlos Lopez", "Ana Martinez"][i % 4],
  tipo: ["Alumno", "Docente", "Administrativo", "Visitante"][i % 4],
  puerta: ["Principal", "Secundaria", "Vehicular Norte", "Vehicular Sur"][i % 4],
  hora: `0${8 + (i % 6)}:${(i * 7) % 60 < 10 ? '0' : ''}${(i * 7) % 60}`,
  resultado: i % 10 === 0 ? "RECHAZADO" : "AUTORIZADO",
  metodo: i % 3 === 0 ? "RFID" : "Credencial",
}))

// Novedades para Incidencias
const incTipoData = [
  { name: "Mal est.", value: 25 },
  { name: "Objeto", value: 12 },
  { name: "Vandalismo", value: 4 },
  { name: "Acceso", value: 10 },
  { name: "Otro", value: 3 },
]

const incDiaData = [
  { day: "1", val: 2 }, { day: "5", val: 5 }, { day: "10", val: 1 }, 
  { day: "15", val: 4 }, { day: "20", val: 2 }, { day: "25", val: 6 }, { day: "30", val: 3 }
]

const incUbiData = [
  { name: "Est A", value: 15 },
  { name: "Est B", value: 8 },
  { name: "Tierra 1", value: 5 },
  { name: "Principal", value: 12 },
]

// Novedades para Estacionamiento
const estPromData = [
  { name: "Est A", value: 80 },
  { name: "Est B", value: 95 },
  { name: "Est C", value: 60 },
  { name: "Tierra 1", value: 85 },
  { name: "Tierra 2", value: 90 },
]

const estTendData = [
  { day: "Sem 1", val: 65 }, { day: "Sem 2", val: 70 }, { day: "Sem 3", val: 68 }, { day: "Sem 4", val: 75 }
]

const estViolData = [
  { name: "Est A", value: 2 },
  { name: "Est B", value: 5 },
  { name: "Est C", value: 8 },
  { name: "Est D", value: 1 },
]

const CONGESTION_MOCK = [
  { fecha: "12 Oct", zona: "Est. B", hora: "07:30", max: "100%" },
  { fecha: "15 Oct", zona: "Tierra 2", hora: "08:00", max: "100%" },
  { fecha: "18 Oct", zona: "Est. A", hora: "08:15", max: "98%" },
]

export function AdminReports() {
  const [page, setPage] = useState(1)

  return (
    <div className="p-6 md:p-8 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Reportes y Auditoría</h1>
          <p className="text-gray-500 mt-1">Métricas y estadísticas globales del sistema.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm">
            <PictureAsPdfIcon fontSize="small" className="text-red-500" />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm">
            <TableViewIcon fontSize="small" className="text-green-600" />
            Exportar Excel
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: ACCESOS */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#0A1628] border-b border-gray-200 pb-2">Control de Accesos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-1 lg:col-span-2">
            <h3 className="font-bold text-gray-800 mb-4">Accesos por Puerta</h3>
            <div className="h-48 min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart accessibilityLayer={false} id="reports-puerta" data={puertaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-1 lg:col-span-2">
            <h3 className="font-bold text-gray-800 mb-4">Accesos por Horario</h3>
            <div className="h-48 min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <LineChart accessibilityLayer={false} id="reports-horario" data={horarioData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: INCIDENCIAS */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#0A1628] border-b border-gray-200 pb-2">Incidencias</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total mes</span>
            <div className="text-xl font-bold text-[#0A1628] mt-1">54</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tasa resolución</span>
            <div className="text-xl font-bold text-green-600 mt-1">82%</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tiempo prom.</span>
            <div className="text-xl font-bold text-[#2563EB] mt-1">2.4 hrs</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Más frecuente</span>
            <div className="text-xl font-bold text-[#D97706] mt-1">Mal est.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Incidencias por Tipo</h3>
            <div className="h-48 min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart accessibilityLayer={false} id="reports-tipo" data={incTipoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#D97706" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Incidencias por Día (Mes)</h3>
            <div className="h-48 min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <LineChart accessibilityLayer={false} id="reports-dia" data={incDiaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="val" stroke="#DC2626" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Incidencias por Ubicación</h3>
            <div className="h-48 min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart accessibilityLayer={false} id="reports-ubi" data={incUbiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#0A1628" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: ESTACIONAMIENTO */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#0A1628] border-b border-gray-200 pb-2">Estacionamiento</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Mayor rotación</span>
            <div className="text-xl font-bold text-[#0A1628] mt-1">Est. A</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Más violaciones</span>
            <div className="text-xl font-bold text-[#DC2626] mt-1">Est. C</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Hora más congest.</span>
            <div className="text-xl font-bold text-[#D97706] mt-1">08:00 hrs</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Ocupación prom. por zona (Semana)</h3>
            <div className="h-48 min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart accessibilityLayer={false} id="reports-est-prom" data={estPromData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Violaciones por zona (Mes)</h3>
            <div className="h-48 min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart accessibilityLayer={false} id="reports-est-viol" data={estViolData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#DC2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm md:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Días con mayor congestión</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium">
                  <tr>
                    <th className="px-3 py-2 rounded-l-lg">Fecha</th>
                    <th className="px-3 py-2">Zona</th>
                    <th className="px-3 py-2">Pico</th>
                    <th className="px-3 py-2 rounded-r-lg">% Max</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {CONGESTION_MOCK.map((row, i) => (
                    <tr key={i}>
                      <td className="px-3 py-3 text-gray-600 font-medium">{row.fecha}</td>
                      <td className="px-3 py-3 text-gray-900">{row.zona}</td>
                      <td className="px-3 py-3 text-gray-500">{row.hora}</td>
                      <td className="px-3 py-3 text-red-600 font-bold">{row.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
