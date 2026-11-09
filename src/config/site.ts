// ─────────────────────────────────────────────────────────────
// CONFIGURACIÓN GENERAL DE LA WEB — edita aquí textos y enlaces
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'FactorIA',
  slogan: 'impulsando la industria del futuro',
  valueProposition:
    'Tecnología, simulación y conocimiento industrial en una plataforma diseñada para explorar nuevas posibilidades de monitorización y gestión de procesos productivos.',
  githubUrl: 'https://github.com/TFM-JUPITER-ASISTENTE-INDUSTRIAL/factoria',

  /**
   * Dirección de contacto. Mientras esté vacía, el formulario mostrará un aviso
   * y NO se activará ningún envío. Ejemplo: 'contacto@tudominio.com'
   */
  contactEmail: '',

  /** Enlaces legales. Déjalos vacíos hasta disponer de los textos reales. */
  legal: {
    avisoLegalUrl: '',
    privacidadUrl: '',
    cookiesUrl: '',
  },
}

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'factoria', label: 'FactorIA' },
  { id: 'tecnologia', label: 'Tecnología' },
  { id: 'demo', label: 'Demo' },
  { id: 'anuncios', label: 'Anuncios' },
  { id: 'contacto', label: 'Contacto' },
] as const
