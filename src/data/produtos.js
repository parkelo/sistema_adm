/**
 * Camada de dados dos produtos.
 * Junta o manifesto gerado a partir das imagens (produtos.raw.json)
 * com a ficha técnica preenchida à mão (fichas.js).
 *
 * Para adicionar/trocar imagens: rode novamente o script de otimização.
 * Para preencher medidas: edite apenas src/data/fichas.js
 */
import raw from './produtos.raw.json'
import { fichas } from './fichas.js'

/** Metadados visuais de cada categoria. */
const META = {
  playgrounds: {
    cor: 'azul',
    chamada: 'A linha completa',
    resumo:
      'Torres, escorregadores, balanços e pontes em conjuntos completos. ' +
      'O playground clássico, do compacto ao gigante.',
  },
  'little-play': {
    cor: 'verde',
    chamada: 'Para os pequenos',
    resumo:
      'Escala reduzida, alturas baixas e muita cor. Pensado para os primeiros ' +
      'anos, quando tudo é descoberta.',
  },
  tematicos: {
    cor: 'vermelho',
    chamada: 'Vira história',
    resumo:
      'Avião, barco, trem e trator. Estruturas que não são só brinquedo — ' +
      'são cenário de brincadeira de faz de conta.',
  },
  aquaticos: {
    cor: 'roxo',
    chamada: 'Diversão molhada',
    resumo:
      'Cascatas, baldes e jatos para parques aquáticos, clubes e áreas de ' +
      'piscina. Verão o ano inteiro.',
  },
  avulsos: {
    cor: 'laranja',
    chamada: 'Peça por peça',
    resumo:
      'Balanços, gangorras, molas, escorregadores e jogos. Monte do seu jeito ' +
      'ou complete o que você já tem.',
  },
  mobiliario: {
    cor: 'amarelo',
    chamada: 'Conforto ao redor',
    resumo:
      'Bancos, mesas e cadeiras em polímero. Para os adultos que acompanham ' +
      'e para o lanche depois da brincadeira.',
  },
}

const FICHA_VAZIA = {
  idadeMin: null, idadeMax: null,
  larguraM: null, comprimentoM: null, alturaM: null,
  segLarguraM: null, segComprimentoM: null,
  criancas: null, areaMinimaM2: null, areaSegurancaM2: null,
  publicos: ['casa', 'condominio', 'escola', 'buffet'],
  destaque: false,
}

/** Monta a URL de uma imagem. tamanho: 'sm' | 'md' | 'lg' */
export function urlImagem(produto, imagem, tamanho = 'md') {
  return `${produto.pasta}/${imagem.arquivo}-${tamanho}.webp`
}

/**
 * Imagem principal. As vistas já vêm ordenadas (perspectiva > frontal > ...),
 * mas descartamos formatos extremos como capa — a vista lateral de uma mesa,
 * por exemplo, é um risco fininho que não mostra nada.
 */
export function capa(produto) {
  const proporcional = produto.imagens.find((i) => {
    if (!i.w || !i.h) return false
    const r = i.w / i.h
    return r > 0.5 && r < 2.1
  })
  return proporcional || produto.imagens[0]
}

/** Nome legível de uma vista. */
export const NOME_VISTA = {
  perspectiva: 'Perspectiva',
  frontal: 'Frente',
  lateral: 'Lateral',
  posterior: 'Traseira',
  superior: 'Vista de cima',
  render: 'Render',
}

export const NOME_COR = {
  amarelo: 'Amarelo',
  azul: 'Azul',
  laranja: 'Laranja',
  verde: 'Verde',
  vermelho: 'Vermelho',
  roxo: 'Roxo',
}

export const HEX_COR = {
  amarelo: '#FFC72C',
  azul: '#1B6FE8',
  laranja: '#F7941D',
  verde: '#8CC63F',
  vermelho: '#E8302A',
  roxo: '#7B2FBE',
}

