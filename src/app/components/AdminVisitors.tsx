import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Visit {
  id: string;
  date: string;
  time: string;
  reason: string;
  authorizedBy: string;
  entry: string;
}
interface Externo {
  id: string;
  name: string;
  origin: string;
  idType: string;
  idNumber: string;
  phone: string;
  vehicles: string[];
  totalVisits: number;
  lastVisit: string;
  frequent: boolean;
  visits: Visit[];
}

const allEntries = ["Puerta Principal", "Puerta Secundaria", "Vehicular Norte", "Vehicular Sur"];
const sampleAreas = ["Centro de Cómputo", "Dirección", "Almacén", "Auditorio", "Edificio A"];
const initials = (name: string) => name.split(" ").slice(0, 2).map(s => s[0]).join("").toUpperCase();
const colorForName = (name: string) => {
  const colors = ["bg-rose-100 text-rose-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-purple-100 text-purple-700"];
  return colors[name.charCodeAt(0) % colors.length];
};

const initialExternos: Externo[] = [
  {
    id: "1", name: "Ing. Marco Ríos", origin: "Siemens", idType: "INE", idNumber: "INE-001",
    phone: "664-100-0001", vehicles: ["MXL-5544"], totalVisits: 4, lastVisit: "Hace 3 días", frequent: false,
    visits: [
      { id: "v1", date: "2026-04-25", time: "09:00", reason: "Soporte técnico", authorizedBy: "Gloria Delgado", entry: "Puerta Principal" },
    ],
  },
  {
    id: "2", name: "Lic. Carmen Vidal", origin: "Freelance", idType: "INE", idNumber: "INE-002",
    phone: "", vehicles: [], totalVisits: 1, lastVisit: "Hoy", frequent: false, visits: [],
  },
  {
    id: "3", name: "Dr. Alejandro Fuentes", origin: "UABC", idType: "Pasaporte", idNumber: "Pasaporte-003",
    phone: "664-300-0003", vehicles: ["BCN-1212"], totalVisits: 12, lastVisit: "Ayer", frequent: true, visits: [],
  },
];

