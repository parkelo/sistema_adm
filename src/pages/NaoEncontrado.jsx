import { Link } from 'react-router-dom'
import { capa, categorias, produtos, urlImagem } from '../data/produtos.js'
import { linkWhatsApp } from '../config/site.js'
import { Blob, Estrela, MalhaPontos } from '../components/Formas.jsx'
import Revelar from '../components/Revelar.jsx'
import Botao from '../components/Botao.jsx'

/** Escolhe um produto qualquer para ilustrar a página. */
const sorteado = produtos[Math.floor(Math.random() * produtos.length)]

export default function NaoEncontrado() {
  return (
    <section className="fundo-ceu relative flex min-h-screen items-center overflow-hidden py-32">
      <Blob cor="#E8302A" className="-top-52 -right-44 h-[38rem] w-[38rem]" opacidade={0.1} />
      <Blob cor="#1B6FE8" className="-bottom-56 -left-48 h-[40rem] w-[40rem]" opacidade={0.1} />
      <MalhaPontos className="inset-0 text-pk-azul/10" />
      <Estrela className="top-32 left-[12%] h-8 w-8" cor="#FFC72C" />
      <Estrela className="right-[14%] bottom-40 h-6 w-6" cor="#8CC63F" atraso={1.4} />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <Revelar>
            <p className="font-display text-8xl leading-none font-semibold sm:text-9xl">
              <span className="texto-arcoiris">404</span>
            </p>
          </Revelar>
          <Revelar atraso={0.1}>
            <h1 className="mt-5 font-display text-4xl leading-tight font-semibold text-pk-tinta sm:text-5xl">
              Essa página escorregou<br />e sumiu.
            </h1>
          </Revelar>
          <Revelar atraso={0.18}>
            <p className="mt-5 max-w-md text-lg text-pk-cinza">
              O endereço não existe mais — ou nunca existiu. Mas o parquinho
              continua aberto, é só voltar por aqui.
            </p>
          </Revelar>
          <Revelar atraso={0.26}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Botao cor="azul" tamanho="lg" para="/" icone="seta">
                Voltar ao início
              </Botao>
              <Botao cor="verde" tamanho="lg" href={linkWhatsApp()} iconeEsq="whatsapp">
                Falar no WhatsApp
              </Botao>
            </div>
          </Revelar>
          <Revelar atraso={0.34}>
            <div className="mt-9 flex flex-wrap gap-2">
              {categorias.map((c) => (
                <Link
                  key={c.slug}
                  to={c.url}
                  className="rounded-full bg-white px-3.5 py-2 text-sm font-medium text-pk-cinza shadow-sm transition-colors hover:bg-pk-azul hover:text-white"
                >
                  {c.nome}
                </Link>
              ))}
            </div>
          </Revelar>
        </div>

        <Revelar de="zoom" atraso={0.15} className="hidden lg:block">
          <img
            src={urlImagem(sorteado, capa(sorteado), 'md')}
            alt={sorteado.rotulo}
            className="sombra-pk mx-auto w-full max-w-md animate-[flutuar_6s_ease-in-out_infinite] object-contain"
          />
        </Revelar>
      </div>
    </section>
  )
}
