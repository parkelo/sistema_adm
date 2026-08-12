import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  categorias, categoriaPorSlug, coresDisponiveis, filtrar,
  HEX_COR, NOME_COR, totalProdutos,
} from '../data/produtos.js'
import { publicos, linkWhatsApp } from '../config/site.js'
import { BarraArcoIris, Blob, MalhaPontos } from '../components/Formas.jsx'
import { RevelarLista } from '../components/Revelar.jsx'
import CartaoProduto from '../components/CartaoProduto.jsx'
import Botao from '../components/Botao.jsx'
import Icone from '../components/Icone.jsx'

const corFundo = {
  azul: 'bg-pk-azul', laranja: 'bg-pk-laranja', verde: 'bg-pk-verde',
  vermelho: 'bg-pk-vermelho', roxo: 'bg-pk-roxo', amarelo: 'bg-pk-amarelo',
}

/** Pílula de filtro. */
function Pilula({ ativo, onClick, children, cor = 'azul' }) {
  return (
    <button
      onClick={onClick}
      className={
        'inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-all duration-300 ' +
        (ativo
          ? `${corFundo[cor]} text-white shadow-[0_10px_24px_-10px_rgba(18,35,61,0.5)]`
          : 'bg-white text-pk-cinza ring-1 ring-pk-tinta/8 hover:-translate-y-0.5 hover:text-pk-tinta')
      }
    >
      {children}
    </button>
  )
}

