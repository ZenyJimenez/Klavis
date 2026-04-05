import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Visitor {
  id: string;
  name: string;
  reason: string;
  area: string;
  time: string;
  date: string;
  host: string;
  code: string;
  status: "Activo" | "Expirado" | "Pendiente";
}

const initialVisitors: Visitor[] = [
  {
    id: "1",
    name: "Ing. Pedro Solís",
    reason: "Mantenimiento equipos",
    area: "Centro de Cómputo",
    time: "09:00–13:00",
    date: "Hoy",
    host: "Gloria Delgado",
    code: "VIS-2025-001",
    status: "Activo",
  },
  {
    id: "2",
    name: "Lic. Martha Rojas",
    reason: "Auditoría administrativa",
    area: "Dirección",
    time: "10:00–14:00",
    date: "Hoy",
    host: "Héctor Peña",
    code: "VIS-2025-002",
    status: "Activo",
  },
  {
    id: "3",
    name: "Sr. Juan Valdez",
    reason: "Entrega de papelería",
    area: "Almacén",
    time: "08:00–10:00",
    date: "Hoy",
    host: "Norma Guerrero",
    code: "VIS-2025-003",
    status: "Expirado",
  },
  {
    id: "4",
    name: "Dra. Carmen Olvera",
    reason: "Conferencia invitada",
    area: "Auditorio",
    time: "16:00–19:00",
    date: "Mañana",
    host: "Roberto Mendoza",
    code: "VIS-2025-004",
    status: "Activo",
  },
  {
    id: "5",
    name: "Ing. Ricardo Bernal",
    reason: "Instalación de cámaras",
    area: "Edificio A",
    time: "07:00–13:00",
    date: "Ayer",
    host: "Raúl Ibarra",
    code: "VIS-2025-005",
    status: "Expirado",
  },
];

const hosts = ["Gloria Delgado", "Héctor Peña", "Norma Guerrero", "Roberto Mendoza", "Raúl Ibarra"];
const areas = ["Centro de Cómputo", "Dirección", "Almacén", "Auditorio", "Edificio A", "Edificio B", "Laboratorio"];

