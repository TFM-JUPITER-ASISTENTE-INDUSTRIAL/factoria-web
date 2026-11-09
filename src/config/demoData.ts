// ─────────────────────────────────────────────────────────────
// DATOS SIMULADOS DEL DASHBOARD DE DEMOSTRACIÓN
// Todo es ficticio y se almacena localmente: no hay conexión real con
// ninguna planta, PLC ni servidor. Los nombres de alarma se inspiran en
// el catálogo público del repositorio técnico.
// ─────────────────────────────────────────────────────────────
import type { MachineKey } from './machines'

export type Severity = 'ERROR' | 'CRITICAL_ERROR'
export type AlarmStatus = 'ACTIVE' | 'SOLVED'

export interface DemoAlarm {
  id: number
  machine: MachineKey
  code: string
  name: string
  sensorType: string
  component: string
  severity: Severity
  status: AlarmStatus
  triggeredAt: string
  resolvedAt?: string
}

export const demoAlarms: DemoAlarm[] = [
  { id: 1042, machine: 'denester', code: 'DEN-0001', name: 'Pérdida de vacío en pinza de extracción', sensorType: 'GRIPPER', component: 'Pinza de extracción / ventosas', severity: 'ERROR', status: 'ACTIVE', triggeredAt: '10:42:18' },
  { id: 1041, machine: 'termoformadora', code: 'TER-0002', name: 'Rotura de film de termoformado', sensorType: 'FILM', component: 'Bobina de film base', severity: 'CRITICAL_ERROR', status: 'ACTIVE', triggeredAt: '10:41:58' },
  { id: 1040, machine: 'serializadora', code: 'SER-0001', name: 'Código DataMatrix ilegible', sensorType: 'VISION', component: 'Cámara de visión de lectura de código', severity: 'CRITICAL_ERROR', status: 'ACTIVE', triggeredAt: '10:41:38' },
  { id: 1039, machine: 'estuchadora', code: 'EST-0009', name: 'Nivel bajo de adhesivo en depósito de cola caliente', sensorType: 'GLUE', component: 'Depósito de cola caliente', severity: 'ERROR', status: 'ACTIVE', triggeredAt: '10:41:18' },
  { id: 1038, machine: 'serializadora', code: 'SER-0010', name: 'Cartucho de tinta agotado en impresora', sensorType: 'PRINTER', component: 'Impresora industrial', severity: 'ERROR', status: 'ACTIVE', triggeredAt: '10:40:58' },
  { id: 1037, machine: 'termoformadora', code: 'TER-0009', name: 'Cuchilla de corte desgastada o rota', sensorType: 'CUTTING', component: 'Estación de corte', severity: 'ERROR', status: 'ACTIVE', triggeredAt: '10:40:38' },
  { id: 1036, machine: 'encajadora', code: 'ENC-0009', name: 'Rollo de cinta adhesiva agotado', sensorType: 'CLOSING', component: 'Cierre superior de caja', severity: 'ERROR', status: 'SOLVED', triggeredAt: '10:38:18', resolvedAt: '10:39:40' },
  { id: 1035, machine: 'denester', code: 'DEN-0004', name: 'Nivel bajo de pila de bandejas', sensorType: 'STACK', component: 'Elevador de pila de bandejas', severity: 'ERROR', status: 'SOLVED', triggeredAt: '10:36:58', resolvedAt: '10:38:02' },
  { id: 1034, machine: 'estuchadora', code: 'EST-0001', name: 'Prospecto ausente en estación de plegado', sensorType: 'LEAFLET', component: 'Estación de alimentación de prospecto', severity: 'CRITICAL_ERROR', status: 'SOLVED', triggeredAt: '10:35:38', resolvedAt: '10:37:15' },
  { id: 1033, machine: 'encajadora', code: 'ENC-0004', name: 'Colisión detectada en el robot de encajado', sensorType: 'ROBOT', component: 'Robot articulado de encajado', severity: 'CRITICAL_ERROR', status: 'SOLVED', triggeredAt: '10:33:18', resolvedAt: '10:36:44' },
  { id: 1032, machine: 'termoformadora', code: 'TER-0004', name: 'Fallo de sellado: temperatura de barra selladora baja', sensorType: 'SEALING', component: 'Barra selladora superior', severity: 'CRITICAL_ERROR', status: 'SOLVED', triggeredAt: '10:31:58', resolvedAt: '10:34:20' },
  { id: 1031, machine: 'serializadora', code: 'SER-0002', name: 'Código duplicado detectado', sensorType: 'SERIALIZATION', component: 'Verificación de unicidad de código', severity: 'CRITICAL_ERROR', status: 'SOLVED', triggeredAt: '10:30:38', resolvedAt: '10:31:50' },
  { id: 1030, machine: 'denester', code: 'DEN-0003', name: 'Fallo de servo eje Z de la pinza', sensorType: 'AXIS_Z', component: 'Servomotor eje Z', severity: 'CRITICAL_ERROR', status: 'SOLVED', triggeredAt: '10:28:18', resolvedAt: '10:30:05' },
  { id: 1029, machine: 'estuchadora', code: 'EST-0031', name: 'Bandeja de rechazo llena', sensorType: 'REJECT', component: 'Sistema de rechazo', severity: 'ERROR', status: 'SOLVED', triggeredAt: '10:26:58', resolvedAt: '10:27:46' },
]

/** Eventos simulados por franja de 5 minutos (para el gráfico). */
export const demoEventTimeline = [
  { label: '09:45', activated: 2, solved: 1 },
  { label: '09:50', activated: 3, solved: 2 },
  { label: '09:55', activated: 1, solved: 3 },
  { label: '10:00', activated: 4, solved: 2 },
  { label: '10:05', activated: 2, solved: 2 },
  { label: '10:10', activated: 5, solved: 3 },
  { label: '10:15', activated: 3, solved: 4 },
  { label: '10:20', activated: 2, solved: 3 },
  { label: '10:25', activated: 3, solved: 2 },
  { label: '10:30', activated: 4, solved: 3 },
  { label: '10:35', activated: 3, solved: 4 },
  { label: '10:40', activated: 5, solved: 1 },
]
