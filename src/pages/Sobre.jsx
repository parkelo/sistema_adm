import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { capa, categorias, porSlug, totalProdutos, urlImagem } from '../data/produtos.js'
import { diferenciais, site, linkWhatsApp } from '../config/site.js'
import { BarraArcoIris, Blob, Estrela, MalhaPontos } from '../components/Formas.jsx'
import Revelar, { RevelarLista, itemLista } from '../components/Revelar.jsx'
import Botao from '../components/Botao.jsx'
import Icone from '../components/Icone.jsx'

const corFundo = {
  azul: 'bg-pk-azul', laranja: 'bg-pk-laranja', verde: 'bg-pk-verde',
  vermelho: 'bg-pk-vermelho', roxo: 'bg-pk-roxo', amarelo: 'bg-pk-amarelo',
}

const VITRINE = ['kmp-0501', 'aviao', 'kaq-0302', 'klp-0201', 'carrossel', 'trem']

/* Etapas do que faz o polímero rotomoldado ser diferente. */
const MATERIAL = [
  {
    titulo: 'A cor está dentro da peça',
    texto:
      'O pigmento entra junto com o polímero antes da moldagem. Não é tinta por ' +
      'cima — então não descasca, não lasca e demora muito mais para desbotar.',
    cor: 'laranja', icone: 'sol',
  },
  {
    titulo: 'Peça oca e sem emenda',
    texto:
      'A rotomoldagem gira o molde aquecido até o material cobrir tudo por dentro. ' +
      'O resultado é uma peça inteiriça, leve e com parede uniforme.',
    cor: 'azul', icone: 'cubo',
  },
  {
    titulo: 'Cantos arredondados de fábrica',
    texto:
      'A curva já nasce no molde. Não existe quina viva, rebarba de solda ou farpa ' +
      'para machucar a criança na hora do esbarrão.',
    cor: 'verde', icone: 'escudo',
  },
  {
    titulo: 'Água e sabão resolvem',
    texto:
      'Sem lixar, sem envernizar, sem repintar todo ano. A manutenção é lavar — ' +
      'e é só isso mesmo.',
    cor: 'roxo', icone: 'gota',
  },
]

const SEGURANCA = [
  'Cantos e bordas arredondados, sem quina viva',
  'Ausência de farpas — não usamos madeira',
  'Materiais atóxicos, seguros para a faixa etária',
  'Área de segurança dimensionada em volta do brinquedo',
  'Estrutura sem pontos de prensagem para dedos',
  'Resistência a sol, chuva e variação de temperatura',
]

