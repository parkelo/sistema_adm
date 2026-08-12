import { Link } from 'react-router-dom'
import { categorias, totalProdutos } from '../data/produtos.js'
import { site, linkWhatsApp, localizacao } from '../config/site.js'
import { BarraArcoIris, MalhaPontos } from './Formas.jsx'
import Icone from './Icone.jsx'
import Botao from './Botao.jsx'

const ano = new Date().getFullYear()

/** Só mostra o dado se ele não for placeholder. */
const definido = (v) => v && !String(v).includes('DEFINIR') && !/^5?0{6,}$/.test(String(v))

export default function Rodape() {
  const local = localizacao()
  const temLocal = definido(local.titulo)
  const temZap = definido(site.whatsapp)

  return (
    <footer className="relative overflow-hidden bg-pk-tinta text-white">
      <MalhaPontos className="inset-0 text-white/8" />

      {/* Chamada final */}
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
              Vamos montar o<br />
              <span className="texto-arcoiris">parquinho de vocês?</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-white/70">
              Conte quanto espaço você tem e a idade da criançada. A gente indica os
              modelos que cabem e manda o orçamento sem compromisso.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Botao cor="verde" tamanho="lg" href={linkWhatsApp()} iconeEsq="whatsapp">
              Falar no WhatsApp
            </Botao>
            <Botao cor="branco" tamanho="lg" para="/produtos" icone="seta">
              Ver catálogo
            </Botao>
          </div>
        </div>
      </div>

      <div className="relative h-px bg-white/12" />

      {/* Colunas */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Marca */}
        <div className="sm:col-span-2 lg:col-span-1">
          <img
            src="/img/brand/logo-sm.webp"
            alt={site.nome}
            width="150"
            height="98"
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {site.descricao}
          </p>

          <div className="mt-6 flex gap-2.5">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Parkelô"
              className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 transition-all hover:-translate-y-1 hover:bg-pk-roxo"
            >
              <Icone nome="instagram" className="h-5 w-5" />
            </a>
            {temZap && (
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Parkelô"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 transition-all hover:-translate-y-1 hover:bg-pk-verde"
              >
                <Icone nome="whatsapp" className="h-5 w-5" />
              </a>
            )}
            <a
              href={`mailto:${site.email}`}
              aria-label="E-mail da Parkelô"
              className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 transition-all hover:-translate-y-1 hover:bg-pk-azul"
            >
              <Icone nome="email" className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Categorias */}
        <div>
          <h3 className="font-display text-sm font-semibold tracking-widest text-white/45 uppercase">
            Produtos
          </h3>
          <ul className="mt-5 space-y-2.5">
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link
                  to={c.url}
                  className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                >
                  {c.nome}
                  <span className="text-xs text-white/35">{c.total}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-1.5 font-semibold text-pk-amarelo transition-colors hover:text-white"
              >
                Ver todos os {totalProdutos}
                <Icone nome="seta" className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Institucional */}
        <div>
          <h3 className="font-display text-sm font-semibold tracking-widest text-white/45 uppercase">
            A empresa
          </h3>
          <ul className="mt-5 space-y-2.5">
            {[
              { para: '/sobre', texto: 'Quem somos' },
              { para: '/sobre#seguranca', texto: 'Segurança e ABNT' },
              { para: '/sobre#material', texto: 'Nosso material' },
              { para: '/contato', texto: 'Contato' },
            ].map((l) => (
              <li key={l.texto}>
                <Link to={l.para} className="text-white/70 transition-colors hover:text-white">
                  {l.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="font-display text-sm font-semibold tracking-widest text-white/45 uppercase">
            Fale com a gente
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            {temZap && (
              <li>
                <a
                  href={linkWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <Icone nome="whatsapp" className="mt-0.5 h-5 w-5 shrink-0 text-pk-verde" />
                  <span>
                    <span className="block font-semibold transition-colors group-hover:text-pk-verde">
                      {site.whatsappLabel}
                    </span>
                    <span className="block text-white/45">WhatsApp comercial</span>
                  </span>
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} className="group flex items-start gap-3">
                <Icone nome="email" className="mt-0.5 h-5 w-5 shrink-0 text-pk-azul" />
                <span>
                  <span className="block font-semibold break-all transition-colors group-hover:text-pk-azul">
                    {site.email}
                  </span>
                  <span className="block text-white/45">Orçamentos e dúvidas</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <Icone nome="instagram" className="mt-0.5 h-5 w-5 shrink-0 text-pk-roxo" />
                <span>
                  <span className="block font-semibold transition-colors group-hover:text-pk-roxo">
                    @{site.instagram}
                  </span>
                  <span className="block text-white/45">Novidades e obras entregues</span>
                </span>
              </a>
            </li>
            {temLocal && (
              <li className="flex items-start gap-3">
                <Icone nome="pin" className="mt-0.5 h-5 w-5 shrink-0 text-pk-vermelho" />
                <span>
                  <span className="block font-semibold">{local.titulo}</span>
                  <span className="block text-white/45">{local.subtitulo}</span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Rodapé legal */}
      <div className="relative border-t border-white/12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {ano} {site.razaoSocial || site.nome}
            {site.cnpj && ` · CNPJ ${site.cnpj}`}
          </p>
          <p>Imagens ilustrativas. As cores podem variar sem aviso prévio.</p>
        </div>
      </div>

      <BarraArcoIris altura="h-2.5" />
    </footer>
  )
}
