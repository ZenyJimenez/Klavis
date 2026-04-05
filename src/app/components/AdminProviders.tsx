import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NotesIcon from "@mui/icons-material/Notes";
import EventBusyIcon from "@mui/icons-material/EventBusy";

interface Appointment {
  id: string;
  title: string;
  status: "Pendiente" | "Completado" | "Cancelado";
  provider: string;
  area: string;
  datetime: string;
  host: string;
  reason: string;
}

const initialAppointments: Appointment[] = [
  {
    id: "1",
    title: "Mantenimiento de equipos",
    status: "Pendiente",
    provider: "Ing. Pedro Solís",
    area: "Centro de Cómputo",
    datetime: "2026-03-05 09:00",
    host: "Gloria Delgado",
    reason: "Mantenimiento preventivo trimestral",
  },
  {
    id: "2",
    title: "Auditoría administrativa",
    status: "Pendiente",
    provider: "Lic. Martha Rojas",
    area: "Dirección",
    datetime: "2026-03-05 10:00",
    host: "Héctor Peña",
    reason: "Revisión de procesos internos",
  },
  {
    id: "3",
    title: "Entrega de papelería",
    status: "Completado",
    provider: "Sr. Juan Valdez",
    area: "Almacén",
    datetime: "2026-03-05 08:00",
    host: "Norma Guerrero",
    reason: "Surtido mensual de papelería",
  },
  {
    id: "4",
    title: "Conferencia de IA",
    status: "Pendiente",
    provider: "Dra. Carmen Olvera",
    area: "Auditorio",
    datetime: "2026-03-06 16:00",
    host: "Roberto Mendoza",
    reason: "Conferencia sobre inteligencia artificial aplicada",
  },
  {
    id: "5",
    title: "Instalación de cámaras",
    status: "Pendiente",
    provider: "Ing. Ricardo Bernal",
    area: "Edificio A",
    datetime: "2026-03-07 07:00",
    host: "Raúl Ibarra",
    reason: "Ampliación del sistema de videovigilancia",
  }
];

