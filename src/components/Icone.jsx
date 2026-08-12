/**
 * Ícones SVG inline — traço arredondado para combinar com a marca.
 * Uso: <Icone nome="escudo" className="w-6 h-6" />
 */

const traco = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const desenhos = {
  escudo: <path {...traco} d="M12 3l7 3v5.5c0 4.3-2.9 8-7 9.5-4.1-1.5-7-5.2-7-9.5V6l7-3zM9 12l2 2 4-4" />,
  sol: (
    <>
      <circle {...traco} cx="12" cy="12" r="4" />
      <path {...traco} d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  gota: <path {...traco} d="M12 3s6 6.4 6 10.4A6 6 0 016 13.4C6 9.4 12 3 12 3z" />,
  termometro: (
    <>
      <path {...traco} d="M10 14.8V5a2 2 0 114 0v9.8a4 4 0 11-4 0z" />
      <circle cx="12" cy="18" r="1.6" fill="currentColor" />
    </>
  ),
  folha: <path {...traco} d="M4 20s0-9 8-13c4-2 8-2 8-2s0 5-2 9c-3 6-9 6-9 6l-1.5 1.5M11 14c-2 2-4 4-5 6" />,
  cubo: (
    <>
      <path {...traco} d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2l8-4.4z" />
      <path {...traco} d="M4 7.2l8 4.4 8-4.4M12 11.6V21" />
    </>
  ),
  casa: <path {...traco} d="M3.5 10.5L12 3.5l8.5 7M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" />,
  predio: (
    <>
      <path {...traco} d="M4 20V5.5A1.5 1.5 0 015.5 4h7A1.5 1.5 0 0114 5.5V20M14 20V10h4.5A1.5 1.5 0 0120 11.5V20M2.5 20h19" />
      <path {...traco} d="M7 8h1.5M7 12h1.5M10.5 8H12M10.5 12H12M7 16h5M17 13.5h1M17 17h1" />
    </>
  ),
  escola: (
    <>
      <path {...traco} d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
      <path {...traco} d="M6.5 10v5.2c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9V10M20 8.2V14" />
    </>
  ),
  festa: (
    <>
      <path {...traco} d="M3 21l4.2-10.4L14 17.5 3 21z" />
      <path {...traco} d="M13 3.5c1.6 1 2 2.6 1.3 4M17.5 6.5c1.7-.4 3 .3 3.6 1.8M15.5 11c1.2 1.2 1.3 2.8.3 4.2" />
      <circle cx="19.5" cy="3.5" r="1.2" fill="currentColor" />
    </>
  ),
  regua: (
    <>
      <path {...traco} d="M3.5 8.5h17a1 1 0 011 1v5a1 1 0 01-1 1h-17a1 1 0 01-1-1v-5a1 1 0 011-1z" />
      <path {...traco} d="M7 8.5v3M11 8.5v4M15 8.5v3M19 8.5v4" />
    </>
  ),
  crianca: (
    <>
      <circle {...traco} cx="12" cy="7" r="3.2" />
      <path {...traco} d="M5.5 20.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
    </>
  ),
  criancas: (
    <>
      <circle {...traco} cx="9" cy="7.5" r="2.8" />
      <path {...traco} d="M3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <path {...traco} d="M16 5.2a2.8 2.8 0 010 5.4M17 15c2.1.7 3.5 2.6 3.5 5" />
    </>
  ),
  area: (
    <>
      <path {...traco} d="M3 8.5l9-4.5 9 4.5-9 4.5-9-4.5z" />
      <path {...traco} d="M3 15.5l9 4.5 9-4.5" />
    </>
  ),
  seta: <path {...traco} d="M5 12h14M13 6l6 6-6 6" />,
  setaEsq: <path {...traco} d="M19 12H5M11 18l-6-6 6-6" />,
  cima: <path {...traco} d="M12 19V5M6 11l6-6 6 6" />,
  fechar: <path {...traco} d="M6 6l12 12M18 6L6 18" />,
  menu: <path {...traco} d="M4 7h16M4 12h16M4 17h16" />,
  lupa: (
    <>
      <circle {...traco} cx="11" cy="11" r="6.5" />
      <path {...traco} d="M16 16l4.5 4.5" />
    </>
  ),
  whatsapp: (
    <path
      fill="currentColor"
      d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z M12 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 1.7.5 3.4 1.3 4.9L2.2 21.8l5-1.3c1.4.8 3.1 1.2 4.8 1.2 5.4 0 9.8-4.4 9.8-9.8S17.4 2.2 12 2.2zm0 17.8c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3c-.8-1.3-1.3-2.9-1.3-4.5 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.6 8.3-8.1 8.3z"
    />
  ),
  instagram: (
    <>
      <rect {...traco} x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle {...traco} cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </>
  ),
  email: (
    <>
      <rect {...traco} x="2.5" y="5" width="19" height="14" rx="3" />
      <path {...traco} d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path {...traco} d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle {...traco} cx="12" cy="10" r="2.6" />
    </>
  ),
  estrela: (
    <path
      fill="currentColor"
      d="M12 2.6l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.7l-5.6 3.1 1.3-6.3L3 9.2l6.4-.7L12 2.6z"
    />
  ),
  check: <path {...traco} d="M4.5 12.5l5 5 10-11" />,
  balancar: (
    <>
      <path {...traco} d="M4 5h16M7 5l-2 14M17 5l2 14" />
      <path {...traco} d="M9.5 5v7.5h5V5M8.5 12.5h7" />
    </>
  ),
}

export default function Icone({ nome, className = 'w-6 h-6', ...props }) {
  const d = desenhos[nome]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      {d}
    </svg>
  )
}
