import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { categorias } from '../data/produtos.js'
import { site, linkWhatsApp } from '../config/site.js'
import { BarraArcoIris } from './Formas.jsx'
import Icone from './Icone.jsx'
import Botao from './Botao.jsx'

const pontos = { azul: 'bg-pk-azul', laranja: 'bg-pk-laranja', verde: 'bg-pk-verde',
  vermelho: 'bg-pk-vermelho', roxo: 'bg-pk-roxo', amarelo: 'bg-pk-amarelo' }

export default function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const [produtosAberto, setProdutosAberto] = useState(false)
  const local = useLocation()

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  // Fecha tudo ao trocar de página
  useEffect(() => {
    setMenuAberto(false)
    setProdutosAberto(false)
  }, [local.pathname])

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuAberto])

  const linkClasse = ({ isActive }) =>
    'relative px-1 py-2 font-display font-medium transition-colors ' +
    (isActive ? 'text-pk-azul' : 'text-pk-tinta hover:text-pk-azul')

  return (
    <>
      <header
        className={
          'fixed inset-x-0 top-0 z-50 transition-all duration-400 ' +
          (rolou
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(18,35,61,0.22)]'
            : 'bg-transparent')
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          {/* Logo */}
          <Link to="/" className="shrink-0" aria-label={`${site.nome} — início`}>
            <img
              src="/img/brand/logo-sm.webp"
              alt={site.nome}
              width="150"
              height="98"
              className={
                'w-auto transition-all duration-400 ' + (rolou ? 'h-11' : 'h-14 lg:h-16')
              }
            />
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" end className={linkClasse}>Início</NavLink>

            {/* Produtos com submenu */}
            <div
              className="relative"
              onMouseEnter={() => setProdutosAberto(true)}
              onMouseLeave={() => setProdutosAberto(false)}
            >
              <NavLink to="/produtos" className={linkClasse}>
                <span className="inline-flex items-center gap-1">
                  Produtos
                  <svg viewBox="0 0 24 24" className={'h-3.5 w-3.5 transition-transform ' + (produtosAberto ? 'rotate-180' : '')}>
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </NavLink>

              <AnimatePresence>
                {produtosAberto && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-4"
                  >
                    <div className="overflow-hidden rounded-3xl bg-white p-2.5 shadow-[0_28px_60px_-20px_rgba(18,35,61,0.35)] ring-1 ring-pk-tinta/5">
                      {categorias.map((c) => (
                        <Link
                          key={c.slug}
                          to={c.url}
                          className="flex items-center gap-3.5 rounded-2xl px-3.5 py-3 transition-colors hover:bg-pk-nuvem"
                        >
                          <span className={`h-9 w-9 shrink-0 rounded-xl ${pontos[c.cor]}`} />
                          <span className="min-w-0 flex-1">
                            <span className="block font-display font-semibold text-pk-tinta">
                              {c.nome}
                            </span>
                            <span className="block truncate text-sm text-pk-cinza">
                              {c.chamada} · {c.total} modelos
                            </span>
                          </span>
                          <Icone nome="seta" className="h-4 w-4 shrink-0 text-pk-cinza" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/sobre" className={linkClasse}>A Parkelô</NavLink>
            <NavLink to="/contato" className={linkClasse}>Contato</NavLink>
          </nav>

          <div className="flex items-center gap-2.5">
            <Botao
              cor="verde"
              tamanho="sm"
              href={linkWhatsApp()}
              iconeEsq="whatsapp"
              className="hidden sm:inline-flex"
            >
              Orçamento
            </Botao>

            {/* Hambúrguer */}
            <button
              onClick={() => setMenuAberto((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-pk-nuvem text-pk-tinta transition-colors hover:bg-pk-azul-clr lg:hidden"
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuAberto}
            >
              <Icone nome={menuAberto ? 'fechar' : 'menu'} className="h-6 w-6" />
            </button>
          </div>
        </div>

        {rolou && <BarraArcoIris altura="h-1" />}
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-pk-tinta/45 backdrop-blur-sm"
              onClick={() => setMenuAberto(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white pt-24 pb-8"
            >
              <div className="flex-1 px-6">
                {[
                  { para: '/', texto: 'Início' },
                  { para: '/produtos', texto: 'Todos os produtos' },
                ].map((l) => (
                  <Link
                    key={l.para}
                    to={l.para}
                    className="block border-b border-pk-tinta/8 py-4 font-display text-xl font-semibold"
                  >
                    {l.texto}
                  </Link>
                ))}

                <p className="pt-6 pb-2 font-display text-xs font-semibold uppercase tracking-widest text-pk-cinza">
                  Categorias
                </p>
                {categorias.map((c) => (
                  <Link
                    key={c.slug}
                    to={c.url}
                    className="flex items-center gap-3 rounded-2xl py-3 transition-colors hover:bg-pk-nuvem"
                  >
                    <span className={`h-8 w-8 shrink-0 rounded-xl ${pontos[c.cor]}`} />
                    <span className="font-display font-medium">{c.nome}</span>
                    <span className="ml-auto text-sm text-pk-cinza">{c.total}</span>
                  </Link>
                ))}

                <div className="pt-6">
                  {[
                    { para: '/sobre', texto: 'A Parkelô' },
                    { para: '/contato', texto: 'Contato' },
                  ].map((l) => (
                    <Link
                      key={l.para}
                      to={l.para}
                      className="block border-b border-pk-tinta/8 py-4 font-display text-xl font-semibold"
                    >
                      {l.texto}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-6 pt-8">
                <Botao cor="verde" href={linkWhatsApp()} iconeEsq="whatsapp" className="w-full">
                  Pedir orçamento
                </Botao>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
