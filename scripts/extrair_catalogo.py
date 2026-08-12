# -*- coding: utf-8 -*-
"""
Lê o Catálogo Parkelô em PDF e extrai a ficha técnica de cada produto.

O PDF é paisagem e traz 1 ou 2 produtos por página, lado a lado. Por isso a
associação entre o código do produto e os blocos de medidas é feita por
POSIÇÃO horizontal: cada bloco de medida vai para o código mais próximo no eixo X.

Saída: fichas_extraidas.json  (consumido por gerar_fichas.py)
"""
import json
import re
import sys
from pathlib import Path

import fitz

PADRAO = Path(r"C:\PARKELO\PDF EXEMPLO\Catalogo_Parkelo_Completo.pdf")
PDF = Path(sys.argv[1]) if len(sys.argv) > 1 else PADRAO
SAIDA = Path(__file__).parent.parent / "src" / "data" / "fichas_extraidas.json"

# "4,92 m X 4,21 m" / "11,76 m X 7,25" (às vezes falta o m final)
# / "6 m X 4,82 m"  (medidas redondas vêm sem casa decimal)
RE_DIM = re.compile(r"(\d+(?:[,.]\d+)?)\s*m\s*[Xx×]\s*(\d+(?:[,.]\d+)?)\s*m?")
RE_AREA = re.compile(r"(\d+(?:[,.]\d+)?)\s*m²")
RE_CRIANCAS = re.compile(r"(\d+)\s*crian", re.I)
RE_IDADE = re.compile(r"(\d+)\s*a\s*(\d+)\s*anos", re.I)
# "KMP 0101" e também "KMP 01101" (o catálogo escreve o 1101 com zero à frente)
RE_CODIGO = re.compile(r"\b(K[A-Z]{2})\s*(\d{4,5})\b")

# Produtos cujo título no PDF é o nome, não o código. O valor é o slug usado
# em produtos.raw.json.
NOMES = {
    "KMT Trem": "trem",
    "KMT Trator": "trator",
    "KMT Avião": "aviao",
    "KMT Barco": "barco",
}

# ── Faixa etária ────────────────────────────────────────────────────────────
# O selo "Para Crianças De X a Y anos" está VETORIZADO no PDF (virou desenho),
# então get_text() não o enxerga em nenhuma página. Os valores abaixo foram
# lidos das próprias páginas do catálogo, uma a uma.
# Para conferir: scripts/../../scratchpad recorta esses selos em painéis.
IDADES = {
    "KMP 0101": (5, 12), "KMP 0102": (5, 12), "KMP 0201": (5, 12),
    "KMP 0202": (5, 12), "KMP 0204": (5, 12), "KMP 0205": (5, 12),
    "KMP 0208": (3, 7),  "KMP 0209": (5, 12), "KMP 0301": (5, 12),
    "KMP 0302": (5, 12), "KMP 0303": (5, 12), "KMP 0305": (5, 7),
    "KMP 0401": (5, 12), "KMP 0402": (5, 12), "KMP 0404": (5, 12),
    "KMP 0502": (5, 12), "KMP 0601": (5, 12), "KMP 0603": (5, 12),
    "KMP 0702": (5, 12), "KMP 0901": (5, 12), "KMP 1101": (5, 12),

    "KLP 0101": (1, 6),  "KLP 0102": (1, 6),  "KLP 0201": (1, 6),
    "KLP 0202": (1, 6),  "KLP 0203": (1, 6),  "KLP 0204": (1, 6),

    "KAQ 0201": (5, 12), "KAQ 0301": (5, 12), "KAQ 0303": (5, 12),
    "KAQ 0401": (3, 12), "KAQ 0402": (5, 12), "KAQ 0403": (5, 12),

    "trem": (3, 7), "trator": (5, 12), "aviao": (5, 12), "barco": (3, 12),
}

