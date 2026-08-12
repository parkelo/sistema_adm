# Parkelô — Site institucional

Site para **cliente final** (não revendedor) da Parkelô, fabricante de playgrounds e
brinquedos infantis em polímero rotomoldado.

Referência de estrutura aprovada pelo cliente: `https://site.krenke.com.br`
(mas com posicionamento invertido: a Krenke é B2B/revendedor, o nosso é B2C).

---

## 1. Estado do projeto

| Etapa | Situação |
|---|---|
| Análise de assets e marca | ✅ concluída |
| Otimização das imagens (407 renders → WebP) | ✅ concluída |
| Manifesto de produtos (70 itens) | ✅ gerado |
| Ficha técnica (extraída do catálogo PDF) | ✅ 47 de 70 produtos — os outros 23 não têm dado no catálogo |
| Design system (cores/fontes/CSS) | ✅ concluído |
| Componentes base | ✅ concluídos |
| Páginas (Home, Catálogo, Produto, Sobre, Contato, 404) | ✅ concluídas |
| Build de produção | ✅ passa limpo, sem erro de console |
| WhatsApp e SEO regional | ✅ aplicados (Sertão da Paraíba, 83 99137-5335) |
| Publicação | 🟡 pronto para publicar — só falta hospedar |

**Site verificado no navegador:** todas as rotas renderizam, 0 imagem quebrada,
sem rolagem horizontal no mobile (375px), menu mobile e filtro fixo funcionando.

### ⏸️ Onde parei

Acabei de integrar a ficha técnica vinda do catálogo PDF e rodei `npm run build`
(passou limpo). **Faltou conferir no navegador** como as páginas de produto ficaram
com os dados novos — em especial `/produtos/kmp-0901`, que tem a dimensão de
segurança em branco de propósito (ver seção 6.1).

### O que fazer ao retomar

1. Abrir `/produtos/kmp-0101` e `/produtos/kmp-0901` no navegador e conferir a
   ficha técnica renderizada.
2. Confirmar com o cliente as 3 inconsistências do catálogo (seção 6.1).
3. Pedir a cidade-sede e preencher `cidade` em `src/config/site.js` (seção 3).
4. `npm run build` e publicar a pasta `dist/`.

Melhorias possíveis, se o cliente pedir:
- Fotos reais de obras instaladas (hoje só há render 3D)
- Página/seção de blog para SEO
- `sitemap.xml` e `robots.txt`
- Pré-renderização das rotas para SEO (hoje é SPA; o conteúdo depende de JS)

Rotas implementadas:

```
/                             Home
/produtos                     Catálogo (todos, com filtros)
/produtos/categoria/:cat      Catálogo filtrado por categoria
/produtos/:slug               Página do produto (galeria de vistas + ficha + CTA)
/sobre                        A Parkelô
/contato                      Contato
*                             404
```

---

## 2. Decisões já tomadas com o cliente

Não perguntar de novo — isto está fechado:

| Tema | Decisão |
|---|---|
| Público | **Cliente final**, nunca revendedor |
| Stack | **Site estático moderno**: Vite + React + Tailwind v4 + Framer Motion + React Router |
| Orçamento | **WhatsApp** — formulário monta a mensagem pronta e abre o wa.me |
| Preços | **Não aparecem.** Só "Solicitar orçamento" |
| Nomes de produto | **Só o código de fábrica** (KMP 0101, KLP 0202, KAQ 0301). Nada de nome comercial inventado |
| Ficha técnica | Cliente **não tem planilha**. Estrutura montada com campos vazios em `src/data/fichas.js` |
| Páginas | Site **completo** multi-página (Home + Catálogo + Produto + Sobre + Contato) |
| SEO | **Regional** — focar numa cidade/estado (⚠️ cliente ainda não informou qual) |
| Públicos destacados | **Todos os 4**: casa/quintal, condomínio, escola/creche, buffet/hotel |

---

## 3. Dados do cliente

Confirmados e já aplicados em `src/config/site.js`:

- **WhatsApp:** `5583991375335` — exibido como `(83) 99137-5335`
- **E-mail:** `comercial.parkelo@gmail.com`
- **Instagram:** `@parkelo.oficial`
- **Região atendida:** Sertão da Paraíba (PB) — usado no SEO, no rodapé,
  no hero da Home e no JSON-LD `LocalBusiness` do `index.html`
