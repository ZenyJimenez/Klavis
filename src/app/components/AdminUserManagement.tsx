import { useState } from "react"
import { 
  Search, 
  Add, 
  Edit, 
  Delete, 
  Close, 
  ArrowForward, 
  ArrowBack, 
  Save,
  FileDownload,
  Nfc,
  PhotoCamera,
  DirectionsCar,
  Badge as BadgeIcon,
  CheckCircle
} from "@mui/icons-material"
import { Card, Badge, Button } from "./ui"
import { motion, AnimatePresence } from "motion/react"

const MOCK_USERS = [
  { id: "1", name: "Carlos Hernández López", email: "21490001@itmexicali.edu.mx", role: "Alumno", controlNumber: "21490001", uid: "UID-A001", status: "Activo" },
  { id: "2", name: "María García Ruiz", email: "21490002@itmexicali.edu.mx", role: "Alumno", controlNumber: "21490002", uid: "UID-A002", status: "Activo" },
  { id: "3", name: "José Martínez Soto", email: "21490003@itmexicali.edu.mx", role: "Alumno", controlNumber: "21490003", uid: "UID-A003", status: "Activo" },
  { id: "4", name: "Ana López Castillo", email: "21490004@itmexicali.edu.mx", role: "Alumno", controlNumber: "21490004", uid: "UID-A004", status: "Activo" },
  { id: "5", name: "Luis Ramírez Vega", email: "21490005@itmexicali.edu.mx", role: "Alumno", controlNumber: "21490005", uid: "UID-A005", status: "Suspendido" },
  { id: "6", name: "Roberto Mendoza Ávila", email: "rmendoza@itmexicali.edu.mx", role: "Docente", controlNumber: "21490006", uid: "UID-D001", status: "Activo" },
  { id: "7", name: "Gloria Delgado Navarro", email: "gdelgado@itmexicali.edu.mx", role: "Administrativo", controlNumber: "21490007", uid: "UID-AD001", status: "Activo" },
]