# ── Brinquedos avulsos (páginas 42 e 43) ────────────────────────────────────
# Transcrito à mão de propósito: nessas páginas os produtos estão espalhados em
# duas dimensões e três medidas vêm fundidas num único bloco de texto
# ("1,13 m X 0,70 m | 0,83 m X 0,34 m | 0,95 m X 0,34 m"), o que torna a
# associação automática por proximidade pouco confiável.
# O catálogo só informa a dimensão do produto para estes itens.
AVULSOS = {
    # slug                  (largura, comprimento, página)
    "scandere-domos":       (2.60, 2.72, 42),
    "playball":             (0.80, 0.80, 42),
    "golfinho-de-mola":     (1.13, 0.70, 42),
    "cavalinho-de-mola":    (0.83, 0.34, 42),
    "moto-de-mola":         (0.95, 0.34, 42),   # "Motinho de Mola" no catálogo
    "gangorra":             (2.95, 0.22, 42),   # "Gangora" no catálogo
    "carrossel":            (1.77, 1.77, 42),
    "balanco-ninho":        (2.08, 1.89, 43),   # Balanço Alumínio / Assento Ninho
    "balanco-aluminio":     (3.41, 1.96, 43),   # Balanço Alumínio / Assento Infantil
    "balanco":              (3.00, 0.99, 43),   # Balanço Ferro / Assento Infantil
}


def dec(s):
    """'4,92' -> 4.92"""
    return float(s.replace(".", "").replace(",", ".")) if s else None


def centro(b):
    return ((b[0] + b[2]) / 2, (b[1] + b[3]) / 2)


def coletar(pagina):
    """Devolve (âncoras, blocos) com a posição de cada um."""
    codigos, blocos = [], []
    for b in pagina.get_text("blocks"):
        texto = b[4]
        if not texto.strip():
            continue
        cx, cy = centro(b)

        for m in RE_CODIGO.finditer(texto):
            # "KMP 01101" → "KMP 1101"
            numero = m.group(2)
            if len(numero) == 5 and numero.startswith("0"):
                numero = numero[1:]
            codigos.append({"codigo": f"{m.group(1)} {numero}", "x": cx, "y": cy})

        for nome, slug in NOMES.items():
            if nome in texto:
                codigos.append({"codigo": slug, "x": cx, "y": cy})

        # Qualquer bloco que carregue medida. Os rótulos ("Dimensões do Produto")
        # e os valores ("4,92 m X 4,21 m") às vezes vêm em blocos separados, então
        # não dá para filtrar só pelos rótulos.
        if (RE_DIM.search(texto) or RE_AREA.search(texto)
                or RE_CRIANCAS.search(texto) or RE_IDADE.search(texto)):
            blocos.append({"texto": texto, "x": cx, "y": cy})

    return codigos, blocos


def mais_proximo(codigos, bloco):
    """Distância 2D — nas páginas com dois produtos eles ficam lado a lado."""
    return min(codigos, key=lambda c: (c["x"] - bloco["x"]) ** 2
                                      + (c["y"] - bloco["y"]) ** 2)


RE_MEDIDA_SOLTA = re.compile(r"(\d+(?:[,.]\d+)?)\s*m\b")


def acumular(texto, bruto):
    """Guarda tudo que o bloco contém; a interpretação fica para depois."""
    dims = RE_DIM.findall(texto)
    bruto["dims"] += [(dec(a), dec(b)) for a, b in dims]
    bruto["criancas"] += [int(m) for m in RE_CRIANCAS.findall(texto)]
    bruto["idades"] += [(int(a), int(b)) for a, b in RE_IDADE.findall(texto)]

    areas = [dec(a) for a in RE_AREA.findall(texto)]
    # O catálogo às vezes perde o "²" na digitação (ex.: KMP 0404 traz
    # "120,28 m"). Num bloco de área — que não tem dimensão "A x B" — qualquer
    # medida solta também é área. RE_MEDIDA_SOLTA não pega os "m²" corretos
    # (o "²" conta como caractere de palavra e mata o \b), então os dois
    # padrões se complementam.
    if not dims and "Área" in texto:
        areas += [dec(a) for a in RE_MEDIDA_SOLTA.findall(texto)]
    bruto["areas"] += areas


