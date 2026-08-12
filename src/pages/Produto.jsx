import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  capa, categoriaPorSlug, HEX_COR, NOME_COR, NOME_VISTA,
  porSlug, relacionados, urlImagem,
} from '../data/produtos.js'
import { publicos, site, whatsAppProduto } from '../config/site.js'
import { BarraArcoIris, Blob, MalhaPontos } from '../components/Formas.jsx'
import Revelar, { RevelarLista } from '../components/Revelar.jsx'
import CartaoProduto from '../components/CartaoProduto.jsx'
import Botao from '../components/Botao.jsx'
import Icone from '../components/Icone.jsx'

const corFundo = {
  azul: 'bg-pk-azul', laranja: 'bg-pk-laranja', verde: 'bg-pk-verde',
  vermelho: 'bg-pk-vermelho', roxo: 'bg-pk-roxo', amarelo: 'bg-pk-amarelo',
}
const corTexto = {
  azul: 'text-pk-azul', laranja: 'text-pk-laranja', verde: 'text-pk-verde-esc',
  vermelho: 'text-pk-vermelho', roxo: 'text-pk-roxo', amarelo: 'text-pk-laranja-esc',
}
const corClara = {
  azul: 'bg-pk-azul-clr', laranja: 'bg-pk-laranja-clr', verde: 'bg-pk-verde-clr',
  vermelho: 'bg-pk-vermelho-clr', roxo: 'bg-pk-roxo-clr', amarelo: 'bg-pk-amarelo-clr',
}

/** Medida linear, sempre com 2 casas: 13.1 → "13,10" */
const num = (v) =>
  v == null
    ? null
    : v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** Área: sempre com 2 casas, 57.1 → "57,10 m²" */
const area = (v) =>
  v == null
    ? null
    : `${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²`

/** Cartão de especificação — só renderiza quando o dado existe. */
function Spec({ icone, rotulo, valor, cor }) {
  if (!valor) return null
  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-pk-tinta/6">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${corClara[cor]} ${corTexto[cor]}`}>
        <Icone nome={icone} className="h-5.5 w-5.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-pk-cinza">{rotulo}</span>
        <span className="block font-display text-lg leading-tight font-semibold text-pk-tinta">
          {valor}
        </span>
      </span>
    </div>
  )
}

