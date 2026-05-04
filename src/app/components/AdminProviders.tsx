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
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const allEntries = ["Puerta Principal", "Puerta Secundaria", "Vehicular Norte", "Vehicular Sur"];

interface Person {
  id: string;
  name: string;
  idType: string;
  idNumber: string;
  vehicles: string[];
}
interface Company {
  id: string;
  name: string;
  industry: string;
  phone: string;
  email: string;
  entries: string[];
  people: Person[];
  nextVisit?: string;
  hasCalendar: boolean;
}

const initialCompanies: Company[] = [
  {
    id: "1", name: "Coca-Cola", industry: "Alimentación", phone: "664-100-1000", email: "contacto@coca-cola.com",
    entries: ["Puerta Principal", "Vehicular Norte"],
    people: [
      { id: "p1", name: "Sr. Juan Valdez", idType: "INE", idNumber: "INE-9001", vehicles: ["BCN-7890"] },
      { id: "p2", name: "Lic. Andrea Soto", idType: "INE", idNumber: "INE-9002", vehicles: [] },
    ],
    nextVisit: "Mañana 09:00", hasCalendar: true,
  },
  {
    id: "2", name: "Siemens", industry: "Tecnología", phone: "664-200-2000", email: "service@siemens.mx",
    entries: ["Puerta Principal"],
    people: [{ id: "p3", name: "Ing. Marco Ríos", idType: "INE", idNumber: "INE-001", vehicles: ["MXL-5544"] }],
    nextVisit: "Vie 11:00", hasCalendar: true,
  },
  {
    id: "3", name: "Distribuidora García", industry: "Alimentación", phone: "664-300-3000", email: "ventas@dgarcia.mx",
    entries: ["Vehicular Sur"], people: [], hasCalendar: false,
  },
  {
    id: "4", name: "Papelería Ofimex", industry: "Otro", phone: "664-400-4000", email: "ofi@ofimex.mx",
    entries: ["Puerta Principal"], people: [], hasCalendar: false,
  },
];

const initials = (name: string) => name.split(" ").slice(0, 2).map(s => s[0]).join("").toUpperCase();
const colorForName = (name: string) => {
  const colors = ["bg-rose-100 text-rose-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-purple-100 text-purple-700"];
  return colors[name.charCodeAt(0) % colors.length];
};