export default function Sobre() {
  const vitrine = VITRINE.map((s) => porSlug[s]).filter(Boolean)

  return (
    <>
      {/* ── Topo ────────────────────────────────────────────────────────── */}
      <section className="fundo-ceu relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
        <Blob cor="#7B2FBE" className="-top-56 -right-48 h-[42rem] w-[42rem]" opacidade={0.1} />
        <Blob cor="#8CC63F" className="-bottom-64 -left-52 h-[40rem] w-[40rem]" opacidade={0.1} />
        <MalhaPontos className="inset-x-0 top-28 h-64 text-pk-azul/10" />
        <Estrela className="top-36 right-[12%] h-8 w-8" cor="#FFC72C" />
        <Estrela className="bottom-24 left-[10%] h-6 w-6" cor="#E8302A" atraso={1.6} />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-pk-cinza">
            <Link to="/" className="transition-colors hover:text-pk-azul">Início</Link>
            <span className="text-pk-tinta/25">/</span>
            <span className="font-semibold text-pk-tinta">A Parkelô</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Revelar>
                <span className="inline-flex items-center gap-2 rounded-full bg-pk-azul-clr px-4 py-1.5 font-display text-xs font-semibold tracking-widest text-pk-azul uppercase">
                  <Icone nome="pin" className="h-3.5 w-3.5" />
                  {site.regiaoAtendida}
                </span>
              </Revelar>
              <Revelar atraso={0.08}>
                <h1 className="mt-5 font-display text-5xl leading-[0.96] font-semibold text-pk-tinta sm:text-6xl lg:text-7xl">
                  A gente fabrica<br />
                  <span className="texto-arcoiris">memória de infância.</span>
                </h1>
              </Revelar>
              <Revelar atraso={0.16}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-pk-cinza sm:text-xl">
                  Playground bom não é o mais caro nem o mais colorido — é o que
                  continua seguro depois de cinco anos de sol, chuva e criança
                  correndo. Aqui no {site.regiaoAtendida}, onde o sol não perdoa,
                  isso faz toda a diferença.
                </p>
              </Revelar>
              <Revelar atraso={0.24}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Botao cor="azul" tamanho="lg" para="/produtos" icone="seta">
                    Ver o catálogo
                  </Botao>
                  <Botao cor="verde" tamanho="lg" href={linkWhatsApp()} iconeEsq="whatsapp">
                    Falar com a gente
                  </Botao>
                </div>
              </Revelar>
            </div>

            {/* mosaico */}
            <RevelarLista className="grid grid-cols-3 gap-3">
              {vitrine.map((p, i) => (
                <motion.div
                  key={p.slug}
                  variants={itemLista}
                  className={i === 0 ? 'col-span-2 row-span-2' : ''}
                >
                  <Link
                    to={p.url}
                    className="group block h-full overflow-hidden rounded-3xl bg-white shadow-[0_14px_40px_-18px_rgba(18,35,61,0.35)] transition-transform hover:-translate-y-1.5"
                  >
                    <img
                      src={urlImagem(p, capa(p), i === 0 ? 'md' : 'sm')}
                      alt={p.rotulo}
                      loading="lazy"
                      className="h-full w-full object-contain p-3 transition-transform duration-600 group-hover:scale-108"
                    />
                  </Link>
                </motion.div>
              ))}
            </RevelarLista>
          </div>
        </div>
      </section>

      {/* ── Números do catálogo ─────────────────────────────────────────── */}
      <section className="bg-pk-tinta py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-3 lg:px-8">
          {[
            [totalProdutos, 'modelos no catálogo'],
            [categorias.length, 'linhas de produto'],
            ['16071', 'a norma ABNT que seguimos'],
          ].map(([n, txt], i) => (
            <Revelar key={txt} atraso={i * 0.1} className="text-center">
              <p className="font-display text-5xl font-semibold sm:text-6xl">
                <span className="texto-arcoiris">{n}</span>
              </p>
              <p className="mt-2 text-white/60">{txt}</p>
            </Revelar>
          ))}
        </div>
      </section>

      {/* ── Material ────────────────────────────────────────────────────── */}
      <section id="material" className="scroll-mt-28 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Revelar>
              <span className="inline-block rounded-full bg-pk-laranja-clr px-4 py-1.5 font-display text-xs font-semibold tracking-widest text-pk-laranja-esc uppercase">
                Nosso material
              </span>
            </Revelar>
            <Revelar atraso={0.08}>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] font-semibold text-pk-tinta sm:text-5xl">
                Por que polímero{' '}
                <span className="texto-arcoiris">rotomoldado</span>
              </h2>
            </Revelar>
            <Revelar atraso={0.16}>
              <p className="mt-5 text-lg leading-relaxed text-pk-cinza">
                É o mesmo tipo de material dos tanques d'água e das caixas
                térmicas — feito para ficar anos exposto sem se render ao tempo.
              </p>
            </Revelar>
          </div>

          <RevelarLista className="mt-16 grid gap-6 md:grid-cols-2">
            {MATERIAL.map((m) => (
              <motion.div
                key={m.titulo}
                variants={itemLista}
                className="group flex gap-5 rounded-[1.75rem] bg-white p-7 ring-1 ring-pk-tinta/6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_56px_-24px_rgba(18,35,61,0.28)]"
              >
                <span
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${corFundo[m.cor]}`}
                >
                  <Icone nome={m.icone} className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-pk-tinta">
                    {m.titulo}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-pk-cinza">{m.texto}</p>
                </div>
              </motion.div>
            ))}
          </RevelarLista>
        </div>
      </section>

      {/* ── Segurança ───────────────────────────────────────────────────── */}
      <section
        id="seguranca"
        className="relative scroll-mt-28 overflow-hidden bg-pk-nuvem py-24 lg:py-32"
      >
        <MalhaPontos className="inset-0 text-pk-azul/8" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <Revelar>
              <span className="inline-block rounded-full bg-pk-verde-clr px-4 py-1.5 font-display text-xs font-semibold tracking-widest text-pk-verde-esc uppercase">
                Segurança
              </span>
            </Revelar>
            <Revelar atraso={0.08}>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] font-semibold text-pk-tinta sm:text-5xl">
                A norma existe.<br />
                <span className="texto-arcoiris">A gente segue.</span>
              </h2>
            </Revelar>
            <Revelar atraso={0.16}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-pk-cinza">
                A <strong className="text-pk-tinta">ABNT NBR 16071/21</strong> define os
                requisitos de segurança para playgrounds e áreas de lazer infantil:
                do material às distâncias mínimas em volta do brinquedo. Nossos
                produtos são projetados seguindo ela.
              </p>
            </Revelar>
            <Revelar atraso={0.24}>
              <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-pk-tinta/6">
                <p className="flex items-start gap-3.5 text-sm leading-relaxed text-pk-cinza">
                  <Icone nome="regua" className="mt-0.5 h-5.5 w-5.5 shrink-0 text-pk-azul" />
                  <span>
                    <strong className="font-display text-pk-tinta">Área de segurança</strong>{' '}
                    é o espaço livre que precisa existir em volta do brinquedo — sempre
                    maior que o brinquedo em si. Na hora do orçamento a gente confere
                    se o seu espaço comporta o modelo escolhido.
                  </span>
                </p>
              </div>
            </Revelar>
          </div>

          <RevelarLista className="grid gap-3">
            {SEGURANCA.map((s) => (
              <motion.div
                key={s}
                variants={itemLista}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-pk-tinta/6"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pk-verde text-white">
                  <Icone nome="check" className="h-5 w-5" />
                </span>
                <span className="font-medium text-pk-tinta">{s}</span>
              </motion.div>
            ))}
          </RevelarLista>
        </div>
      </section>

      {/* ── Diferenciais ────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Revelar>
              <h2 className="font-display text-4xl leading-[1.02] font-semibold text-pk-tinta sm:text-5xl">
                O que você leva junto{' '}
                <span className="texto-arcoiris">com o brinquedo</span>
              </h2>
            </Revelar>
          </div>

          <RevelarLista className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((d) => (
              <motion.div
                key={d.titulo}
                variants={itemLista}
                className="group rounded-[1.75rem] bg-white p-7 ring-1 ring-pk-tinta/6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_56px_-24px_rgba(18,35,61,0.26)]"
              >
                <span
                  className={`grid h-13 w-13 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-6 ${corFundo[d.cor]}`}
                >
                  <Icone nome={d.icone} className="h-6.5 w-6.5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-pk-tinta">
                  {d.titulo}
                </h3>
                <p className="mt-2.5 leading-relaxed text-pk-cinza">{d.texto}</p>
              </motion.div>
            ))}
          </RevelarLista>
        </div>
      </section>

      {/* ── Chamada ─────────────────────────────────────────────────────── */}
      <section className="pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pk-azul to-pk-roxo px-7 py-16 text-center text-white sm:px-14">
            <MalhaPontos className="inset-0 text-white/15" />
            <Estrela className="top-8 left-10 h-7 w-7" cor="#FFC72C" />
            <Estrela className="right-12 bottom-10 h-6 w-6" cor="#8CC63F" atraso={1.3} />

            <div className="relative">
              <Revelar>
                <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
                  Manda uma foto do espaço.<br />A gente diz o que cabe.
                </h2>
              </Revelar>
              <Revelar atraso={0.1}>
                <p className="mx-auto mt-5 max-w-lg text-lg text-white/75">
                  Sem compromisso e sem enrolação. Você conta o tamanho da área e a
                  idade da criançada, a gente indica os modelos certos.
                </p>
              </Revelar>
              <Revelar atraso={0.18}>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Botao cor="branco" tamanho="lg" href={linkWhatsApp()} iconeEsq="whatsapp">
                    Falar no WhatsApp
                  </Botao>
                  <Botao cor="amarelo" tamanho="lg" para="/contato" icone="seta">
                    Formulário de orçamento
                  </Botao>
                </div>
              </Revelar>
              <Revelar atraso={0.26}>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                >
                  <Icone nome="instagram" className="h-5 w-5" />
                  @{site.instagram}
                </a>
              </Revelar>
            </div>

            <div className="absolute inset-x-0 bottom-0">
              <BarraArcoIris altura="h-2" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
