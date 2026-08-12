# Parkelô — site institucional

Site da **Parkelô**, fabricante de playgrounds e brinquedos infantis em polímero
rotomoldado. Voltado para o cliente final (não revendedor), com atendimento no
Sertão da Paraíba.

## Rodar localmente

```bash
npm install
npm run dev
```

Outros comandos:

```bash
npm run build     # gera dist/ para publicar
npm run preview   # testa o build localmente
```

## Publicar

A pasta `dist/` é estática e roda em qualquer hospedagem. Como o site usa React
Router, o servidor precisa redirecionar todas as rotas para `index.html`. Isso já
está configurado em `vercel.json` (Vercel) e `public/_redirects` (Netlify). Em
Apache/cPanel é preciso criar um `.htaccess` à mão.

## Estrutura

```
src/
├─ config/site.js      TODOS os dados de contato ficam aqui
├─ data/
│  ├─ produtos.raw.json     GERADO pelo script de imagens — não editar
│  ├─ fichas_extraidas.json GERADO do catálogo PDF — não editar
│  ├─ fichas.js             medidas de cada produto
│  └─ produtos.js           junta tudo + helpers
├─ components/         Cabeçalho, Rodapé, CartaoProduto, Botao, Formas…
├─ pages/              Home, Catalogo, Produto, Sobre, Contato, 404
└─ styles/index.css    design system (Tailwind v4 @theme)
```

## Catálogo

70 produtos em 6 linhas: playgrounds (22), Little Play (6), temáticos (4),
aquáticos (9), brinquedos avulsos (25) e mobiliário (4).

A ficha técnica de 47 deles foi extraída do catálogo em PDF do cliente. Os outros
23 não têm medida no catálogo e o site mostra "Medidas sob consulta".

## Scripts de preparação

Rodam só na máquina do desenvolvedor, nesta ordem, e exigem Python com
`pillow` e `pymupdf`:

```bash
python scripts/otimizar_imagens.py   # renders PNG → WebP (3 tamanhos)
python scripts/extrair_catalogo.py   # catálogo PDF → fichas_extraidas.json
python scripts/gerar_fichas.py       # monta fichas.js  (SOBRESCREVE)
```

As imagens originais (PNG 2000×2000, ~290 MB) ficam fora deste repositório.
O que está versionado é o resultado otimizado em `public/img/` (43 MB).

## Stack

Vite · React 18 · Tailwind CSS v4 · Framer Motion · React Router
