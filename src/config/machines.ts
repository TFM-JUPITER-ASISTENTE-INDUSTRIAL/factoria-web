// ─────────────────────────────────────────────────────────────
// MÁQUINAS DE LA PLANTA — datos extraídos del repositorio técnico
// (README y catálogos data/alarm_catalogs/*.csv).
// ─────────────────────────────────────────────────────────────

export type MachineKey = 'denester' | 'encajadora' | 'estuchadora' | 'serializadora' | 'termoformadora'

export interface Machine {
  key: MachineKey
  name: string
  externalId: string
  /** Imagen opcional (p. ej. './images/denester.jpg' dentro de /public). Si se deja vacía se usa la ilustración SVG. */
  image?: string
  function: string
  summary: string
  sensors: number
  definitions: number
  severity: { error: number; critical: number }
  sensorTypes: string[]
  components: string[]
  sampleAlarms: string[]
}

export const machines: Machine[] = [
  {
    key: 'denester',
    name: 'Denester',
    externalId: 'DENESTER-01',
    function: 'Desapilado y alimentación de bandejas',
    summary:
      'Extrae bandejas de una pila mediante una pinza de vacío accionada por servoejes y las deposita en la línea de producción.',
    sensors: 15,
    definitions: 30,
    severity: { error: 13, critical: 17 },
    sensorTypes: ['GRIPPER', 'TRAY', 'AXIS_X', 'AXIS_Z', 'STACK', 'VACUUM', 'PNEUMATIC', 'SAFETY'],
    components: ['Pinza de extracción con ventosas', 'Elevador de pila de bandejas', 'Servomotores de ejes X y Z', 'Circuito neumático y de vacío'],
    sampleAlarms: ['Pérdida de vacío en pinza de extracción', 'Nivel bajo de pila de bandejas', 'Fallo de servo eje Z de la pinza'],
  },
  {
    key: 'encajadora',
    name: 'Encajadora',
    externalId: 'ENCAJADORA-01',
    function: 'Formación, llenado y cierre de cajas',
    summary:
      'Forma cajas de cartón, agrupa los estuches con un robot articulado y realiza el cierre, etiquetado y control de peso de cada caja.',
    sensors: 16,
    definitions: 30,
    severity: { error: 10, critical: 20 },
    sensorTypes: ['CASE', 'ROBOT', 'GROUPING', 'CLOSING', 'LABELING', 'WEIGHING', 'SERIALIZATION', 'SAFETY'],
    components: ['Estación de formación de caja', 'Robot articulado de encajado', 'Cierre con cinta adhesiva', 'Etiquetado y control ponderal'],
    sampleAlarms: ['Colisión detectada en el robot de encajado', 'Rollo de cinta adhesiva agotado', 'Peso de caja fuera de tolerancia'],
  },
  {
    key: 'estuchadora',
    name: 'Estuchadora',
    externalId: 'ESTUCHADORA-01',
    function: 'Formación de estuches e inserción de producto',
    summary:
      'Forma estuches, inserta el producto y el prospecto, cierra las solapas con adhesivo y verifica la codificación de cada unidad.',
    sensors: 19,
    definitions: 35,
    severity: { error: 13, critical: 22 },
    sensorTypes: ['CARTON', 'LEAFLET', 'PRODUCT', 'CLOSING', 'GLUE', 'VISION', 'PRINTER', 'REJECT'],
    components: ['Alimentación de prospectos', 'Formación de estuche', 'Cierre de solapas con cola caliente', 'Visión y codificación'],
    sampleAlarms: ['Prospecto ausente en estación de plegado', 'Temperatura de adhesivo fuera de rango', 'Código DataMatrix de estuche no verificado'],
  },
  {
    key: 'serializadora',
    name: 'Serializadora',
    externalId: 'SERIALIZADORA-01',
    function: 'Codificación única y trazabilidad',
    summary:
      'Imprime y verifica códigos DataMatrix únicos, controla el texto de lote y caducidad y rechaza las unidades no conformes.',
    sensors: 14,
    definitions: 35,
    severity: { error: 12, critical: 23 },
    sensorTypes: ['VISION', 'SERIALIZATION', 'PRINTER', 'REJECT', 'TRANSPORT', 'COMMS', 'SAFETY', 'MODE'],
    components: ['Cámara de visión de lectura de código', 'Impresora industrial', 'Verificación de unicidad de código', 'Sistema de rechazo'],
    sampleAlarms: ['Código DataMatrix ilegible', 'Código duplicado detectado', 'Cartucho de tinta agotado en impresora'],
  },
  {
    key: 'termoformadora',
    name: 'Termoformadora',
    externalId: 'TERMOFORMADORA-01',
    function: 'Formado, sellado y corte de blísteres',
    summary:
      'Forma cavidades de blíster a partir de film mediante calor y vacío, las sella con una barra calefactada y corta las unidades.',
    sensors: 17,
    definitions: 35,
    severity: { error: 14, critical: 21 },
    sensorTypes: ['FORMING', 'FILM', 'SEALING', 'CUTTING', 'WEB', 'WEB_FEED', 'MARKING', 'SAFETY'],
    components: ['Placa calefactora de termoformado', 'Bobina de film base', 'Barra selladora', 'Estación de corte'],
    sampleAlarms: ['Rotura de film de termoformado', 'Fallo de sellado: temperatura baja', 'Cuchilla de corte desgastada o rota'],
  },
]