export function AdminVisitors() {
  const [externos, setExternos] = useState<Externo[]>(initialExternos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Todos" | "Frecuentes" | "Primera vez">("Todos");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", origin: "", idType: "INE", idNumber: "", phone: "", vehicles: "" });

  const [historyId, setHistoryId] = useState<string | null>(null);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [visitForm, setVisitForm] = useState({ personId: "", reason: "", host: "", area: "", entry: "", vehicle: "", notes: "" });

  const [quickPersonOpen, setQuickPersonOpen] = useState(false);
  const [quickPersonName, setQuickPersonName] = useState("");

  const filtered = externos.filter(e => {
    if (filter === "Frecuentes" && !e.frequent) return false;
    if (filter === "Primera vez" && e.totalVisits > 1) return false;
    if (search) {
      const s = search.toLowerCase();
      if (![e.name, e.origin, e.idNumber].join(" ").toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ name: "", origin: "", idType: "INE", idNumber: "", phone: "", vehicles: "" });
    setIsOpen(true);
  };
  const openEdit = (e: Externo) => {
    setEditingId(e.id);
    setForm({ name: e.name, origin: e.origin, idType: e.idType, idNumber: e.idNumber, phone: e.phone, vehicles: e.vehicles.join(", ") });
    setIsOpen(true);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const vehicles = form.vehicles.split(",").map(x => x.trim()).filter(Boolean);
    if (editingId) {
      setExternos(externos.map(e => e.id === editingId ? { ...e, ...form, vehicles } : e));
    } else {
      setExternos([{ id: Math.random().toString(), ...form, vehicles, totalVisits: 0, lastVisit: "—", frequent: false, visits: [] }, ...externos]);
    }
    setIsOpen(false);
  };

  const openVisit = (personId?: string) => {
    setVisitForm({ personId: personId || "", reason: "", host: "", area: "", entry: "", vehicle: "", notes: "" });
    setIsVisitOpen(true);
  };

  const handleSaveVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.personId) return;
    const visit: Visit = {
      id: Math.random().toString(),
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      reason: visitForm.reason,
      authorizedBy: visitForm.host,
      entry: visitForm.entry,
    };
    setExternos(externos.map(p => p.id === visitForm.personId ? { ...p, totalVisits: p.totalVisits + 1, lastVisit: "Hoy", visits: [visit, ...p.visits] } : p));
    setIsVisitOpen(false);
  };

  const handleQuickPerson = () => {
    if (!quickPersonName.trim()) return;
    const newPerson: Externo = {
      id: Math.random().toString(), name: quickPersonName.trim(), origin: "—", idType: "INE", idNumber: "—",
      phone: "", vehicles: [], totalVisits: 0, lastVisit: "—", frequent: false, visits: []
    };
    setExternos([newPerson, ...externos]);
    setVisitForm(v => ({ ...v, personId: newPerson.id }));
    setQuickPersonName("");
    setQuickPersonOpen(false);
  };

  const historyPerson = historyId ? externos.find(e => e.id === historyId) : null;

  if (historyPerson) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
        <button onClick={() => setHistoryId(null)} className="flex items-center gap-2 text-[#2563EB] hover:underline mb-6 font-medium">
          <ArrowBackIcon fontSize="small" />Volver a personas externas
        </button>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1628]">Historial de visitas — {historyPerson.name}</h1>
            <p className="text-[#64748B] mt-1 font-medium">{historyPerson.totalVisits} visitas en total</p>
          </div>
          <Button onClick={() => openVisit(historyPerson.id)} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">
            <AddIcon fontSize="small" className="mr-2" />Registrar nueva visita
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          {historyPerson.visits.length === 0 ? (
            <div className="p-12 text-center text-[#64748B]">No hay visitas registradas para esta persona.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr className="text-left text-[#64748B] font-semibold">
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Hora</th>
                  <th className="px-4 py-3">Motivo</th>
                  <th className="px-4 py-3">Autorizó</th>
                  <th className="px-4 py-3">Entrada</th>
                </tr>
              </thead>
              <tbody>
                {historyPerson.visits.map(v => (
                  <tr key={v.id} className="border-b border-[#E2E8F0] last:border-0">
                    <td className="px-4 py-3 text-[#334155]">{v.date}</td>
                    <td className="px-4 py-3 text-[#334155]">{v.time}</td>
                    <td className="px-4 py-3 text-[#0F172A] font-medium">{v.reason}</td>
                    <td className="px-4 py-3 text-[#334155]">{v.authorizedBy}</td>
                    <td className="px-4 py-3"><Badge className="bg-blue-50 text-[#2563EB] border border-blue-200">{v.entry}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628] tracking-tight">Personas Externas</h1>
          <p className="text-[#64748B] mt-1 font-medium">Catálogo de visitantes externos no asociados a empresas proveedoras</p>
        </div>
        <Button onClick={openNew} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">
          <AddIcon fontSize="small" className="mr-2" />Nueva Persona Externa
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" fontSize="small" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre, empresa de origen o identificación..." className="pl-10 h-11 border-[#E2E8F0]" />
        </div>
        <div className="flex bg-[#E2E8F0] p-1 rounded-lg">
          {(["Todos", "Frecuentes", "Primera vez"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${filter === f ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <PersonIcon className="text-[#94A3B8]" style={{ fontSize: 48 }} />
            <h3 className="text-lg font-bold text-[#0F172A] mt-3">No hay personas externas registradas</h3>
            <Button onClick={openNew} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white mt-4">
              <AddIcon fontSize="small" className="mr-2" />Nueva Persona Externa
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr className="text-left text-[#64748B] font-semibold">
                  <th className="px-4 py-3">Persona</th>
                  <th className="px-4 py-3">Empresa de origen</th>
                  <th className="px-4 py-3">Identificación</th>
                  <th className="px-4 py-3">Vehículos</th>
                  <th className="px-4 py-3">Total visitas</th>
                  <th className="px-4 py-3">Última visita</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${colorForName(e.name)}`}>{initials(e.name)}</div>
                        <div>
                          <div className="font-medium text-[#0F172A] flex items-center gap-2">
                            {e.name}
                            {e.frequent && <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">Frecuente</Badge>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#334155]">{e.origin}</td>
                    <td className="px-4 py-3 text-[#334155]">{e.idType} · {e.idNumber}</td>
                    <td className="px-4 py-3">
                      {e.vehicles.length > 0 ? <span className="text-[#334155]">{e.vehicles.length} vehículo{e.vehicles.length > 1 ? "s" : ""}</span> : <span className="text-[#94A3B8] text-xs">0</span>}
                    </td>
                    <td className="px-4 py-3 text-[#0F172A] font-semibold">{e.totalVisits}</td>
                    <td className="px-4 py-3 text-[#334155]">{e.lastVisit}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(e)} className="h-8 w-8 p-0 text-[#64748B] hover:text-[#2563EB]"><EditIcon fontSize="small" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => setHistoryId(e.id)} className="h-8 w-8 p-0 text-[#64748B] hover:text-[#0F172A]"><HistoryIcon fontSize="small" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openVisit(e.id)} className="h-8 px-2 text-[#2563EB] hover:bg-blue-50 font-medium text-xs"><AssignmentIcon fontSize="small" className="mr-1" />Visita</Button>
                        <Button variant="ghost" size="sm" onClick={() => setExternos(externos.filter(x => x.id !== e.id))} className="h-8 w-8 p-0 text-[#64748B] hover:text-[#DC2626]"><DeleteIcon fontSize="small" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Persona modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="bg-[#0A1628] text-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white text-left">{editingId ? "Editar Persona Externa" : "Nueva Persona Externa"}</DialogTitle>
              <DialogDescription className="text-[#94A3B8] mt-1 text-left">Visitante externo no asociado a empresa proveedora.</DialogDescription>
            </DialogHeader>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Nombre completo</Label>
              <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Empresa de origen (texto libre)</Label>
              <Input value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} placeholder="Ej. Siemens, Freelance, UABC..." className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Tipo ID</Label>
                <Select value={form.idType} onValueChange={v => setForm({ ...form, idType: v })}>
                  <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["INE", "Pasaporte", "Licencia", "Otro"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Número ID</Label>
                <Input required value={form.idNumber} onChange={e => setForm({ ...form, idNumber: e.target.value })} className="h-11 border-[#E2E8F0]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Teléfono (opcional)</Label>
              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Vehículos asignados (placas separadas por coma)</Label>
              <div className="flex gap-2">
                <Input value={form.vehicles} onChange={e => setForm({ ...form, vehicles: e.target.value })} placeholder="BCN-1212" className="h-11 border-[#E2E8F0] font-mono flex-1" />
                <Button type="button" variant="outline" onClick={() => setForm(p => ({ ...p, vehicles: p.vehicles ? p.vehicles + ", NEW-0000" : "NEW-0000" }))} className="h-11 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 font-medium shrink-0">
                  <AddIcon fontSize="small" className="mr-1" />Crear y asignar
                </Button>
              </div>
            </div>
            <DialogFooter className="pt-4 border-t border-[#E2E8F0]">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Registrar visita modal */}
      <Dialog open={isVisitOpen} onOpenChange={setIsVisitOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="bg-[#0A1628] text-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white text-left">Registrar visita de persona externa</DialogTitle>
              <DialogDescription className="text-[#94A3B8] mt-1 text-left">Datos completos del acceso del visitante externo.</DialogDescription>
            </DialogHeader>
          </div>
          <form onSubmit={handleSaveVisit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Persona externa</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select value={visitForm.personId} onValueChange={v => setVisitForm({ ...visitForm, personId: v })}>
                    <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue placeholder="Seleccionar persona..." /></SelectTrigger>
                    <SelectContent>
                      {externos.map(e => <SelectItem key={e.id} value={e.id}>{e.name} — {e.origin}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" variant="outline" onClick={() => setQuickPersonOpen(true)} className="h-11 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 font-medium shrink-0">
                  <AddIcon fontSize="small" className="mr-1" />Crear y asignar
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Motivo de la visita</Label>
              <Input required value={visitForm.reason} onChange={e => setVisitForm({ ...visitForm, reason: e.target.value })} className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">A quién va a ver / con quién tiene cita</Label>
              <Input value={visitForm.host} onChange={e => setVisitForm({ ...visitForm, host: e.target.value })} className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Área de destino</Label>
                <Select value={visitForm.area} onValueChange={v => setVisitForm({ ...visitForm, area: v })}>
                  <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue placeholder="Área..." /></SelectTrigger>
                  <SelectContent>{sampleAreas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Entrada utilizada</Label>
                <Select value={visitForm.entry} onValueChange={v => setVisitForm({ ...visitForm, entry: v })}>
                  <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue placeholder="Entrada..." /></SelectTrigger>
                  <SelectContent>{allEntries.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Vehículo con el que llega</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select value={visitForm.vehicle} onValueChange={v => setVisitForm({ ...visitForm, vehicle: v })}>
                    <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue placeholder="Vehículo..." /></SelectTrigger>
                    <SelectContent>
                      {(externos.find(e => e.id === visitForm.personId)?.vehicles || []).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      <SelectItem value="—">Sin vehículo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" variant="outline" className="h-11 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 font-medium shrink-0">
                  <AddIcon fontSize="small" className="mr-1" />Crear y asignar
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Observaciones (opcional)</Label>
              <Textarea value={visitForm.notes} onChange={e => setVisitForm({ ...visitForm, notes: e.target.value })} className="min-h-[80px] border-[#E2E8F0] resize-none" />
            </div>
            <DialogFooter className="pt-4 border-t border-[#E2E8F0]">
              <Button type="button" variant="outline" onClick={() => setIsVisitOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Registrar visita</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick-create persona */}
      <Dialog open={quickPersonOpen} onOpenChange={setQuickPersonOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#0A1628]">Crear y asignar persona externa</DialogTitle>
            <DialogDescription>Creación rápida — quedará asignada a la visita.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label className="text-[#0F172A] font-semibold text-sm">Nombre completo</Label>
            <Input value={quickPersonName} onChange={e => setQuickPersonName(e.target.value)} className="h-11 border-[#E2E8F0]" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuickPersonOpen(false)}>Cancelar</Button>
            <Button onClick={handleQuickPerson} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Crear y asignar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
