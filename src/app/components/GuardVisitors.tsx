import { useState } from "react"
import { QrCodeScanner, CheckCircle, Cancel, WarningAmber } from "@mui/icons-material"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "./ui"

export function GuardVisitors() {
  const [code, setCode] = useState("")
  const [result, setResult] = useState<'idle' | 'valid' | 'invalid' | 'used'>('idle')

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return
    const upperCode = code.toUpperCase()
    if (upperCode === "VIS-2025-001") setResult('valid')
    else if (upperCode === "VIS-2025-002") setResult('used')
    else setResult('invalid')
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full flex flex-col min-h-full">
      <div className="mb-6 sticky top-0 bg-[#F8FAFC] z-10 pt-2 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-[#0F172A] tracking-tight mb-4">Control de Visitas</h1>
        
        <form onSubmit={handleValidate} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <QrCodeScanner className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" fontSize="small" />
            <input 
              type="text" 
              placeholder="Ingresar código temporal (ej. VIS-2025-001)" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-[12px] text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] shadow-sm"
            />
          </div>
          <Button type="submit" className="h-auto py-3 px-6 rounded-[12px] bg-[#0F172A] hover:bg-[#1E3A5F] w-full sm:w-auto">
            Validar
          </Button>
        </form>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {result === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-4 border-b border-[#E2E8F0] pb-2">Visitas de Hoy</h3>
                <div className="space-y-3">
                  {[
                    { id: "VIS-2025-001", name: "Ing. Pedro Solís", motive: "Mantenimiento equipos", time: "09:00 - 13:00", area: "Centro de Cómputo", resp: "Gloria Delgado", status: "Pendiente" },
                    { id: "VIS-2025-002", name: "Sr. Juan Valdez", motive: "Entrega de papelería", time: "08:00 - 10:00", area: "Almacén", resp: "Norma Guerrero", status: "Hecho" },
                  ].map(v => (
                    <div key={v.id} className="bg-white p-4 rounded-[12px] shadow-sm border border-[#E2E8F0] flex flex-col gap-3 relative overflow-hidden">
                       <div className={`absolute top-0 left-0 w-1.5 h-full ${v.status === 'Pendiente' ? 'bg-[#D97706]' : 'bg-[#16A34A]'}`} />
                       <div className="flex justify-between items-start pl-2">
                         <div>
                           <h4 className="font-bold text-[#0F172A]">{v.name}</h4>
                           <p className="text-xs text-[#64748B] mt-0.5">{v.motive}</p>
                         </div>
                         <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                           v.status === 'Pendiente' ? 'bg-[#D97706]/10 text-[#D97706]' : 'bg-[#16A34A]/10 text-[#16A34A]'
                         }`}>
                           {v.status}
                         </span>
                       </div>
                       <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8FAFC] p-3 rounded-lg pl-5 ml-[-8px]">
                         <div><span className="text-[#64748B] block mb-0.5">Horario</span><span className="font-medium">{v.time}</span></div>
                         <div><span className="text-[#64748B] block mb-0.5">Área</span><span className="font-medium">{v.area}</span></div>
                         <div className="col-span-2"><span className="text-[#64748B] block mb-0.5">Responsable</span><span className="font-medium">{v.resp}</span></div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {result === 'valid' && (
            <motion.div 
              key="valid"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-[16px] shadow-lg border border-[#16A34A]/30 overflow-hidden"
            >
               <div className="bg-[#16A34A] px-5 py-4 flex items-center gap-3 text-white">
                 <CheckCircle />
                 <div>
                   <h2 className="font-bold text-lg leading-tight">Acceso Aprobado</h2>
                   <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Código de visitante válido</p>
                 </div>
               </div>
               <div className="p-6 space-y-5">
                 <div className="text-center">
                   <h3 className="text-2xl font-bold text-[#0F172A]">Ing. Pedro Solís</h3>
                   <p className="text-[#64748B] text-sm font-mono mt-1 bg-[#F8FAFC] inline-block px-3 py-1 rounded-md border border-[#E2E8F0]">VIS-2025-001</p>
                 </div>
                 
                 <div className="bg-[#F8FAFC] rounded-[12px] p-4 space-y-3 text-sm border border-[#E2E8F0]">
                   <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                     <span className="text-[#64748B]">Motivo</span>
                     <span className="font-semibold text-[#0F172A]">Mantenimiento equipos</span>
                   </div>
                   <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                     <span className="text-[#64748B]">Destino</span>
                     <span className="font-semibold text-[#0F172A]">Centro de Cómputo</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-[#64748B]">Responsable</span>
                     <span className="font-semibold text-[#0F172A]">Gloria Delgado</span>
                   </div>
                 </div>

                 <Button className="w-full h-12 bg-[#16A34A] hover:bg-[#15803d] text-base font-semibold" onClick={() => { setCode(''); setResult('idle'); }}>
                    Confirmar Entrada
                 </Button>
               </div>
            </motion.div>
          )}

          {result === 'invalid' && (
            <motion.div 
              key="invalid"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-[16px] shadow-lg border border-[#DC2626]/30 overflow-hidden"
            >
               <div className="bg-[#DC2626] px-5 py-4 flex items-center gap-3 text-white">
                 <Cancel />
                 <div>
                   <h2 className="font-bold text-lg leading-tight">Acceso Denegado</h2>
                   <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Código no encontrado o expirado</p>
                 </div>
               </div>
               <div className="p-6 text-center space-y-4">
                 <h3 className="text-lg font-bold text-[#0F172A]">Código Inválido</h3>
                 <p className="text-[#64748B] text-sm">El código <span className="font-mono bg-[#F8FAFC] px-1 py-0.5 rounded border border-[#E2E8F0]">{code}</span> no existe o su vigencia ha expirado.</p>
                 <Button variant="outline" className="w-full h-12 mt-4 text-[#0F172A]" onClick={() => { setCode(''); setResult('idle'); }}>
                    Intentar de nuevo
                 </Button>
               </div>
            </motion.div>
          )}

          {result === 'used' && (
            <motion.div 
              key="used"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-[16px] shadow-lg border border-[#D97706]/30 overflow-hidden"
            >
               <div className="bg-[#D97706] px-5 py-4 flex items-center gap-3 text-white">
                 <WarningAmber />
                 <div>
                   <h2 className="font-bold text-lg leading-tight">Código Utilizado</h2>
                   <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Este pase ya fue registrado</p>
                 </div>
               </div>
               <div className="p-6 text-center space-y-4">
                 <h3 className="text-lg font-bold text-[#0F172A]">Acceso previamente marcado</h3>
                 <p className="text-[#64748B] text-sm">El visitante <span className="font-bold text-[#0F172A]">Sr. Juan Valdez</span> ya registró su entrada a las 08:00 hrs con este código.</p>
                 <Button variant="outline" className="w-full h-12 mt-4 text-[#0F172A]" onClick={() => { setCode(''); setResult('idle'); }}>
                    Volver
                 </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
