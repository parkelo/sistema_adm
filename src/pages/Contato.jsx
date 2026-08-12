import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categorias, produtos } from '../data/produtos.js'
import { publicos, site, linkWhatsApp, localizacao } from '../config/site.js'
import { BarraArcoIris, Blob, Estrela, MalhaPontos } from '../components/Formas.jsx'
import Revelar from '../components/Revelar.jsx'
import Botao from '../components/Botao.jsx'
import Icone from '../components/Icone.jsx'

const definido = (v) => v && !String(v).includes('DEFINIR') && !/^5?0{6,}$/.test(String(v))

const ESPACOS = [
  { valor: '', texto: 'Não sei ainda' },
  { valor: 'até 20 m²', texto: 'Até 20 m² (quintal pequeno)' },
  { valor: '20 a 50 m²', texto: '20 a 50 m² (quintal grande)' },
  { valor: '50 a 100 m²', texto: '50 a 100 m² (área de lazer)' },
  { valor: 'mais de 100 m²', texto: 'Mais de 100 m² (praça, pátio)' },
]

const IDADES = [
  { valor: '', texto: 'Idades variadas' },
  { valor: '1 a 3 anos', texto: '1 a 3 anos' },
  { valor: '3 a 6 anos', texto: '3 a 6 anos' },
  { valor: '5 a 12 anos', texto: '5 a 12 anos' },
]

/** Campo de formulário com o visual da marca. */
function Campo({ rotulo, children, dica }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-sm font-semibold text-pk-tinta">
        {rotulo}
      </span>
      {children}
      {dica && <span className="mt-1 block text-xs text-pk-cinza">{dica}</span>}
    </label>
  )
}

const estiloEntrada =
  'w-full rounded-2xl bg-pk-nuvem px-4 py-3.5 text-pk-tinta ring-1 ring-transparent ' +
  'transition-all outline-none placeholder:text-pk-cinza/65 focus:bg-white focus:ring-pk-azul'

