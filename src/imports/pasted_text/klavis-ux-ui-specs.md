ROL Y CONTEXTO
Actúa como un experto en UX/UI Design especializado en sistemas institucionales de seguridad. Diseña KLAVIS, un sistema automatizado de control de acceso vehicular y peatonal para el Instituto Tecnológico de Mexicali. KLAVIS nace de la fusión de dos propuestas previas (IdenTec por SoftTech y P.A.S.A. por Devxicali) en una sola plataforma cohesiva y unificada.
Propósito del sistema: Eliminar la revisión manual en accesos mediante tecnología NFC/RFID/QR, garantizando que únicamente la comunidad autorizada ingrese a la institución con un flujo fluido, seguro y trazable.

IDENTIDAD VISUAL Y BRANDING
Logo: Adjunto a este escrito.
Paleta de colores (valores exactos):
Primario oscuro: #0A1628
Primario medio: #1E3A5F
Acento/CTA: #2563EB
Éxito / Autorizado: #16A34A
Error / Rechazado: #DC2626
Pendiente / Advertencia: #D97706
Fondo claro: #F8FAFC
Superficie: #FFFFFF
Borde: #E2E8F0
Texto primario: #0F172A
Texto secundario: #64748B
Tipografía: Inter — Regular (14px body), Medium (16px labels), SemiBold (18px subtítulos), Bold (24px+ títulos)
Estilo general: Moderno, académico, limpio. Cards con border-radius: 12px, sombras suaves (box-shadow: 0 2px 8px rgba(0,0,0,0.08)), íconos estilo Lucide. Sidebar oscuro en desktop, bottom navigation en mobile.
Responsive: Diseñar en 3 breakpoints para las 3 vistas:
Mobile: 390px
Tablet: 768px
Desktop: 1440px

ESQUEMA DE BASE DE DATOS (Lógica que el diseño debe reflejar)
Los formularios, tablas y modales deben mapear exactamente estos campos:
Usuarios: id_usuario (UUID), matricula, nombre, apellidos,
          id_rol → Roles(Alumno/Docente/Administrativo/Guardia/Visitante),
          url_foto, estatus_activo

Vehiculos: id_vehiculo, placas, marca, modelo, color
Usuarios_Vehiculos: relación muchos-a-muchos
(un vehículo puede pertenecer a múltiples usuarios — ej. hermanos)

Credenciales: uid_credencial (RFID/NFC), id_usuario, id_vehiculo,
              tipo (Peatonal/Vehicular), fecha_emision,
              fecha_expiracion, estatus_activa

Historial_Accesos: id_log, uid_credencial, id_acceso,
                   fecha_hora, sentido (Entrada/Salida)

Accesos_Fisicos: id_acceso, nombre_acceso,
                 tipo_flujo (Vehicular/Peatonal)

