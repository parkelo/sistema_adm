import { motion } from 'framer-motion'

/**
 * Revela o conteúdo quando ele entra na tela.
 * <Revelar de="baixo" atraso={0.1}>…</Revelar>
 */
const origens = {
  baixo: { y: 42, x: 0 },
  cima: { y: -42, x: 0 },
  esq: { x: -52, y: 0 },
  dir: { x: 52, y: 0 },
  zoom: { scale: 0.88, x: 0, y: 0 },
  nenhum: { x: 0, y: 0 },
}

export default function Revelar({
  children,
  de = 'baixo',
  atraso = 0,
  duracao = 0.7,
  className = '',
  once = true,
  ...props
}) {
  const origem = origens[de] || origens.baixo
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...origem }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: duracao,
        delay: atraso,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Versão para listas: os filhos entram em cascata. */
export function RevelarLista({ children, className = '', escalonar = 0.08, ...props }) {
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        visivel: { transition: { staggerChildren: escalonar } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const itemLista = {
  oculto: { opacity: 0, y: 36 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}
