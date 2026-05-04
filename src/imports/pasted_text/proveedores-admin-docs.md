— PROVEEDORES (Admin · sidebar ítem "Proveedores" separado del de Visitantes)
PARTE 1 — Catálogo de Empresas (Admin)
Pantalla principal:

Header "Empresas Proveedoras" + botón "+ Nueva Empresa"
Buscador + filtro: Todas | Con calendario activo | Sin calendario
Grid de cards de empresas (3 col desktop, 2 tablet):

Logo/avatar de empresa (iniciales en fondo de color)
Nombre de la empresa (bold)
Número de personas asignadas
Badge "Entradas permitidas": lista de puertas autorizadas (ej. "Principal" o "Principal · D")
Próxima visita programada (si existe)
Acciones: ✏️ Editar | 🗑️ Eliminar | 👥 Ver personas | 📅 Ver calendario



Modal "Nueva Empresa / Editar Empresa":

Nombre de la empresa (requerido)
Giro/industria (dropdown: Alimentación, Tecnología, Mantenimiento, Limpieza, Otro)
Teléfono de contacto
Correo de contacto
Entradas permitidas (multi-select checkboxes): ☐ Puerta Principal | ☐ Puerta Secundaria | ☐ Vehicular Norte | ☐ Vehicular Sur
Nota: "Si el proveedor accede por una entrada no autorizada, el sistema lo registrará con alerta pero no bloqueará el acceso"
Botón "Guardar empresa"

Sub-pantalla "Personas de la Empresa" (al tocar "Ver personas"):

Header "Personas — [Nombre empresa]" + botón "+ Agregar persona"
Lista de personas asignadas a esa empresa: avatar iniciales | nombre completo | identificación (INE/pasaporte) | vehículos asignados (badges de placas)
Cada persona tiene: ✏️ Editar | 🗑️ Quitar de empresa | 🚗 Asignar vehículo
Botón "🚗 Asignar vehículo" → dropdown de vehículos registrados para esa empresa + botón "+ Crear y asignar"

Modal "Nueva Persona / Editar Persona":

Nombre completo (requerido)
Tipo de identificación: INE | Pasaporte | Licencia | Otro
Número de identificación
Teléfono (opcional)
Vehículos asignados (multi-select de vehículos registrados en la empresa) + botón "+ Crear y asignar vehículo"
Botón "Guardar persona"


PARTE 2 — Calendario de Proveedores (Admin · sub-sección dentro de Proveedores)
Pantalla:

Header "Calendario de Visitas de Proveedores" + botón "+ Programar visita"
Toggle vista: Semanal | Mensual
Cada evento en el calendario muestra: nombre empresa + hora estimada (o rango) + badge de recurrencia si aplica
Al tocar evento → modal detalle con info completa

Modal "Programar visita recurrente / única":

Empresa (dropdown de empresas registradas) + botón "+ Crear y asignar empresa"
Día(s) de visita: checkboxes Lun | Mar | Mié | Jue | Vie | Sáb | Dom
Hora estimada (timepicker) O rango de hora: timepicker inicio + timepicker fin
Recurrencia: Única | Semanal | Quincenal | Mensual
Observaciones opcionales
Botón "Guardar"


PARTE 3 — Registro de Asistencia de Proveedor (Admin + Guardia)
ADMIN — Sub-sección "Asistencias" dentro de Proveedores:

Tabla de asistencias registradas: Fecha | Empresa | Personas que vinieron | Placa(s) | Entrada usada | Estatus (Normal / Con alerta) | Acciones (Ver detalle)
Botón "+ Registrar asistencia manual"
Filtros: por empresa, por fecha, por estatus

GUARDIA — Nueva opción en su vista: "Registrar llegada de proveedor"
Flujo completo (pantallas paso a paso en mobile):
Step 1 — Identificar empresa:

Buscador de empresa: "¿De qué empresa viene?"
Lista de empresas con visita programada HOY destacadas arriba con badge "📅 Esperado hoy"
Resto de empresas debajo
Si la empresa no existe → botón "Empresa no registrada → Solicitar apoyo administrativo" → envía notificación push al admin con alerta

Step 2 — Seleccionar personas que vienen:

Lista de personas asignadas a esa empresa con checkboxes
Si la persona no está en la lista → botón "+ Agregar persona nueva" → mini formulario: nombre + tipo ID + número ID
Personas seleccionadas aparecen como chips en la parte superior

Step 3 — Vehículo:

Dropdown "Placa del vehículo" con sugerencias de placas previamente registradas para esa empresa
Si la placa no está → campo de texto libre para escribirla + botón "Guardar placa para esta empresa"
Nota bajo el campo: "Las placas registradas aquí quedarán vinculadas a la empresa para futuras visitas"

Step 4 — Entrada utilizada:

Selector de entrada: Puerta Principal | Puerta Secundaria | Vehicular Norte | Vehicular Sur
Si la entrada seleccionada NO está en las entradas permitidas de la empresa:

Banner de alerta naranja: "⚠️ Esta empresa no tiene permiso para entrar por aquí"
Opciones: "Registrar igualmente (con alerta)" | "Cancelar"
Si elige registrar igualmente → el sistema guarda el acceso, marca el registro con badge "Alerta: entrada no autorizada" y envía notificación push al admin



Step 5 — Evidencia y observaciones:

Sección "📷 Fotos del vehículo" (obligatorio mínimo 1 foto): área de carga con cámara
Campo "Observaciones" (opcional): textarea "Detalles del vehículo, persona, notas relevantes..."
Botón "Registrar asistencia" → toast "Asistencia registrada exitosamente"

Modal detalle de asistencia (Admin al tocar registro):

Empresa + personas que vinieron
Placa del vehículo
Entrada utilizada + badge de alerta si aplica
Fotos adjuntas (galería)
Observaciones
Fecha y hora exacta del registro
Registrado por: nombre del guardia
Botón "Solicitar apoyo" → envía notificación a admin y otros guardias con el detalle del registro

Estado vacío asistencias: "No hay asistencias registradas hoy" + ícono de empresa + botón "+ Registrar llegada"
Datos de muestra:

Coca-Cola · 2 personas · BCN-7890 · Puerta Principal · Hoy 12:35 · Normal
Distribuidora García · 1 persona · SON-9988 · Vehicular Norte · Hoy 09:10 · ⚠️ Entrada no autorizada
Papelería Ofimex · 3 personas · MXL-3344 · Puerta Principal · Ayer 14:20 · Normal