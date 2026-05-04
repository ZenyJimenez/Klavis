import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

type AssignType = "Usuario" | "Empresa" | "Externo" | "No asignado";

interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  color: string;
  assignedTo: string;
  assignedType: AssignType;
}

const initialVehicles: Vehicle[] = [
  { id: "1", plate: "BCN-4521", brand: "Toyota", model: "Corolla", color: "Blanco", assignedTo: "Carlos Hernández", assignedType: "Usuario" },
  { id: "2", plate: "SON-1234", brand: "Sin registro", model: "—", color: "—", assignedTo: "No asignado", assignedType: "No asignado" },
  { id: "3", plate: "BCN-7890", brand: "Ford", model: "F-150", color: "Gris", assignedTo: "Coca-Cola", assignedType: "Empresa" },
  { id: "4", plate: "MXL-0012", brand: "Nissan", model: "Sentra", color: "Azul", assignedTo: "Ing. Pedro Solís", assignedType: "Externo" },
];

const sampleUsers = ["Carlos Hernández", "María López", "Juan Pérez"];
const sampleCompanies = ["Coca-Cola", "Siemens", "Distribuidora García"];
const sampleExterns = ["Ing. Pedro Solís", "Lic. Carmen Vidal", "Dr. Alejandro Fuentes"];

const typeColor = (t: AssignType) => {
  switch (t) {
    case "Usuario": return "bg-blue-50 text-[#2563EB] border-blue-200";
    case "Empresa": return "bg-purple-50 text-purple-700 border-purple-200";
    case "Externo": return "bg-amber-50 text-amber-700 border-amber-200";
    default: return "bg-slate-100 text-slate-500 border-slate-200";
  }
};

