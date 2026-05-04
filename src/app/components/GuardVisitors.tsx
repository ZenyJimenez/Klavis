import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Event, AccessTime, LocalShipping, PersonAdd, PhotoCamera, CheckCircle,
  Search, Close, Add, Notes, BadgeOutlined, MeetingRoom
} from "@mui/icons-material"

type ExpectedType = "Proveedor" | "Visitante"
type ArrivalStatus = "Pendiente" | "Registrado"

interface Expected {
  id: string
  name: string
  company?: string
  contact?: string
  type: ExpectedType
  reason: string
  expectedTime: string
  date: "Hoy" | "Mañana"
  entry: string
  needsEvidence: boolean
  status: ArrivalStatus
  registeredAt?: string
  photos?: string[]
  notes?: string
  plate?: string
}

const initialExpected: Expected[] = [
  {
    id: "e1", name: "Coca-Cola FEMSA", company: "Coca-Cola", contact: "Sr. Juan Valdez",
    type: "Proveedor", reason: "Surtido de bebidas — Cafetería",
    expectedTime: "12:30", date: "Hoy", entry: "Puerta Principal",
    needsEvidence: true, status: "Pendiente", plate: "BCN-7890"
  },
  {
    id: "e2", name: "Distribuidora García", company: "Distribuidora García", contact: "Lic. Marisol Vega",
    type: "Proveedor", reason: "Entrega de alimentos preparados",
    expectedTime: "09:00", date: "Hoy", entry: "Vehicular Norte",
    needsEvidence: true, status: "Registrado", plate: "SON-9988",
    registeredAt: "09:10", photos: ["foto1"], notes: "Entrega completa"
  },
  {
    id: "e3", name: "Ing. Pedro Solís", contact: "Pedro Solís",
    type: "Visitante", reason: "Mantenimiento Centro de Cómputo",
    expectedTime: "10:00", date: "Hoy", entry: "Puerta Principal",
    needsEvidence: false, status: "Pendiente"
  },
  {
    id: "e4", name: "Papelería Ofimex", company: "Papelería Ofimex", contact: "Sra. Norma Guerrero",
    type: "Proveedor", reason: "Surtido mensual de papelería",
    expectedTime: "14:00", date: "Mañana", entry: "Puerta Principal",
    needsEvidence: true, status: "Pendiente", plate: "MXL-3344"
  },
  {
    id: "e5", name: "Dra. Carmen Olvera", contact: "Carmen Olvera",
    type: "Visitante", reason: "Conferencia de IA — Auditorio",
    expectedTime: "16:00", date: "Mañana", entry: "Puerta Principal",
    needsEvidence: false, status: "Pendiente"
  },
]

const initials = (name: string) => name.split(" ").slice(0, 2).map(s => s[0]).join("").toUpperCase()

