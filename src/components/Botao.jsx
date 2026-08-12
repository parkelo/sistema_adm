import { Link } from 'react-router-dom'
import Icone from './Icone.jsx'

/**
 * Botão da marca: pílula bem arredondada, sombra sólida embaixo
 * que "afunda" no clique (dá a sensação de brinquedo).
 */
const estilos = {
  azul:     'bg-pk-azul text-white shadow-[0_5px_0_0_var(--color-pk-azul-esc)]',
  laranja:  'bg-pk-laranja text-white shadow-[0_5px_0_0_var(--color-pk-laranja-esc)]',
  verde:    'bg-pk-verde text-white shadow-[0_5px_0_0_var(--color-pk-verde-esc)]',
  vermelho: 'bg-pk-vermelho text-white shadow-[0_5px_0_0_var(--color-pk-vermelho-esc)]',
  roxo:     'bg-pk-roxo text-white shadow-[0_5px_0_0_var(--color-pk-roxo-esc)]',
  amarelo:  'bg-pk-amarelo text-pk-tinta shadow-[0_5px_0_0_var(--color-pk-amarelo-esc)]',
  branco:   'bg-white text-pk-tinta shadow-[0_5px_0_0_rgba(18,35,61,0.16)]',
  contorno: 'bg-transparent text-pk-tinta ring-2 ring-pk-tinta/15 hover:ring-pk-azul hover:text-pk-azul',
}

const tamanhos = {
  sm: 'px-5 py-2.5 text-sm gap-1.5',
  md: 'px-7 py-3.5 text-base gap-2',
  lg: 'px-9 py-4.5 text-lg gap-2.5',
}

export default function Botao({
  children,
  cor = 'azul',
  tamanho = 'md',
  para,
  href,
  icone,
  iconeEsq,
  className = '',
  ...props
}) {
  const base =
    'group relative inline-flex items-center justify-center rounded-full font-display ' +
    'font-semibold whitespace-nowrap transition-all duration-200 ' +
    'hover:-translate-y-0.5 active:translate-y-[5px] active:shadow-none ' +
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pk-azul'

  const classes = `${base} ${estilos[cor] || estilos.azul} ${tamanhos[tamanho]} ${className}`

  const conteudo = (
    <>
      {iconeEsq && <Icone nome={iconeEsq} className="h-5 w-5 shrink-0" />}
      {children}
      {icone && (
        <Icone
          nome={icone}
          className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (para) return <Link to={para} className={classes} {...props}>{conteudo}</Link>
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {conteudo}
      </a>
    )
  }
  return <button className={classes} {...props}>{conteudo}</button>
}
