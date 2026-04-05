import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";

interface HistoryRecord {
  id: string;
  name: string;
  type: string;
  door: string;
  time: string;
  status: "ok" | "rejected";
}

const historyData: HistoryRecord[] = [
  { id: "1", name: "Carlos Mendoza", type: "Estudiante", door: "Principal (A y C)", time: "14:32", status: "ok" },
  { id: "2", name: "Ana Silva", type: "Personal", door: "Estacionamiento D", time: "14:15", status: "ok" },
  { id: "3", name: "Luis Osorio", type: "Visitante", door: "Principal (A y C)", time: "13:45", status: "rejected" },
  { id: "4", name: "María Gómez", type: "Estudiante", door: "Estacionamiento E", time: "13:10", status: "ok" },
  { id: "5", name: "Jorge Ramírez", type: "Proveedor", door: "Zona A", time: "12:50", status: "ok" },
  { id: "6", name: "Lucía Fernández", type: "Estudiante", door: "Principal (A y C)", time: "12:30", status: "rejected" },
  { id: "7", name: "Roberto Díaz", type: "Personal", door: "Estacionamiento D", time: "11:45", status: "ok" },
  { id: "8", name: "Elena Torres", type: "Estudiante", door: "Estacionamiento E", time: "11:20", status: "ok" },
  { id: "9", name: "Martín Castro", type: "Visitante", door: "Principal (A y C)", time: "10:15", status: "ok" },
  { id: "10", name: "Sofía Vargas", type: "Estudiante", door: "Zona A", time: "09:50", status: "ok" },
  { id: "11", name: "Pedro Ruiz", type: "Personal", door: "Estacionamiento D", time: "09:10", status: "rejected" },
  { id: "12", name: "Laura Jiménez", type: "Estudiante", door: "Principal (A y C)", time: "08:30", status: "ok" }
];

export function GuardHistory() {
  const [gateFilter, setGateFilter] = useState<string>('Todas las entradas');
  const GATES = ['Todas las entradas', 'Principal (A y C)', 'Estacionamiento D', 'Estacionamiento E', 'Zona A'];

  const filteredHistory = historyData.filter(record => 
    gateFilter === 'Todas las entradas' || record.door === gateFilter
  );

  const isEmpty = filteredHistory.length === 0;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full h-full flex flex-col font-sans">
      <div className="flex flex-col gap-4 mb-6 sticky top-0 bg-[#F8FAFC] z-10 pt-2 pb-4 shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-[#0A1628] tracking-tight m-0">Historial del Día</h1>
        <div className="flex w-full">
          <select
            value={gateFilter}
            onChange={(e) => setGateFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] w-full max-w-xs"
          >
            {GATES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-[#64748B] min-h-[300px]">
            <HistoryIcon style={{ fontSize: 64, color: "#94a3b8", marginBottom: "16px" }} />
            <p className="text-lg font-medium">No hay registros para hoy</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((record) => {
              const initials = record.name.split(" ").map(n => n[0]).join("").substring(0, 2);
              
              return (
                <div 
                  key={record.id} 
                  className="bg-white p-4 rounded-xl shadow-sm border border-[#E2E8F0] flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarFallback className="bg-[#F1F5F9] text-[#0A1628] font-bold text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0A1628] truncate text-base mb-0.5">
                      {record.name}
                    </p>
                    <p className="text-sm text-[#64748B] truncate flex items-center gap-1.5">
                      <span className="font-medium">{record.type}</span>
                      <span>&bull;</span>
                      <span>{record.door}</span>
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end shrink-0 gap-1.5">
                    <span className="text-xs font-bold text-[#64748B]">
                      {record.time}
                    </span>
                    {record.status === "ok" ? (
                      <div className="flex items-center justify-center text-[#16A34A]" title="Acceso Permitido">
                        <CheckCircleIcon fontSize="small" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-[#DC2626]" title="Acceso Rechazado">
                        <CancelIcon fontSize="small" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