export default function Catalogo() {
  const { categoria: catUrl } = useParams()
  const [params, setParams] = useSearchParams()
  const [busca, setBusca] = useState('')

  const publico = params.get('publico') || ''
  const cor = params.get('cor') || ''
  const cat = categoriaPorSlug[catUrl] || null

  const lista = useMemo(
    () => filtrar({ categoria: catUrl, publico, cor, busca }),
    [catUrl, publico, cor, busca]
  )

  const trocar = (chave, valor) => {
    const p = new URLSearchParams(params)
    if (!valor || p.get(chave) === valor) p.delete(chave)
    else p.set(chave, valor)
    setParams(p, { replace: true })
  }

  const temFiltro = Boolean(publico || cor || busca)

  return (
    <>
      {/* ── Topo ───────────────────────────────────────────────────────── */}
      <section className="fundo-ceu relative overflow-hidden pt-32 pb-14 lg:pt-40">
        <Blob cor={cat ? HEX_COR[cat.cor] : '#1B6FE8'} className="-top-52 -right-40 h-[38rem] w-[38rem]" opacidade={0.12} />
        <MalhaPontos className="inset-x-0 bottom-0 h-40 text-pk-azul/12" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-pk-cinza">
            <Link to="/" className="transition-colors hover:text-pk-azul">Início</Link>
            <span className="text-pk-tinta/25">/</span>
            {cat ? (
              <>
                <Link to="/produtos" className="transition-colors hover:text-pk-azul">Produtos</Link>
                <span className="text-pk-tinta/25">/</span>
                <span className="font-semibold text-pk-tinta">{cat.nome}</span>
              </>
            ) : (
              <span className="font-semibold text-pk-tinta">Produtos</span>
            )}
          </nav>

          <motion.h1
            key={catUrl || 'todos'}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-5xl leading-[0.98] font-semibold text-pk-tinta sm:text-6xl"
          >
            {cat ? (
              <>
                {cat.nome} <span className="texto-arcoiris">{cat.chamada.toLowerCase()}</span>
              </>
            ) : (
              <>
                Todo o catálogo <span className="texto-arcoiris">Parkelô</span>
              </>
            )}
          </motion.h1>

          <p className="mt-4 max-w-2xl text-lg text-pk-cinza">
            {cat ? cat.resumo : `${totalProdutos} modelos entre playgrounds completos, linhas infantis, temáticos, aquáticos, brinquedos avulsos e mobiliário.`}
          </p>
        </div>
      </section>

      {/* ── Filtros ─────────────────────────────────────────────────────── */}
      {/* top-20 = altura do cabeçalho quando encolhido (80px) */}
      <section className="sticky top-20 z-30 border-y border-pk-tinta/6 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
          {/* categorias */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            <Link to="/produtos" className="shrink-0">
              <Pilula ativo={!catUrl}>Todos <span className="opacity-60">{totalProdutos}</span></Pilula>
            </Link>
            {categorias.map((c) => (
              <Link key={c.slug} to={c.url} className="shrink-0">
                <Pilula ativo={catUrl === c.slug} cor={c.cor}>
                  {c.nome} <span className="opacity-60">{c.total}</span>
                </Pilula>
              </Link>
            ))}
          </div>

          {/* busca + filtros secundários */}
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <label className="relative flex-1 sm:max-w-xs">
              <Icone nome="lupa" className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-pk-cinza" />
              <input
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por código…"
                className="w-full rounded-full bg-pk-nuvem py-2.5 pr-4 pl-11 text-sm ring-1 ring-transparent transition-all outline-none placeholder:text-pk-cinza/70 focus:bg-white focus:ring-pk-azul"
              />
            </label>

            <span className="hidden h-6 w-px bg-pk-tinta/10 sm:block" />

            {publicos.map((p) => (
              <Pilula
                key={p.slug}
                cor={p.cor}
                ativo={publico === p.slug}
                onClick={() => trocar('publico', p.slug)}
              >
                <Icone nome={p.icone} className="h-4 w-4" />
                {p.nome}
              </Pilula>
            ))}

            {coresDisponiveis.length > 0 && (
              <>
                <span className="hidden h-6 w-px bg-pk-tinta/10 sm:block" />
                <div className="flex items-center gap-1.5">
                  {coresDisponiveis.map((c) => (
                    <button
                      key={c}
                      onClick={() => trocar('cor', c)}
                      title={NOME_COR[c]}
                      aria-label={`Filtrar por ${NOME_COR[c]}`}
                      className={
                        'h-8 w-8 rounded-full transition-all duration-300 ' +
                        (cor === c
                          ? 'scale-115 ring-3 ring-pk-tinta ring-offset-2'
                          : 'ring-2 ring-white hover:scale-110')
                      }
                      style={{ background: HEX_COR[c] }}
                    />
                  ))}
                </div>
              </>
            )}

            <AnimatePresence>
              {temFiltro && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  onClick={() => { setParams({}, { replace: true }); setBusca('') }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-pk-vermelho transition-colors hover:bg-pk-vermelho-clr"
                >
                  <Icone nome="fechar" className="h-4 w-4" />
                  Limpar
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <BarraArcoIris altura="h-1" />
      </section>

      {/* ── Grade ───────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="mb-8 text-sm text-pk-cinza">
            <strong className="font-display text-pk-tinta">{lista.length}</strong>{' '}
            {lista.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}
          </p>

          {lista.length > 0 ? (
            <RevelarLista
              key={`${catUrl}-${publico}-${cor}-${busca}`}
              escalonar={0.045}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {lista.map((p, i) => (
                <CartaoProduto key={p.slug} produto={p} index={i} />
              ))}
            </RevelarLista>
          ) : (
            <div className="rounded-[2rem] bg-pk-nuvem px-6 py-20 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-pk-cinza">
                <Icone nome="lupa" className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold text-pk-tinta">
                Nada com esses filtros
              </h2>
              <p className="mx-auto mt-2.5 max-w-md text-pk-cinza">
                Tente limpar os filtros — ou chame a gente no WhatsApp que a gente
                acha o modelo certo pra você.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Botao cor="contorno" onClick={() => { setParams({}, { replace: true }); setBusca('') }}>
                  Limpar filtros
                </Botao>
                <Botao cor="verde" href={linkWhatsApp()} iconeEsq="whatsapp">
                  Falar no WhatsApp
                </Botao>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