export function GuardVisitors() {
  const [items, setItems] = useState<Expected[]>(initialExpected)
  const [filter, setFilter] = useState<"Hoy" | "Mañana" | "Todos">("Hoy")
  const [search, setSearch] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)

  const [photos, setPhotos] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [people, setPeople] = useState("")
  const [savedToast, setSavedToast] = useState(false)

  const filtered = items.filter(i => {
    if (filter !== "Todos" && i.date !== filter) return false
    if (search) {
      const s = search.toLowerCase()
      if (![i.name, i.company || "", i.contact || "", i.reason].join(" ").toLowerCase().includes(s)) return false
    }
    return true
  })

  const grouped = {
    Pendiente: filtered.filter(i => i.status === "Pendiente"),
    Registrado: filtered.filter(i => i.status === "Registrado"),
  }

  const openModal = (id: string) => {
    const item = items.find(i => i.id === id)
    if (!item) return
    setOpenId(id)
    setPhotos(item.photos || [])
    setNotes(item.notes || "")
    setPeople("")
  }

  const closeModal = () => setOpenId(null)

  const addPhoto = () => setPhotos(p => [...p, `foto-${Date.now()}`])
  const removePhoto = (idx: number) => setPhotos(p => p.filter((_, i) => i !== idx))

  const handleRegister = () => {
    if (!openId) return
    const item = items.find(i => i.id === openId)
    if (!item) return
    if (item.needsEvidence && photos.length === 0) {
      alert("Se requiere al menos 1 foto de evidencia para esta empresa.")
      return
    }
    const now = new Date().toTimeString().slice(0, 5)
    setItems(items.map(i => i.id === openId
      ? { ...i, status: "Registrado", registeredAt: now, photos, notes }
      : i))
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2200)
    closeModal()
  }

  const openItem = openId ? items.find(i => i.id === openId) : null

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="mb-6 sticky top-0 bg-[#F8FAFC] z-10 pt-2 pb-4 -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl md:text-[24px] font-bold text-[#0A1628] tracking-tight">Calendario de Llegadas</h1>
            <p className="text-[12px] text-[#64748B] mt-0.5 font-medium">Proveedores y visitantes esperados</p>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#16A34A]/20">
            <Event style={{ fontSize: 12 }} />
            {grouped.Pendiente.length} pendientes
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {(["Hoy", "Mañana", "Todos"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  filter === f
                    ? "bg-[#0A1628] text-white border-[#0A1628]"
                    : "bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0A1628]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" fontSize="small" />
            <input
              type="text"
              placeholder="Buscar por empresa, contacto o motivo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Pendientes */}
      {grouped.Pendiente.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#64748B] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
            Pendientes
          </h2>
          <div className="space-y-3">
            {grouped.Pendiente.map(item => (
              <ExpectedCard key={item.id} item={item} onClick={() => openModal(item.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Registrados */}
      {grouped.Registrado.length > 0 && (
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#64748B] mb-3 flex items-center gap-2">
            <CheckCircle style={{ fontSize: 14 }} className="text-[#16A34A]" />
            Registrados
          </h2>
          <div className="space-y-3">
            {grouped.Registrado.map(item => (
              <ExpectedCard key={item.id} item={item} onClick={() => openModal(item.id)} compact />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-dashed border-[#E2E8F0] p-12 text-center">
          <Event className="text-[#94A3B8]" style={{ fontSize: 48 }} />
          <h3 className="font-bold text-[#0F172A] mt-3">Sin llegadas para este filtro</h3>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0A1628] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 z-[60]"
          >
            <CheckCircle style={{ fontSize: 18 }} className="text-[#16A34A]" />
            <span className="text-sm font-semibold">Llegada registrada exitosamente</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {openItem && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0A1628]/60 backdrop-blur-sm p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-[560px] max-h-[92vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#0A1628] text-white p-5 relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-white/70 hover:text-white">
                  <Close />
                </button>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${openItem.type === "Proveedor" ? "bg-[#2563EB]" : "bg-[#16A34A]"}`}>
                    {openItem.type === "Proveedor" ? <LocalShipping /> : <PersonAdd />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#94A3B8]">{openItem.type}</p>
                    <h3 className="text-[18px] font-bold leading-tight truncate">{openItem.name}</h3>
                    <p className="text-[12px] text-[#94A3B8] mt-0.5 truncate">{openItem.contact}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <InfoBlock icon={AccessTime} label="Hora esperada" value={`${openItem.date} ${openItem.expectedTime}`} />
                  <InfoBlock icon={MeetingRoom} label="Entrada" value={openItem.entry} />
                </div>
                <InfoBlock icon={Notes} label="Motivo" value={openItem.reason} />
                {openItem.plate && (
                  <InfoBlock icon={BadgeOutlined} label="Placa esperada" value={openItem.plate} mono />
                )}

                {openItem.status === "Registrado" ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold mb-2">
                      <CheckCircle style={{ fontSize: 18 }} />
                      Llegada registrada — {openItem.registeredAt}
                    </div>
                    {openItem.photos && openItem.photos.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {openItem.photos.map((_, idx) => (
                          <div key={idx} className="w-16 h-16 rounded-md bg-gradient-to-br from-emerald-300 to-emerald-600 flex items-center justify-center text-white">
                            <PhotoCamera fontSize="small" />
                          </div>
                        ))}
                      </div>
                    )}
                    {openItem.notes && (
                      <p className="text-[13px] text-emerald-900 mt-3 italic">"{openItem.notes}"</p>
                    )}
                  </div>
                ) : (
                  <>
                    {openItem.needsEvidence && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[13px] font-bold text-[#0A1628]">Fotos de evidencia <span className="text-[#DC2626]">*</span></label>
                          <span className="text-[11px] text-[#64748B]">{photos.length} foto{photos.length !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {photos.map((_, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center text-white">
                              <PhotoCamera fontSize="small" />
                              <button
                                onClick={() => removePhoto(idx)}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#DC2626] text-white text-[10px] flex items-center justify-center font-bold"
                              >×</button>
                            </div>
                          ))}
                          <button
                            onClick={addPhoto}
                            className="aspect-square rounded-lg border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50 transition-colors"
                          >
                            <PhotoCamera fontSize="small" />
                            <span className="text-[10px] font-semibold mt-1">Foto</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">
                          Esta empresa requiere evidencia visual de la entrega/visita.
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-[#0A1628]">Personas que vienen (opcional)</label>
                      <input
                        type="text"
                        value={people}
                        onChange={e => setPeople(e.target.value)}
                        placeholder="Ej. Juan Valdez, Andrea Soto"
                        className="w-full px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-[#0A1628]">Observaciones</label>
                      <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Detalles del vehículo, entrega, persona o notas relevantes..."
                        className="w-full px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] min-h-[80px] resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {openItem.status === "Pendiente" && (
                <div className="border-t border-[#E2E8F0] p-4 flex gap-3 bg-white">
                  <button onClick={closeModal} className="flex-1 h-11 rounded-lg border border-[#E2E8F0] text-[#475569] font-semibold hover:bg-[#F8FAFC]">Cancelar</button>
                  <button onClick={handleRegister} className="flex-[2] h-11 rounded-lg bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-semibold flex items-center justify-center gap-2">
                    <CheckCircle fontSize="small" />Registrar llegada
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ExpectedCard({ item, onClick, compact = false }: { item: Expected; onClick: () => void; compact?: boolean }) {
  const isProvider = item.type === "Proveedor"
  const isRegistered = item.status === "Registrado"
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full text-left bg-white rounded-[12px] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border overflow-hidden flex ${
        isRegistered
          ? "border-l-[4px] border-l-[#16A34A] border-y-[#E2E8F0] border-r-[#E2E8F0]"
          : isProvider
            ? "border-l-[4px] border-l-[#2563EB] border-y-[#E2E8F0] border-r-[#E2E8F0]"
            : "border-l-[4px] border-l-[#16A34A] border-y-[#E2E8F0] border-r-[#E2E8F0]"
      }`}
    >
      <div className="flex items-center gap-3 p-3 flex-1 min-w-0">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shrink-0 ${isProvider ? "bg-[#2563EB]" : "bg-[#16A34A]"}`}>
          {isProvider ? <LocalShipping fontSize="small" /> : initials(item.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-[#0A1628] text-[14px] truncate">{item.name}</h3>
            {item.needsEvidence && !compact && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 border border-[#D97706]/20 px-1.5 py-0.5 rounded">
                Evidencia
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#64748B] truncate mt-0.5">{item.reason}</p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#475569] font-medium">
            <span className="flex items-center gap-1"><AccessTime style={{ fontSize: 12 }} />{item.date} · {item.expectedTime}</span>
            <span className="flex items-center gap-1"><MeetingRoom style={{ fontSize: 12 }} />{item.entry}</span>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          {isRegistered ? (
            <CheckCircle style={{ fontSize: 22 }} className="text-[#16A34A]" />
          ) : (
            <div className="px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Add style={{ fontSize: 12 }} />Registrar
            </div>
          )}
          {isRegistered && item.registeredAt && (
            <span className="text-[10px] font-bold text-[#16A34A]">{item.registeredAt}</span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

function InfoBlock({ icon: Icon, label, value, mono }: { icon: any; label: string; value: string; mono?: boolean }) {
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
      <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#64748B] flex items-center gap-1 mb-1">
        <Icon style={{ fontSize: 12 }} />{label}
      </p>
      <p className={`text-[13px] font-semibold text-[#0A1628] ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  )
}
