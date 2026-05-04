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
import MemoryIcon from "@mui/icons-material/Memory";
import SensorsIcon from "@mui/icons-material/Sensors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type SensorType = "Entrada" | "Salida";
type SensorStatus = "Activo" | "Inactivo" | "Error";

interface Sensor {
  id: string;
  name: string;
  techId: string;
  type: SensorType;
  parking: string;
  status: SensorStatus;
  lastDetection: string;
  notes?: string;
}

const parkingOptions = ["Est. A", "Est. B", "Est. C", "Est. D", "Est. E", "Zona Tierra 1", "Zona Tierra 2", "Zona Tierra 3", "Zona Tierra 4"];

const initialSensors: Sensor[] = [
  { id: "1", name: "Sensor Est. A — Entrada", techId: "SNS-00101", type: "Entrada", parking: "Est. A", status: "Activo", lastDetection: "Hoy 08:32" },
  { id: "2", name: "Sensor Est. A — Salida", techId: "SNS-00102", type: "Salida", parking: "Est. A", status: "Activo", lastDetection: "Hoy 08:45" },
  { id: "3", name: "Sensor Est. B — Entrada", techId: "SNS-00103", type: "Entrada", parking: "Est. B", status: "Error", lastDetection: "Ayer 17:10" },
  { id: "4", name: "Sensor Est. C — Entrada", techId: "SNS-00104", type: "Entrada", parking: "Est. C", status: "Inactivo", lastDetection: "Sin detecciones recientes" },
];

const sampleDetections = [
  { id: "d1", datetime: "Hoy 08:32", plate: "BCN-4521", vehicle: "Carlos Hernández (Toyota Corolla)", type: "Entrada", result: "Autorizado" },
  { id: "d2", datetime: "Hoy 08:18", plate: "BCN-7890", vehicle: "Coca-Cola (Ford F-150)", type: "Entrada", result: "Autorizado" },
  { id: "d3", datetime: "Hoy 07:55", plate: "ABC-9999", vehicle: "—", type: "Entrada", result: "No registrado" },
];

const statusDot = (s: SensorStatus) => {
  switch (s) {
    case "Activo": return "bg-emerald-500";
    case "Inactivo": return "bg-slate-400";
    case "Error": return "bg-red-500";
  }
};

const typeBadge = (t: SensorType) =>
  t === "Entrada"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-red-50 text-red-700 border-red-200";