- **Grupo empresarial:** a Parkelô é gerenciada pelo **Jônatas Oliveira Grupo
  Empresarial**, CNPJ `45.988.259/0001-20`. Logo e CNPJ aparecem no rodapé
  (objeto `grupo` em `site.js`). O arquivo original era JPEG branco sobre preto;
  virou WebP com transparência usando o brilho como canal alfa.

⚠️ **Falta a cidade-sede.** O campo `cidade` está vazio de propósito: o cliente
informou só a região. Sem cidade o site mostra "Sertão da Paraíba / Paraíba ·
Atendimento em toda a região" (ver a função `localizacao()` em `site.js`).
Preenchendo `cidade`, tudo passa a exibir "Cidade, PB" automaticamente e o SEO
local fica bem mais forte.

Perguntas adicionais que ainda valem a pena fazer:

- Razão social e CNPJ (para o rodapé)
- Desde quando a empresa existe (dá credibilidade na Home e no Sobre)
- Vocês **instalam** ou só entregam? Fazem projeto 3D do espaço do cliente?
- Prazo médio de entrega e prazo de garantia
- Domínio já registrado?
- **As fotos reais do catálogo PDF podem ser usadas no site?** (ver seção 6.2 —
  é a maior oportunidade de conversão que sobrou)
- Confirmar as **3 inconsistências do catálogo** listadas na seção 6.1

Dados de contato **já confirmados**:
- E-mail: `comercial.parkelo@gmail.com`
- Instagram: `@parkelo.oficial`

---

## 4. Estrutura de pastas

```
C:\PARKELO\
├─ CLAUDE.md              ← este arquivo
├─ IMGS\                  ← ORIGINAIS, nunca modificar
│   ├─ PLAYGROUNDS\kmp roto\kmp NNNN\
│   ├─ LITTLE\KLP roto\KLP - NNNN\
│   ├─ AQUATICOS\KAQ - renders\KAQ NNNN\
│   ├─ TEMATICOS\{AVIÃO,BARCO,Trator,Trem}\
│   └─ AVULSOS\Avulsos e peças individuais\
│         └─ mobiliário\               (vira categoria própria)
├─ LOGO\parkelo.png       ← logo 3D 2000×2000 com alpha
├─ PDF EXEMPLO\
│   ├─ PLAYGROUNDS.pdf                ← manual de estilo da marca (2 páginas)
│   └─ Catalogo_Parkelo_Completo.pdf  ← catálogo do cliente (fonte das medidas)
└─ site\                  ← O PROJETO
    ├─ package.json
    ├─ vite.config.js
    ├─ vercel.json          ← fallback SPA + cache das imagens
    ├─ index.html
    ├─ scripts\
    │   ├─ otimizar_imagens.py   ← PNG → WebP + gera produtos.raw.json
    │   ├─ extrair_catalogo.py   ← lê o catálogo PDF → fichas_extraidas.json
    │   └─ gerar_fichas.py       ← junta tudo e escreve fichas.js

O catálogo do cliente foi copiado para
`PDF EXEMPLO\Catalogo_Parkelo_Completo.pdf` (63 páginas, 65 MB) — é a fonte
da ficha técnica. `extrair_catalogo.py` aceita o caminho como argumento e,
sem argumento, procura em `C:\Users\iguin\Downloads\`.
    ├─ public\
    │   ├─ _redirects        ← fallback SPA (Netlify)
    │   └─ img\
    │       ├─ brand\logo-{sm,md,lg}.webp + logo.png
    │       └─ products\<categoria>\<slug>\<vista>-{sm,md,lg}.webp
    └─ src\
        ├─ main.jsx
        ├─ App.jsx               ← rotas
        ├─ styles\index.css      ← design system (Tailwind v4 @theme)
        ├─ config\site.js        ← TODOS os dados de contato ficam aqui
        ├─ data\
        │   ├─ produtos.raw.json      ← GERADO, não editar à mão
        │   ├─ fichas_extraidas.json  ← GERADO do catálogo PDF, não editar
        │   ├─ fichas.js              ← medidas; editável, mas ver aviso na seção 6
        │   └─ produtos.js            ← junta tudo + helpers
        ├─ components\
        │   ├─ Icone.jsx         ← ícones SVG inline
        │   ├─ Formas.jsx        ← BarraArcoIris, Blob, Estrela, Onda, Nuvens
        │   ├─ Revelar.jsx       ← animação de entrada no scroll
        │   ├─ Botao.jsx
        │   ├─ CartaoProduto.jsx
        │   ├─ Cabecalho.jsx
        │   ├─ Rodape.jsx
        │   ├─ BotaoWhats.jsx    ← flutuante + voltar ao topo
        │   └─ Layout.jsx
        └─ pages\
            ├─ Home.jsx          ← 9 seções, é o arquivo mais longo
            ├─ Catalogo.jsx      ← filtros por categoria/público/cor/busca
            ├─ Produto.jsx       ← galeria + lightbox + ficha + cores
            ├─ Sobre.jsx
            ├─ Contato.jsx       ← formulário que monta a msg do WhatsApp
            └─ NaoEncontrado.jsx
```