export default function Produto() {
  const { slug } = useParams()
  const produto = porSlug[slug]

  const [ativa, setAtiva] = useState(0)
  const [corSel, setCorSel] = useState(null)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    setAtiva(0)
    setCorSel(null)
  }, [slug])

  // fecha o zoom no ESC
  useEffect(() => {
    if (!zoom) return
    const aoTeclar = (e) => e.key === 'Escape' && setZoom(false)
    window.addEventListener('keydown', aoTeclar)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = ''
    }
  }, [zoom])

  // filtra a galeria pela cor escolhida
  const galeria = useMemo(() => {
    if (!produto) return []
    if (!corSel) {
      // sem cor escolhida: mostra uma vista de cada, sem repetir por cor
      const vistas = new Set()
      return produto.imagens.filter((i) => {
        const chave = `${i.vista}-${i.arquivo.replace(/-(amarelo|azul|laranja|verde|vermelho|roxo)/, '')}`
        if (vistas.has(chave)) return false
        vistas.add(chave)
        return true
      })
    }
    return produto.imagens.filter((i) => i.cor === corSel)
  }, [produto, corSel])

  useEffect(() => setAtiva(0), [corSel])

  if (!produto) return <Navigate to="/produtos" replace />

  const cat = categoriaPorSlug[produto.categoria]
  const cor = cat?.cor || 'azul'
  const { ficha } = produto
  const img = galeria[ativa] || galeria[0] || capa(produto)
  const irmaos = relacionados(produto, 4)

  const dimensoes =
    ficha.larguraM && ficha.comprimentoM
      ? `${num(ficha.larguraM)} × ${num(ficha.comprimentoM)} m`
      : null
  const seguranca =
    ficha.segLarguraM && ficha.segComprimentoM
      ? `${num(ficha.segLarguraM)} × ${num(ficha.segComprimentoM)} m`
      : null

  const pubs = publicos.filter((p) => ficha.publicos.includes(p.slug))

  return (
    <>
      {/* ── Cabeçalho do produto ────────────────────────────────────────── */}
      <section className="fundo-ceu relative overflow-hidden pt-28 pb-16 lg:pt-36">
        <Blob cor={HEX_COR[cor]} className="-top-56 -left-44 h-[40rem] w-[40rem]" opacidade={0.11} />
        <MalhaPontos className="inset-x-0 top-32 h-64 text-pk-azul/10" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-pk-cinza">
            <Link to="/" className="transition-colors hover:text-pk-azul">Início</Link>
            <span className="text-pk-tinta/25">/</span>
            <Link to="/produtos" className="transition-colors hover:text-pk-azul">Produtos</Link>
            <span className="text-pk-tinta/25">/</span>
            <Link to={cat.url} className="transition-colors hover:text-pk-azul">{cat.nome}</Link>
            <span className="text-pk-tinta/25">/</span>
            <span className="font-semibold text-pk-tinta">{produto.rotulo}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            {/* ── Galeria ── */}
            <div>
              <div className={`relative overflow-hidden rounded-[2rem] ${corClara[cor]} shadow-[0_1px_2px_rgba(18,35,61,.05),0_24px_60px_-26px_rgba(18,35,61,.3)]`}>
                <div className="malha-pontos absolute inset-0 text-pk-tinta/7" />

                <button
                  onClick={() => setZoom(true)}
                  className="group relative block aspect-square w-full cursor-zoom-in"
                  aria-label="Ampliar imagem"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={img.arquivo}
                      src={urlImagem(produto, img, 'lg')}
                      alt={`${produto.rotulo} — ${NOME_VISTA[img.vista] || 'render'}`}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-104"
                    />
                  </AnimatePresence>

                  <span className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-pk-tinta opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Icone nome="lupa" className="h-3.5 w-3.5" />
                    Ampliar
                  </span>
                </button>

                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 font-display text-xs font-semibold tracking-wide uppercase backdrop-blur">
                  <span className={corTexto[cor]}>{NOME_VISTA[img.vista] || 'Render'}</span>
                </span>

                <BarraArcoIris altura="h-1.5" />
              </div>

              {/* miniaturas */}
              {galeria.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {galeria.map((im, i) => (
                    <button
                      key={im.arquivo}
                      onClick={() => setAtiva(i)}
                      aria-label={NOME_VISTA[im.vista] || 'Render'}
                      className={
                        'aspect-square overflow-hidden rounded-2xl bg-white transition-all duration-300 ' +
                        (i === ativa
                          ? 'ring-3 ring-pk-azul ring-offset-2'
                          : 'opacity-65 ring-1 ring-pk-tinta/8 hover:-translate-y-1 hover:opacity-100')
                      }
                    >
                      <img
                        src={urlImagem(produto, im, 'sm')}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Informações ── */}
            <div>
              <Link
                to={cat.url}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-xs font-semibold tracking-widest uppercase ${corClara[cor]} ${corTexto[cor]}`}
              >
                {cat.nome}
              </Link>

              <h1 className="mt-4 font-display text-5xl leading-[0.98] font-semibold text-pk-tinta sm:text-6xl">
                {produto.rotulo}
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-pk-cinza">
                {cat.resumo}
              </p>

              {/* seletor de cor */}
              {produto.cores.length > 0 && (
                <div className="mt-8">
                  <p className="font-display text-sm font-semibold text-pk-tinta">
                    Cores disponíveis
                    {corSel && <span className="ml-2 font-normal text-pk-cinza">{NOME_COR[corSel]}</span>}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {produto.cores.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCorSel(corSel === c ? null : c)}
                        title={NOME_COR[c]}
                        aria-label={NOME_COR[c]}
                        className={
                          'h-11 w-11 rounded-2xl transition-all duration-300 ' +
                          (corSel === c
                            ? 'scale-110 ring-3 ring-pk-tinta ring-offset-2'
                            : 'ring-2 ring-white hover:scale-107')
                        }
                        style={{ background: HEX_COR[c] }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ficha técnica */}
              {produto.temFicha ? (
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Spec
                    cor={cor} icone="crianca" rotulo="Para crianças de"
                    valor={ficha.idadeMin && `${ficha.idadeMin} a ${ficha.idadeMax} anos`}
                  />
                  <Spec cor={cor} icone="criancas" rotulo="Crianças simultâneas"
                    valor={ficha.criancas && `${ficha.criancas} crianças`} />
                  <Spec cor={cor} icone="cubo" rotulo="Dimensões do produto" valor={dimensoes} />
                  <Spec cor={cor} icone="regua" rotulo="Área de segurança" valor={seguranca} />
                  <Spec cor={cor} icone="area" rotulo="Área mínima"
                    valor={area(ficha.areaMinimaM2)} />
                  <Spec cor={cor} icone="area" rotulo="Área de segurança total"
                    valor={area(ficha.areaSegurancaM2)} />
                </div>
              ) : (
                <div className="mt-8 flex items-start gap-3.5 rounded-2xl bg-pk-amarelo-clr p-5 ring-1 ring-pk-amarelo/40">
                  <Icone nome="regua" className="mt-0.5 h-5.5 w-5.5 shrink-0 text-pk-laranja-esc" />
                  <p className="text-sm leading-relaxed text-pk-tinta">
                    <strong className="font-display">Medidas sob consulta.</strong>{' '}
                    Chame no WhatsApp que enviamos as dimensões exatas e a área de
                    segurança necessária para este modelo.
                  </p>
                </div>
              )}

              {/* onde se encaixa */}
              {pubs.length > 0 && (
                <div className="mt-7">
                  <p className="font-display text-sm font-semibold text-pk-tinta">Indicado para</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pubs.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/produtos?publico=${p.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-pk-nuvem px-3.5 py-2 text-sm font-medium text-pk-cinza transition-colors hover:bg-pk-azul-clr hover:text-pk-azul"
                      >
                        <Icone nome={p.icone} className="h-4 w-4" />
                        {p.nome}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-9 flex flex-wrap gap-3">
                <Botao cor="verde" tamanho="lg" href={whatsAppProduto(produto)} iconeEsq="whatsapp">
                  Pedir orçamento deste modelo
                </Botao>
                <Botao
                  cor="contorno"
                  tamanho="lg"
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Orçamento ${produto.rotulo}`)}`}
                  iconeEsq="email"
                >
                  Por e-mail
                </Botao>
              </div>

              {/* selo ABNT */}
              <div className="mt-8 flex items-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-pk-tinta/6">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ${corFundo[cor]}`}>
                  <Icone nome="escudo" className="h-6 w-6" />
                </span>
                <p className="text-sm leading-relaxed text-pk-cinza">
                  <strong className="font-display text-pk-tinta">ABNT NBR 16071/21</strong> —
                  norma que estabelece os requisitos de segurança para playgrounds e
                  áreas de lazer infantil. Nossos produtos são projetados seguindo ela.
                </p>
              </div>

              <p className="mt-5 text-xs text-pk-cinza">
                Imagens ilustrativas. As cores podem variar de acordo com o lote de
                produção, sem aviso prévio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Relacionados ────────────────────────────────────────────────── */}
      {irmaos.length > 0 && (
        <section className="bg-pk-nuvem py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <Revelar>
                <h2 className="font-display text-3xl font-semibold text-pk-tinta sm:text-4xl">
                  Veja também
                </h2>
                <p className="mt-2 text-pk-cinza">Outros modelos que costumam combinar.</p>
              </Revelar>
              <Revelar de="dir">
                <Botao cor="contorno" para={cat.url} icone="seta">
                  Toda a linha {cat.nome}
                </Botao>
              </Revelar>
            </div>

            <RevelarLista className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {irmaos.map((p, i) => (
                <CartaoProduto key={p.slug} produto={p} index={i} />
              ))}
            </RevelarLista>
          </div>
        </section>
      )}

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-100 grid cursor-zoom-out place-items-center bg-pk-tinta/92 p-5 backdrop-blur-md"
          >
            <button
              onClick={() => setZoom(false)}
              aria-label="Fechar"
              className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/12 text-white transition-colors hover:bg-white/25"
            >
              <Icone nome="fechar" className="h-6 w-6" />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={urlImagem(produto, img, 'lg')}
              alt={produto.rotulo}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] max-w-full object-contain"
            />

            <p className="absolute bottom-6 font-display font-semibold text-white/80">
              {produto.rotulo} · {NOME_VISTA[img.vista] || 'Render'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
