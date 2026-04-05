2 Módulos Nuevos: Incidencias y Estacionamiento

MÓDULO 1 — INCIDENCIAS (3 roles)
Tipos de incidencia: Vehículo mal estacionado (zona roja/azul), objeto abandonado, vandalismo, acceso no autorizado, otro.
Severidad: Alta #DC2626 / Media #D97706 / Baja #2563EB
Flujo de estatus: Pendiente → En Revisión → Resuelto

ALUMNO — Nuevo tab "Incidencias" en bottom nav (5to tab, ícono de alerta)
Pantalla 1 — Mis Incidencias:

Header "Mis Incidencias" + botón "+ Reportar"
Lista de incidencias propias: ícono de tipo + resumen + ubicación + fecha + badge de estatus
Estado vacío: ícono escudo + "No has reportado incidencias" + botón "+ Reportar"

Pantalla 2 — Formulario de reporte (modal pantalla completa):

Título: "Nueva Incidencia"
Campo 1 — Tipo (requerido, pills): 🚗 Mal estacionado | 📦 Objeto perdido | 🔨 Vandalismo | 🚫 Acceso no autorizado | ➕ Otro
Campo 2 — Ubicación (requerido, dropdown): Est. A (Edificio L) | Est. B (Plaza Bicentenario) | Est. C (Cafetería/Edificio G) | Est. D (Edificio M) | Est. E (Edificio CI) | Zona Tierra 1 | Zona Tierra 2 | Zona Tierra 3 | Zona Tierra 4 | Entrada Principal | Otro
Campo 3 — Foto (obligatoria): área grande "📷 Tomar foto o seleccionar de galería" → muestra miniatura con X para eliminar. Si no hay foto al enviar: borde rojo + "La foto es obligatoria"
Campo 4 — Descripción (opcional): textarea "Describe brevemente lo ocurrido..."
Botón: "Enviar Reporte" → toast "Incidencia reportada. Folio: INC-2026-001"

Micro-interacción: tap "+ Reportar" → formulario sube como bottom sheet → al enviar regresa a lista con nuevo ítem arriba en estado "Pendiente"

GUARDIA — Nuevo tab "Incidencias" en bottom nav
Pantalla — Gestión de Incidencias:

Header "Incidencias" + filtros pills: Todas | Pendientes | En Revisión | Resueltas
Filtro secundario: Todas | Mal estacionado | Objeto | Vandalismo | Acceso | Otro
Cards de lista, cada una muestra:

Folio INC-2026-001
Ícono + tipo de incidencia
Reportado por: nombre del alumno
Ubicación: Est. A / Zona Tierra 2 / etc.
Fecha y hora
Badge severidad: Alta/Media/Baja
Badge estatus: Pendiente (ámbar) / En Revisión (azul) / Resuelto (verde)
Miniatura de foto (tap → pantalla completa)


Tap en card → Modal detalle:

Foto completa (grande)
Todos los datos de la incidencia
Texto de descripción
Botones de acción: "Marcar En Revisión" | "Marcar como Resuelto" | "Rechazar reporte"
Campo opcional: "Añadir nota de resolución..."


Micro-interacción: cambio de estatus → badge anima al nuevo color
Estado vacío por filtro: "No hay incidencias pendientes" + ícono de palomita


ADMINISTRADOR — Módulo Incidencias (mismo sidebar existente, expandido)
Igual que Guardia PLUS:

Fila superior: 4 mini KPI cards → Total hoy | Pendientes | En revisión | Resueltas
Columna extra en lista: "Atendido por" (nombre del guardia)
Acciones masivas: seleccionar múltiples → "Marcar todas como resueltas"
Botones: "⬇ Exportar PDF" | "⬇ Exportar Excel"
Gráficas debajo de la lista: barras "Incidencias por tipo esta semana" + línea "Incidencias por día este mes"

Datos de muestra:

INC-2026-001 · Mal estacionado · Carlos Hernández · Est. A · Hoy 08:25 · Alta · Pendiente
INC-2026-002 · Acceso no autorizado · María García · Entrada Principal · Hoy 07:10 · Alta · Resuelto · Atendido por: Juan Sánchez
INC-2026-003 · Vandalismo · Luis Ramírez · Est. C · Ayer 22:40 · Media · En Revisión
INC-2026-004 · Objeto perdido · Ana López · Edificio F · Hoy 11:00 · Baja · Pendiente


ADMINISTRADOR — Módulo Reportes: añadir sección "Incidencias"
Nueva subsección al final de la pantalla de Reportes existente:

Barras: "Incidencias por Tipo" (Mal estacionado, Objeto, Vandalismo, Acceso, Otro)
Línea: "Incidencias por Día" (últimos 30 días)
Barras: "Incidencias por Ubicación" (Est. A–E + Zonas Tierra)
Fila KPI: Total del mes | Tasa de resolución % | Tiempo promedio de resolución | Tipo más reportado


MÓDULO 2 — ESTACIONAMIENTO (Est. A–E + Zona Tierra 1–4)
Zonas y capacidad:

Est. A — Edificio L — 40 cajones pavimentados
Est. B — Plaza Bicentenario — 35 cajones pavimentados
Est. C — Cafetería / Edificio G — 30 cajones pavimentados
Est. D — Edificio M / Metal-Mecánica — 25 cajones pavimentados
Est. E — Edificio CI / Nodo Creatividad — 20 cajones pavimentados
Zona Tierra 1, 2, 3, 4 — zonas informales — capacidad aprox. 15 cada una
Zonas especiales: Rojo (prohibido, emergencia) + Azul (discapacidad)