export function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ plate: "", brand: "", model: "", color: "", assignedType: "Usuario" as AssignType, assignedTo: "" });

  // quick-create modals (for "+ Crear y asignar")
  const [quickType, setQuickType] = useState<null | "Usuario" | "Empresa" | "Externo">(null);
  const [quickName, setQuickName] = useState("");

  const filtered = vehicles.filter(v =>
    [v.plate, v.brand, v.assignedTo].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingId(null);
    setForm({ plate: "", brand: "", model: "", color: "", assignedType: "Usuario", assignedTo: "" });
    setIsOpen(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditingId(v.id);
    setForm({ plate: v.plate, brand: v.brand, model: v.model, color: v.color, assignedType: v.assignedType === "No asignado" ? "Usuario" : v.assignedType, assignedTo: v.assignedTo === "No asignado" ? "" : v.assignedTo });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v: Vehicle = {
      id: editingId || Math.random().toString(),
      plate: form.plate.toUpperCase(),
      brand: form.brand,
      model: form.model,
      color: form.color,
      assignedTo: form.assignedTo || "No asignado",
      assignedType: form.assignedTo ? form.assignedType : "No asignado",
    };
    setVehicles(editingId ? vehicles.map(x => x.id === editingId ? v : x) : [v, ...vehicles]);
    setIsOpen(false);
  };

  const getOptions = () => {
    switch (form.assignedType) {
      case "Usuario": return sampleUsers;
      case "Empresa": return sampleCompanies;
      case "Externo": return sampleExterns;
      default: return [];
    }
  };

  const handleQuickCreate = () => {
    if (!quickName.trim()) return;
    setForm(prev => ({ ...prev, assignedTo: quickName.trim() }));
    setQuickName("");
    setQuickType(null);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628] tracking-tight">Gestión de Vehículos</h1>
          <p className="text-[#64748B] mt-1 font-medium">Catálogo central de placas y propietarios</p>
        </div>
        <Button onClick={openNew} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium">
          <AddIcon fontSize="small" className="mr-2" />Nuevo Vehículo
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" fontSize="small" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por placa, marca o propietario..."
            className="pl-10 h-11 border-[#E2E8F0]"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr className="text-left text-[#64748B] font-semibold">
                  <th className="px-4 py-3">Placa</th>
                  <th className="px-4 py-3">Marca</th>
                  <th className="px-4 py-3">Modelo</th>
                  <th className="px-4 py-3">Color</th>
                  <th className="px-4 py-3">Asignado a</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => (
                  <tr key={v.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-mono font-bold text-[#0F172A]">{v.plate}</td>
                    <td className="px-4 py-3 text-[#334155]">{v.brand}</td>
                    <td className="px-4 py-3 text-[#334155]">{v.model}</td>
                    <td className="px-4 py-3 text-[#334155]">{v.color}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[#0F172A] font-medium">{v.assignedTo}</span>
                        <Badge className={`mt-1 w-fit text-[10px] uppercase tracking-wider border ${typeColor(v.assignedType)}`}>{v.assignedType}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(v)} className="h-8 w-8 p-0 text-[#64748B] hover:text-[#2563EB]"><EditIcon fontSize="small" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => setVehicles(vehicles.filter(x => x.id !== v.id))} className="h-8 w-8 p-0 text-[#64748B] hover:text-[#DC2626]"><DeleteIcon fontSize="small" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-xl shadow-sm border border-dashed border-[#E2E8F0]">
          <div className="w-24 h-24 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-5 border border-[#E2E8F0]">
            <DirectionsCarIcon className="text-[#94A3B8]" style={{ fontSize: 48 }} />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">No hay vehículos registrados</h3>
          <Button onClick={openNew} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white font-medium mt-4">
            <AddIcon fontSize="small" className="mr-2" />Nuevo Vehículo
          </Button>
        </div>
      )}

      {/* Vehicle modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="bg-[#0A1628] text-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white text-left">{editingId ? "Editar Vehículo" : "Nuevo Vehículo"}</DialogTitle>
              <DialogDescription className="text-[#94A3B8] mt-1 text-left">Registra un vehículo y lo asignas a un usuario, empresa o externo.</DialogDescription>
            </DialogHeader>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Número de placa</Label>
              <Input required value={form.plate} onChange={e => setForm({ ...form, plate: e.target.value.toUpperCase() })} placeholder="BCN-0000" className="font-mono uppercase h-11 border-[#E2E8F0]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Marca</Label>
                <Input required value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="Toyota" className="h-11 border-[#E2E8F0]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Modelo</Label>
                <Input required value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} placeholder="Corolla" className="h-11 border-[#E2E8F0]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Color</Label>
              <Input required value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} placeholder="Blanco" className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Asignar a</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["Usuario", "Empresa", "Externo"] as const).map(t => (
                  <button key={t} type="button" onClick={() => setForm({ ...form, assignedType: t, assignedTo: "" })}
                    className={`h-10 rounded-md border text-sm font-medium transition ${form.assignedType === t ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#2563EB]"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <Select value={form.assignedTo} onValueChange={v => setForm({ ...form, assignedTo: v })}>
                    <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue placeholder={`Buscar ${form.assignedType.toLowerCase()}...`} /></SelectTrigger>
                    <SelectContent>
                      {getOptions().map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" variant="outline" onClick={() => setQuickType(form.assignedType as any)} className="h-11 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 font-medium shrink-0">
                  <AddIcon fontSize="small" className="mr-1" />Crear y asignar
                </Button>
              </div>
            </div>
            <DialogFooter className="pt-4 border-t border-[#E2E8F0]">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Guardar vehículo</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick-create modal */}
      <Dialog open={!!quickType} onOpenChange={() => setQuickType(null)}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#0A1628]">Crear y asignar {quickType?.toLowerCase()}</DialogTitle>
            <DialogDescription>Creación rápida — quedará asignado automáticamente al vehículo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label className="text-[#0F172A] font-semibold text-sm">Nombre completo</Label>
            <Input value={quickName} onChange={e => setQuickName(e.target.value)} placeholder="Nombre" className="h-11 border-[#E2E8F0]" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuickType(null)}>Cancelar</Button>
            <Button onClick={handleQuickCreate} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Crear y asignar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
