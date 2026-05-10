import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  NotificationsActive, 
  Send, 
  Info, 
  Error, 
  Warning, 
  ChatBubbleOutline,
  CheckCircle,
  AccessTime,
  Person,
  Map,
  ReportProblem,
  Close,
  Reply
} from "@mui/icons-material"
import { Card, Badge, Button } from "./ui"
import { toast } from "sonner"

interface GuardReport {
  id: string;
  guardName: string;
  type: string;
  location: string;
  description: string;
  timestamp: string;
  status: "Pendiente" | "Respondido";
  adminReply?: string;
}

export function AdminNotices() {
  // --- Admin Notices Sending State ---
  const [noticeType, setNoticeType] = useState<"info" | "alert" | "system">("info")
  const [noticeText, setNoticeText] = useState("")
  const [isSending, setIsSending] = useState(false)

  // --- Guard Reports State ---
  const [reports, setReports] = useState<GuardReport[]>([
    {
      id: "REP-001",
      guardName: "Juan Pérez",
      type: "Vehículo Mal Estacionado",
      location: "Estacionamiento B - Pasillo 3",
      description: "Camioneta blanca obstruyendo rampa de acceso para discapacitados. No cuenta con placa institucional visible.",
      timestamp: "Hoy, 10:15 AM",
      status: "Pendiente"
    },
    {
      id: "REP-002",
      guardName: "Roberto Gomez",
      type: "Falla de Sistema",
      location: "Puerta Peatonal Sur",
      description: "El lector RFID no está reconociendo algunas tarjetas de alumnos. Se requiere revisión técnica.",
      timestamp: "Hoy, 09:30 AM",
      status: "Respondido",
      adminReply: "Soporte técnico ha sido notificado. Se enviará personal en los próximos 30 minutos."
    }
  ])

  const [selectedReport, setSelectedReport] = useState<GuardReport | null>(null)
  const [replyText, setReplyText] = useState("")
  const [isReplying, setIsReplying] = useState(false)

  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!noticeText.trim()) return
    setIsSending(true)
    setTimeout(() => {
      toast.success("Aviso institucional enviado a todos los usuarios")
      setNoticeText("")
      setIsSending(false)
    }, 1500)
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim() || !selectedReport) return
    setIsReplying(true)
    setTimeout(() => {
      setReports(prev => prev.map(r => r.id === selectedReport.id ? {
        ...r,
        status: "Respondido",
        adminReply: replyText
      } : r))
      toast.success("Respuesta enviada al guardia")
      setSelectedReport(null)
      setReplyText("")
      setIsReplying(false)
    }, 1200)
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto font-['Inter']">
      <header>
        <h1 className="text-2xl font-bold text-[#0A1628]">Centro de Avisos y Anomalías</h1>
        <p className="text-gray-500 mt-1">Gestión de comunicados oficiales y respuesta a reportes de campo.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sending Form */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#F8FAFC] flex items-center gap-3">
              <NotificationsActive className="text-[#2563EB]" />
              <h2 className="text-lg font-bold text-[#0A1628]">Emitir Aviso Institucional</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSendNotice} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Prioridad del Mensaje</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "info", label: "Info", icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
                      { id: "alert", label: "Alerta", icon: Error, color: "text-red-600", bg: "bg-red-50" },
                      { id: "system", label: "Sistema", icon: Warning, color: "text-amber-600", bg: "bg-amber-50" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setNoticeType(type.id as any)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1.5 ${
                          noticeType === type.id 
                            ? `border-${type.id === 'info' ? 'blue' : type.id === 'alert' ? 'red' : 'amber'}-600 ${type.bg}` 
                            : "border-gray-50 bg-gray-50/50 hover:bg-gray-100"
                        }`}
                      >
                        <type.icon sx={{ fontSize: 20 }} className={noticeType === type.id ? type.color : "text-gray-400"} />
                        <span className={`text-[11px] font-bold ${noticeType === type.id ? type.color : "text-gray-400"}`}>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cuerpo del Comunicado</label>
                  <textarea
                    required
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                    placeholder="Escriba el mensaje para la comunidad KLAVIS..."
                    className="w-full h-32 p-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none resize-none transition-all placeholder:text-gray-400"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSending || !noticeText.trim()} 
                  className="w-full h-12 bg-[#2563EB] font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-100/50 hover:bg-[#1E3A5F] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send fontSize="small" />
                      Difundir Aviso
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Card>

          
        </div>

        {/* Right Column: Guard Reports Feed */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0A1628] flex items-center gap-2">
              <ReportProblem className="text-amber-500" />
              Reportes de Anomalías de Guardias
            </h2>
            <Badge variant="default" className="bg-amber-100 text-amber-700 border-amber-200">
              {reports.filter(r => r.status === "Pendiente").length} Pendientes
            </Badge>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                layoutId={report.id}
                className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 transition-all hover:border-[#2563EB]/30 cursor-pointer ${
                  report.status === "Respondido" ? "opacity-75 grayscale-[0.2]" : "ring-1 ring-amber-500/10"
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-xs">
                      {report.guardName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A1628] text-sm">{report.guardName}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <AccessTime sx={{ fontSize: 12 }} /> {report.timestamp}
                      </p>
                    </div>
                  </div>
                  <Badge variant={report.status === "Pendiente" ? "warning" : "success"} className="text-[10px]">
                    {report.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase">{report.type}</span>
                    <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                      <Map sx={{ fontSize: 12 }} /> {report.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {report.description}
                  </p>
                </div>

                {report.adminReply && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 relative">
                    <div className="flex items-center gap-2 mb-1">
                      <Reply className="text-blue-600 rotate-180" sx={{ fontSize: 14 }} />
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Respuesta del Administrador</span>
                    </div>
                    <p className="text-xs text-blue-800 italic font-medium">"{report.adminReply}"</p>
                  </div>
                )}

                {report.status === "Pendiente" && (
                  <div className="mt-4 flex justify-end">
                    <button className="text-[#2563EB] text-xs font-bold flex items-center gap-1.5 hover:underline">
                      <ChatBubbleOutline sx={{ fontSize: 14 }} />
                      Responder Anomalía
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-50 bg-[#0A1628]/40 flex justify-center items-center p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F8FAFC]">
                <div>
                  <h3 className="font-bold text-lg text-[#0A1628]">Detalle del Reporte</h3>
                  <p className="text-xs text-gray-500">{selectedReport.id}</p>
                </div>
                <button onClick={() => setSelectedReport(null)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Close />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E2E8F0] flex items-center justify-center text-[#1E3A5F]">
                      <Person fontSize="large" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Reportado por</p>
                      <p className="font-bold text-[#0A1628]">{selectedReport.guardName}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedReport.type}</span>
                      <span className="text-xs font-medium text-gray-500">{selectedReport.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#0A1628] font-medium leading-relaxed">
                      {selectedReport.description}
                    </p>
                  </div>
                </div>

                {selectedReport.status === "Pendiente" ? (
                  <form onSubmit={handleReplySubmit} className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Enviar Respuesta al Guardia</label>
                      <textarea
                        required
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Instrucciones o resolución para el guardia..."
                        className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none resize-none transition-all"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isReplying || !replyText.trim()} 
                      className="w-full h-14 bg-[#16A34A] hover:bg-green-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                    >
                      {isReplying ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <CheckCircle fontSize="small" />
                          Enviar y Resolver Reporte
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Respuesta Enviada Previamente</h4>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 italic text-sm text-blue-800">
                      "{selectedReport.adminReply}"
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full h-12 rounded-xl"
                      onClick={() => setSelectedReport(null)}
                    >
                      Cerrar Detalle
                    </Button>
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