Colores de estado: Verde #16A34A = disponible | Rojo #DC2626 = ocupado | Naranja #D97706 = violación zona roja/azul | Gris #94A3B8 = cerrado

ALUMNO — Nuevo tab "Estacionamiento" en bottom nav (ícono de P)
Pantalla — Vista de Capacidad (solo lectura):

Header "Estacionamientos ITM" + timestamp "Actualizado hace 2 min"
Chip resumen global: "🟢 127 / 210 lugares disponibles"
Lista de las 9 zonas, cada una como card:

Nombre (bold): Est. A — Edificio L
Badge tipo: Pavimentado (azul) | Tierra (ámbar)
Barra de capacidad con color progresivo (verde→amarillo→rojo según llenado) + fracción "28/40 disponibles"
Texto porcentaje: "70% disponible"
Chip de alerta si hay violaciones: "⚠️ 2 vehículos en zona restringida"
Indicador de estatus: punto verde Abierto | punto rojo Lleno | punto gris Cerrado


Tap en card → Vista detalle:

Nombre + barra de capacidad grande
Grid visual simplificado de cajones (bloques verdes/rojos proporcionales, no cajón por cajón)
Sección violaciones: conteo de zona roja + zona azul con ícono alerta
Botón: "📷 Reportar incidencia aquí" → abre formulario de incidencia pre-llenado con esa ubicación


Estado sin conexión: "No se puede obtener información del estacionamiento" + botón Reintentar


GUARDIA — Nuevo tab "Estacionamiento"
Igual que Alumno PLUS:

Cada card tiene botón extra: "⚠️ Reportar incidencia" → abre formulario pre-llenado con esa zona
Banner rojo prominente en card si hay violaciones: "2 vehículos en zona restringida — Requiere atención"
Puede ver quién reportó cada violación


ADMINISTRADOR — Nuevo ítem en sidebar "Estacionamiento" (entre Monitoreo y Reportes)
Vista superior — Mapa esquemático del campus ITM:

Diagrama estilizado del campus basado en el croquis real del ITM (NO mapa real, sí esquema fiel a la distribución)
5 zonas pavimentadas etiquetadas A–E + 4 zonas de tierra etiquetadas T1–T4 en sus posiciones reales del croquis
Cada zona muestra badge de color superpuesto: verde (disponible) / amarillo (>70% lleno) / rojo (lleno) / naranja (violaciones)
Tap en zona del mapa → hace scroll hasta la card de detalle de esa zona abajo

Vista media — Grid de cards por zona (3 col desktop, 2 tablet, 1 mobile):
Cada card:

Nombre de zona + badge tipo
Barra de capacidad con números (ej. "28 / 40")
Porcentaje de ocupación + flecha de tendencia (↑ más que ayer / ↓ menos que ayer)
Badge de violaciones en rojo si hay alguna
Hora pico de esa zona
Comparación: "+5 más que ayer a esta hora"

Vista inferior — Analítica:

Barras: "Ocupación por zona — hoy vs ayer"
Línea: "Historial de ocupación esta semana" (todas las zonas en colores distintos)
Barras: "Violaciones de zona restringida por día" (últimos 7 días)
Fila KPI: Zona más congestionada hoy | Hora pico global | Total violaciones semana | Zona tierra más usada
Tabla heatmap: filas = zonas, columnas = horas (07:00–19:00), celdas con color por intensidad de ocupación

Datos de muestra:

Est. A: 28/40 (70%) · 0 violaciones · Pico: 08:00
Est. B: 35/35 (100% LLENO) · 1 violación · Pico: 07:30
Est. C: 18/30 (60%) · 2 violaciones (1 zona roja, 1 zona azul) · Pico: 13:00
Est. D: 20/25 (80%) · 0 violaciones · Pico: 08:30
Est. E: 12/20 (60%) · 0 violaciones · Pico: 09:00
Zona Tierra 1: 12/15 (80%)
Zona Tierra 2: 15/15 (LLENO)
Zona Tierra 3: 8/15 (53%)
Zona Tierra 4: 10/15 (67%)

Administrador — Reportes: añadir sección "Estacionamiento"

Barras: "Ocupación promedio por zona esta semana"
Línea: "Tendencia de ocupación último mes"
Barras: "Violaciones por zona (acumulado mensual)"
Tabla: "Días con mayor congestión" con fecha, zona, hora pico, % máximo de ocupación
KPI: Zona con mayor rotación | Zona con más violaciones | Hora más congestionada del mes


FRAMES NUEVOS A AÑADIR
KLAVIS/
├── 🎓 Alumno (actualizado)
│   ├── 03 - Incidencias (mis reportes)
│   ├── 04 - Reportar Incidencia (formulario)
│   └── 05 - Estacionamiento (capacidad, solo lectura)
│
├── 🛡️ Guardia (actualizado)
│   ├── 05 - Incidencias (gestión)
│   └── 06 - Estacionamiento (capacidad + reporte)
│
└── 👨‍💼 Admin (actualizado)
    ├── 05b - Estacionamiento (dashboard + mapa + analítica)
    ├── 07 - Incidencias (expandido con KPIs y exportación)
    └── 06 - Reportes (secciones Incidencias + Estacionamiento añadidas)