**Detalhes de implementação que não são óbvios:**

- Os campos de contato passam por um teste `definido()` em `Rodape.jsx` e
  `Contato.jsx`: enquanto o WhatsApp/cidade forem placeholder, esses blocos
  simplesmente não aparecem no site. Preencheu → aparecem sozinhos.
- `capa()` em `produtos.js` descarta imagens com proporção extrema — a vista
  lateral da Mesa é um risco fininho e ficava horrível como capa.
- Na página de produto, sem cor selecionada a galeria mostra **uma vista de cada**;
  ao escolher uma cor, mostra só as imagens daquela cor.
- O filtro do catálogo é `sticky top-20` — 80px, exatamente a altura do cabeçalho
  encolhido. Se mexer na altura do logo no header, ajuste esse valor.
- React 18 não aceita `fetchPriority` em camelCase; use `fetchpriority` minúsculo.

---

## 5. Catálogo — 70 produtos

| Categoria (slug) | Qtd | Cor da marca | Códigos |
|---|---|---|---|
| `playgrounds` | 22 | azul | KMP 0101 … KMP 1101 |
| `little-play` | 6 | verde | KLP 0101 … KLP 0204 |
| `tematicos` | 4 | vermelho | Avião, Barco, Trator, Trem |
| `aquaticos` | 9 | roxo | KAQ 0101 … KAQ 0403 |
| `avulsos` | 25 | laranja | balanços, molas, escorregadores, jogos… |
| `mobiliario` | 4 | amarelo | banco, cadeira, mesa, conjunto |

Detalhes importantes do inventário:

- Todos os renders originais são **2000×2000 PNG RGBA com fundo transparente** —
  por isso funcionam sobre qualquer fundo colorido e podem ser animados sem "caixa branca".