export function AdminUserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [scanning, setScanning] = useState(false)

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.controlNumber.includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const handlePrevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => setScanning(false), 2000)
  }

  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#0A1628] tracking-tight leading-[32px]">Gestión de Usuarios</h1>
          <p className="text-[16px] font-medium text-[#64748B] leading-[24px]">Administra credenciales, vehículos y accesos</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0 bg-[#2563eb] h-[36px] px-4 rounded-[8px] text-[14px] font-medium text-white shadow-sm">
          <Add fontSize="small" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#E2E8F0] flex flex-col md:flex-row gap-4 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" fontSize="small" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, matrícula o correo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[14px] text-[#0A1628] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] h-10"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[14px] text-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] h-10 min-w-[100px] appearance-none cursor-pointer">
              <option className="text-[#0A1628]">Tipo: Todos</option>
              <option className="text-[#0A1628]">Alumno</option>
              <option className="text-[#0A1628]">Docente</option>
              <option className="text-[#0A1628]">Administrativo</option>
            </select>
            <select className="px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[14px] text-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] h-10 min-w-[100px] appearance-none cursor-pointer">
              <option className="text-[#0A1628]">Estatus: Todos</option>
              <option className="text-[#0A1628]">Activo</option>
              <option className="text-[#0A1628]">Inactivo</option>
              <option className="text-[#0A1628]">Suspendido</option>
            </select>
            <Button variant="outline" className="gap-2 text-[#0A1628] border-[#E2E8F0] h-10 font-medium">
              <FileDownload fontSize="small" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-[#F8FAFC] z-10">
              <tr>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0] text-left w-[277px]">Usuario</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0] text-center w-[120px]">Tipo</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0] text-center w-[150px]">No. Control</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0] text-center w-[160px]">UID Credencial</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0] text-center w-[128px]">Estatus</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0] text-center w-[111px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group h-[73px]">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-full bg-[#f1f5f9] p-[1px]">
                        <div className="w-full h-full rounded-full bg-[#ececf0] flex items-center justify-center">
                          <span className="font-bold text-sm text-[#0f172a]">
                            {user.name.split(' ').slice(0,2).map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-full border border-[#e2e8f0] pointer-events-none"></div>
                      </div>
                      <div>
                        <span className="block font-bold text-[#0F172A] text-base leading-6">{user.name}</span>
                        <span className="block text-xs text-[#64748B] leading-none mt-0.5">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="inline-flex items-center justify-center bg-white border border-[#E2E8F0] px-3 py-1 rounded-full">
                      <span className="text-[10px] font-bold text-[#0F172A] tracking-[0.5px] uppercase leading-tight">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-[14px] text-[#0F172A] font-medium text-center">{user.controlNumber}</td>
                  <td className="py-3 px-6 text-[12px] text-[#64748B] font-medium tracking-[0.6px] font-mono text-center">{user.uid}</td>
                  <td className="py-3 px-6 text-center">
                    <div className={`inline-flex items-center justify-center h-[25px] px-2.5 rounded-lg border ${
                      user.status === 'Activo' 
                        ? 'bg-[rgba(22,163,74,0.1)] border-[rgba(22,163,74,0.2)] text-[#16a34a]' 
                        : 'bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.2)] text-[#ef4444]'
                    }`}>
                      <span className="text-[10px] font-bold tracking-[0.5px] uppercase">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#64748B] hover:text-[#2563EB]">
                        <Edit fontSize="small" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#64748B] hover:text-[#DC2626]">
                        <Delete fontSize="small" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4">
                <Search className="text-[#64748B]" fontSize="large" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A]">No se encontraron usuarios</h3>
              <p className="text-sm text-[#64748B] mt-1">Ajusta los filtros de búsqueda o registra uno nuevo.</p>
              <Button onClick={() => setIsModalOpen(true)} className="mt-6 gap-2">
                <Add fontSize="small" />
                Nuevo Usuario
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Multi-step Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                <h2 className="text-lg font-bold text-[#0F172A]">Registro de Nuevo Usuario</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A] p-1 rounded-md hover:bg-[#E2E8F0] transition-colors">
                  <Close />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-8 py-6 border-b border-[#E2E8F0] flex items-center justify-center relative bg-white">
                <div className="absolute left-24 right-24 top-1/2 h-1 bg-[#E2E8F0] -z-10 -translate-y-1/2 rounded-full">
                  <div className="h-full bg-[#2563EB] transition-all duration-300 rounded-full" style={{ width: `${(step - 1) * 50}%` }} />
                </div>
                {[
                  { num: 1, label: "Datos Personales", icon: BadgeIcon },
                  { num: 2, label: "Vehículo", icon: DirectionsCar },
                  { num: 3, label: "Credencial", icon: Nfc },
                ].map((s) => (
                  <div key={s.num} className="flex flex-col items-center flex-1 z-10 relative bg-white px-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      step >= s.num ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#E2E8F0] bg-white text-[#64748B]"
                    }`}>
                      <s.icon fontSize="small" />
                    </div>
                    <span className={`text-xs mt-2 font-semibold tracking-wide uppercase ${step >= s.num ? "text-[#0F172A]" : "text-[#64748B]"}`}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="p-8 flex-1 overflow-auto bg-white">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-32 h-32 bg-[#F8FAFC] rounded-full border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center text-[#64748B] hover:bg-[#E2E8F0]/50 transition-colors cursor-pointer mx-auto md:mx-0">
                        <PhotoCamera />
                        <span className="text-xs font-medium mt-2">Subir foto</span>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-sm font-medium text-[#0F172A]">Nombre Completo</label>
                          <div className="grid grid-cols-3 gap-3">
                            <input type="text" placeholder="Nombre(s)" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                            <input type="text" placeholder="Ap. Paterno" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                            <input type="text" placeholder="Ap. Materno" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[#0F172A]">Correo Institucional</label>
                          <input type="email" placeholder="@itmexicali.edu.mx" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[#0F172A]">Número de Control / Matrícula</label>
                          <input type="text" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[#0F172A]">Rol</label>
                          <select className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                            <option>Alumno</option>
                            <option>Docente</option>
                            <option>Administrativo</option>
                            <option>Guardia</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[#0F172A]">Carrera</label>
                          <select className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                            <option>Ing. Sistemas Computacionales</option>
                            <option>Ing. Industrial</option>
                            <option>Ing. Mecatrónica</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">Acceso Vehicular</h4>
                        <p className="text-sm text-[#64748B]">Un vehículo puede estar vinculado a múltiples usuarios.</p>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB]" />
                        <span className="text-sm font-medium text-[#0F172A]">Sin vehículo</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0F172A]">Número de Placa</label>
                        <input type="text" placeholder="Ej. ABC-123-A" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0F172A]">Marca</label>
                        <input type="text" placeholder="Ej. Toyota" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0F172A]">Modelo</label>
                        <input type="text" placeholder="Ej. Corolla 2020" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0F172A]">Color</label>
                        <input type="text" placeholder="Ej. Blanco" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                      <label className="text-sm font-medium text-[#0F172A]">ID Tag RFID (Vehicular)</label>
                      <div className="flex gap-3">
                        <input type="text" readOnly placeholder={scanning ? "Escaneando..." : "Escanea el tag UHF..."} className="flex-1 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm font-mono focus:outline-none" />
                        <Button onClick={handleScan} variant="outline" className="gap-2 shrink-0">
                          {scanning ? <div className="w-4 h-4 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" /> : <Nfc fontSize="small" />}
                          {scanning ? "Leyendo..." : "Escanear Tag"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center md:text-left">
                     <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F8FAFC] relative overflow-hidden">
                       <Nfc sx={{ fontSize: 64 }} className={`mb-4 transition-colors ${scanning ? "text-[#2563EB]" : "text-[#64748B]"}`} />
                       <h3 className="text-lg font-bold text-[#0F172A] mb-2">Vincular Credencial NFC</h3>
                       <p className="text-sm text-[#64748B] mb-6 max-w-sm">Acerca la tarjeta física NFC al lector conectado para asignarle un UID a este usuario.</p>
                       
                       <Button onClick={handleScan} disabled={scanning} className="gap-2 relative z-10">
                         {scanning ? "Escaneando tarjeta..." : "Iniciar Escaneo"}
                       </Button>

                       {scanning && (
                         <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-50 animate-pulse" />
                       )}
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-sm font-medium text-[#0F172A]">UID Credencial (Peatonal)</label>
                          <input type="text" readOnly value={scanning ? "" : "04:6F:A8:12:3B"} className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm font-mono text-[#0F172A] font-medium" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[#0F172A]">Fecha de Emisión</label>
                          <input type="date" value="2026-03-05" readOnly className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#64748B]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[#0F172A]">Fecha de Expiración</label>
                          <input type="date" defaultValue="2026-12-31" className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                        </div>
                      </div>
                  </motion.div>
                )}
              </div>

              {/* Footer actions */}
              <div className="px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                <Button variant="ghost" onClick={handlePrevStep} disabled={step === 1} className="gap-2">
                  <ArrowBack fontSize="small" /> Atrás
                </Button>
                {step < 3 ? (
                  <Button onClick={handleNextStep} className="gap-2">
                    Siguiente <ArrowForward fontSize="small" />
                  </Button>
                ) : (
                  <Button onClick={() => setIsModalOpen(false)} className="bg-[#16A34A] hover:bg-[#15803d] gap-2">
                    <Save fontSize="small" /> Guardar Registro
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
