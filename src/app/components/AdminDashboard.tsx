import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { 
  SupervisedUserCircle, 
  VerifiedUser, 
  Person, 
  DoorFront,
  Notifications
} from "@mui/icons-material"
import { Card, Badge } from "./ui"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const accessData = [
  { time: "07:00", count: 45 },
  { time: "08:00", count: 120 },
  { time: "09:00", count: 65 },
  { time: "10:00", count: 40 },
  { time: "11:00", count: 35 },
  { time: "12:00", count: 85 },
  { time: "13:00", count: 140 },
  { time: "14:00", count: 90 },
  { time: "15:00", count: 55 },
  { time: "16:00", count: 40 },
  { time: "17:00", count: 30 },
  { time: "18:00", count: 60 },
  { time: "19:00", count: 25 },
]

const userTypes = [
  { name: "Alumnos", value: 57, color: "#2563EB" }, // Azul
  { name: "Docentes", value: 28, color: "#16A34A" }, // Verde
  { name: "Administrativos", value: 15, color: "#64748B" }, // Gris
]

const recentAccesses = [
  { name: "Carlos Hernández", role: "Alumno", gate: "Puerta Principal", time: "10:45 AM", status: "APROBADO" },
  { name: "María García", role: "Docente", gate: "Vehicular Norte", time: "10:42 AM", status: "APROBADO" },
  { name: "Luis Ramírez", role: "Alumno", gate: "Puerta Principal", time: "10:30 AM", status: "RECHAZADO" },
  { name: "Gloria Delgado", role: "Administrativo", gate: "Puerta Secundaria", time: "10:15 AM", status: "APROBADO" },
]

const getRoleColor = (role: string) => {
  if (role === 'Alumno') return 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20'
  if (role === 'Docente') return 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20'
  return 'bg-[#64748B]/10 text-[#64748B] border-[#64748B]/20'
}

export function AdminDashboard() {
  const currentDate = format(new Date(), "EEEE, d 'de' MMMM yyyy", { locale: es })

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Panel Principal</h1>
          <p className="text-sm text-[#64748B] capitalize">{currentDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-[#64748B] hover:bg-[#E2E8F0] rounded-full transition-colors">
            <Notifications />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#DC2626] border-2 border-[#F8FAFC] rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-[#E2E8F0]">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#0F172A]">Admin ITM</p>
              <p className="text-xs text-[#64748B]">Administrador</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center font-bold">
              AI
            </div>
          </div>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Usuarios", value: "20", icon: SupervisedUserCircle, color: "text-[#2563EB]", bg: "bg-[#2563EB]/10" },
          { label: "Accesos Hoy", value: "30", icon: VerifiedUser, color: "text-[#16A34A]", bg: "bg-[#16A34A]/10" },
          { label: "Visitantes Activos", value: "3", icon: Person, color: "text-[#D97706]", bg: "bg-[#D97706]/10" },
          { label: "Puertas Activas", value: "4", icon: DoorFront, color: "text-[#64748B]", bg: "bg-[#E2E8F0]" },
        ].map((kpi, i) => (
          <Card key={i} className="p-6 flex items-center gap-5">
            <div className={`p-4 rounded-[12px] ${kpi.bg}`}>
              <kpi.icon fontSize="large" className={kpi.color} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#0F172A]">{kpi.value}</h3>
              <p className="text-sm font-medium text-[#64748B] mt-1">{kpi.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Bar Chart */}
        <Card className="col-span-1 lg:col-span-2 p-6 flex flex-col h-96">
          <h3 className="text-base font-semibold text-[#0F172A] mb-6">Accesos por Hora</h3>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
              <BarChart accessibilityLayer={false} id="access-chart" data={accessData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip 
                  cursor={{ fill: "#f1f5f9" }} 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} 
                />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Donut Chart */}
        <Card className="p-6 flex flex-col h-96">
          <h3 className="text-base font-semibold text-[#0F172A] mb-6">Distribución por Tipo</h3>
          <div className="flex-1 min-h-[200px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
              <PieChart accessibilityLayer={false} id="users-pie-chart" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie data={userTypes} innerRadius="65%" outerRadius="85%" paddingAngle={2} dataKey="value" stroke="none">
                  {userTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-[#0F172A]">100%</span>
              <span className="text-sm text-[#64748B]">Total</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {userTypes.map(t => (
              <div key={t.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-[#0F172A] font-medium">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name}
                </div>
                <span className="text-[#64748B] font-semibold">{t.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Últimos Accesos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[#0F172A]">Últimos Accesos</h3>
          <button className="text-sm font-medium text-[#2563EB] hover:text-[#1E3A5F]">Ver todos</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {recentAccesses.map((access, i) => (
            <Card key={i} className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-sm ${getRoleColor(access.role)}`}>
                  {access.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] truncate">{access.name}</p>
                  <p className="text-xs text-[#64748B] uppercase tracking-wide">{access.role}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#0F172A]">{access.gate}</span>
                  <span className="text-[11px] text-[#64748B]">{access.time}</span>
                </div>
                <Badge variant={access.status === 'APROBADO' ? 'success' : 'destructive'} className="text-[10px]">
                  {access.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