- **Duplicatas**: `IMGS\PLAYGROUNDS\kmp roto\kmp 0502\` contém cópias aninhadas de
  0601, 0603 e 0702. O script só lê arquivos diretos da pasta, então já ignora.
- **`retoque*.jpg`** em `kmp 0101` são páginas de um catálogo antigo (marca antiga),
  não são fotos de produto. O script pula qualquer arquivo começando com `retoque`.
- 8 produtos avulsos têm **variantes de cor** (amarelo/azul/laranja/verde) detectadas
  pelo nome do arquivo e expostas em `produto.cores`.
- Ordenação das vistas: perspectiva → frontal → lateral → posterior → superior.
  A primeira imagem é sempre a capa.

---

## 6. Pipeline de imagens

**Resultado obtido:** 289,8 MB → 43,1 MB em 3 tamanhos (redução de 85%).
Por tamanho: `sm` 5,6 MB (14 KB/img), `md` 12,8 MB (32 KB), `lg` 24,8 MB (62 KB).

```bash
cd C:/PARKELO/site && python scripts/otimizar_imagens.py
```

- É **retomável**: pula o que já existe. Para refazer tudo, apague `public/img/products/`.
- Roda em paralelo (`WORKERS = CPUs - 1`); levou ~2 min.
- `METHOD = 4` no WebP. Subir para 6 reduz ~2% a mais mas triplica o tempo.
- Recorta a transparência sobrando (bbox + 1,5% de margem) antes de redimensionar.
- Nunca toca em `C:\PARKELO\IMGS`.

---

## 6.1 Ficha técnica — extraída do catálogo PDF

O cliente enviou `Catalogo_Parkelo_Completo.pdf` (63 páginas). A ficha técnica de
**47 dos 70 produtos** saiu dele. Ordem dos scripts:

```bash
cd C:/PARKELO/site
python scripts/otimizar_imagens.py   # 1º: imagens + produtos.raw.json
python scripts/extrair_catalogo.py   # 2º: PDF → fichas_extraidas.json
python scripts/gerar_fichas.py       # 3º: monta fichas.js  (SOBRESCREVE!)
```

⚠️ `gerar_fichas.py` **sobrescreve** `src/data/fichas.js`. Se alguém tiver editado
medidas à mão, faça backup antes.

**Cobertura por categoria:**

| Categoria | Com ficha | Total |
|---|---|---|
| playgrounds | 21 | 22 |
| little-play | 6 | 6 |
| tematicos | 4 | 4 |
| aquaticos | 6 | 9 |
| avulsos | 10 | 25 |
| mobiliario | 0 | 4 |

Os 23 restantes **não têm medida nenhuma no catálogo** (conferido página a página):
`kmp-0501`, `kaq-0101`, `kaq-0202`, `kaq-0302`, todo o mobiliário e os lúdicos da
p45 (jogo da velha, memória, metalofone, LIBRAS, bolha, guarda-corpos, assentos,
escorregadores avulsos). Ficam `null` e o site mostra "Medidas sob consulta".

**Como o extrator funciona** (as três armadilhas do PDF):

1. **Páginas com 2 produtos lado a lado** — a associação entre código e medida é
   por **distância 2D** entre os blocos de texto, não pela ordem de leitura.
2. **A faixa etária está vetorizada** (virou desenho, `get_text()` não vê). As 37
   idades foram lidas à mão das páginas e estão na tabela `IDADES` do script.
3. **Avulsos das p42–43** — três medidas vêm fundidas num único bloco de texto,
   o que torna a associação automática não confiável. Estão na tabela `AVULSOS`,
   transcritas à mão com a página de origem anotada.

**Validações automáticas** (o script recusa dado que não fecha a conta):
- área de segurança = produto + 3 m em cada lado
- área (m²) = largura × comprimento

### ⚠️ 3 inconsistências do catálogo — confirmar com o cliente

O extrator **deixou esses campos em branco** em vez de publicar número errado:

| Produto | Catálogo diz | Deveria ser | O que fizemos |
|---|---|---|---|
| KMP 0901 (p23) | dim. segurança `14 × 12,57 m` | `16,10 × 14,12 m` (produto 13,10 × 11,12 + 3) | em branco |
| KMP 1101 (p25) | área segurança `217,79 m²` | `271,79 m²` (17,94 × 15,15) — dígitos trocados | em branco |
| KAQ 0201 (p48) | área mínima `23,38 m²` | `25,38 m²` (4,70 × 5,40) | em branco |

Nos dois primeiros a área de segurança impressa (227,33 m² no 0901) **confirma** a
medida correta — mas preferi não publicar número que o catálogo não traz.

**Divergências de nome** entre catálogo e nossas pastas (já tratadas no script):
`KMP 01101` = nosso `kmp-1101` · `Motinho de Mola` = `moto-de-mola` ·
`Gangora` = `gangorra`.

## 6.2 Duas oportunidades encontradas no PDF

1. **Fotos reais de obras instaladas.** Várias páginas (2, 35, 36…) trazem foto de
   playground montado em campo, com criança/ambiente real — exatamente o que o site
   não tem. Hoje é 100% render 3D. Extrair essas fotos e usá-las na Home e nas
   páginas de produto é a maior alavanca de conversão que sobrou.
2. **Produtos no catálogo sem imagem na pasta IMGS** (p42–44): Balanço Cadeirante
   (2,10 × 2,18 m), Pirâmide de Cordas (3,23 × 3,23 m), Jogo de Xadrez Gigante
   (3 × 3 m) e Torre de Atividades (5,10 × 2,06 m). Se o cliente mandar os renders,
   viram 4 produtos novos no site.

---

## 7. Identidade visual

Extraída do logo 3D e do PDF de marca. Definida em `src/styles/index.css` via `@theme`.

| Cor | Hex | Token |
|---|---|---|
| Azul | `#1B6FE8` | `pk-azul` |
| Laranja | `#F7941D` | `pk-laranja` |
| Vermelho | `#E8302A` | `pk-vermelho` |
| Verde | `#8CC63F` | `pk-verde` |
| Roxo | `#7B2FBE` | `pk-roxo` |
| Amarelo | `#FFC72C` | `pk-amarelo` |
| Tinta (texto) | `#12233D` | `pk-tinta` |
| Cinza (apoio) | `#5B6B83` | `pk-cinza` |
| Nuvem (fundo) | `#F4F7FC` | `pk-nuvem` |