export function AdminSensors() {
  const [sensors, setSensors] = useState<Sensor[]>(initialSensors);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [historyFor, setHistoryFor] = useState<Sensor | null>(null);
  const [form, setForm] = useState<{ name: string; techId: string; type: SensorType; parking: string; status: SensorStatus; notes: string }>({
    name: "", techId: "", type: "Entrada", parking: "", status: "Activo", notes: ""
  });
  const [quickParkingOpen, setQuickParkingOpen] = useState(false);
  const [quickParkingName, setQuickParkingName] = useState("");
  const [extraParkings, setExtraParkings] = useState<string[]>([]);

  const allParkings = [...parkingOptions, ...extraParkings];

  const openNew = () => {
    setEditingId(null);
    setForm({ name: "", techId: "", type: "Entrada", parking: "", status: "Activo", notes: "" });
    setIsOpen(true);
  };

  const openEdit = (s: Sensor) => {
    setEditingId(s.id);
    setForm({ name: s.name, techId: s.techId, type: s.type, parking: s.parking, status: s.status === "Error" ? "Activo" : s.status, notes: s.notes || "" });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s: Sensor = {
      id: editingId || Math.random().toString(),
      name: form.name,
      techId: form.techId,
      type: form.type,
      parking: form.parking,
      status: form.status,
      lastDetection: editingId ? sensors.find(x => x.id === editingId)?.lastDetection || "Sin detecciones" : "Sin detecciones",
      notes: form.notes,
    };
    setSensors(editingId ? sensors.map(x => x.id === editingId ? s : x) : [s, ...sensors]);
    setIsOpen(false);
  };

  const handleQuickParking = () => {
    if (!quickParkingName.trim()) return;
    const name = quickParkingName.trim();
    setExtraParkings(p => [...p, name]);
    setForm(prev => ({ ...prev, parking: name }));
    setQuickParkingName("");
    setQuickParkingOpen(false);
  };

  if (historyFor) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
        <button onClick={() => setHistoryFor(null)} className="flex items-center gap-2 text-[#2563EB] hover:underline mb-6 font-medium">
          <ArrowBackIcon fontSize="small" />Volver a sensores
        </button>
        <h1 className="text-2xl font-bold text-[#0A1628]">Detecciones — {historyFor.name}</h1>
        <p className="text-[#64748B] mt-1 mb-6 font-medium">{historyFor.techId} · {historyFor.parking}</p>
        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr className="text-left text-[#64748B] font-semibold">
                <th className="px-4 py-3">Fecha y hora</th>
                <th className="px-4 py-3">Placa</th>
                <th className="px-4 py-3">Vinculado</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {sampleDetections.map(d => (
                <tr key={d.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3 text-[#334155]">{d.datetime}</td>
                  <td className="px-4 py-3 font-mono font-bold text-[#0F172A]">{d.plate}</td>
                  <td className="px-4 py-3 text-[#334155]">{d.vehicle}</td>
                  <td className="px-4 py-3"><Badge className={`border ${typeBadge(d.type as SensorType)}`}>{d.type}</Badge></td>
                  <td className="px-4 py-3">
                    <span className={d.result === "Autorizado" ? "text-emerald-700 font-medium" : "text-amber-700 font-medium"}>{d.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628] tracking-tight">Gestión de Sensores</h1>
          <p className="text-[#64748B] mt-1 font-medium">Sensores de detección anclados a estacionamientos</p>
        </div>
        <Button onClick={openNew} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium">
          <AddIcon fontSize="small" className="mr-2" />Nuevo Sensor
        </Button>
      </div>

      {sensors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map(s => (
            <div key={s.id} className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <SensorsIcon className="text-[#2563EB]" fontSize="small" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">{s.name}</h3>
                    <p className="text-xs text-[#94A3B8] font-mono mt-0.5">{s.techId}</p>
                  </div>
                </div>
                <Badge className={`border ${typeBadge(s.type)}`}>{s.type}</Badge>
              </div>

              <div className="space-y-2 text-sm flex-1 mb-4">
                <div className="flex justify-between text-[#64748B]"><span>Estacionamiento</span><span className="font-medium text-[#334155]">{s.parking}</span></div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Estatus</span>
                  <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                    <span className={`w-2 h-2 rounded-full ${statusDot(s.status)}`} />{s.status}
                  </span>
                </div>
                <div className="flex justify-between text-[#64748B]"><span>Última detección</span><span className="text-[#334155]">{s.lastDetection}</span></div>
              </div>

              <div className="flex gap-1 pt-3 border-t border-[#E2E8F0]">
                <Button variant="ghost" size="sm" onClick={() => openEdit(s)} className="flex-1 h-9 text-[#64748B] hover:text-[#2563EB] hover:bg-blue-50"><EditIcon fontSize="small" className="mr-1.5" />Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => setHistoryFor(s)} className="flex-1 h-9 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"><HistoryIcon fontSize="small" className="mr-1.5" />Historial</Button>
                <Button variant="ghost" size="sm" onClick={() => setSensors(sensors.filter(x => x.id !== s.id))} className="h-9 w-9 p-0 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50"><DeleteIcon fontSize="small" /></Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-xl shadow-sm border border-dashed border-[#E2E8F0]">
          <div className="w-24 h-24 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-5 border border-[#E2E8F0]">
            <MemoryIcon className="text-[#94A3B8]" style={{ fontSize: 48 }} />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">No hay sensores registrados</h3>
          <Button onClick={openNew} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium mt-4">
            <AddIcon fontSize="small" className="mr-2" />Nuevo Sensor
          </Button>
        </div>
      )}

      {/* Sensor modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="bg-[#0A1628] text-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white text-left">{editingId ? "Editar Sensor" : "Nuevo Sensor"}</DialogTitle>
              <DialogDescription className="text-[#94A3B8] mt-1 text-left">Configura un sensor de entrada o salida y ánclalo a un estacionamiento.</DialogDescription>
            </DialogHeader>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Nombre personalizado</Label>
              <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Sensor Est. A — Entrada" className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">ID técnico del sensor</Label>
              <Input required value={form.techId} onChange={e => setForm({ ...form, techId: e.target.value.toUpperCase() })} placeholder="SNS-00123" className="h-11 border-[#E2E8F0] font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Tipo de detección</Label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setForm({ ...form, type: "Entrada" })}
                  className={`h-11 rounded-md border text-sm font-medium flex items-center justify-center gap-2 ${form.type === "Entrada" ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-white text-[#475569] border-[#E2E8F0]"}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />Entrada
                </button>
                <button type="button" onClick={() => setForm({ ...form, type: "Salida" })}
                  className={`h-11 rounded-md border text-sm font-medium flex items-center justify-center gap-2 ${form.type === "Salida" ? "bg-red-50 text-red-700 border-red-300" : "bg-white text-[#475569] border-[#E2E8F0]"}`}>
                  <span className="w-2 h-2 rounded-full bg-red-500" />Salida
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Estacionamiento anclado</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select value={form.parking} onValueChange={v => setForm({ ...form, parking: v })}>
                    <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue placeholder="Selecciona estacionamiento..." /></SelectTrigger>
                    <SelectContent>
                      {allParkings.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" variant="outline" onClick={() => setQuickParkingOpen(true)} className="h-11 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 font-medium shrink-0">
                  <AddIcon fontSize="small" className="mr-1" />Crear y asignar
                </Button>
              </div>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Un sensor de entrada detecta vehículos que ingresan. Un sensor de salida detecta vehículos que egresan. Cada estacionamiento puede tener un sensor de cada tipo.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Estatus inicial</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["Activo", "Inactivo"] as const).map(st => (
                  <button key={st} type="button" onClick={() => setForm({ ...form, status: st })}
                    className={`h-10 rounded-md border text-sm font-medium ${form.status === st ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#475569] border-[#E2E8F0]"}`}>{st}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Observaciones técnicas (opcional)</Label>
              <Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Notas de instalación, calibración, etc." className="min-h-[80px] border-[#E2E8F0] resize-none" />
            </div>
            <DialogFooter className="pt-4 border-t border-[#E2E8F0]">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Guardar sensor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick-create parking */}
      <Dialog open={quickParkingOpen} onOpenChange={setQuickParkingOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#0A1628]">Crear y asignar estacionamiento</DialogTitle>
            <DialogDescription>Creación rápida — quedará anclado al sensor.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label className="text-[#0F172A] font-semibold text-sm">Nombre del estacionamiento</Label>
            <Input value={quickParkingName} onChange={e => setQuickParkingName(e.target.value)} placeholder="Ej. Est. F" className="h-11 border-[#E2E8F0]" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuickParkingOpen(false)}>Cancelar</Button>
            <Button onClick={handleQuickParking} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Crear y asignar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
