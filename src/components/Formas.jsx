/**
 * Elementos decorativos da marca: barra arco-íris, blobs de canto,
 * malha de pontos e estrelinhas. Todos puramente visuais.
 */
import { motion } from 'framer-motion'

const CORES = ['#1B6FE8', '#F7941D', '#E8302A', '#8CC63F', '#7B2FBE', '#FFC72C']

/** Barra arco-íris — assinatura da marca (vem do rodapé do material impresso). */
export function BarraArcoIris({ altura = 'h-3', className = '', animar = false }) {
  return (
    <div className={`flex w-full overflow-hidden ${altura} ${className}`}>
      {CORES.map((c, i) => (
        <motion.span
          key={c}
          className="flex-1"
          style={{ background: c }}
          initial={animar ? { scaleX: 0 } : false}
          whileInView={animar ? { scaleX: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  )
}

/** Blob orgânico grande, usado como fundo de seção. */
export function Blob({ cor = '#1B6FE8', className = '', opacidade = 0.14 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity: opacidade }}
      aria-hidden="true"
    >
      <path
        fill={cor}
        d="M45.7,-58.5C58.2,-49.4,66.7,-34.3,70.6,-18.1C74.4,-1.9,73.6,15.4,66.4,29.4C59.2,43.4,45.6,54.1,30.6,60.9C15.6,67.7,-0.8,70.6,-17.7,67.6C-34.6,64.6,-52,55.7,-62.2,41.6C-72.4,27.5,-75.4,8.2,-71.7,-9.1C-68,-26.5,-57.6,-41.9,-44.1,-51.1C-30.6,-60.3,-14,-63.3,1.9,-65.6C17.8,-67.9,33.2,-67.6,45.7,-58.5Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/** Malha de bolinhas — aparece no material gráfico da marca. */
export function MalhaPontos({ className = '', cor = 'text-pk-azul/25' }) {
  return (
    <div
      className={`malha-pontos pointer-events-none absolute ${cor} ${className}`}
      aria-hidden="true"
    />
  )
}

/** Estrelinha flutuante. */
export function Estrela({ cor = '#FFC72C', className = '', atraso = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
      animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
      transition={{ duration: 5, delay: atraso, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        fill={cor}
        d="M12 2.2l2.8 6.1 6.7.7-5 4.5 1.4 6.6L12 16.7l-5.9 3.4 1.4-6.6-5-4.5 6.7-.7L12 2.2z"
      />
    </motion.svg>
  )
}

/** Bolinha colorida flutuante. */
export function Bolha({ cor = '#1B6FE8', tamanho = 18, className = '', atraso = 0 }) {
  return (
    <motion.span
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ width: tamanho, height: tamanho, background: cor }}
      aria-hidden="true"
      animate={{ y: [0, -22, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 6, delay: atraso, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/** Onda que separa seções (usada no topo/rodapé de blocos coloridos). */
export function Onda({ cor = '#ffffff', className = '', invertida = false }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`block w-full ${className}`}
      style={invertida ? { transform: 'rotate(180deg)' } : undefined}
      aria-hidden="true"
    >
      <path
        fill={cor}
        d="M0,40 C240,90 480,0 720,30 C960,60 1200,20 1440,50 L1440,90 L0,90 Z"
      />
    </svg>
  )
}

/** Faixa de nuvens fofas para o topo das seções claras. */
export function Nuvens({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${className}`}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0,120 L0,74 C60,74 70,50 110,50 C140,50 150,66 180,66 C210,66 220,42 262,42 C300,42 312,68 348,68 C382,68 392,48 430,48 C470,48 482,72 520,72 C556,72 566,52 604,52 C644,52 654,74 692,74 C728,74 738,54 776,54 C816,54 828,70 864,70 C898,70 908,46 950,46 C988,46 1000,68 1036,68 C1070,68 1080,52 1118,52 C1158,52 1170,74 1200,74 L1200,120 Z"
      />
    </svg>
  )
}

export { CORES }