export function AdminVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const [isNewVisitorModalOpen, setIsNewVisitorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    reason: "",
    area: "",
    date: "",
    startTime: "",
    endTime: "",
    host: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20";
      case "Expirado": return "bg-[#64748B]/10 text-[#64748B] border-[#64748B]/20";
      case "Pendiente": return "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate code
    const nextNum = visitors.length + 1;
    const newCode = `VIS-2025-${nextNum.toString().padStart(3, '0')}`;
    
    const newVisitor: Visitor = {
      id: Math.random().toString(),
      name: formData.name,
      reason: formData.reason,
      area: formData.area,
      date: formData.date,
      time: `${formData.startTime}–${formData.endTime}`,
      host: formData.host,
      code: newCode,
      status: "Pendiente"
    };

    setVisitors([newVisitor, ...visitors]);
    setGeneratedCode(newCode);
    setIsNewVisitorModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // Reset form
    setFormData({
      name: "",
      reason: "",
      area: "",
      date: "",
      startTime: "",
      endTime: "",
      host: ""
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    // Could add a toast notification here
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col h-full bg-[#F8FAFC]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-[24px] font-bold text-[#0A1628] tracking-tight leading-[32px]">Usuarios Temporales</h1>
          <p className="text-[16px] font-medium text-[#64748B] leading-[24px]">Gestión de visitantes y accesos especiales</p>
        </div>
        <Button 
          onClick={() => setIsNewVisitorModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium shadow-sm transition-all h-[36px] px-4 rounded-[8px] text-[14px]"
        >
          <AddIcon fontSize="small" className="mr-2" />
          Nuevo Visitante
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-[#F8FAFC] z-10">
              <tr className="border-b border-[#E2E8F0]">
                <th className="py-4 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider text-left w-[277px]">Visitante</th>
                <th className="py-4 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider text-center w-[223px]">Motivo y Área</th>
                <th className="py-4 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider text-center w-[136px]">Horario</th>
                <th className="py-4 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider text-center w-[176px]">Responsable</th>
                <th className="py-4 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider text-center w-[159px]">Código</th>
                <th className="py-4 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider text-center w-[128px]">Estatus</th>
                <th className="py-4 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider text-center w-[111px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-slate-50 transition-colors group h-[73px]">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-full bg-[#f1f5f9] p-[1px]">
                        <div className="w-full h-full rounded-full bg-[#ececf0] flex items-center justify-center">
                          <span className="font-bold text-sm text-[#0f172a]">
                            {visitor.name.split(' ').filter(n => !n.includes('.')).slice(0, 2).map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-full border border-[#e2e8f0] pointer-events-none"></div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F172A] text-[16px] leading-[24px] truncate">{visitor.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <p className="font-medium text-[#0F172A] text-[14px] leading-[20px]">{visitor.reason}</p>
                    <p className="text-[#64748B] text-[12px] leading-[16px] mt-0.5">{visitor.area}</p>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <p className="font-medium text-[#0F172A] text-[14px] leading-[20px]">{visitor.time}</p>
                    <p className="text-[#64748B] text-[12px] leading-[16px] mt-0.5">{visitor.date}</p>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <p className="font-medium text-[#0F172A] text-[14px] leading-[20px]">{visitor.host}</p>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="inline-flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-1 rounded-[8px]">
                      <span className="font-mono text-[12px] text-[#0F172A] tracking-[0.6px] leading-[16px]">
                        {visitor.code}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className={`inline-flex items-center justify-center h-[25px] px-2.5 rounded-lg border ${
                      visitor.status === 'Activo' 
                        ? 'bg-[rgba(22,163,74,0.1)] border-[rgba(22,163,74,0.2)] text-[#16a34a]' 
                        : visitor.status === 'Expirado'
                        ? 'bg-[rgba(100,116,139,0.1)] border-[rgba(100,116,139,0.2)] text-[#64748b]'
                        : 'bg-[#D97706]/10 border-[#D97706]/20 text-[#D97706]'
                    }`}>
                      <span className="text-[10px] font-bold tracking-[0.5px] uppercase leading-[15px]">
                        {visitor.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#64748B] hover:text-[#2563EB]">
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#64748B] hover:text-[#DC2626]">
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Visitor Modal */}
      <Dialog open={isNewVisitorModalOpen} onOpenChange={setIsNewVisitorModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-[#E2E8F0] rounded-2xl">
          <div className="bg-[#0A1628] text-white p-6 pb-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white tracking-tight text-left">Registro de Visitante</DialogTitle>
              <DialogDescription className="text-[#94A3B8] mt-1.5 text-left">
                Complete los detalles para generar un código de acceso temporal.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#0F172A] font-semibold text-sm">Nombre completo</Label>
                <Input 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej. Ing. Carlos Pérez"
                  className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-[#0F172A] font-semibold text-sm">Motivo de visita</Label>
                  <Input 
                    id="reason" 
                    required 
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    placeholder="Ej. Mantenimiento"
                    className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area" className="text-[#0F172A] font-semibold text-sm">Área destino</Label>
                  <Select required onValueChange={(value) => handleInputChange("area", value)} value={formData.area}>
                    <SelectTrigger id="area" className="border-[#E2E8F0] focus:ring-[#2563EB] h-11">
                      <SelectValue placeholder="Seleccione área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map(area => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#0F172A] font-semibold text-sm">Fecha de acceso</Label>
                <Input 
                  id="date" 
                  type="date" 
                  required 
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-[#0F172A] font-semibold text-sm">Hora inicio</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    required 
                    value={formData.startTime}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-[#0F172A] font-semibold text-sm">Hora fin</Label>
                  <Input 
                    id="endTime" 
                    type="time" 
                    required 
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="host" className="text-[#0F172A] font-semibold text-sm">Responsable que autoriza</Label>
                <Select required onValueChange={(value) => handleInputChange("host", value)} value={formData.host}>
                  <SelectTrigger id="host" className="border-[#E2E8F0] focus:ring-[#2563EB] h-11">
                    <SelectValue placeholder="Seleccione responsable" />
                  </SelectTrigger>
                  <SelectContent>
                    {hosts.map(host => (
                      <SelectItem key={host} value={host}>{host}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-4 mt-2 border-t border-[#E2E8F0]">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsNewVisitorModalOpen(false)}
                className="font-medium"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium">
                Guardar y Generar Código
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md bg-white border-[#E2E8F0] rounded-2xl p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="text-[#16A34A]" style={{ fontSize: 40 }} />
          </div>
          
          <DialogHeader className="mb-6 w-full">
            <DialogTitle className="text-2xl font-bold text-[#0F172A] text-center mb-2">¡Visitante Registrado!</DialogTitle>
            <DialogDescription className="text-[#64748B] text-center text-base">
              El código temporal ha sido generado exitosamente. Compártelo con el visitante.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 w-full mb-8">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">Código de Acceso</p>
            <p className="text-3xl font-mono font-bold text-[#0A1628] tracking-widest">{generatedCode}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1 font-semibold h-12 border-[#E2E8F0] hover:bg-[#F8FAFC]"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Cerrar
            </Button>
            <Button 
              className="flex-1 bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-semibold h-12"
              onClick={copyToClipboard}
            >
              <ContentCopyIcon fontSize="small" className="mr-2" />
              Copiar Código
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}