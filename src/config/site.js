/**
 * ============================================================
 *  CENTRAL DE DADOS DA PARKELÔ
 *  Tudo que muda (telefone, cidade, textos de contato) está aqui.
 *  Alterou aqui = mudou no site inteiro.
 * ============================================================
 */

export const site = {
  nome: 'Parkelô',
  slogan: 'Playgrounds que viram infância',
  descricao:
    'Playgrounds, brinquedos e mobiliário infantil em polímero rotomoldado. ' +
    'Seguros, coloridos e feitos para aguentar o sol do sertão. ' +
    'Atendemos todo o Sertão da Paraíba.',

  // ── CONTATO ───────────────────────────────────────────────
  email: 'comercial.parkelo@gmail.com',

  // Só dígitos, com DDI 55 na frente
  whatsapp: '5583991375335',
  whatsappLabel: '(83) 99137-5335',

  instagram: 'parkelo.oficial',
  instagramUrl: 'https://instagram.com/parkelo.oficial',

  // ── LOCALIZAÇÃO ───────────────────────────────────────────
  // ⚠️ OPCIONAL, mas recomendado: a cidade-sede deixa o SEO local
  //    bem mais forte ("playground em <cidade>"). Sem ela o site
  //    usa apenas a região.
  cidade: '',
  estado: 'Paraíba',
  uf: 'PB',
  regiaoAtendida: 'Sertão da Paraíba',

  // ⚠️ OPCIONAL: aparece no rodapé se preenchido
  razaoSocial: '',
  cnpj: '',
  endereco: '',
}

/**
 * Como a localização aparece no site.
 * Com cidade preenchida vira "Cidade, PB"; sem ela, só a região.
 */
export function localizacao() {
  if (site.cidade) {
    return { titulo: `${site.cidade}, ${site.uf}`, subtitulo: site.regiaoAtendida }
  }
  return { titulo: site.regiaoAtendida, subtitulo: `${site.estado} · Atendimento em toda a região` }
}

/** Monta o link de WhatsApp já com a mensagem pronta. */
export function linkWhatsApp(mensagem) {
  const texto = mensagem || `Olá! Vim pelo site da ${site.nome} e quero um orçamento.`
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`
}

/** Mensagem de WhatsApp para um produto específico. */
export function whatsAppProduto(produto) {
  return linkWhatsApp(
    `Olá! Vi o ${produto.codigo || produto.nome} no site da ${site.nome} ` +
      `e gostaria de um orçamento.`
  )
}

/** Públicos atendidos — usados no filtro do catálogo e na home. */
export const publicos = [
  {
    slug: 'casa',
    nome: 'Casa e quintal',
    chamada: 'O parquinho dos sonhos no seu quintal',
    texto:
      'Modelos compactos que cabem em quintais e áreas de lazer residenciais, ' +
      'com montagem rápida e zero manutenção.',
    icone: 'casa',
    cor: 'verde',
  },
  {
    slug: 'condominio',
    nome: 'Condomínio',
    chamada: 'Área de lazer que valoriza o condomínio',
    texto:
      'Equipamentos certificados pela ABNT NBR 16071, resistentes ao uso intenso ' +
      'e ao tempo. Sem farpa, sem ferrugem, sem repintura todo ano.',
    icone: 'predio',
    cor: 'azul',
  },
  {
    slug: 'escola',
    nome: 'Escola e creche',
    chamada: 'Recreio que ensina brincando',
    texto:
      'Estruturas pensadas para o desenvolvimento motor e social, com alta ' +
      'capacidade de crianças simultâneas e materiais atóxicos.',
    icone: 'escola',
    cor: 'laranja',
  },
  {
    slug: 'buffet',
    nome: 'Buffet e hotel',
    chamada: 'A atração que enche o salão',
    texto:
      'Cores vivas e modelos temáticos que viram cenário de foto — e argumento ' +
      'de venda para o seu espaço.',
    icone: 'festa',
    cor: 'roxo',
  },
]

/** Diferenciais mostrados na home. */
export const diferenciais = [
  {
    titulo: 'Segurança ABNT',
    texto:
      'Projetados seguindo a NBR 16071/21: cantos arredondados, sem pontos de ' +
      'prensagem e sem farpas.',
    icone: 'escudo',
    cor: 'azul',
  },
  {
    titulo: 'Não desbota no sol',
    texto:
      'Pigmentação UV industrial na massa do polímero. A cor não é pintura por ' +
      'cima — está dentro da peça.',
    icone: 'sol',
    cor: 'amarelo',
  },
  {
    titulo: 'Zero manutenção',
    texto:
      'Não enferruja, não apodrece e nunca precisa de verniz ou tinta. Limpeza ' +
      'só com água e sabão neutro.',
    icone: 'gota',
    cor: 'verde',
  },
  {
    titulo: 'Não esquenta',
    texto:
      'O polímero não acumula calor como metal. A criança escorrega no sol do ' +
      'meio-dia sem se queimar.',
    icone: 'termometro',
    cor: 'vermelho',
  },
  {
    titulo: 'Atóxico e reciclável',
    texto:
      'Material 100% reciclável e livre de substâncias tóxicas. Seguro para ' +
      'quem morde tudo.',
    icone: 'folha',
    cor: 'verde',
  },
  {
    titulo: 'Projeto 3D antes',
    texto:
      'Você vê o playground montado no seu espaço antes de fechar. Sem surpresa ' +
      'na hora da instalação.',
    icone: 'cubo',
    cor: 'roxo',
  },
]
