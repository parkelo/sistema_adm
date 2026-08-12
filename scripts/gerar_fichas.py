# -*- coding: utf-8 -*-
"""Gera src/data/fichas.js com um bloco por produto para o cliente preencher."""
import json
import re
import unicodedata
from pathlib import Path

SITE = Path(r"C:\PARKELO\site")
m = json.load(open(SITE / "src" / "data" / "produtos.raw.json", encoding="utf-8"))

CAT_NOME = {c["slug"]: c["nome"] for c in m["categorias"]}

def _slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s)).strip("-")


# Dados extraídos do Catálogo Parkelô (scripts/extrair_catalogo.py).
# As chaves vêm como código ("KMP 0101") ou já como slug ("trem"); normalizamos.
CONHECIDOS = {}
_extraidas = Path(r"C:\PARKELO\site") / "src" / "data" / "fichas_extraidas.json"
if _extraidas.exists():
    for chave, dados in json.load(open(_extraidas, encoding="utf-8")).items():
        limpo = {k: v for k, v in dados.items()
                 if not k.startswith("_") and v is not None}
        CONHECIDOS[_slug(chave)] = limpo
    print(f"ficha técnica do catálogo: {len(CONHECIDOS)} produtos")
else:
    print("⚠️  fichas_extraidas.json não encontrado — rode extrair_catalogo.py antes")

ORDEM = ["playgrounds", "little-play", "tematicos", "aquaticos", "avulsos", "mobiliario"]

linhas = [
    "/**",
    " * ============================================================================",
    " *  FICHA TÉCNICA DOS PRODUTOS — PREENCHA AQUI",
    " * ============================================================================",
    " *  Este é o ÚNICO arquivo que você precisa editar para o site mostrar as",
    " *  medidas de cada produto. Campos em `null` simplesmente não aparecem no site.",
    " *",
    " *  Como preencher (exemplo real, o KMP 0101 já está pronto abaixo):",
    " *",
    " *    idadeMin / idadeMax .... faixa etária, em anos          →  5 e 12",
    " *    larguraM / comprimentoM  medidas do produto, em metros  →  4.92 e 4.21",
    " *    alturaM ................ altura total, em metros        →  3.10",
    " *    segLarguraM / segComprimentoM  área de segurança, em m  →  7.92 e 7.21",
    " *    criancas ............... crianças simultâneas           →  8",
    " *    areaMinimaM2 ........... área do produto, em m²         →  20.71",
    " *    areaSegurancaM2 ........ área de segurança, em m²       →  57.10",
    " *    publicos ............... onde esse modelo se encaixa",
    " *                             'casa' | 'condominio' | 'escola' | 'buffet'",
    " *    destaque ............... true para aparecer na home",
    " *",
    " *  Use ponto para decimal (4.92, não 4,92). Não use aspas nos números.",
    " * ============================================================================",
    " */",
    "",
    "export const fichas = {",
]

total = 0
for cat in ORDEM:
    prods = [p for p in m["produtos"] if p["categoria"] == cat]
    if not prods:
        continue
    linhas.append("")
    linhas.append(f"  // ─── {CAT_NOME[cat].upper()} " + "─" * max(4, 58 - len(CAT_NOME[cat])))
    for p in sorted(prods, key=lambda x: x["slug"]):
        total += 1
        k = CONHECIDOS.get(p["slug"], {})
        rot = p["codigo"] or p["nome"]
        pub = k.get("publicos", ["casa", "condominio", "escola", "buffet"])
        pubs = ", ".join(f"'{x}'" for x in pub)

        def v(nome, sufixo=""):
            val = k.get(nome)
            return f"{val}," + (f"{sufixo}" if sufixo else "") if val is not None else f"null,{sufixo}"

        linhas += [
            f"  '{p['slug']}': {{" + (f"   // {rot}" if p["codigo"] else f"   // {p['nome']}"),
            f"    idadeMin: {k.get('idadeMin', 'null')},  idadeMax: {k.get('idadeMax', 'null')},",
            f"    larguraM: {k.get('larguraM', 'null')},  comprimentoM: {k.get('comprimentoM', 'null')},  alturaM: {k.get('alturaM', 'null')},",
            f"    segLarguraM: {k.get('segLarguraM', 'null')},  segComprimentoM: {k.get('segComprimentoM', 'null')},",
            f"    criancas: {k.get('criancas', 'null')},  areaMinimaM2: {k.get('areaMinimaM2', 'null')},  areaSegurancaM2: {k.get('areaSegurancaM2', 'null')},",
            f"    publicos: [{pubs}],",
            f"    destaque: {'true' if k.get('destaque') else 'false'},",
            "  },",
        ]

linhas += ["}", ""]

dest = SITE / "src" / "data" / "fichas.js"
dest.write_text("\n".join(linhas), encoding="utf-8")
print(f"gerado {dest} com {total} produtos")
