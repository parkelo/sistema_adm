import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  categorias, destaques, porSlug, produtos, totalProdutos, urlImagem, capa,
} from '../data/produtos.js'
import { diferenciais, publicos, site, linkWhatsApp } from '../config/site.js'
import { BarraArcoIris, Blob, Bolha, Estrela, MalhaPontos, Nuvens, Onda } from '../components/Formas.jsx'
import Revelar, { RevelarLista, itemLista } from '../components/Revelar.jsx'
import CartaoProduto from '../components/CartaoProduto.jsx'
import Botao from '../components/Botao.jsx'
import Icone from '../components/Icone.jsx'

/* ══════════════════════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════════════════════ */

const HERO = ['kmp-0501', 'aviao', 'kaq-0302', 'klp-0201'].filter((s) => porSlug[s])
const BLOBS = ['#1B6FE8', '#E8302A', '#7B2FBE', '#8CC63F']

function Hero() {
  const [atual, setAtual] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yTexto = useTransform(scrollYProgress, [0, 1], [0, 90])
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -70])
  const opacidade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setAtual((v) => (v + 1) % HERO.length), 4200)
    return () => clearInterval(t)
  }, [])

  const produto = porSlug[HERO[atual]]

  return (
    <section ref={ref} className="fundo-ceu relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* decoração */}
      <Blob cor="#1B6FE8" className="-top-40 -left-52 h-[42rem] w-[42rem]" opacidade={0.1} />
      <Blob cor="#FFC72C" className="-right-56 -bottom-64 h-[46rem] w-[46rem]" opacidade={0.14} />
      <MalhaPontos className="inset-x-0 top-24 h-72 text-pk-azul/12" />
      <Estrela className="top-32 left-[8%] h-8 w-8" cor="#FFC72C" />
      <Estrela className="top-1/2 right-[6%] h-6 w-6" cor="#F7941D" atraso={1.4} />
      <Estrela className="bottom-40 left-[18%] h-5 w-5" cor="#8CC63F" atraso={2.6} />
      <Bolha cor="#E8302A" tamanho={14} className="top-44 right-[22%]" atraso={0.6} />
      <Bolha cor="#7B2FBE" tamanho={20} className="bottom-56 right-[12%]" atraso={1.9} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8">
        {/* texto */}
        <motion.div style={{ y: yTexto, opacity: opacidade }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-pk-azul shadow-[0_8px_24px_-10px_rgba(27,111,232,0.6)]"
          >
            <Icone nome="escudo" className="h-4 w-4" />
            Projetado seguindo a ABNT NBR 16071
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-5xl leading-[0.95] font-semibold text-pk-tinta sm:text-6xl lg:text-7xl"
          >
            Playgrounds<br />
            que viram<br />
            <span className="texto-arcoiris">infância.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-pk-cinza sm:text-xl"
          >
            Brinquedos em polímero que não enferrujam, não soltam farpa e não
            esquentam no sol. Do quintal de casa à praça do condomínio, em todo
            o <strong className="font-semibold text-pk-tinta">{site.regiaoAtendida}</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Botao cor="azul" tamanho="lg" para="/produtos" icone="seta">
              Ver os {totalProdutos} modelos
            </Botao>
            <Botao cor="verde" tamanho="lg" href={linkWhatsApp()} iconeEsq="whatsapp">
              Pedir orçamento
            </Botao>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
          >
            {[
              ['sol', 'Não desbota no sol'],
              ['termometro', 'Não esquenta'],
              ['folha', 'Atóxico e reciclável'],
            ].map(([ic, txt]) => (
              <li key={txt} className="flex items-center gap-2 text-sm font-semibold text-pk-cinza">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-pk-verde-esc shadow-sm">
                  <Icone nome={ic} className="h-4.5 w-4.5" />
                </span>
                {txt}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* imagem rotativa */}
        <motion.div style={{ y: yImg }} className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={atual}
                initial={{ opacity: 0, scale: 0.86, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.08, rotate: 5 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {/* disco colorido atrás */}
                <div
                  className="absolute inset-6 rounded-full blur-2xl"
                  style={{ background: BLOBS[atual % BLOBS.length], opacity: 0.16 }}
                />
                <div
                  className="absolute inset-10 rounded-full"
                  style={{ background: BLOBS[atual % BLOBS.length], opacity: 0.1 }}
                />
                {produto && (
                  <img
                    src={urlImagem(produto, capa(produto), 'lg')}
                    alt={produto.rotulo}
                    fetchpriority="high"
                    className="sombra-pk absolute inset-0 h-full w-full animate-[flutuar_6s_ease-in-out_infinite] object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* etiqueta do modelo */}
            <AnimatePresence mode="wait">
              {produto && (
                <motion.div
                  key={`t-${atual}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-2 left-0 sm:bottom-6"
                >
                  <Link
                    to={produto.url}
                    className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 shadow-[0_16px_40px_-14px_rgba(18,35,61,0.45)] transition-transform hover:-translate-y-1"
                  >
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-white"
                      style={{ background: BLOBS[atual % BLOBS.length] }}
                    >
                      <Icone nome="seta" className="h-4 w-4" />
                    </span>
                    <span className="text-left">
                      <span className="block font-display text-sm font-semibold text-pk-tinta">
                        {produto.rotulo}
                      </span>
                      <span className="block text-xs text-pk-cinza">Ver este modelo</span>
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* bolinhas de navegação */}
          <div className="mt-4 flex justify-center gap-2">
            {HERO.map((s, i) => (
              <button
                key={s}
                onClick={() => setAtual(i)}
                aria-label={`Ver ${porSlug[s]?.rotulo}`}
                className={
                  'h-2.5 rounded-full transition-all duration-400 ' +
                  (i === atual ? 'w-8 bg-pk-azul' : 'w-2.5 bg-pk-tinta/18 hover:bg-pk-tinta/35')
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   FAIXA DE SELOS (marquee infinito)
   ══════════════════════════════════════════════════════════════════════════ */

const SELOS = [
  ['escudo', 'Segurança ABNT NBR 16071'],
  ['sol', 'Pigmentação UV que não desbota'],
  ['gota', 'Não enferruja e não apodrece'],
  ['termometro', 'Não esquenta como metal'],
  ['folha', 'Atóxico e 100% reciclável'],
  ['check', 'Sem farpa, sem manutenção'],
]

function FaixaSelos() {
  const fila = [...SELOS, ...SELOS]
  return (
    <section className="relative overflow-hidden bg-pk-tinta py-5">
      <div className="flex w-max animate-[girar_0s] gap-12 [animation:none]">
        <motion.div
          className="flex shrink-0 gap-12 pr-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        >
          {fila.map(([ic, txt], i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2.5 font-display text-sm font-medium whitespace-nowrap text-white/85"
            >
              <Icone nome={ic} className="h-5 w-5 text-pk-amarelo" />
              {txt}
              <span className="ml-9 text-pk-amarelo">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   TÍTULO DE SEÇÃO (reutilizado)
   ══════════════════════════════════════════════════════════════════════════ */

function TituloSecao({ etiqueta, titulo, destaque, texto, centro = true, cor = 'azul' }) {
  const cores = {
    azul: 'text-pk-azul bg-pk-azul-clr', laranja: 'text-pk-laranja bg-pk-laranja-clr',
    verde: 'text-pk-verde-esc bg-pk-verde-clr', vermelho: 'text-pk-vermelho bg-pk-vermelho-clr',
    roxo: 'text-pk-roxo bg-pk-roxo-clr', amarelo: 'text-pk-laranja-esc bg-pk-amarelo-clr',
  }
  return (
    <div className={centro ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {etiqueta && (
        <Revelar de="baixo">
          <span
            className={`inline-block rounded-full px-4 py-1.5 font-display text-xs font-semibold tracking-widest uppercase ${cores[cor]}`}
          >
            {etiqueta}
          </span>
        </Revelar>
      )}
      <Revelar de="baixo" atraso={0.08}>
        <h2 className="mt-5 font-display text-4xl leading-[1.02] font-semibold text-pk-tinta sm:text-5xl">
          {titulo}{' '}
          {destaque && <span className="texto-arcoiris">{destaque}</span>}
        </h2>
      </Revelar>
      {texto && (
        <Revelar de="baixo" atraso={0.16}>
          <p className="mt-5 text-lg leading-relaxed text-pk-cinza">{texto}</p>
        </Revelar>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   CATEGORIAS
   ══════════════════════════════════════════════════════════════════════════ */

const fundoCat = {
  azul: 'from-pk-azul to-pk-azul-esc', laranja: 'from-pk-laranja to-pk-laranja-esc',
  verde: 'from-pk-verde to-pk-verde-esc', vermelho: 'from-pk-vermelho to-pk-vermelho-esc',
  roxo: 'from-pk-roxo to-pk-roxo-esc', amarelo: 'from-pk-amarelo to-pk-amarelo-esc',
}

function Categorias() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Blob cor="#8CC63F" className="-right-72 -bottom-52 h-[40rem] w-[40rem]" opacidade={0.09} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <TituloSecao
          etiqueta="Nossa linha"
          titulo="Tem um Parkelô para"
          destaque="cada espaço"
          texto={`${totalProdutos} modelos divididos em ${categorias.length} linhas. Do balanço avulso ao playground completo com torre, ponte e escorregador.`}
        />

        <RevelarLista className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => (
            <motion.div key={c.slug} variants={itemLista}>
              <Link
                to={c.url}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_1px_2px_rgba(18,35,61,.05),0_16px_40px_-18px_rgba(18,35,61,.2)] transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_1px_2px_rgba(18,35,61,.05),0_34px_64px_-22px_rgba(18,35,61,.32)]"
              >
                <div className={`relative aspect-16/11 overflow-hidden bg-gradient-to-br ${fundoCat[c.cor]}`}>
                  <div className="malha-pontos absolute inset-0 text-white/25" />
                  {c.imagem && (
                    <img
                      src={c.imagem}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-7 drop-shadow-[0_18px_22px_rgba(0,0,0,0.28)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-112 group-hover:-rotate-2"
                    />
                  )}
                  <span className="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-1 font-display text-xs font-bold text-pk-tinta">
                    {c.total} modelos
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="font-display text-xs font-semibold tracking-widest text-pk-cinza uppercase">
                    {c.chamada}
                  </span>
                  <h3 className="mt-1.5 font-display text-2xl font-semibold text-pk-tinta">
                    {c.nome}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-pk-cinza">
                    {c.resumo}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-pk-azul">
                    Explorar linha
                    <Icone
                      nome="seta"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </div>

                <BarraArcoIris altura="h-1.5" />
              </Link>
            </motion.div>
          ))}
        </RevelarLista>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   PÚBLICOS (abas)
   ══════════════════════════════════════════════════════════════════════════ */

const AMOSTRA = {
  casa: ['klp-0101', 'balanco', 'cavalinho-de-mola'],
  condominio: ['kmp-0501', 'kmp-0301', 'carrossel'],
  escola: ['kmp-0101', 'gangorra', 'jogo-da-memoria'],
  buffet: ['aviao', 'trem', 'playball'],
}

const corTexto = {
  azul: 'text-pk-azul', laranja: 'text-pk-laranja', verde: 'text-pk-verde-esc',
  vermelho: 'text-pk-vermelho', roxo: 'text-pk-roxo', amarelo: 'text-pk-laranja-esc',
}
const corFundo = {
  azul: 'bg-pk-azul', laranja: 'bg-pk-laranja', verde: 'bg-pk-verde',
  vermelho: 'bg-pk-vermelho', roxo: 'bg-pk-roxo', amarelo: 'bg-pk-amarelo',
}

function Publicos() {
  const [aba, setAba] = useState(0)
  const p = publicos[aba]
  const amostra = (AMOSTRA[p.slug] || []).map((s) => porSlug[s]).filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-pk-nuvem py-24 lg:py-32">
      <MalhaPontos className="inset-0 text-pk-azul/8" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <TituloSecao
          etiqueta="Para onde vai"
          titulo="Onde o playground"
          destaque="vai morar?"
          texto="Cada ambiente pede um tipo de estrutura. Escolha o seu e veja o que costuma funcionar melhor."
        />

        {/* abas */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {publicos.map((item, i) => (
            <button
              key={item.slug}
              onClick={() => setAba(i)}
              className={
                'inline-flex items-center gap-2.5 rounded-full px-5 py-3 font-display font-semibold transition-all duration-300 ' +
                (i === aba
                  ? `${corFundo[item.cor]} text-white shadow-[0_12px_28px_-10px_rgba(18,35,61,0.5)]`
                  : 'bg-white text-pk-cinza hover:-translate-y-0.5 hover:text-pk-tinta')
              }
            >
              <Icone nome={item.icone} className="h-5 w-5" />
              {item.nome}
            </button>
          ))}
        </div>

        {/* conteúdo da aba */}
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <h3 className={`font-display text-3xl leading-tight font-semibold sm:text-4xl ${corTexto[p.cor]}`}>
                {p.chamada}
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-pk-cinza">{p.texto}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Botao cor={p.cor} para={`/produtos?publico=${p.slug}`} icone="seta">
                  Ver modelos indicados
                </Botao>
                <Botao
                  cor="contorno"
                  href={linkWhatsApp(
                    `Olá! Quero um playground para ${p.nome.toLowerCase()}. Podem me ajudar?`
                  )}
                  iconeEsq="whatsapp"
                >
                  Falar com alguém
                </Botao>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {amostra.map((prod, i) => (
                <motion.div
                  key={prod.slug}
                  initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.1 + i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={prod.url}
                    className="group block overflow-hidden rounded-3xl bg-white p-3 shadow-[0_14px_36px_-16px_rgba(18,35,61,0.35)] transition-transform hover:-translate-y-2"
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl bg-pk-nuvem">
                      <img
                        src={urlImagem(prod, capa(prod), 'sm')}
                        alt={prod.rotulo}
                        loading="lazy"
                        className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="mt-2.5 text-center font-display text-sm font-semibold text-pk-tinta">
                      {prod.rotulo}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   DESTAQUES
   ══════════════════════════════════════════════════════════════════════════ */

function Destaques() {
  const lista = destaques(8)
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TituloSecao
            centro={false}
            etiqueta="Mais procurados"
            titulo="Comece por"
            destaque="estes aqui"
            cor="laranja"
          />
          <Revelar de="dir">
            <Botao cor="contorno" para="/produtos" icone="seta">
              Catálogo completo
            </Botao>
          </Revelar>
        </div>

        <RevelarLista className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lista.map((p, i) => (
            <CartaoProduto key={p.slug} produto={p} index={i} />
          ))}
        </RevelarLista>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   DIFERENCIAIS
   ══════════════════════════════════════════════════════════════════════════ */

function Diferenciais() {
  return (
    <section className="relative overflow-hidden bg-pk-tinta py-24 text-white lg:py-32">
      <MalhaPontos className="inset-0 text-white/8" />
      <Blob cor="#1B6FE8" className="-top-52 -left-40 h-[36rem] w-[36rem]" opacidade={0.3} />
      <Blob cor="#7B2FBE" className="-right-44 -bottom-56 h-[38rem] w-[38rem]" opacidade={0.25} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Revelar>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 font-display text-xs font-semibold tracking-widest uppercase">
              Por que polímero
            </span>
          </Revelar>
          <Revelar atraso={0.08}>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] font-semibold sm:text-5xl">
              A diferença que aparece{' '}
              <span className="texto-arcoiris">depois de anos</span>
            </h2>
          </Revelar>
          <Revelar atraso={0.16}>
            <p className="mt-5 text-lg text-white/65">
              Madeira racha e lasca. Metal enferruja e queima. Nosso polímero
              rotomoldado continua igual ao primeiro dia.
            </p>
          </Revelar>
        </div>

        <RevelarLista className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((d) => (
            <motion.div
              key={d.titulo}
              variants={itemLista}
              className="group rounded-[1.75rem] bg-white/6 p-7 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-2 hover:bg-white/11"
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${corFundo[d.cor]}`}
              >
                <Icone nome={d.icone} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{d.titulo}</h3>
              <p className="mt-2.5 leading-relaxed text-white/62">{d.texto}</p>
            </motion.div>
          ))}
        </RevelarLista>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   COMPARATIVO
   ══════════════════════════════════════════════════════════════════════════ */

const COMPARA = [
  ['Não solta farpa', true, false, true],
  ['Não enferruja', true, true, false],
  ['Não apodrece nem racha', true, false, true],
  ['Não esquenta ao sol', true, true, false],
  ['Dispensa pintura e verniz', true, false, false],
  ['Cor na massa, não desbota fácil', true, false, false],
  ['Cantos arredondados de fábrica', true, false, false],
  ['Material atóxico e reciclável', true, true, false],
]

function Comparativo() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <TituloSecao
          etiqueta="Comparando"
          titulo="Polímero, madeira"
          destaque="ou metal?"
          texto="Sem enrolação: o que cada material entrega depois de alguns verões e algumas chuvas."
          cor="verde"
        />

        <Revelar de="baixo" atraso={0.1} className="mt-14">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_1px_2px_rgba(18,35,61,.05),0_24px_60px_-24px_rgba(18,35,61,.3)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="bg-pk-nuvem">
                    <th className="p-5 font-display text-sm font-semibold tracking-wide text-pk-cinza uppercase">
                      O que importa
                    </th>
                    <th className="bg-pk-azul p-5 text-center font-display font-semibold text-white">
                      Parkelô
                    </th>
                    <th className="p-5 text-center font-display font-semibold text-pk-cinza">
                      Madeira
                    </th>
                    <th className="p-5 text-center font-display font-semibold text-pk-cinza">
                      Metal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARA.map(([label, pk, mad, met], i) => (
                    <tr key={label} className={i % 2 ? 'bg-pk-nuvem/45' : ''}>
                      <td className="p-5 font-medium text-pk-tinta">{label}</td>
                      {[pk, mad, met].map((v, j) => (
                        <td
                          key={j}
                          className={'p-5 text-center ' + (j === 0 ? 'bg-pk-azul-clr/55' : '')}
                        >
                          <span
                            className={
                              'inline-grid h-8 w-8 place-items-center rounded-full ' +
                              (v ? 'bg-pk-verde text-white' : 'bg-pk-vermelho/12 text-pk-vermelho')
                            }
                          >
                            <Icone nome={v ? 'check' : 'fechar'} className="h-4.5 w-4.5" />
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <BarraArcoIris altura="h-2" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   COMO FUNCIONA
   ══════════════════════════════════════════════════════════════════════════ */

const PASSOS = [
  {
    n: '01', cor: 'azul', icone: 'whatsapp', titulo: 'Você chama a gente',
    texto: 'Manda uma mensagem contando o espaço que tem e a idade da criançada. Foto do local ajuda bastante.',
  },
  {
    n: '02', cor: 'laranja', icone: 'regua', titulo: 'A gente indica',
    texto: 'Mostramos os modelos que cabem no seu espaço, respeitando a área de segurança em volta do brinquedo.',
  },
  {
    n: '03', cor: 'roxo', icone: 'cubo', titulo: 'Você vê antes',
    texto: 'Enviamos as vistas do modelo escolhido para você conferir cada detalhe antes de fechar.',
  },
  {
    n: '04', cor: 'verde', icone: 'festa', titulo: 'A criançada usa',
    texto: 'Produção, entrega e a melhor parte: ver o espaço cheio de criança feliz.',
  },
]

function ComoFunciona() {
  return (
    <section className="relative overflow-hidden bg-pk-nuvem py-24 lg:py-32">
      <Blob cor="#F7941D" className="-top-56 -right-48 h-[38rem] w-[38rem]" opacidade={0.1} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <TituloSecao
          etiqueta="Simples assim"
          titulo="Do primeiro oi ao"
          destaque="primeiro escorrega"
          cor="roxo"
        />

        <RevelarLista className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PASSOS.map((p, i) => (
            <motion.div key={p.n} variants={itemLista} className="relative">
              {/* linha pontilhada entre os passos */}
              {i < PASSOS.length - 1 && (
                <span className="absolute top-12 -right-3 hidden h-0.5 w-6 rounded-full bg-pk-tinta/15 lg:block" />
              )}
              <div className="group h-full rounded-[1.75rem] bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_56px_-24px_rgba(18,35,61,0.32)]">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-13 w-13 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-6 ${corFundo[p.cor]}`}
                  >
                    <Icone nome={p.icone} className="h-6.5 w-6.5" />
                  </span>
                  <span className="font-display text-4xl font-semibold text-pk-tinta/10">
                    {p.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-pk-tinta">
                  {p.titulo}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-pk-cinza">{p.texto}</p>
              </div>
            </motion.div>
          ))}
        </RevelarLista>

        <Revelar de="baixo" atraso={0.2} className="mt-12 text-center">
          <Botao cor="verde" tamanho="lg" href={linkWhatsApp()} iconeEsq="whatsapp">
            Começar agora pelo WhatsApp
          </Botao>
        </Revelar>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   INSTAGRAM
   ══════════════════════════════════════════════════════════════════════════ */

function Instagram() {
  const vitrine = produtos
    .filter((p) => ['tematicos', 'playgrounds', 'aquaticos'].includes(p.categoria))
    .slice(0, 6)

  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pk-roxo via-pk-azul to-pk-azul-esc px-7 py-14 text-white sm:px-14">
          <MalhaPontos className="inset-0 text-white/15" />
          <Estrela className="top-8 right-10 h-7 w-7" cor="#FFC72C" />
          <Estrela className="bottom-10 left-8 h-5 w-5" cor="#8CC63F" atraso={1.2} />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <Revelar>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-display text-sm font-semibold">
                  <Icone nome="instagram" className="h-4 w-4" />
                  @{site.instagram}
                </span>
              </Revelar>
              <Revelar atraso={0.08}>
                <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
                  Acompanhe as<br />obras entregues
                </h2>
              </Revelar>
              <Revelar atraso={0.16}>
                <p className="mt-4 max-w-md text-lg text-white/75">
                  Bastidores da produção, novidades da linha e playgrounds já
                  instalados. É lá que sai tudo primeiro.
                </p>
              </Revelar>
              <Revelar atraso={0.24}>
                <Botao
                  cor="branco"
                  tamanho="lg"
                  href={site.instagramUrl}
                  iconeEsq="instagram"
                  className="mt-8"
                >
                  Seguir no Instagram
                </Botao>
              </Revelar>
            </div>

            <RevelarLista className="grid grid-cols-3 gap-3">
              {vitrine.map((p, i) => (
                <motion.div key={p.slug} variants={itemLista}>
                  <Link
                    to={p.url}
                    className="group block aspect-square overflow-hidden rounded-2xl bg-white/12 ring-1 ring-white/20 backdrop-blur-sm transition-transform hover:-translate-y-1.5"
                  >
                    <img
                      src={urlImagem(p, capa(p), 'sm')}
                      alt={p.rotulo}
                      loading="lazy"
                      className="h-full w-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-112"
                    />
                  </Link>
                </motion.div>
              ))}
            </RevelarLista>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Hero />
      <FaixaSelos />
      <Categorias />
      <Publicos />
      <Destaques />
      <Diferenciais />
      <Comparativo />
      <ComoFunciona />
      <Instagram />
    </>
  )
}
