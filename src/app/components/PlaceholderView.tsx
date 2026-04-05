import { Build } from "@mui/icons-material"

export function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#F8FAFC]">
      <div className="w-16 h-16 bg-[#E2E8F0] rounded-full flex items-center justify-center text-[#64748B] mb-4">
        <Build fontSize="large" />
      </div>
      <h2 className="text-xl font-bold text-[#0F172A] mb-2">{title}</h2>
      <p className="text-[#64748B] max-w-sm">Este módulo está en construcción para la fase actual del prototipo.</p>
    </div>
  )
}