export function AdminProviders() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [filter, setFilter] = useState<"Todas" | "Con calendario" | "Sin calendario">("Todas");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", industry: "Otro", phone: "", email: "", entries: [] as string[] });
  const [peopleViewId, setPeopleViewId] = useState<string | null>(null);

  // person modal
  const [isPersonOpen, setIsPersonOpen] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
  const [personForm, setPersonForm] = useState({ name: "", idType: "INE", idNumber: "", phone: "", vehicles: "" });

  const filtered = companies.filter(c => {
    if (filter === "Con calendario" && !c.hasCalendar) return false;
    if (filter === "Sin calendario" && c.hasCalendar) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ name: "", industry: "Otro", phone: "", email: "", entries: [] });
    setIsOpen(true);
  };
  const openEdit = (c: Company) => {
    setEditingId(c.id);
    setForm({ name: c.name, industry: c.industry, phone: c.phone, email: c.email, entries: c.entries });
    setIsOpen(true);
  };
  const toggleEntry = (e: string) => setForm(prev => ({ ...prev, entries: prev.entries.includes(e) ? prev.entries.filter(x => x !== e) : [...prev.entries, e] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCompanies(companies.map(c => c.id === editingId ? { ...c, ...form } : c));
    } else {
      setCompanies([{ id: Math.random().toString(), ...form, people: [], hasCalendar: false }, ...companies]);
    }
    setIsOpen(false);
  };

  const peopleViewCompany = peopleViewId ? companies.find(c => c.id === peopleViewId) : null;

  const openNewPerson = () => {
    setEditingPersonId(null);
    setPersonForm({ name: "", idType: "INE", idNumber: "", phone: "", vehicles: "" });
    setIsPersonOpen(true);
  };
  const openEditPerson = (p: Person) => {
    setEditingPersonId(p.id);
    setPersonForm({ name: p.name, idType: p.idType, idNumber: p.idNumber, phone: "", vehicles: p.vehicles.join(", ") });
    setIsPersonOpen(true);
  };
  const handleSavePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!peopleViewId) return;
    const newPerson: Person = {
      id: editingPersonId || Math.random().toString(),
      name: personForm.name,
      idType: personForm.idType,
      idNumber: personForm.idNumber,
      vehicles: personForm.vehicles.split(",").map(v => v.trim()).filter(Boolean),
    };
    setCompanies(companies.map(c => {
      if (c.id !== peopleViewId) return c;
      return {
        ...c,
        people: editingPersonId ? c.people.map(p => p.id === editingPersonId ? newPerson : p) : [...c.people, newPerson],
      };
    }));
    setIsPersonOpen(false);
  };

  if (peopleViewCompany) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
        <button onClick={() => setPeopleViewId(null)} className="flex items-center gap-2 text-[#2563EB] hover:underline mb-6 font-medium">
          <ArrowBackIcon fontSize="small" />Volver a empresas
        </button>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1628]">Personas — {peopleViewCompany.name}</h1>
            <p className="text-[#64748B] mt-1 font-medium">{peopleViewCompany.people.length} personas registradas</p>
          </div>
          <Button onClick={openNewPerson} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">
            <AddIcon fontSize="small" className="mr-2" />Agregar persona
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          {peopleViewCompany.people.length === 0 ? (
            <div className="p-12 text-center text-[#64748B]">No hay personas asignadas a esta empresa.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr className="text-left text-[#64748B] font-semibold">
                  <th className="px-4 py-3">Persona</th>
                  <th className="px-4 py-3">Identificación</th>
                  <th className="px-4 py-3">Vehículos</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {peopleViewCompany.people.map(p => (
                  <tr key={p.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${colorForName(p.name)}`}>{initials(p.name)}</div>
                        <span className="font-medium text-[#0F172A]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#334155]">{p.idType} · {p.idNumber}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {p.vehicles.length > 0 ? p.vehicles.map(v => <Badge key={v} className="font-mono bg-blue-50 text-[#2563EB] border border-blue-200">{v}</Badge>) : <span className="text-[#94A3B8] text-xs">Sin vehículos</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEditPerson(p)} className="h-8 w-8 p-0 text-[#64748B] hover:text-[#2563EB]"><EditIcon fontSize="small" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => setCompanies(companies.map(c => c.id === peopleViewCompany.id ? { ...c, people: c.people.filter(x => x.id !== p.id) } : c))} className="h-8 w-8 p-0 text-[#64748B] hover:text-[#DC2626]"><DeleteIcon fontSize="small" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Dialog open={isPersonOpen} onOpenChange={setIsPersonOpen}>
          <DialogContent className="sm:max-w-[480px] bg-white rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#0A1628]">{editingPersonId ? "Editar Persona" : "Nueva Persona"}</DialogTitle>
              <DialogDescription>Datos de la persona asignada a {peopleViewCompany.name}.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSavePerson} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Nombre completo</Label>
                <Input required value={personForm.name} onChange={e => setPersonForm({ ...personForm, name: e.target.value })} className="h-11 border-[#E2E8F0]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-[#0F172A] font-semibold text-sm">Tipo ID</Label>
                  <Select value={personForm.idType} onValueChange={v => setPersonForm({ ...personForm, idType: v })}>
                    <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["INE", "Pasaporte", "Licencia", "Otro"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#0F172A] font-semibold text-sm">Número ID</Label>
                  <Input required value={personForm.idNumber} onChange={e => setPersonForm({ ...personForm, idNumber: e.target.value })} className="h-11 border-[#E2E8F0]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Teléfono (opcional)</Label>
                <Input value={personForm.phone} onChange={e => setPersonForm({ ...personForm, phone: e.target.value })} className="h-11 border-[#E2E8F0]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Vehículos asignados (placas separadas por coma)</Label>
                <div className="flex gap-2">
                  <Input value={personForm.vehicles} onChange={e => setPersonForm({ ...personForm, vehicles: e.target.value })} placeholder="BCN-7890, MXL-1234" className="h-11 border-[#E2E8F0] font-mono flex-1" />
                  <Button type="button" variant="outline" onClick={() => setPersonForm(p => ({ ...p, vehicles: p.vehicles ? p.vehicles + ", NEW-0000" : "NEW-0000" }))} className="h-11 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 font-medium shrink-0">
                    <AddIcon fontSize="small" className="mr-1" />Crear y asignar
                  </Button>
                </div>
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setIsPersonOpen(false)}>Cancelar</Button>
                <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Guardar persona</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628] tracking-tight">Empresas Proveedoras</h1>
          <p className="text-[#64748B] mt-1 font-medium">Catálogo de empresas autorizadas y sus personas</p>
        </div>
        <Button onClick={openNew} className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">
          <AddIcon fontSize="small" className="mr-2" />Nueva Empresa
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 mb-6 flex flex-col sm:flex-row gap-3">
        <Input placeholder="Buscar empresa..." value={search} onChange={e => setSearch(e.target.value)} className="h-11 border-[#E2E8F0] flex-1" />
        <div className="flex bg-[#E2E8F0] p-1 rounded-lg">
          {(["Todas", "Con calendario", "Sin calendario"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${filter === f ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${colorForName(c.name)}`}>{initials(c.name)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[16px] font-bold text-[#0F172A] leading-tight">{c.name}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">{c.industry}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm flex-1 mb-4">
              <div className="flex items-center gap-2 text-[#64748B]">
                <PeopleIcon fontSize="small" className="text-[#94A3B8]" />
                <span>{c.people.length} personas</span>
              </div>
              <div>
                <p className="text-xs text-[#64748B] mb-1.5">Entradas permitidas</p>
                <div className="flex flex-wrap gap-1">
                  {c.entries.length > 0 ? c.entries.map(e => <Badge key={e} className="bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px]">{e}</Badge>) : <span className="text-[#94A3B8] text-xs">Ninguna</span>}
                </div>
              </div>
              {c.nextVisit && (
                <div className="flex items-center gap-2 text-emerald-700">
                  <EventIcon fontSize="small" />
                  <span className="font-medium">{c.nextVisit}</span>
                </div>
              )}
            </div>
            <div className="flex gap-1 pt-3 border-t border-[#E2E8F0]">
              <Button variant="ghost" size="sm" onClick={() => openEdit(c)} className="flex-1 h-9 text-[#64748B] hover:text-[#2563EB] hover:bg-blue-50"><EditIcon fontSize="small" className="mr-1" />Editar</Button>
              <Button variant="ghost" size="sm" onClick={() => setPeopleViewId(c.id)} className="flex-1 h-9 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"><PeopleIcon fontSize="small" className="mr-1" />Personas</Button>
              <Button variant="ghost" size="sm" onClick={() => setCompanies(companies.filter(x => x.id !== c.id))} className="h-9 w-9 p-0 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50"><DeleteIcon fontSize="small" /></Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-dashed border-[#E2E8F0]">
            <BusinessIcon className="text-[#94A3B8]" style={{ fontSize: 48 }} />
            <h3 className="text-lg font-bold text-[#0F172A] mt-3">No hay empresas</h3>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="bg-[#0A1628] text-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white text-left">{editingId ? "Editar Empresa" : "Nueva Empresa"}</DialogTitle>
              <DialogDescription className="text-[#94A3B8] mt-1 text-left">Información de la empresa proveedora.</DialogDescription>
            </DialogHeader>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Nombre de la empresa</Label>
              <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="h-11 border-[#E2E8F0]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Giro/industria</Label>
              <Select value={form.industry} onValueChange={v => setForm({ ...form, industry: v })}>
                <SelectTrigger className="h-11 border-[#E2E8F0]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Alimentación", "Tecnología", "Mantenimiento", "Limpieza", "Otro"].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Teléfono</Label>
                <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="h-11 border-[#E2E8F0]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#0F172A] font-semibold text-sm">Correo</Label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="h-11 border-[#E2E8F0]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#0F172A] font-semibold text-sm">Entradas permitidas</Label>
              <div className="grid grid-cols-2 gap-2">
                {allEntries.map(e => (
                  <label key={e} className={`flex items-center gap-2 p-2.5 border rounded-md cursor-pointer ${form.entries.includes(e) ? "bg-blue-50 border-[#2563EB]" : "bg-white border-[#E2E8F0]"}`}>
                    <input type="checkbox" checked={form.entries.includes(e)} onChange={() => toggleEntry(e)} className="accent-[#2563EB]" />
                    <span className="text-sm text-[#334155]">{e}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed mt-1.5">
                Si el proveedor accede por una entrada no autorizada, el sistema lo registrará con alerta pero no bloqueará el acceso.
              </p>
            </div>
            <DialogFooter className="pt-4 border-t border-[#E2E8F0]">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white">Guardar empresa</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