def resolver(bruto):
    """
    Transforma o material bruto na ficha final.

    A ordem dos blocos no PDF não é confiável, então a distinção não é por
    posição e sim por tamanho: a área de segurança é sempre 3 m maior que o
    produto em cada lado, logo é sempre a maior das duas.
    """
    ficha, avisos = {}, []

    dims = sorted(set(bruto["dims"]), key=lambda d: d[0] * d[1])
    if dims:
        larg, comp = dims[0]
        ficha["larguraM"], ficha["comprimentoM"] = larg, comp

    if len(dims) > 1:
        seg = dims[-1]
        # A área de segurança é o produto + 3 m em cada lado. O PDF às vezes
        # inverte a ordem dos lados, então testamos as duas orientações.
        esperado = (round(larg + 3, 2), round(comp + 3, 2))
        for cand in (seg, (seg[1], seg[0])):
            if (abs(cand[0] - esperado[0]) <= 0.15
                    and abs(cand[1] - esperado[1]) <= 0.15):
                ficha["segLarguraM"], ficha["segComprimentoM"] = cand
                break
        else:
            # Não bate com o produto — provável erro de digitação no catálogo.
            # Melhor deixar em branco do que publicar medida errada.
            avisos.append(
                f"dimensão de segurança {seg[0]}x{seg[1]} não confere com o "
                f"produto {larg}x{comp} (esperado {esperado[0]}x{esperado[1]}) — deixada em branco"
            )

    areas = sorted(set(bruto["areas"]))
    if areas:
        ficha["areaMinimaM2"] = areas[0]
    if len(areas) > 1:
        ficha["areaSegurancaM2"] = areas[-1]

    # A área tem que bater com o produto das dimensões. Serve para pegar
    # dígito trocado na digitação do catálogo (ex.: KMP 1101 traz 217,79 m²
    # onde 17,94 × 15,15 dá 271,79 m²).
    for campo, dim in (("areaMinimaM2", ("larguraM", "comprimentoM")),
                       ("areaSegurancaM2", ("segLarguraM", "segComprimentoM"))):
        a, b_ = ficha.get(dim[0]), ficha.get(dim[1])
        valor = ficha.get(campo)
        if a and b_ and valor:
            esperado = round(a * b_, 2)
            if abs(valor - esperado) > max(0.5, esperado * 0.02):
                avisos.append(
                    f"{campo} = {valor} m² não bate com {a} × {b_} = {esperado} m² "
                    f"— deixada em branco"
                )
                ficha[campo] = None

    if bruto["criancas"]:
        ficha["criancas"] = max(bruto["criancas"])
    if bruto["idades"]:
        ficha["idadeMin"], ficha["idadeMax"] = bruto["idades"][0]

    return ficha, avisos


def main():
    doc = fitz.open(PDF)
    brutos, paginas, paginas_sem_codigo = {}, {}, []

    for i in range(doc.page_count):
        codigos, blocos = coletar(doc[i])

        if blocos and not codigos:
            paginas_sem_codigo.append(i + 1)
            continue
        if not codigos:
            continue

        for c in codigos:
            brutos.setdefault(c["codigo"],
                              {"dims": [], "areas": [], "criancas": [], "idades": []})
            paginas.setdefault(c["codigo"], i + 1)

        for b in blocos:
            alvo = mais_proximo(codigos, b)
            acumular(b["texto"], brutos[alvo["codigo"]])

    fichas, todos_avisos = {}, []
    for cod, bruto in brutos.items():
        f, avisos = resolver(bruto)
        if f:  # descarta código sem nenhuma medida
            f["_pagina"] = paginas[cod]
            fichas[cod] = f
        todos_avisos += [f"{cod} (p{paginas[cod]}): {a}" for a in avisos]

    # Avulsos transcritos à mão (ver comentário junto da tabela AVULSOS)
    for slug, (larg, comp, pag) in AVULSOS.items():
        fichas[slug] = {"larguraM": larg, "comprimentoM": comp, "_pagina": pag}

    # Faixa etária — vetorizada no PDF, transcrita na tabela IDADES
    for chave, (imin, imax) in IDADES.items():
        if chave in fichas:
            fichas[chave]["idadeMin"], fichas[chave]["idadeMax"] = imin, imax
        else:
            todos_avisos.append(f"{chave}: idade informada mas produto não encontrado no PDF")

    SAIDA.write_text(json.dumps(fichas, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"produtos com ficha extraída: {len(fichas)}")
    for cod in sorted(fichas):
        f = fichas[cod]
        print(f"  {cod}  p{f['_pagina']:<3} "
              f"{f.get('larguraM')}x{f.get('comprimentoM')}m  "
              f"seg {f.get('segLarguraM')}x{f.get('segComprimentoM')}m  "
              f"{f.get('criancas')} cri  "
              f"{f.get('areaMinimaM2')}/{f.get('areaSegurancaM2')} m²  "
              f"idade {f.get('idadeMin')}-{f.get('idadeMax')}")

    if todos_avisos:
        print("\n⚠️  INCONSISTÊNCIAS NO CATÁLOGO (conferir com o cliente):")
        for a in todos_avisos:
            print(f"  • {a}")

    if paginas_sem_codigo:
        print(f"\n⚠️  páginas com medidas mas SEM código legível (nome é imagem): "
              f"{paginas_sem_codigo}")
    print(f"\nsalvo em {SAIDA}")


if __name__ == "__main__":
    main()