export function AdminProviders() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activeFilter, setActiveFilter] = useState("Mensual");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    area: "",
    date: "",
    time: "",
    host: "",
    reason: "",
    status: "Pendiente" as Appointment["status"]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado": return "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20";
      case "Cancelado": return "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20";
      case "Pendiente": return "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      provider: "",
      area: "",
      date: "",
      time: "",
      host: "",
      reason: "",
      status: "Pendiente"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (apt: Appointment) => {
    setEditingId(apt.id);
    // Split datetime "2026-03-05 09:00"
    const [date, time] = apt.datetime.split(" ");
    
    setFormData({
      title: apt.title,
      provider: apt.provider,
      area: apt.area,
      date: date || "",
      time: time || "",
      host: apt.host,
      reason: apt.reason,
      status: apt.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAppointment: Appointment = {
      id: editingId || Math.random().toString(),
      title: formData.title,
      provider: formData.provider,
      area: formData.area,
      datetime: `${formData.date} ${formData.time}`,
      host: formData.host,
      reason: formData.reason,
      status: formData.status
    };

    if (editingId) {
      setAppointments(appointments.map(apt => apt.id === editingId ? newAppointment : apt));
    } else {
      setAppointments([newAppointment, ...appointments]);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col h-full bg-[#F8FAFC] min-h-screen">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628] m-0 tracking-tight">Calendario Institucional</h1>
          <p className="text-[#64748B] mt-1 font-medium">Gestión de proveedores y citas programadas</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          {/* Filters */}
          <div className="flex bg-[#E2E8F0] p-1 rounded-lg w-full sm:w-auto">
            {["Diario", "Semanal", "Mensual"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                  activeFilter === filter 
                    ? 'bg-white text-[#0F172A] shadow-sm' 
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <Button onClick={openNewModal} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium shadow-sm transition-all w-full sm:w-auto shrink-0">
            <AddIcon fontSize="small" className="mr-2" />
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4 gap-3">
                <h3 className="text-[16px] font-bold text-[#0F172A] leading-tight">{apt.title}</h3>
                <Badge className={`shrink-0 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(apt.status)}`}>
                  {apt.status}
                </Badge>
              </div>

              <div className="space-y-3 flex-1 mb-5">
                <div className="flex items-start gap-3 text-[#64748B]">
                  <PersonIcon fontSize="small" className="text-[#94A3B8] text-[18px] mt-0.5 shrink-0" />
                  <span className="text-sm font-semibold text-[#334155] leading-snug">{apt.provider}</span>
                </div>
                <div className="flex items-start gap-3 text-[#64748B]">
                  <PlaceIcon fontSize="small" className="text-[#94A3B8] text-[18px] mt-0.5 shrink-0" />
                  <span className="text-sm leading-snug">{apt.area}</span>
                </div>
                <div className="flex items-start gap-3 text-[#64748B]">
                  <AccessTimeIcon fontSize="small" className="text-[#94A3B8] text-[18px] mt-0.5 shrink-0" />
                  <span className="text-sm leading-snug">{apt.datetime}</span>
                </div>
                <div className="flex items-start gap-3 text-[#64748B]">
                  <AssignmentIndIcon fontSize="small" className="text-[#94A3B8] text-[18px] mt-0.5 shrink-0" />
                  <span className="text-sm leading-snug">Resp: <span className="font-medium text-[#475569]">{apt.host}</span></span>
                </div>
                <div className="flex items-start gap-3 text-[#64748B]">
                  <NotesIcon fontSize="small" className="text-[#94A3B8] text-[18px] mt-0.5 shrink-0" />
                  <span className="text-sm italic leading-snug line-clamp-2" title={apt.reason}>{apt.reason}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E2E8F0]">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 px-3 text-[#64748B] hover:text-[#2563EB] hover:bg-blue-50 font-medium"
                  onClick={() => openEditModal(apt)}
                >
                  <EditIcon fontSize="small" className="mr-1.5" /> Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 px-3 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 font-medium"
                  onClick={() => handleDelete(apt.id)}
                >
                  <DeleteIcon fontSize="small" className="mr-1.5" /> Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center flex-1 py-20 px-4 bg-white rounded-xl shadow-sm border border-[#E2E8F0] border-dashed mt-2">
          <div className="w-24 h-24 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-5 border border-[#E2E8F0]">
            <EventBusyIcon className="text-[#94A3B8]" style={{ fontSize: 48 }} />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2 text-center">No hay citas programadas</h3>
          <p className="text-[#64748B] text-center max-w-sm mb-8 font-medium">
            No hay citas programadas para este período. Puede crear una nueva cita para gestionar accesos de proveedores.
          </p>
          <Button onClick={openNewModal} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium h-11 px-6">
            <AddIcon fontSize="small" className="mr-2" />
            Nueva Cita
          </Button>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-[#E2E8F0] rounded-2xl">
          <div className="bg-[#0A1628] text-white p-6 pb-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white tracking-tight text-left">
                {editingId ? 'Editar Cita' : 'Nueva Cita'}
              </DialogTitle>
              <DialogDescription className="text-[#94A3B8] mt-1.5 text-left">
                {editingId ? 'Modifique los detalles de la cita en el calendario.' : 'Complete los detalles para programar un acceso al calendario institucional.'}
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#0F172A] font-semibold text-sm">Título de la visita</Label>
                <Input 
                  id="title" 
                  required 
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ej. Mantenimiento preventivo"
                  className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider" className="text-[#0F172A] font-semibold text-sm">Nombre del proveedor y/o Responsable</Label>
                <Input 
                  id="provider" 
                  required 
                  value={formData.provider}
                  onChange={(e) => handleInputChange("provider", e.target.value)}
                  placeholder="Ej. Ing. Pedro Solís"
                  className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area" className="text-[#0F172A] font-semibold text-sm">Área de destino</Label>
                <Input 
                  id="area" 
                  required 
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  placeholder="Ej. Centro de Cómputo"
                  className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[#0F172A] font-semibold text-sm">Fecha</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-[#0F172A] font-semibold text-sm">Hora</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    required 
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="host" className="text-[#0F172A] font-semibold text-sm">Responsable del acceso</Label>
                <Input 
                  id="host" 
                  required 
                  value={formData.host}
                  onChange={(e) => handleInputChange("host", e.target.value)}
                  placeholder="Ej. Gloria Delgado"
                  className="border-[#E2E8F0] focus-visible:ring-[#2563EB] h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="text-[#0F172A] font-semibold text-sm">Estatus</Label>
                <select 
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="flex w-full h-11 border border-[#E2E8F0] focus:ring-[#2563EB] rounded-md px-3 py-2 text-sm outline-none"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-[#0F172A] font-semibold text-sm">Motivo detallado</Label>
                <Textarea 
                  id="reason" 
                  required 
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  placeholder="Escriba los detalles del motivo de acceso..."
                  className="border-[#E2E8F0] focus-visible:ring-[#2563EB] min-h-[80px] resize-none"
                />
              </div>
            </div>

            <DialogFooter className="pt-4 mt-2 border-t border-[#E2E8F0]">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="font-medium"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium">
                {editingId ? 'Guardar Cambios' : 'Agendar Cita'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}