PANTALLA GLOBAL — INICIO DE SESIÓN
Layout desktop (split screen):
Panel izquierdo #0A1628: Logo KLAVIS centrado (ícono de acceso + wordmark), tagline "Sistema de Control de Acceso Institucional", subtítulo "Instituto Tecnológico de Mexicali".
Panel derecho blanco: Formulario de autenticación
Formulario:
Título: "Bienvenido"
Subtítulo: "Ingresa tus credenciales institucionales para continuar"
Selector tipo de usuario (3 tabs/pills): Alumno | Guardia | Administrador
Campo: Número de control o correo (@itmexicali.edu.mx)
Campo: Contraseña (toggle mostrar/ocultar)
Checkbox: Recordarme
Link: Recuperar contraseña
Botón CTA: "Iniciar Sesión" (#2563EB, ancho completo, border-radius: 8px)
Al hacer clic → redirige a la vista correspondiente según el tab seleccionado
Mobile: Stack vertical. Logo arriba centrado, formulario debajo. El selector de rol cambia a segmented control de ancho completo.
Estados de error:
Credenciales incorrectas: banner rojo debajo del formulario "Usuario o contraseña incorrectos"
Cuenta suspendida: banner rojo "Tu cuenta se encuentra suspendida. Contacta a administración."
Sin conexión: pantalla de error con ícono de red, mensaje "Sin conexión al servidor" y botón "Reintentar"

VISTA ADMINISTRADOR
Navegación Desktop: Sidebar izquierdo fijo #0A1628 (280px). Logo arriba. Ítems con ícono + etiqueta. Estado activo: fondo #2563EB con texto blanco. Hover: #1E3A5F. Botón "Cerrar Sesión" al fondo con ícono.
Ítems del sidebar: Panel Principal | Usuarios | Visitantes | Proveedores | Monitoreo | Reportes | Incidencias | Configuración
Navegación Mobile/Tablet: Bottom navigation con íconos, más menú hamburguesa que despliega el sidebar completo como drawer.

ADMIN · Pantalla 1 — Panel Principal (Dashboard)
Header: "Panel Principal" + fecha actual + nombre del admin (esquina derecha) + ícono de notificaciones con badge contador
Fila de 4 KPI cards:
Card
Ícono
Valor
Etiqueta
Usuarios
Supervised user circle
20
Total Usuarios
Accesos
Verified user
30
Accesos Hoy
Visitantes
Person
3
Visitantes Activos
Puertas
Door front
4
Puertas Activas

*Iconos seleccionados de plugins material design icons*
Sección de gráficas (2 columnas):
Gráfica de barras "Accesos por Hora": eje X de 07:00 a 19:00, datos de muestra con pico en 08:00 y 13:00
Gráfica de dona "Distribución por Tipo": Alumnos 57%, Docentes 28%, Administrativos 15% — con leyenda y valores
Sección "Últimos Accesos": Grid de cards compactas (4 por fila en desktop, 2 en tablet, 1 en mobile):
Avatar circular con iniciales (color por rol: azul=alumno, verde=docente, gris=admin)
Nombre completo
Puerta de acceso · Hora
Badge: APROBADO (verde) / RECHAZADO (rojo)
Estado vacío: Ilustración centrada + "No hay accesos registrados hoy" + botón "Actualizar"

ADMIN · Pantalla 2 — Gestión de Usuarios
Header: "Gestión de Usuarios" + botón "+ Nuevo Usuario" (#2563EB)
Barra de herramientas:
Buscador: placeholder "Buscar por nombre, matrícula o correo..."
Dropdown "Tipo": Todos | Alumno | Docente | Administrativo
Dropdown "Estatus": Todos | Activo | Inactivo | Suspendido
Botón: "⬇ Exportar"
Tabla (columnas): Avatar+Nombre+Correo | Tipo (badge) | No. Control | UID Credencial | Estatus (badge) | Acciones (icon: Mode edit / icon: Delete)
Datos de muestra:
Carlos Hernández López · alumno · 21490001 · UID-A001 · Activo
María García Ruiz · alumno · 21490002 · UID-A002 · Activo
José Martínez Soto · alumno · 21490003 · UID-A003 · Activo
Ana López Castillo · alumno · 21490004 · UID-A004 · Activo
Luis Ramírez Vega · alumno · 21490005 · UID-A005 · Suspendido
Roberto Mendoza Ávila · docente · 21490006 · UID-D001 · Activo
Gloria Delgado Navarro · administrativo · 21490007 · UID-AD001 · Activo
Flujo completo de registro de nuevo usuario (multi-step, funcional en prototipo):
Step 1 — Datos Personales:
Nombre(s), Apellido Paterno, Apellido Materno
Correo institucional (@itmexicali.edu.mx)
Número de Control (matricula)
Rol (dropdown): Alumno | Docente | Administrativo | Guardia
Carrera (dropdown, visible si rol = Alumno/Docente)
Foto (upload con preview circular)
Barra de progreso: paso 1 de 3
Step 2 — Vehículo y Tag RFID:
Número de placa (placas)
Marca, Modelo, Color del vehículo
ID Tag RFID (uid_credencial tipo Vehicular)
Botón "Escanear Tag RFID" con animación de lectura
Nota informativa: "Un vehículo puede estar vinculado a más de un usuario"
Toggle: "Sin vehículo registrado" (oculta los campos)
Barra de progreso: paso 2 de 3
Step 3 — Credencial NFC Digital:
ID Credencial NFC (uid_credencial tipo Peatonal)
Botón "Escanear dispositivo NFC" con micro-interacción: ícono de señal NFC animado → estado "Escaneando..." → estado "Credencial vinculada ✓"
Fecha de emisión (automática = hoy)
Fecha de expiración (datepicker)
Estatus inicial: Activo
Barra de progreso: paso 3 de 3
Confirmación final:
Resumen de todos los datos ingresados en tarjeta
Botón "Guardar Registro" → añade el usuario a la tabla → muestra toast "Usuario registrado exitosamente"
Botón "Cancelar"
Estado vacío tabla: "No se encontraron usuarios" + ícono + botón "+ Nuevo Usuario"

ADMIN · Pantalla 3 — Visitantes (Usuarios Temporales)
Header: "Usuarios Temporales (Visitantes)" + botón "+ Nuevo Visitante"
Tabla: Avatar+Nombre | Motivo | Área | Horario | Responsable | Código (badge) | Estatus | Acciones
Datos de muestra:
Ing. Pedro Solís · Mantenimiento equipos · Centro de Cómputo · 09:00–13:00 · Gloria Delgado · VIS-2025-001 · Activo
Lic. Martha Rojas · Auditoría administrativa · Dirección · 10:00–14:00 · Héctor Peña · VIS-2025-002 · Activo
Sr. Juan Valdez · Entrega de papelería · Almacén · 08:00–10:00 · Norma Guerrero · VIS-2025-003 · Expirado
Dra. Carmen Olvera · Conferencia invitada · Auditorio · 16:00–19:00 · Roberto Mendoza · VIS-2025-004 · Activo
Ing. Ricardo Bernal · Instalación de cámaras · Edificio A · 07:00–13:00 · Raúl Ibarra · VIS-2025-005 · Expirado
Modal registro de visitante:
Nombre completo
Motivo de visita
Área destino
Fecha y horario (datepicker + timepicker inicio/fin)
Responsable que autoriza (dropdown de usuarios administrativos)
Código temporal: generado automáticamente al guardar (formato VIS-YYYY-###)
Estatus inicial: Pendiente
Al guardar: muestra el código generado en un modal de confirmación con opción "Copiar código"

ADMIN · Pantalla 4 — Proveedores (Calendario Institucional)
Header: "Calendario Institucional" + filtros: Diario | Semanal | Mensual + botón "+ Nueva Cita"
Vista: Grid de cards (3 columnas desktop, 2 tablet, 1 mobile)
Cada card contiene:
Título de la visita (bold, 16px)
Badge de estatus: Pendiente #D97706 | Completado #16A34A | Cancelado #DC2626
Nombre del proveedor/responsable
Área de destino
Fecha y hora
Responsable del acceso
Motivo detallado
Acciones: botón (icon: Mode edit)  Editar | botón (icon: Delete) Eliminar
Datos de muestra:
Mantenimiento de equipos · Pendiente · Ing. Pedro Solís · Centro de Cómputo · 2026-03-05 09:00 · Resp: Gloria Delgado · Mantenimiento preventivo trimestral
Auditoría administrativa · Pendiente · Lic. Martha Rojas · Dirección · 2026-03-05 10:00 · Resp: Héctor Peña · Revisión de procesos internos
Entrega de papelería · Completado · Sr. Juan Valdez · Almacén · 2026-03-05 08:00 · Resp: Norma Guerrero · Surtido mensual de papelería
Conferencia de IA · Pendiente · Dra. Carmen Olvera · Auditorio · 2026-03-06 16:00 · Resp: Roberto Mendoza · Conferencia sobre inteligencia artificial aplicada
Instalación de cámaras · Pendiente · Ing. Ricardo Bernal · Edificio A · 2026-03-07 07:00 · Resp: Raúl Ibarra · Ampliación del sistema de videovigilancia
Estado vacío: Ilustración de calendario + "No hay citas programadas para este período" + botón "+ Nueva Cita"

ADMIN · Pantalla 5 — Monitoreo en Tiempo Real
Header: "Monitoreo en Tiempo Real" + indicador de pulso animado 🔴 "En vivo · Última actualización: hace 5s"
Barra de filtros (doble fila):
Fila 1 — Estatus: Todos | Autorizados | Denegados | Pendientes
Fila 2 — Tipo: General | Peatonal | Vehicular
Grid de cards (3 columnas desktop, 2 tablet, 1 mobile): Cada card:
Avatar circular con iniciales (o foto si disponible)
Nombre completo (bold)
Tipo de usuario (subtítulo gris)
Puerta de acceso
Hora del acceso
Badge resultado: APROBADO (verde) | RECHAZADO (rojo) | PENDIENTE (ámbar)
Si vehicular: badge adicional con número de placa
Datos de muestra: 20 registros variados usando los usuarios de la tabla de Gestión
Estado vacío: "No hay accesos registrados en este momento" con ícono de radar

ADMIN · Pantalla 6 — Reportes y Auditoría
Header: "Reportes y Auditoría" + botones ⬇ Exportar PDF | ⬇ Exportar Excel
Sección de gráficas (grid 2x2):
Barras: "Accesos por Puerta" — Principal(17), Secundaria(8), Vehicular Norte(12), Vehicular Sur(6)
Barras: "Accesos por Tipo de Usuario" — Alumnos(16), Docentes(8), Administrativos(4), Visitantes(2)
Línea: "Accesos por Horario" — curva con pico en 08:00 (14), descenso mediodía, segundo pico 13:00 (10)
Dona: "Proporción Autorizado vs Rechazado" — Autorizados 92%, Rechazados 8%
Sección inferior: "Historial Completo del Día" — tabla paginada (10 por página) con todos los campos de Historial_Accesos

ADMIN · Pantalla 7 — Reportes de Incidencias
Header: "Módulo de Incidencias" + botón "+ Nueva Incidencia"
Filtros: Todos | Alta | Media | Baja — y — Activo | Resuelto | En revisión
Lista de incidencias: Cada ítem:
Ícono de tipo ( vehículo,  acceso no autorizado,  puerta forzada)
Descripción del incidente
Ubicación (puerta/área)
Fecha y hora
Nivel de severidad: badge Alta (rojo) | Media (ámbar) | Baja (azul)
Estatus: Activo | En revisión | Resuelto
Responsable asignado
Botones: Ver detalle | Resolver | Eliminar
Datos de muestra:
Vehículo sin placa registrada intentó acceso · Estacionamiento A · Hoy 08:25 · Alta · Activo
Intento de acceso con credencial vencida · Puerta Principal · Hoy 07:10 · Media · Resuelto
Puerta vehicular norte abierta sin autorización · Vehicular Norte · Ayer 22:40 · Alta · En revisión
Tag RFID no registrado · Estacionamiento B · Hoy 08:32 · Alta · Activo
Modal "Nueva Incidencia": Tipo, descripción, ubicación, nivel de severidad, responsable asignado, evidencia (upload foto)
Estado vacío: "No hay incidencias registradas" + ícono de escudo ✓ + "El sistema opera con normalidad"

ADMIN · Pantalla 8 — Configuración del Sistema
Layout 2 columnas:
Col 1 — Control de Puertas: Lista de 4 puertas, cada una con:
Nombre + descripción (ej. "Acceso frontal")
Badge tipo: peatonal | vehicular
Toggle Activa/Inactiva con estado visual
Puertas: Principal (peatonal) | Secundaria (peatonal) | Vehicular Norte (vehicular) | Vehicular Sur (vehicular)
Col 2 — Plumas Automáticas:
Puerta Vehicular Norte — Toggle pluma automática
Puerta Vehicular Sur — Toggle pluma automática
Col 1 abajo — Parámetros de Validación:
Toggle: "Validación estricta de UID — Rechazar acceso si UID no está registrado"
Col 2 abajo — Notificaciones:
Toggle: "Notificaciones a guardias — Enviar alertas automáticas al cambiar configuración"

VISTA GUARDIA
Mobile (390px) — navegación: Bottom nav fijo: Accesos | Historial | Calendario | Avisos Tablet/Desktop: Sidebar izquierdo colapsable + mismas secciones como ítems de menú Header fijo: Logo KLAVIS + "Guardia de Seguridad" + nombre del guardia + ícono cerrar sesión

GUARDIA · Tab 1 — Accesos en Tiempo Real
Título: "Accesos en Tiempo Real" + dot animado verde
Filtros pill: Todos | Peatonal | Vehicular
Cards grandes (primeros 3 accesos):
Avatar circular (iniciales, fondo de color por rol)
Nombre completo (bold, 18px)
Tipo de usuario (subtítulo)
Puerta de acceso
Hora (esquina superior derecha, bold)
Barra inferior de estado: APROBADO (verde #16A34A + ícono ✓) | RECHAZADO (rojo #DC2626 + ícono ✗)
Cards compactas (resto de accesos): mismo contenido en formato lista reducida (altura ~56px por ítem)
Micro-interacción: Al llegar un nuevo acceso, la card entra desde arriba con animación slide-down y la barra de estado hace fade-in con el color correspondiente

GUARDIA · Tab 2 — Historial del Día
Título: "Historial del Día"
Lista completa scrolleable: Cada ítem: Avatar iniciales | Nombre + Tipo · Puerta | Hora | Badge OK ✓ (verde) o ✗ (rojo)
Datos de muestra: 10+ registros del día usando los usuarios existentes, orden cronológico descendente
Estado vacío: "No hay registros para hoy" + ícono de historial vacío

GUARDIA · Tab 3 — Calendario de Visitas
Sección "Visitas de Hoy": Cards por cada visita con: nombre visitante/proveedor (bold), motivo, hora, área, responsable, motivo detallado — badge Pendiente 🟡 | Hecho ✓ | Cancelado ✗
Sección "Próximas Visitas": cards compactas con fecha+hora+área
Campo de validación de código:
Label: "Validar acceso de visitante"
Input: "Ingresar código temporal (ej. VIS-2025-001)"
Botón: "Validar"
Micro-interacción al validar:
Código válido → card verde con datos del visitante + botón "Confirmar entrada" → cambia estatus a "Activo/Hecho"
Código inválido → banner rojo "Código no encontrado o expirado"
Código ya usado → banner ámbar "Este código ya fue utilizado"

GUARDIA · Tab 4 — Avisos
Header: "Avisos" + badge contador + botón "✓✓ Leer todo"
Lista de notificaciones con 3 tipos visuales (borde izquierdo de color):
(Icon: Info i) Info (borde #2563EB): nuevos visitantes, credenciales renovadas
(Icon: Error) Alerta (borde #DC2626): accesos rechazados, cuentas suspendidas, incidencias
(Icon: Settings) Sistema (borde #64748B): cambios de config, puertas reactivadas
Cada ítem: ícono tipo | texto del aviso | fecha y hora | tag de categoría
Datos de muestra:
ℹ️ "Nuevo visitante temporal registrado: Ing. Pedro Solís" · 2026-03-05 08:50 · info
⚠️ "Acceso rechazado: Luis Ramírez Vega (cuenta suspendida)" · 07:10 · alerta
⚙️ "La Puerta Vehicular Norte ha sido reactivada por el administrador" · 06:45 · sistema
ℹ️ "Visitante temporal expirado: Sr. Juan Valdez" · 10:01 · info
⚠️ "Acceso rechazado: Alejandro Castro Herrera (cuenta suspendida)" · 08:30 · alerta
Estado vacío: "No tienes avisos nuevos" + ícono de campana ✓

VISTA ALUMNO / DOCENTE
Mobile (390px): Pantalla única con scroll vertical Tablet/Desktop: Layout centrado con max-width 480px (estilo app mobile en pantalla grande) Header fijo: Logo KLAVIS + ícono campana (badge contador) + ícono cerrar sesión

ALUMNO · Pantalla 1 — Credencial Digital
Tarjeta de credencial (estilo carnet universitario, elevada con sombra):
Foto del alumno (avatar circular 80px o foto real)
Nombre completo (bold, 20px): "Carlos Hernández López"
Número de control: 21490001
Carrera: Ing. Sistemas Computacionales
Semestre: 8vo
Vigencia: Jun 2026
Institución: Instituto Tecnológico de Mexicali
Badge estatus: ✅ ACTIVO (verde) | ⏸ INACTIVO (gris) | 🕐 PENDIENTE (ámbar)
Tarjeta QR / NFC (card separada debajo):
Texto: "Presenta este código para acceder"
QR code grande y centrado (dato: UID del usuario)
Separador "— o —"
Botón/área NFC: ícono de señal ((.)) + texto "Acercar al lector NFC"
Micro-interacción NFC: Al tocar el botón → ícono anima con pulso radiante → texto cambia a "Escaneando..." → overlay verde con ✓ "Acceso Aprobado · Puerta Principal · 07:02" durante 2 segundos → regresa al estado normal
Chip inferior tappable: 🔔 "Tienes 4 avisos sin leer" → navega a pantalla de notificaciones
Estados de error en credencial:
Credencial vencida: banner rojo arriba "Tu credencial ha expirado. Contacta a administración."
Cuenta inactiva: overlay gris sobre QR con candado 🔒 "Credencial desactivada"
Sin conexión: banner ámbar "Modo sin conexión — El QR puede no ser válido"

ALUMNO · Pantalla 2 — Notificaciones (Avisos)
Header: "Avisos" + botón "✓✓ Leer todo" + botón "← Volver"
Lista con íconos diferenciados:
✅ Acceso aprobado: "Acceso aprobado — Puerta Principal a las 07:02" · 2026-03-05 07:02
✅ Acceso aprobado: "Acceso aprobado — Puerta Principal a las 12:00" · 2026-03-05 12:00
📢 Institucional: "Suspensión de clases el 10 de marzo por mantenimiento general" · 2026-03-04 14:00
ℹ️ Sistema: "Tu credencial digital ha sido renovada exitosamente" · 2026-03-03 09:30
📢 Institucional: "Simulacros de evacuación el 12 de marzo a las 10:00 hrs." · 2026-03-03 08:00
❌ Acceso rechazado: "Acceso rechazado — Puerta Vehicular Norte. No tienes vehículo registrado." · 2026-03-02 07:45
📢 Recordatorio: "Inscripciones 2026-B abiertas hasta el 15 de marzo" · 2026-03-01 10:00
Estado vacío: "No tienes notificaciones" + ícono de campana + "Aquí aparecerán tus accesos e información institucional"

ESTADOS DE ERROR GLOBALES
Crear pantallas/overlays reutilizables para:
Sin conexión al servidor: Ícono de nube con X + "Sin conexión" + "Verifica tu red e intenta de nuevo" + botón "Reintentar"
Error 403 — Sin permisos: Ícono de candado + "Acceso no autorizado" + "No tienes permisos para ver este módulo"
Error 500 — Error del servidor: Ícono de servidor + "Error del sistema" + "Algo salió mal. Intenta más tarde."
Lista vacía (genérico): Ilustración minimalista + mensaje contextual por módulo + CTA relevante
Sesión expirada: Modal centrado + "Tu sesión ha expirado" + botón "Iniciar sesión nuevamente"

COMPONENTES REUTILIZABLES (Design System)
Crear como componentes con variantes en Figma:
Badge de estatus: variantes → Activo / Inactivo / Suspendido / Pendiente / Expirado / Aprobado / Rechazado
Card de acceso: variantes → Grande (guardia) / Compacta (historial) / Mini (dashboard)
Avatar: variantes → Solo iniciales / Con foto / Con badge de rol
Input field: variantes → Default / Focus / Error / Disabled
Toggle switch: variantes → On / Off / Disabled
Botón primario: variantes → Default / Hover / Loading / Disabled
Modal base: con header, body scrolleable y footer de acciones
Toast/notificación: variantes → Éxito / Error / Advertencia / Info
Sidebar ítem: variantes → Default / Hover / Active
Bottom nav ítem: variantes → Inactive / Active

MICRO-INTERACCIONES Y PROTOTIPADO
Configurar en Figma Prototype:
Login → bifurcación por rol: clic en "Iniciar Sesión" con tab "Alumno" → va a vista Alumno; "Guardia" → vista Guardia; "Admin" → Dashboard Admin
Tabla de usuarios → modal de edición: clic en ícono ✏️ de cualquier fila → abre modal con datos pre-llenados del usuario
Registro multi-step: botón "Siguiente" avanza al paso 2 y 3, barra de progreso actualiza, botón "Guardar Registro" en paso 3 → añade usuario a tabla y muestra toast de éxito
NFC scan (vista alumno): tap en área NFC → animación de pulso → overlay de aprobación → regreso automático
Validación de código (guardia): ingresar código → clic Validar → card resultado (válido/inválido/usado)
Nuevo acceso en tiempo real (guardia): card entra con animación slide-down
Toggles de configuración: cambio de estado On/Off con transición suave
Filtros activos: al seleccionar filtro → lista se actualiza mostrando solo los ítems correspondientes

ESTRUCTURA DE FRAMES EN FIGMA
KLAVIS/
├── 🎨 00 · Design System
│   ├── Colores, Tipografía, Íconos
│   └── Componentes (todos los listados arriba)
│
├── 🔐 01 · Auth
│   ├── Login · Desktop
│   ├── Login · Tablet
│   ├── Login · Mobile
│   └── Estados: Error credenciales / Cuenta suspendida / Sin conexión
│
├── 👨‍💼 02 · Admin
│   ├── Dashboard · Desktop / Tablet / Mobile
│   ├── Gestión Usuarios · Desktop / Tablet / Mobile
│   │   ├── Registro Step 1 (Datos personales)
│   │   ├── Registro Step 2 (Vehículo + RFID)
│   │   ├── Registro Step 3 (Credencial NFC)
│   │   └── Confirmación de registro
│   ├── Visitantes · Desktop / Tablet / Mobile
│   ├── Proveedores · Desktop / Tablet / Mobile
│   ├── Monitoreo · Desktop / Tablet / Mobile
│   ├── Reportes · Desktop / Tablet / Mobile
│   ├── Incidencias · Desktop / Tablet / Mobile
│   └── Configuración · Desktop / Tablet / Mobile
│
├── 🛡️ 03 · Guardia
│   ├── Accesos Tiempo Real · Mobile / Tablet / Desktop
│   ├── Historial del Día · Mobile / Tablet / Desktop
│   ├── Calendario Visitas · Mobile / Tablet / Desktop
│   └── Avisos · Mobile / Tablet / Desktop
│
├── 🎓 04 · Alumno
│   ├── Credencial Digital · Mobile / Tablet / Desktop
│   └── Notificaciones · Mobile / Tablet / Desktop
│
└── ⚠️ 05 · Estados Globales
    ├── Sin conexión
    ├── Error 403
    ├── Error 500
    ├── Lista vacía (genérico)
    └── Sesión expirada

