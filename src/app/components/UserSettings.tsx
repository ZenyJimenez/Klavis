import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  Person, 
  Security, 
  ContactMail, 
  Palette, 
  Language, 
  Wallpaper, 
  Lock, 
  Fingerprint, 
  Face, 
  Smartphone,
  DarkMode,
  LightMode,
  ColorLens,
  Monitor,
  Keyboard,
  Public,
  AccessTime,
  CameraAlt,
  Save,
  ChevronRight,
  ArrowBack,
  Translate,
  PhotoSizeSelectActual,
  Timer,
  SettingsBrightness
} from "@mui/icons-material"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Separator } from "./ui/separator"
import { toast } from "sonner"

interface UserSettingsProps {
  role: "student" | "guard"
}

export function UserSettings({ role }: UserSettingsProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const isStudent = role === "student"

  const sections = [
    { 
      id: "profile", 
      label: "Gestión de Perfil", 
      desc: "Nombre, foto y usuario", 
      icon: <Person className="text-blue-600" />,
      component: <ProfileSection onBack={() => setActiveSection(null)} />
    },
    { 
      id: "security", 
      label: "Seguridad y Acceso", 
      desc: "Contraseña, PIN y biometría", 
      icon: <Security className="text-orange-600" />,
      component: <SecuritySection onBack={() => setActiveSection(null)} />
    },
    ...(isStudent ? [{ 
      id: "contact", 
      label: "Información de contacto", 
      desc: "Correo y datos personales", 
      icon: <ContactMail className="text-green-600" />,
      component: <ContactSection onBack={() => setActiveSection(null)} />
    }] : []),
    { 
      id: "appearance", 
      label: "Apariencia", 
      desc: "Temas, colores y fondo", 
      icon: <Palette className="text-purple-600" />,
      component: <AppearanceSection onBack={() => setActiveSection(null)} />
    },
    { 
      id: "region", 
      label: "Idioma y Región", 
      desc: "Teclado, hora y fecha", 
      icon: <Language className="text-cyan-600" />,
      component: <RegionSection onBack={() => setActiveSection(null)} />
    },
  ]

  const MainMenu = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      

      {/* Settings Groups */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors active:bg-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                {section.icon}
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900">{section.label}</p>
                <p className="text-xs text-gray-500">{section.desc}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-300" fontSize="small" />
          </button>
        ))}
      </div>

      {/* Sign Out */}
      <div className="px-4">
        <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 font-bold py-6 rounded-2xl border border-dashed border-red-200">
          Cerrar sesión en este dispositivo
        </Button>
      </div>
    </div>
  )

  return (
    <div className={`min-h-full ${isStudent ? "p-4 pb-28" : "p-6 md:p-8"} bg-[#F8FAFC]`}>
      {!isStudent && !activeSection && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0A1628]">Ajustes de Usuario</h1>
          <p className="text-gray-500">Configuración general de tu cuenta y terminal.</p>
        </div>
      )}

      <div className="max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          {!activeSection ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <MainMenu />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {sections.find(s => s.id === activeSection)?.component}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SectionHeader({ title, onBack }: { title: string, onBack: () => void }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button 
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
      >
        <ArrowBack fontSize="small" />
      </button>
      <h2 className="text-xl font-bold text-[#0A1628]">{title}</h2>
    </div>
  )
}

function ProfileSection({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Gestión de Perfil" onBack={onBack} />
      
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <button className="absolute bottom-1 right-1 bg-[#2563EB] text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <CameraAlt fontSize="small" />
            </button>
          </div>
          <p className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Cambiar foto</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase">Nombre completo</Label>
            <Input defaultValue="Carlos Hernández L." className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#2563EB]/20 transition-all" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase">Nombre de usuario</Label>
            <Input defaultValue="carlos.hernz" className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#2563EB]/20 transition-all" />
          </div>
        </div>

        <Button className="w-full h-12 rounded-xl bg-[#0A1628] hover:bg-black font-bold" onClick={() => {
          toast.success("Perfil actualizado con éxito")
          onBack()
        }}>
          Guardar cambios
        </Button>
      </div>
    </div>
  )
}