export default function Contato() {
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    nome: '',
    cidade: '',
    espaco: '',
    idade: '',
    publico: params.get('publico') || '',
    modelo: params.get('modelo') || '',
    mensagem: '',
  })

  const muda = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))

  /** Monta a mensagem que vai para o WhatsApp. */
  const mensagem = useMemo(() => {
    const p = publicos.find((x) => x.slug === form.publico)
    const linhas = [
      `Olá! Vim pelo site da ${site.nome} e queria um orçamento.`,
      '',
      form.nome && `Meu nome: ${form.nome}`,
      form.cidade && `Cidade: ${form.cidade}`,
      p && `Espaço: ${p.nome}`,
      form.espaco && `Área disponível: ${form.espaco}`,
      form.idade && `Idade das crianças: ${form.idade}`,
      form.modelo && `Modelo de interesse: ${form.modelo}`,
      form.mensagem && `\n${form.mensagem}`,
    ].filter(Boolean)
    return linhas.join('\n')
  }, [form])

  const enviar = (e) => {
    e.preventDefault()
    window.open(linkWhatsApp(mensagem), '_blank', 'noopener')
  }

  const assuntoEmail = encodeURIComponent(`Orçamento — site ${site.nome}`)
  const temZap = definido(site.whatsapp)
  const local = localizacao()
  const temLocal = definido(local.titulo)

  return (
    <>
      {/* ── Topo ────────────────────────────────────────────────────────── */}
      <section className="fundo-ceu relative overflow-hidden pt-32 pb-16 lg:pt-40">
        <Blob cor="#8CC63F" className="-top-52 -left-44 h-[40rem] w-[40rem]" opacidade={0.11} />
        <Blob cor="#F7941D" className="-right-52 -bottom-60 h-[38rem] w-[38rem]" opacidade={0.11} />
        <MalhaPontos className="inset-x-0 top-28 h-56 text-pk-azul/10" />
        <Estrela className="top-40 right-[14%] h-7 w-7" cor="#FFC72C" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-pk-cinza">
            <Link to="/" className="transition-colors hover:text-pk-azul">Início</Link>
            <span className="text-pk-tinta/25">/</span>
            <span className="font-semibold text-pk-tinta">Contato</span>
          </nav>

          <Revelar>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.96] font-semibold text-pk-tinta sm:text-6xl lg:text-7xl">
              Vamos falar do <span className="texto-arcoiris">seu espaço?</span>
            </h1>
          </Revelar>
          <Revelar atraso={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-pk-cinza sm:text-xl">
              Preencha o que souber — o resto a gente descobre junto na conversa.
              Responder leva menos de um minuto.
            </p>
          </Revelar>
        </div>
      </section>

      {/* ── Formulário + contatos ───────────────────────────────────────── */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.25fr_1fr] lg:px-8">
          {/* Formulário */}
          <Revelar de="esq">
            <form
              onSubmit={enviar}
              className="overflow-hidden rounded-[2rem] bg-white shadow-[0_1px_2px_rgba(18,35,61,.05),0_24px_64px_-28px_rgba(18,35,61,.3)]"
            >
              <div className="p-7 sm:p-9">
                <h2 className="font-display text-2xl font-semibold text-pk-tinta">
                  Montar meu orçamento
                </h2>
                <p className="mt-1.5 text-sm text-pk-cinza">
                  Ao enviar, abrimos o WhatsApp com tudo isso já escrito. Você só
                  confere e aperta enviar.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Campo rotulo="Seu nome">
                    <input
                      type="text" value={form.nome} onChange={muda('nome')}
                      placeholder="Como podemos te chamar?" className={estiloEntrada}
                    />
                  </Campo>

                  <Campo rotulo="Cidade">
                    <input
                      type="text" value={form.cidade} onChange={muda('cidade')}
                      placeholder="Onde vai ser instalado" className={estiloEntrada}
                    />
                  </Campo>

                  <Campo rotulo="Tipo de espaço">
                    <select value={form.publico} onChange={muda('publico')} className={estiloEntrada}>
                      <option value="">Escolha uma opção</option>
                      {publicos.map((p) => (
                        <option key={p.slug} value={p.slug}>{p.nome}</option>
                      ))}
                    </select>
                  </Campo>

                  <Campo rotulo="Área disponível">
                    <select value={form.espaco} onChange={muda('espaco')} className={estiloEntrada}>
                      {ESPACOS.map((e) => (
                        <option key={e.texto} value={e.valor}>{e.texto}</option>
                      ))}
                    </select>
                  </Campo>

                  <Campo rotulo="Idade das crianças">
                    <select value={form.idade} onChange={muda('idade')} className={estiloEntrada}>
                      {IDADES.map((i) => (
                        <option key={i.texto} value={i.valor}>{i.texto}</option>
                      ))}
                    </select>
                  </Campo>

                  <Campo rotulo="Modelo de interesse" dica="Opcional — dá pra escolher depois">
                    <input
                      type="text" list="modelos" value={form.modelo} onChange={muda('modelo')}
                      placeholder="Ex.: KMP 0101" className={estiloEntrada}
                    />
                    <datalist id="modelos">
                      {produtos.map((p) => (
                        <option key={p.slug} value={p.rotulo} />
                      ))}
                    </datalist>
                  </Campo>

                  <div className="sm:col-span-2">
                    <Campo rotulo="Quer contar mais alguma coisa?">
                      <textarea
                        rows={4} value={form.mensagem} onChange={muda('mensagem')}
                        placeholder="Piso do local, prazo, quantidade de crianças…"
                        className={`${estiloEntrada} resize-y`}
                      />
                    </Campo>
                  </div>
                </div>

                {/* prévia da mensagem */}
                <div className="mt-7 rounded-2xl bg-pk-verde-clr p-5 ring-1 ring-pk-verde/30">
                  <p className="flex items-center gap-2 font-display text-sm font-semibold text-pk-verde-esc">
                    <Icone nome="whatsapp" className="h-4.5 w-4.5" />
                    Prévia da mensagem
                  </p>
                  <pre className="mt-2.5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-pk-tinta">
                    {mensagem}
                  </pre>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Botao cor="verde" tamanho="lg" type="submit" iconeEsq="whatsapp">
                    Enviar pelo WhatsApp
                  </Botao>
                  <Botao
                    cor="contorno" tamanho="lg" iconeEsq="email"
                    href={`mailto:${site.email}?subject=${assuntoEmail}&body=${encodeURIComponent(mensagem)}`}
                  >
                    Prefiro e-mail
                  </Botao>
                </div>
              </div>

              <BarraArcoIris altura="h-2" />
            </form>
          </Revelar>

          {/* Contatos diretos */}
          <div className="space-y-5">
            {temZap && (
              <Revelar de="dir">
                <a
                  href={linkWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-[1.75rem] bg-pk-verde p-6 text-white transition-transform hover:-translate-y-1.5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20">
                    <Icone nome="whatsapp" className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-semibold">
                      {site.whatsappLabel}
                    </span>
                    <span className="mt-0.5 block text-white/80">
                      WhatsApp comercial — o jeito mais rápido
                    </span>
                  </span>
                </a>
              </Revelar>
            )}

            <Revelar de="dir" atraso={0.08}>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-start gap-4 rounded-[1.75rem] bg-white p-6 ring-1 ring-pk-tinta/6 transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-22px_rgba(18,35,61,0.3)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pk-azul-clr text-pk-azul">
                  <Icone nome="email" className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-semibold break-all text-pk-tinta">
                    {site.email}
                  </span>
                  <span className="mt-0.5 block text-pk-cinza">
                    Para orçamentos e propostas
                  </span>
                </span>
              </a>
            </Revelar>

            <Revelar de="dir" atraso={0.16}>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-[1.75rem] bg-white p-6 ring-1 ring-pk-tinta/6 transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-22px_rgba(18,35,61,0.3)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pk-roxo-clr text-pk-roxo">
                  <Icone nome="instagram" className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-pk-tinta">
                    @{site.instagram}
                  </span>
                  <span className="mt-0.5 block text-pk-cinza">
                    Novidades e obras entregues
                  </span>
                </span>
              </a>
            </Revelar>

            {temLocal && (
              <Revelar de="dir" atraso={0.24}>
                <div className="flex items-start gap-4 rounded-[1.75rem] bg-white p-6 ring-1 ring-pk-tinta/6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pk-vermelho-clr text-pk-vermelho">
                    <Icone nome="pin" className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold text-pk-tinta">
                      {local.titulo}
                    </span>
                    <span className="mt-0.5 block text-pk-cinza">{local.subtitulo}</span>
                  </span>
                </div>
              </Revelar>
            )}

            {/* atalhos por categoria */}
            <Revelar de="dir" atraso={0.3}>
              <div className="rounded-[1.75rem] bg-pk-nuvem p-6">
                <p className="font-display font-semibold text-pk-tinta">
                  Ainda não escolheu o modelo?
                </p>
                <p className="mt-1.5 text-sm text-pk-cinza">
                  Dá uma olhada nas linhas antes de pedir o orçamento.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categorias.map((c) => (
                    <Link
                      key={c.slug}
                      to={c.url}
                      className="rounded-full bg-white px-3.5 py-2 text-sm font-medium text-pk-cinza transition-colors hover:bg-pk-azul hover:text-white"
                    >
                      {c.nome}
                    </Link>
                  ))}
                </div>
              </div>
            </Revelar>
          </div>
        </div>
      </section>
    </>
  )
}
