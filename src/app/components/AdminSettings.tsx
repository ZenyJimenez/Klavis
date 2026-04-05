import { useState } from "react"
import { motion } from "motion/react"
import DoorFrontIcon from "@mui/icons-material/DoorFront"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import SecurityIcon from "@mui/icons-material/Security"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import VpnKeyIcon from "@mui/icons-material/VpnKey"

interface DoorConfig {
  id: string
  name: string
  description: string
  type: "peatonal" | "vehicular"
  active: boolean
}

export function AdminSettings() {
  const [doors, setDoors] = useState<DoorConfig[]>([
    { id: "1", name: "Puerta Principal", description: "Acceso frontal principal del campus", type: "peatonal", active: true },
    { id: "2", name: "Puerta Secundaria", description: "Acceso peatonal este", type: "peatonal", active: true },
    { id: "3", name: "Vehicular Norte", description: "Estacionamiento principal y proveedores", type: "vehicular", active: true },
    { id: "4", name: "Vehicular Sur", description: "Estacionamiento exclusivo directivos", type: "vehicular", active: false },
  ])

  const [plumas, setPlumas] = useState({
    norte: true,
    sur: false
  })

  const [strictUID, setStrictUID] = useState(true)
  const [notifyGuards, setNotifyGuards] = useState(true)

  const toggleDoor = (id: string) => {
    setDoors(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d))
  }

  const ToggleSwitch = ({ checked, onChange, disabled = false }: { checked: boolean, onChange: () => void, disabled?: boolean }) => (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        checked ? 'bg-[#2563EB]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0A1628]">Configuración del Sistema</h1>
        <p className="text-gray-500 mt-1">Gestión de accesos físicos, parámetros de seguridad y alertas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div className="space-y-8">
          {/* Control de Puertas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
              <DoorFrontIcon className="text-gray-500" />
              <h2 className="text-lg font-bold text-[#0A1628]">Control de Puertas</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {doors.map(door => (
                <div key={door.id} className="p-5 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{door.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        door.type === "vehicular" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {door.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{door.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <ToggleSwitch checked={door.active} onChange={() => toggleDoor(door.id)} />
                    <span className={`text-xs font-bold ${door.active ? "text-green-600" : "text-gray-400"}`}>
                      {door.active ? "ACTIVA" : "INACTIVA"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parámetros de Validación */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
              <VpnKeyIcon className="text-gray-500" />
              <h2 className="text-lg font-bold text-[#0A1628]">Parámetros de Validación</h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-gray-900">Validación estricta de UID</h3>
                  <p className="text-sm text-gray-500">Rechazar acceso inmediatamente si la tarjeta RFID/UID no está registrada en el padrón activo, sin permitir registro manual.</p>
                </div>
                <div className="shrink-0 pt-1">
                  <ToggleSwitch checked={strictUID} onChange={() => setStrictUID(!strictUID)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-8">
          {/* Plumas Automáticas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
              <DirectionsCarIcon className="text-gray-500" />
              <h2 className="text-lg font-bold text-[#0A1628]">Plumas Automáticas (Barreras)</h2>
            </div>
            <div className="divide-y divide-gray-100 p-5 space-y-5">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-gray-900">Puerta Vehicular Norte</h3>
                  <p className="text-sm text-gray-500">Levantar pluma automáticamente al detectar tag UHF o validación exitosa en pedestal.</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 pt-1">
                  <ToggleSwitch 
                    checked={plumas.norte} 
                    onChange={() => setPlumas(p => ({ ...p, norte: !p.norte }))} 
                    disabled={!doors.find(d => d.id === "3")?.active}
                  />
                  {!doors.find(d => d.id === "3")?.active && (
                    <span className="text-[10px] text-red-500 font-bold">PUERTA INACTIVA</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pt-5 border-t border-gray-100">
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-gray-900">Puerta Vehicular Sur</h3>
                  <p className="text-sm text-gray-500">Levantar pluma automáticamente al detectar tag UHF o validación exitosa en pedestal.</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 pt-1">
                  <ToggleSwitch 
                    checked={plumas.sur} 
                    onChange={() => setPlumas(p => ({ ...p, sur: !p.sur }))} 
                    disabled={!doors.find(d => d.id === "4")?.active}
                  />
                  {!doors.find(d => d.id === "4")?.active && (
                    <span className="text-[10px] text-red-500 font-bold">PUERTA INACTIVA</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
              <NotificationsActiveIcon className="text-gray-500" />
              <h2 className="text-lg font-bold text-[#0A1628]">Notificaciones del Sistema</h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-gray-900">Notificaciones a guardias</h3>
                  <p className="text-sm text-gray-500">Enviar alertas automáticas a las terminales de los guardias (Módulo Móvil) cuando se cambie la configuración de puertas o parámetros de seguridad.</p>
                </div>
                <div className="shrink-0 pt-1">
                  <ToggleSwitch checked={notifyGuards} onChange={() => setNotifyGuards(!notifyGuards)} />
                </div>
              </div>
            </div>
          </div>

          {/* System Info Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#0A1628] to-[#112240] p-6 rounded-xl text-white shadow-md relative overflow-hidden"
          >
            <SecurityIcon className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5" />
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <SecurityIcon fontSize="small" className="text-[#2563EB]" />
              KLAVIS Core v2.4.0
            </h3>
            <p className="text-sm text-gray-400 mb-4">El sistema se encuentra operando normalmente. Todos los controladores están en línea.</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-gray-500 font-medium">Último respaldo</span>
                <span className="font-bold text-white">Hoy, 04:00 AM</span>
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Latencia red</span>
                <span className="font-bold text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  12ms
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
