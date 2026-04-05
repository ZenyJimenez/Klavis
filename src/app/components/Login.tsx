import image_ef12cf9e9861568e5753a024e0e70bb8457227f8 from 'figma:asset/ef12cf9e9861568e5753a024e0e70bb8457227f8.png'
import { useState } from "react"
import { useNavigate } from "react-router"
import { motion } from "motion/react"
import { Visibility, VisibilityOff, VpnKey } from "@mui/icons-material"
import { Button } from "./ui"
import exampleImage from "figma:asset/da9c5f090346b090388c669d3e7c116edcd58dfb.png"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError("Por favor, ingresa tu correo y contraseña")
      return
    }
    setError("")
    
    const email = username.toLowerCase()
    
    if (email.includes('admin')) {
      navigate("/admin")
    } else if (email.includes('guardia')) {
      navigate("/guard")
    } else {
      navigate("/student")
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-[#F8FAFC]">
      {/* Left Panel */}
      <div className="md:w-1/2 bg-[#0A1628] text-white flex flex-col justify-center items-center p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2563EB] to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <img src={exampleImage} className="w-auto h-[250px] md:h-[312px] object-contain mb-8" alt="KLAVIS Logo" />
          <div className="inline-flex items-center justify-center bg-white/5 px-8 py-3 rounded-[16px] backdrop-blur-sm border border-white/10 mb-10">
            <h1 className="text-4xl font-bold tracking-[0.1em] text-white">KLAVIS</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Sistema de Control de Acceso Institucional</h2>
          <p className="text-[#64748B] text-lg">Instituto Tecnológico de Mexicali</p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 bg-[#FFFFFF] flex flex-col justify-center px-8 py-12 md:px-24">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#0A1628] leading-[36px] mb-2">Bienvenido</h2>
            <p className="text-[#64748B] text-[16px]">Ingresa tus credenciales institucionales para continuar</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-lg text-[#DC2626] text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#0A1628] mb-1.5">
                  Correo institucional
                </label>
                <input 
                  type="email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ejemplo@itmexicali.edu.mx"
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-[#0A1628] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors placeholder:text-[#64748B]/50"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#0A1628] mb-1.5">Contraseña</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-[#0A1628] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0A1628] transition-colors"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]" />
                <span className="text-[14px] font-medium text-[#0A1628]">Recordarme</span>
              </label>
              <button type="button" className="text-[14px] font-medium text-[#2563EB] hover:text-[#1E3A5F] transition-colors">
                Recuperar contraseña
              </button>
            </div>

            <Button type="submit" className="w-full h-[48px] text-[16px] font-semibold rounded-[8px]">
              Iniciar Sesión
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
