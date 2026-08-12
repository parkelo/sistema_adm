import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Cabecalho from './Cabecalho.jsx'
import Rodape from './Rodape.jsx'
import BotaoWhats from './BotaoWhats.jsx'

/** Sobe a página ao trocar de rota (menos quando há âncora #). */
function AoTrocarDeRota() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const alvo = document.getElementById(hash.slice(1))
      if (alvo) {
        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function Layout() {
  return (
    <>
      <AoTrocarDeRota />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-999 focus:rounded-full focus:bg-pk-azul focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Cabecalho />
      <main id="conteudo">
        <Outlet />
      </main>
      <Rodape />
      <BotaoWhats />
    </>
  )
}