Cada cor tem variante `-esc` (escura, usada na sombra sólida dos botões) e
`-clr` (clara, usada em fundos).

**Fontes:** `Fredoka` para títulos (combina com as letras 3D do logo),
`Nunito Sans` para texto. Carregadas via Google Fonts no `index.html`.

**Assinaturas visuais da marca** (vieram do PDF, usar bastante):
- Barra arco-íris com as 6 cores — rodapé de seção e topo do header quando rolado
- Cantos muito arredondados (`--radius-pk` = 1.75rem, até 3.5rem)
- Malha de bolinhas (`.malha-pontos`)
- Blobs coloridos nas quinas, estrelinhas amarelas flutuantes
- Badges-pílula brancos com ícone de traço + rótulo pequeno + valor em negrito
- Selo ABNT NBR 16071/21

**Regras de estilo do código:**
- Nomes de variáveis, componentes e classes **em português** (o cliente vai mexer)
- Botões: pílula com sombra sólida embaixo que "afunda" no clique
- Toda animação respeita `prefers-reduced-motion` (já tratado no CSS base)

---

## 8. Comandos

```bash
cd C:/PARKELO/site
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/ para publicar
npm run preview  # testa o build local
```

Publicação: a pasta `dist/` é estática — serve em Vercel, Netlify, Hostinger ou
qualquer hospedagem comum. Como usa React Router, o servidor precisa redirecionar
todas as rotas para `index.html` (SPA fallback). Isso já está configurado:
`vercel.json` (Vercel) e `public/_redirects` (Netlify). Em Apache/cPanel é
preciso criar um `.htaccess` à mão.

**Repositório:** `https://github.com/parkelo/sistema_adm` — a pasta `C:\PARKELO\site`
**é** o repositório (tem `.git`), então basta `git add -A && git commit && git push`.
O `main` tem o histórico anterior: o commit `89390d4` guarda a landing page do
mídia kit da Tamara Maria, que estava nesse repo por engano e pode ser recuperada
com `git checkout 89390d4`.

⚠️ `CLAUDE.md` existe em dois lugares: `C:\PARKELO\CLAUDE.md` (o que o Claude Code
lê) e a cópia versionada em `site/CLAUDE.md`. Ao editar, copie um para o outro
antes de commitar.

**Domínio:** `parkelo.com.br`, registrado na Hostinger. Aponta para a Vercel via
`A @ → 216.198.79.1` e `CNAME www → 71d7d4d320ec62ca.vercel-dns-017.com`
(esse CNAME é único do domínio, gerado pela Vercel). O `www` é o endereço
principal; o apex redireciona para ele com 308.

---

## 9. Tom de voz

Cliente final, não engenheiro. Falar do benefício antes da especificação:

- ✅ "Não esquenta no sol — a criança escorrega no meio-dia sem se queimar"
- ❌ "Polímero rotomoldado com baixa condutividade térmica"

Perguntas que o site precisa responder: *cabe no meu espaço? serve pra que idade?
é seguro? quanto custa? vocês instalam?*

**Nunca inventar dados técnicos** (medidas, faixa etária, capacidade, certificações
específicas por modelo). Tudo que está no site veio do catálogo PDF do cliente —
47 dos 70 produtos. O que o catálogo não traz fica `null` e o site mostra
"Medidas sob consulta" no lugar. Quando um número do catálogo não fecha a conta,
a regra é **deixar em branco e avisar**, nunca corrigir por conta própria
(ver seção 6.1).
