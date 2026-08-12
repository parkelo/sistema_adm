# Tamara Maria — Mídia Kit 2026

Landing page do mídia kit da Tamara Maria — modelo, influenciadora e empreendedora.

**Site estático**, sem build e sem dependências: basta servir a pasta.

## Estrutura

```
index.html              página única
assets/css/style.css    design system (mobile-first → tablet → desktop)
assets/js/main.js       interações e efeitos (vanilla JS, sem bibliotecas)
assets/img/cut/         recortes com fundo removido (hero, sobre, contato)
assets/img/photo/       portfólio editorial (+ variantes @sm para mobile)
assets/img/logo/        logos das marcas parceiras
assets/doc/             mídia kit em PDF (download)
```

## Seções

Hero · Sobre mim · Meu impacto · Portfólio · Marcas · Contato

## Design

Template **Editorial Luxury**. Paleta, tipografia e conteúdo extraídos do
mídia kit original em PDF:

| Uso | Valor |
|---|---|
| Roxo principal | `#8C52FF` |
| Roxo claro | `#A461FF` |
| Tinta | `#0A0A0A` / `#1E1E1E` |
| Lavanda | `#D9D2E1` |
| Papel | `#F6F4F8` |

Tipografia: **Oranienbaum** (títulos), **Montserrat** (texto), **Parisienne** (assinatura).

## Responsividade

Testado de 360px a 1440px+. Breakpoints em 640px (tablet), 1024px (desktop) e 1440px (wide).

Imagens em WebP com `srcset`, servindo versões leves no mobile — ~1,3 MB no total.

## Efeitos

Revelação por scroll, títulos animados letra a letra, contadores, parallax,
aurora em movimento, textura de papel, lightbox na galeria e menu em círculo.
Tudo respeita `prefers-reduced-motion`.

## Rodar localmente

```bash
python -m http.server 8791
```

Depois acesse `http://localhost:8791`.

## Contato

Instagram [@tamaramaria_h](https://instagram.com/tamaramaria_h) · WhatsApp (83) 99856-6808