function SecuritySection({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Seguridad y Acceso" onBack={onBack} />
      
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-[#0A1628] flex items-center gap-2">
            <Lock className="text-gray-400" fontSize="small" />
            Cambiar Contraseña
          </h3>
          <div className="space-y-4">
            <Input type="password" placeholder="Contraseña actual" className="h-12 rounded-xl bg-gray-50 border-transparent" />
            <Input type="password" placeholder="Nueva contraseña" className="h-12 rounded-xl bg-gray-50 border-transparent" />
            <Input type="password" placeholder="Confirmar contraseña" className="h-12 rounded-xl bg-gray-50 border-transparent" />
            <Button className="w-full bg-[#2563EB] font-bold h-12 rounded-xl" onClick={() => toast.success("Contraseña actualizada")}>Actualizar contraseña</Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Smartphone fontSize="small" />
              </div>
              <div>
                <p className="font-bold text-sm">Configurar PIN</p>
                <p className="text-[10px] text-gray-400">Acceso rápido de 6 dígitos</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-[#2563EB] font-bold">Ajustar</Button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <Fingerprint fontSize="small" />
              </div>
              <div>
                <p className="font-bold text-sm">Huella digital</p>
                <p className="text-[10px] text-gray-400">Usa el sensor biométrico</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Face fontSize="small" />
              </div>
              <div>
                <p className="font-bold text-sm">Reconocimiento Facial</p>
                <p className="text-[10px] text-gray-400">Windows Hello / Face ID</p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactSection({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Información de contacto" onBack={onBack} />
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase">Correo institucional</Label>
            <Input defaultValue="carlos.hernz@itmexicali.edu.mx" className="h-12 rounded-xl bg-gray-50 border-transparent" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase">Teléfono celular</Label>
            <Input defaultValue="+52 686 123 4567" className="h-12 rounded-xl bg-gray-50 border-transparent" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase">Contacto de emergencia</Label>
            <Input defaultValue="María López - 686 987 6543" className="h-12 rounded-xl bg-gray-50 border-transparent" />
          </div>
        </div>
        <Button className="w-full h-12 rounded-xl bg-[#2563EB] font-bold" onClick={() => {
          toast.success("Información actualizada")
          onBack()
        }}>
          Actualizar mis datos
        </Button>
      </div>
    </div>
  )
}

function AppearanceSection({ onBack }: { onBack: () => void }) {
  const [theme, setTheme] = useState("light")
  const accents = ["#2563EB", "#0A1628", "#16A34A", "#DC2626", "#9333EA"]

  return (
    <div className="space-y-6">
      <SectionHeader title="Tema y Apariencia" onBack={onBack} />
      
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-8">
        {/* Theme Select */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700">Modo visual</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "light", label: "Claro", icon: LightMode },
              { id: "dark", label: "Oscuro", icon: DarkMode },
              { id: "system", label: "Sistema", icon: Monitor },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                  theme === t.id ? "border-[#2563EB] bg-blue-50/50" : "border-gray-50"
                }`}
              >
                <t.icon sx={{ fontSize: 24, color: theme === t.id ? "#2563EB" : "#94A3B8" }} />
                <span className={`text-[10px] font-bold ${theme === t.id ? "text-[#2563EB]" : "text-gray-400"}`}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700">Color de énfasis</h3>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
            <div className="flex gap-3">
              {accents.map((c) => (
                <button
                  key={c}
                  className="w-8 h-8 rounded-full shadow-sm hover:scale-110 transition-transform active:scale-90"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <ColorLens fontSize="small" className="text-gray-400" />
          </div>
        </div>

        {/* Screen Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700">Fondo y Pantalla</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <PhotoSizeSelectActual className="text-gray-400" fontSize="small" />
                <span className="text-sm font-medium">Fondo de escritorio</span>
              </div>
              <ChevronRight fontSize="small" className="text-gray-300" />
            </button>
            <div className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <Timer className="text-gray-400" fontSize="small" />
                <span className="text-sm font-medium">Protector de pantalla</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <SettingsBrightness className="text-gray-400" fontSize="small" />
                <span className="text-sm font-medium">Resolución</span>
              </div>
              <select className="bg-transparent text-xs font-bold text-[#2563EB] outline-none">
                <option>Normal</option>
                <option>Compacta</option>
              </select>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#0A1628] font-bold rounded-xl h-12" onClick={() => {
          toast.success("Apariencia guardada")
          onBack()
        }}>
          Aplicar cambios
        </Button>
      </div>
    </div>
  )
}

function RegionSection({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Idioma y Región" onBack={onBack} />
      
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Translate sx={{ fontSize: 14 }} /> Idioma del sistema
            </Label>
            <select className="w-full h-12 px-4 rounded-xl bg-gray-50 border-none font-medium text-sm">
              <option>Español (México)</option>
              <option>English (US)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Keyboard sx={{ fontSize: 14 }} /> Distribución de teclado
            </Label>
            <select className="w-full h-12 px-4 rounded-xl bg-gray-50 border-none font-medium text-sm">
              <option>Latinoamericano</option>
              <option>Inglés (EE.UU.)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Public sx={{ fontSize: 14 }} /> Zona horaria
            </Label>
            <select className="w-full h-12 px-4 rounded-xl bg-gray-50 border-none font-medium text-sm">
              <option>(GMT-08:00) Baja California</option>
              <option>(GMT-06:00) Ciudad de México</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <AccessTime sx={{ fontSize: 14 }} /> Formato de fecha y hora
            </Label>
            <select className="w-full h-12 px-4 rounded-xl bg-gray-50 border-none font-medium text-sm">
              <option>DD/MM/AAAA (24h)</option>
              <option>MM/DD/AAAA (12h)</option>
            </select>
          </div>
        </div>

        <Button className="w-full h-12 rounded-xl bg-[#2563EB] font-bold" onClick={() => {
          toast.success("Configuración regional actualizada")
          onBack()
        }}>
          Guardar preferencias
        </Button>
      </div>
    </div>
  )
}
