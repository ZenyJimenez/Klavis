import image_08d7f3e39cb34f93fbc9e462522d285a26eeb1ff from 'figma:asset/08d7f3e39cb34f93fbc9e462522d285a26eeb1ff.png'
import { useState } from "react"
import { useNavigate } from "react-router"
import { 
  QrCode2, Sensors, Notifications, CheckCircle, Info, Warning, Logout,
  ReportProblem, LocalParking, CreditCard, Close, AddPhotoAlternate, CheckCircleOutline
} from "@mui/icons-material"
import { motion, AnimatePresence } from "motion/react"

export function StudentLayout() {
  const [activeTab, setActiveTab] = useState<'id' | 'notifications' | 'incidents' | 'parking'>('id')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center font-sans">
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <header className="bg-[#0A1628] text-white pt-12 pb-6 px-6 relative rounded-b-[24px] shadow-md z-10 shrink-0">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                 <img src={image_08d7f3e39cb34f93fbc9e462522d285a26eeb1ff} alt="Klavis" className="w-8 h-8 object-contain filter brightness-0 invert" />
                 <span className="font-bold text-lg tracking-widest">KLAVIS</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/')}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                >
                  <Logout />
                </button>
              </div>
           </div>

           {activeTab === 'id' && (
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 p-1">
                   <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                   <h2 className="font-bold text-lg leading-tight">Carlos Hernández L.</h2>
                   <p className="text-white/70 text-sm mt-0.5">Alumno · Ing. Sistemas</p>
                </div>
             </div>
           )}
           {activeTab === 'notifications' && <h2 className="font-bold text-xl">Avisos Recientes</h2>}
           {activeTab === 'incidents' && <h2 className="font-bold text-xl">Mis Incidencias</h2>}
           {activeTab === 'parking' && (
             <div>
               <h2 className="font-bold text-xl">Estacionamientos ITM</h2>
               <p className="text-white/70 text-sm">Actualizado hace 2 min</p>
             </div>
           )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] pb-20">
           {activeTab === 'id' && <StudentIdCard />}
           {activeTab === 'notifications' && <StudentNotifications />}
           {activeTab === 'incidents' && <StudentIncidents />}
           {activeTab === 'parking' && <StudentParking />}
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E2E8F0] flex items-center justify-around px-2 z-50 rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <NavButton active={activeTab === 'id'} icon={<CreditCard />} label="Credencial" onClick={() => setActiveTab('id')} />
          <NavButton active={activeTab === 'parking'} icon={<LocalParking />} label="Parking" onClick={() => setActiveTab('parking')} />
          <NavButton active={activeTab === 'incidents'} icon={<ReportProblem />} label="Incidencias" onClick={() => setActiveTab('incidents')} />
          <NavButton active={activeTab === 'notifications'} icon={
            <div className="relative">
              <Notifications />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#DC2626] rounded-full border border-white"></span>
            </div>
          } label="Avisos" onClick={() => setActiveTab('notifications')} />
        </nav>
      </div>
    </div>
  )
}

function NavButton({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
        active ? "text-[#2563EB]" : "text-[#64748B] hover:text-[#0F172A]"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}

function StudentIdCard() {
  return (
    <div className="p-6 flex flex-col gap-6 relative min-h-full">
      <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0] relative overflow-hidden">
         <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
         
         <div className="flex justify-between items-start w-full relative z-10 mb-6">
            <div>
               <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider mb-1">No. Control</p>
               <p className="text-2xl font-mono font-bold text-[#0F172A]">21490001</p>
            </div>
            <div className="px-3 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-full text-xs font-bold uppercase tracking-wider border border-[#16A34A]/20 flex items-center gap-1.5">
              <CheckCircle sx={{ fontSize: 14 }} />
              ACTIVO
            </div>
         </div>
         
         <div className="grid grid-cols-2 gap-4 relative z-10 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
            <div>
               <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider mb-1">Vigencia</p>
               <p className="text-sm font-bold text-[#0F172A]">Jun 2026</p>
            </div>
            <div>
               <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider mb-1">Semestre</p>
               <p className="text-sm font-bold text-[#0F172A]">8vo</p>
            </div>
            <div className="col-span-2">
               <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider mb-1">Institución</p>
               <p className="text-sm font-bold text-[#0F172A] truncate">Instituto Tecnológico de Mexicali</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0] flex flex-col items-center">
         <p className="text-sm text-[#64748B] font-medium mb-4">Presenta este código para acceder</p>
         <div className="w-48 h-48 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4 flex items-center justify-center mb-2">
            <QrCode2 sx={{ fontSize: 160 }} className="text-[#0F172A]" />
         </div>
      </div>
    </div>
  )
}

