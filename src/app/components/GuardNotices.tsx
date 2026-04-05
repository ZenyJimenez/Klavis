import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Notice {
  id: string;
  type: "info" | "alert" | "system";
  text: string;
  timestamp: string;
  category: string;
  read: boolean;
}

const initialNotices: Notice[] = [
  {
    id: "1",
    type: "alert",
    text: "Intento de acceso rechazado en Puerta Sur (Usuario suspendido)",
    timestamp: "Hoy, 14:05",
    category: "Acceso denegado",
    read: false,
  },
  {
    id: "2",
    type: "info",
    text: "5 nuevos visitantes registrados para el evento de Auditorio",
    timestamp: "Hoy, 13:30",
    category: "Visitantes",
    read: false,
  },
  {
    id: "3",
    type: "system",
    text: "Actualización de políticas de acceso completada",
    timestamp: "Hoy, 09:00",
    category: "Configuración",
    read: false,
  },
  {
    id: "4",
    type: "alert",
    text: "Incidencia reportada en Estacionamiento B (Vehículo mal estacionado)",
    timestamp: "Ayer, 18:45",
    category: "Incidencia",
    read: false,
  },
  {
    id: "5",
    type: "info",
    text: "Se han renovado 12 credenciales de estudiante",
    timestamp: "Ayer, 16:20",
    category: "Credenciales",
    read: false,
  },
  {
    id: "6",
    type: "system",
    text: "Mantenimiento programado: Puerta Norte inactiva de 20:00 a 22:00",
    timestamp: "Ayer, 10:00",
    category: "Mantenimiento",
    read: true,
  }
];

export function GuardNotices() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);

  const unreadCount = notices.filter(n => !n.read).length;
  const isEmpty = notices.length === 0;

  const markAllAsRead = () => {
    setNotices(notices.map(n => ({ ...n, read: true })));
  };

  const getNoticeConfig = (type: Notice["type"]) => {
    switch (type) {
      case "info":
        return {
          icon: <InfoOutlinedIcon className="text-[#2563EB]" fontSize="small" />,
          borderColor: "border-l-[#2563EB]",
          bg: "bg-[#EFF6FF]"
        };
      case "alert":
        return {
          icon: <ErrorOutlineIcon className="text-[#DC2626]" fontSize="small" />,
          borderColor: "border-l-[#DC2626]",
          bg: "bg-[#FEF2F2]"
        };
      case "system":
        return {
          icon: <SettingsOutlinedIcon className="text-[#64748B]" fontSize="small" />,
          borderColor: "border-l-[#64748B]",
          bg: "bg-[#F1F5F9]"
        };
      default:
        return {
          icon: <InfoOutlinedIcon className="text-[#2563EB]" fontSize="small" />,
          borderColor: "border-l-[#2563EB]",
          bg: "bg-[#EFF6FF]"
        };
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-row items-center justify-between mb-6 sticky top-0 bg-[#F8FAFC] z-10 pt-2 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-[#0F172A] tracking-tight m-0">Avisos</h1>
          {unreadCount > 0 && (
            <span className="flex items-center justify-center bg-[#2563EB] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={markAllAsRead}
          disabled={unreadCount === 0 || isEmpty}
          className="text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A] transition-colors h-8 text-xs font-bold"
        >
          <DoneAllIcon fontSize="small" className="mr-1.5" />
          Leer todo
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-[#64748B] min-h-[300px]">
            <div className="relative mb-4">
              <NotificationsNoneOutlinedIcon style={{ fontSize: 64, color: "#94a3b8" }} />
              <div className="absolute -bottom-1 -right-1 bg-[#F8FAFC] rounded-full p-0.5">
                <CheckIcon style={{ fontSize: 24, color: "#2563EB" }} />
              </div>
            </div>
            <p className="text-lg font-medium text-[#64748B]">No tienes avisos nuevos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => {
              const config = getNoticeConfig(notice.type);
              
              return (
                <div 
                  key={notice.id} 
                  className={`bg-white rounded-xl shadow-sm border border-[#E2E8F0] border-l-4 ${config.borderColor} p-4 flex gap-4 transition-all ${!notice.read ? "opacity-100" : "opacity-60 grayscale-[50%]"}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${config.bg} shrink-0`}>
                    {config.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-[#0F172A] text-sm mb-1.5 ${!notice.read ? "font-bold" : "font-medium"}`}>
                      {notice.text}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-[#64748B] font-bold">
                        {notice.timestamp}
                      </span>
                      <span className="text-[#CBD5E1] text-xs">&bull;</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-[#F1F5F9] text-[#475569] border-[#E2E8F0] uppercase tracking-wider font-bold">
                        {notice.category}
                      </Badge>
                    </div>
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