/** Lista de produtos já enriquecida. */
export const produtos = raw.produtos.map((p) => {
  const ficha = { ...FICHA_VAZIA, ...(fichas[p.slug] || {}) }
  return {
    ...p,
    ficha,
    rotulo: p.codigo || p.nome,
    url: `/produtos/${p.slug}`,
    // true quando há pelo menos uma medida preenchida
    temFicha: Boolean(
      ficha.idadeMin || ficha.larguraM || ficha.criancas || ficha.areaMinimaM2
    ),
  }
})

/** Categorias com contagem, cor e imagem de capa. */
export const categorias = raw.categorias.map((c) => {
  const itens = produtos.filter((p) => p.categoria === c.slug)
  return {
    ...c,
    ...META[c.slug],
    total: itens.length,
    url: `/produtos/categoria/${c.slug}`,
    imagem: itens[0] ? urlImagem(itens[0], capa(itens[0]), 'md') : null,
  }
})

export const porSlug = Object.fromEntries(produtos.map((p) => [p.slug, p]))
export const categoriaPorSlug = Object.fromEntries(categorias.map((c) => [c.slug, c]))

/** Produtos marcados como destaque; se ninguém marcou, pega uma amostra bonita. */
export function destaques(qtd = 8) {
  const marcados = produtos.filter((p) => p.ficha.destaque)
  if (marcados.length >= qtd) return marcados.slice(0, qtd)

  const preferidas = ['playgrounds', 'tematicos', 'little-play', 'aquaticos']
  const resto = preferidas
    .flatMap((cat) => produtos.filter((p) => p.categoria === cat && !p.ficha.destaque))
    .filter((p, i, arr) => arr.indexOf(p) === i)

  // intercala categorias para o carrossel não ficar monótono
  const porCat = {}
  resto.forEach((p) => (porCat[p.categoria] ??= []).push(p))
  const mix = []
  for (let i = 0; mix.length < qtd - marcados.length; i++) {
    let achou = false
    for (const cat of preferidas) {
      const item = porCat[cat]?.[i]
      if (item) {
        mix.push(item)
        achou = true
      }
      if (mix.length >= qtd - marcados.length) break
    }
    if (!achou) break
  }
  return [...marcados, ...mix]
}

/** Produtos relacionados: mesma categoria, exceto ele mesmo. */
export function relacionados(produto, qtd = 4) {
  const mesma = produtos.filter(
    (p) => p.categoria === produto.categoria && p.slug !== produto.slug
  )
  if (mesma.length >= qtd) {
    const i = mesma.findIndex((p) => p.slug > produto.slug)
    const inicio = i < 0 ? 0 : i
    return [...mesma.slice(inicio), ...mesma.slice(0, inicio)].slice(0, qtd)
  }
  const outros = produtos.filter(
    (p) => p.categoria !== produto.categoria && p.slug !== produto.slug
  )
  return [...mesma, ...outros].slice(0, qtd)
}

/** Aplica os filtros do catálogo. */
export function filtrar({ categoria, publico, cor, busca, idade } = {}) {
  const termo = (busca || '').trim().toLowerCase()
  return produtos.filter((p) => {
    if (categoria && p.categoria !== categoria) return false
    if (publico && !p.ficha.publicos.includes(publico)) return false
    if (cor && !p.cores.includes(cor)) return false
    if (idade && p.ficha.idadeMin != null && p.ficha.idadeMax != null) {
      if (idade < p.ficha.idadeMin || idade > p.ficha.idadeMax) return false
    }
    if (termo) {
      const alvo = `${p.rotulo} ${p.nome} ${p.codigo || ''} ${p.categoria}`.toLowerCase()
      if (!alvo.includes(termo)) return false
    }
    return true
  })
}

/** Cores realmente disponíveis em todo o catálogo. */
export const coresDisponiveis = [
  ...new Set(produtos.flatMap((p) => p.cores)),
].sort()

export const totalProdutos = produtos.length
