import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { linkWhatsApp } from '../config/site.js'
import Icone from './Icone.jsx'

/**
 * Botão flutuante de WhatsApp + voltar ao topo.
 * Aparece depois de rolar um pouco para não brigar com o hero.
 */
export default function BotaoWhats() {
  const [visivel, setVisivel] = useState(false)
  const [balaoAberto, setBalaoAberto] = useState(false)

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 420)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  // Convite aparece uma vez, alguns segundos depois de o botão surgir
  useEffect(() => {
    if (!visivel) return
    const abre = setTimeout(() => setBalaoAberto(true), 2600)
    const fecha = setTimeout(() => setBalaoAberto(false), 11000)
    return () => { clearTimeout(abre); clearTimeout(fecha) }
  }, [visivel])

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {/* Voltar ao topo */}
      <AnimatePresence>
        {visivel && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-pk-tinta shadow-[0_10px_28px_-8px_rgba(18,35,61,0.4)] transition-all hover:-translate-y-1 hover:bg-pk-azul hover:text-white"
          >
            <Icone nome="cima" className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <AnimatePresence>
        {visivel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', damping: 18, stiffness: 260 }}
            className="flex items-center gap-3"
          >
            <AnimatePresence>
              {balaoAberto && (
                <motion.div
                  initial={{ opacity: 0, x: 16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16, scale: 0.9 }}
                  className="relative hidden max-w-[15rem] rounded-3xl rounded-br-lg bg-white px-4 py-3 text-sm shadow-[0_16px_40px_-12px_rgba(18,35,61,0.4)] sm:block"
                >
                  <button
                    onClick={() => setBalaoAberto(false)}
                    aria-label="Fechar aviso"
                    className="absolute -top-2 -left-2 grid h-6 w-6 place-items-center rounded-full bg-pk-nuvem text-pk-cinza transition-colors hover:bg-pk-vermelho hover:text-white"
                  >
                    <Icone nome="fechar" className="h-3.5 w-3.5" />
                  </button>
                  <p className="font-display font-semibold text-pk-tinta">
                    Quer um orçamento?
                  </p>
                  <p className="mt-0.5 text-pk-cinza">
                    Chama no WhatsApp que a gente responde rapidinho 👋
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="group relative grid h-15 w-15 place-items-center rounded-full bg-pk-verde text-white shadow-[0_12px_32px_-8px_rgba(140,198,63,0.9)] transition-transform hover:scale-108"
            >
              {/* pulso */}
              <span className="absolute inset-0 animate-ping rounded-full bg-pk-verde opacity-25" />
              <Icone nome="whatsapp" className="relative h-8 w-8" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