function StudentNotifications() {
  const notifications = [
    { id: 1, type: 'access', title: 'Acceso aprobado', desc: 'Puerta Principal a las 07:02', date: '2026-03-05 07:02', icon: CheckCircle, color: 'text-[#16A34A]', bg: 'bg-[#16A34A]/10 border-[#16A34A]/20' },
    { id: 2, type: 'alert', title: 'Acceso rechazado', desc: 'Puerta Vehicular Norte. No tienes vehículo registrado.', date: '2026-03-02 07:45', icon: Warning, color: 'text-[#DC2626]', bg: 'bg-[#DC2626]/10 border-[#DC2626]/20' },
    { id: 3, type: 'info', title: 'Tu credencial digital ha sido renovada exitosamente', desc: 'Sistema', date: '2026-03-03 09:30', icon: Info, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10 border-[#2563EB]/20' },
  ]
  return (
    <div className="p-6 space-y-4">
      {notifications.map(n => (
        <div key={n.id} className="bg-white p-4 rounded-xl shadow-sm border border-[#E2E8F0] flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${n.bg}`}>
              <n.icon fontSize="small" className={n.color} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F172A]">{n.title}</h4>
              <p className="text-xs text-[#64748B] mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-[#64748B] mt-2 font-mono">{n.date}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

function StudentIncidents() {
  const [showModal, setShowModal] = useState(false)
  const [incidents, setIncidents] = useState([
    { id: 1, folio: "INC-2026-042", type: "Mal estacionado", loc: "Est. A", status: "Pendiente", date: "Hoy" },
  ])

  return (
    <div className="p-6 min-h-full flex flex-col relative">
      <button 
        onClick={() => setShowModal(true)}
        className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors mb-6"
      >
        + Reportar Nueva Incidencia
      </button>

      {incidents.length > 0 ? (
        <div className="space-y-4">
          {incidents.map(inc => (
            <div key={inc.id} className="bg-white p-4 rounded-xl shadow-sm border border-[#E2E8F0]">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{inc.folio}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                  {inc.status}
                </span>
              </div>
              <h4 className="font-bold text-[#0F172A]">{inc.type}</h4>
              <p className="text-sm text-gray-500">{inc.loc} · {inc.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center opacity-50 my-10">
          <Shield className="text-6xl mb-4" />
          <p className="font-bold text-lg">No has reportado incidencias</p>
        </div>
      )}

      {/* Modal Reporte */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="bg-[#0A1628] text-white p-4 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-lg">Nueva Incidencia</h3>
              <button onClick={() => setShowModal(false)}><Close /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de incidencia *</label>
                <div className="flex flex-wrap gap-2">
                  {["Mal estacionado", "Objeto perdido", "Vandalismo", "Acceso", "Otro"].map(t => (
                    <button key={t} className="px-3 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50">{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ubicación *</label>
                <select className="w-full border border-gray-300 rounded-lg p-3">
                  <option>Seleccionar...</option>
                  <option>Est. A (Edificio L)</option>
                  <option>Est. B (Plaza Bicentenario)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Evidencia Fotográfica *</label>
                <div className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                  <AddPhotoAlternate sx={{fontSize: 40}} />
                  <span className="text-sm font-medium mt-2">Tomar foto o galería</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                <textarea className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px]" placeholder="Describe lo ocurrido..." />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 shrink-0">
              <button 
                onClick={() => {
                  setIncidents([{id: 2, folio: "INC-2026-043", type: "Mal estacionado", loc: "Est. B", status: "Pendiente", date: "Ahora"}, ...incidents])
                  setShowModal(false)
                }}
                className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-bold"
              >
                Enviar Reporte
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StudentParking() {
  const zones = [
    { id: "A", name: "Est. A — Edificio L", type: "Pavimentado", cap: 40, occ: 28, alert: false, status: "open" },
    { id: "B", name: "Est. B — Plaza Bic.", type: "Pavimentado", cap: 35, occ: 35, alert: true, status: "full" },
    { id: "T1", name: "Zona Tierra 1", type: "Tierra", cap: 15, occ: 5, alert: false, status: "open" },
  ]

  return (
    <div className="p-6 space-y-4">
      <div className="bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm mb-6">
        <span className="w-2.5 h-2.5 bg-[#16A34A] rounded-full animate-pulse"></span>
        127 / 210 lugares disponibles
      </div>

      {zones.map((z, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-[#E2E8F0]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-[#0F172A]">{z.name}</h3>
              <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{z.type}</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${z.status === 'full' ? 'bg-[#DC2626]' : 'bg-[#16A34A]'}`} />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span>Capacidad</span>
              <span>{z.cap - z.occ} disp. ({z.occ}/{z.cap})</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${z.status === 'full' ? 'bg-[#DC2626]' : 'bg-[#16A34A]'}`}
                style={{width: `${(z.occ/z.cap)*100}%`}}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
