import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { capa, urlImagem, HEX_COR, categoriaPorSlug } from '../data/produtos.js'
import { itemLista } from './Revelar.jsx'
import Icone from './Icone.jsx'

const fundos = {
  azul: 'from-pk-azul-clr', laranja: 'from-pk-laranja-clr',
  verde: 'from-pk-verde-clr', vermelho: 'from-pk-vermelho-clr',
  roxo: 'from-pk-roxo-clr', amarelo: 'from-pk-amarelo-clr',
}
const textos = {
  azul: 'text-pk-azul', laranja: 'text-pk-laranja', verde: 'text-pk-verde-esc',
  vermelho: 'text-pk-vermelho', roxo: 'text-pk-roxo', amarelo: 'text-pk-laranja-esc',
}

export default function CartaoProduto({ produto, index = 0, animado = true }) {
  const img = capa(produto)
  const cat = categoriaPorSlug[produto.categoria]
  const cor = cat?.cor || 'azul'
  const { ficha } = produto

  const Wrapper = animado ? motion.div : 'div'
  const wrapperProps = animado ? { variants: itemLista } : {}

  return (
    <Wrapper {...wrapperProps}>
      <Link
        to={produto.url}
        className="cartao-pk group block h-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pk-azul"
      >
        {/* Imagem */}
        <div
          className={`relative aspect-4/3 overflow-hidden bg-gradient-to-b ${fundos[cor]} to-white`}
        >
          <div className="malha-pontos absolute inset-0 text-pk-tinta/6" />

          {img && (
            <img
              src={urlImagem(produto, img, 'sm')}
              srcSet={`${urlImagem(produto, img, 'sm')} 480w, ${urlImagem(produto, img, 'md')} 900w`}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
              alt={produto.rotulo}
              loading={index < 4 ? 'eager' : 'lazy'}
              decoding="async"
              width={img.w || undefined}
              height={img.h || undefined}
              className="absolute inset-0 h-full w-full object-contain p-5 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 group-hover:-rotate-1"
            />
          )}

          {/* Etiqueta de categoria */}
          <span
            className={`absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-wide backdrop-blur ${textos[cor]}`}
          >
            {cat?.nome}
          </span>

          {/* Bolinhas de cor disponível */}
          {produto.cores.length > 0 && (
            <span className="absolute bottom-4 left-4 flex gap-1.5">
              {produto.cores.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="h-3.5 w-3.5 rounded-full ring-2 ring-white"
                  style={{ background: HEX_COR[c] }}
                />
              ))}
            </span>
          )}
        </div>

        {/* Texto */}
        <div className="p-5 pt-4">
          <h3 className="font-display text-xl font-semibold text-pk-tinta">
            {produto.rotulo}
          </h3>

          {produto.temFicha ? (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-pk-cinza">
              {ficha.idadeMin != null && (
                <span className="inline-flex items-center gap-1.5">
                  <Icone nome="crianca" className="h-4 w-4" />
                  {ficha.idadeMin}–{ficha.idadeMax} anos
                </span>
              )}
              {ficha.areaMinimaM2 != null && (
                <span className="inline-flex items-center gap-1.5">
                  <Icone nome="area" className="h-4 w-4" />
                  {ficha.areaMinimaM2.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2,
                  })}{' '}
                  m²
                </span>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-pk-cinza">
              {produto.imagens.length} vistas do modelo
            </p>
          )}

          <span
            className={`mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold ${textos[cor]}`}
          >
            Ver detalhes
            <Icone
              nome="seta"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </span>
        </div>
      </Link>
    </Wrapper>
  )
}
