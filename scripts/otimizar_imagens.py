# -*- coding: utf-8 -*-
"""
Pipeline de otimizacao de imagens Parkelo.
Le C:\PARKELO\IMGS -> gera C:\PARKELO\site\public\img\products\... em WebP (3 tamanhos)
e um manifesto products.json com categoria/produto/vistas/cores.
Nao altera nenhum arquivo original.
"""
import json, os, re, sys, unicodedata
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path
from PIL import Image

SRC = Path(r"C:\PARKELO\IMGS")
LOGO = Path(r"C:\PARKELO\LOGO\parkelo.png")
OUT = Path(r"C:\PARKELO\site\public\img")
SIZES = {"sm": 480, "md": 900, "lg": 1600}
QUALITY = {"sm": 78, "md": 82, "lg": 82}
METHOD = 4  # 6 = menor arquivo porém ~3x mais lento; 4 fica a ~2% do tamanho
WORKERS = max(2, (os.cpu_count() or 4) - 1)

CATS = {
    "playgrounds": {"nome": "Playgrounds", "ordem": 1},
    "little-play": {"nome": "Little Play", "ordem": 2},
    "tematicos":   {"nome": "Tem\u00e1ticos", "ordem": 3},
    "aquaticos":   {"nome": "Aqu\u00e1ticos", "ordem": 4},
    "avulsos":     {"nome": "Brinquedos Avulsos", "ordem": 5},
    "mobiliario":  {"nome": "Mobili\u00e1rio", "ordem": 6},
}

CORES = ["amarelo", "azul", "laranja", "verde", "vermelho", "roxo"]

VIEW_RULES = [
    ("perspectiva", ("perspectiva",), 0),
    ("frontal",     ("frontal",),     1),
    ("lateral",     ("lateral", "direita", "esquerda"), 2),
    ("posterior",   ("posterior",),   3),
    ("superior",    ("superior",),    4),
]


def slug(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def classify(fname: str):
    low = slug(fname)
    for view, keys, prio in VIEW_RULES:
        for k in keys:
            if k in low:
                m = re.search(re.escape(k) + r"-(\d+)", low)
                n = int(m.group(1)) if m else 1
                return view, prio, n
    return "render", 5, 1


def cor_de(fname: str):
    low = slug(fname)
    for c in CORES:
        if re.search(r"(^|-)" + c + r"($|-)", low):
            return c
    return None


def limpar_nome(raw: str) -> str:
    """'Bal\u00e2n\u00e7o ninho - padr\u00e3o' -> 'Balan\u00e7o Ninho'"""
    s = raw
    for lixo in [" - padr\u00e3o", " - renders", " - render", " roto", " - 2026", " padr\u00e3o"]:
        s = re.sub(re.escape(lixo) + r"$", "", s, flags=re.I)
    s = s.replace("_", " ").strip(" -")
    palavras_min = {"de", "da", "do", "e", "com", "sem", "a", "o", "em", "para"}
    # siglas que devem continuar em caixa alta (o resto vira Capitalizado)
    siglas = {"LIBRAS", "MP", "KMP", "KLP", "KAQ", "ABNT", "UV", "3D"}
    out = []
    for i, w in enumerate(s.split()):
        if w.upper() in siglas:
            out.append(w.upper())
        elif w.lower() in palavras_min and i > 0:
            out.append(w.lower())
        else:
            out.append(w[:1].upper() + w[1:].lower())
    return " ".join(out)


def pngs(d: Path):
    ok = []
    for f in sorted(d.iterdir()):
        if f.is_file() and f.suffix.lower() in (".png", ".jpg", ".jpeg"):
            if f.name.lower().startswith("retoque"):
                continue
            ok.append(f)
    return ok


def subdirs(d: Path):
    return sorted([x for x in d.iterdir() if x.is_dir()])


def descobrir():
    """Retorna lista de produtos: {cat, codigo, nome, slug, arquivos:[Path]}"""
    prods = []

    def add(cat, nome, sl, files, codigo=None):
        if files:
            prods.append({"cat": cat, "codigo": codigo, "nome": nome,
                          "slug": sl, "arquivos": files})

    # 1. Playgrounds KMP  (somente arquivos diretos; ignora duplicatas aninhadas em kmp 0502)
    base = SRC / "PLAYGROUNDS" / "kmp roto"
    if base.exists():
        for d in subdirs(base):
            m = re.search(r"(\d{4})", d.name)
            if not m:
                continue
            cod = "KMP " + m.group(1)
            add("playgrounds", cod, slug(cod), pngs(d), cod)

    # 2. Little Play KLP
    base = SRC / "LITTLE" / "KLP roto"
    if base.exists():
        for d in subdirs(base):
            m = re.search(r"(\d{4})", d.name)
            if not m:
                continue
            cod = "KLP " + m.group(1)
            add("little-play", cod, slug(cod), pngs(d), cod)

    # 3. Aquaticos KAQ
    base = SRC / "AQUATICOS" / "KAQ - renders"
    if base.exists():
        for d in subdirs(base):
            m = re.search(r"(\d{4})", d.name)
            if not m:
                continue
            cod = "KAQ " + m.group(1)
            add("aquaticos", cod, slug(cod), pngs(d), cod)

    # 4. Tematicos
    base = SRC / "TEMATICOS"
    if base.exists():
        for d in subdirs(base):
            nome = limpar_nome(d.name)
            add("tematicos", nome, slug(nome), pngs(d))

    # 5/6. Avulsos + Mobiliario
    base = SRC / "AVULSOS" / "Avulsos e pe\u00e7as individuais"
    if base.exists():
        for d in subdirs(base):
            if slug(d.name) == "mobiliario":
                for md in subdirs(d):
                    nome = limpar_nome(md.name)
                    add("mobiliario", nome, slug(nome), pngs(md))
                continue
            filhos = subdirs(d)
            diretos = pngs(d)
            if filhos and not diretos:
                for sd in filhos:  # ex.: assento toddler com/sem corrente
                    nome = limpar_nome(d.name) + " " + limpar_nome(sd.name)
                    add("avulsos", nome, slug(nome), pngs(sd))
            else:
                nome = limpar_nome(d.name)
                add("avulsos", nome, slug(nome), diretos)

    return prods


def processar(job):
    """Worker: 1 imagem de origem -> 3 webp. Pula o que já existe (retomável)."""
    src, dest_dir, nome = Path(job[0]), Path(job[1]), job[2]
    saidas = [dest_dir / f"{nome}-{t}.webp" for t in SIZES]

    if all(p.exists() and p.stat().st_size > 0 for p in saidas):
        with Image.open(saidas[-1]) as c:
            return (nome, c.width, c.height,
                    src.stat().st_size, sum(p.stat().st_size for p in saidas))

    im = Image.open(src)
    im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
    if im.mode == "RGBA":
        bb = im.getbbox()
        if bb:
            pad = int(max(im.width, im.height) * 0.015)
            im = im.crop((max(0, bb[0] - pad), max(0, bb[1] - pad),
                          min(im.width, bb[2] + pad), min(im.height, bb[3] + pad)))

    w = h = 0
    for tag, px in SIZES.items():
        c = im.copy()
        c.thumbnail((px, px), Image.LANCZOS)
        c.save(dest_dir / f"{nome}-{tag}.webp", "WEBP",
               quality=QUALITY[tag], method=METHOD)
        if tag == "lg":
            w, h = c.width, c.height
    return nome, w, h, src.stat().st_size, sum(p.stat().st_size for p in saidas)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "brand").mkdir(exist_ok=True)

    # logo
    lg = Image.open(LOGO).convert("RGBA")
    b = lg.getbbox()
    if b:
        lg = lg.crop(b)
    for tag, px in (("sm", 320), ("md", 640), ("lg", 1200)):
        c = lg.copy()
        c.thumbnail((px, px), Image.LANCZOS)
        c.save(OUT / "brand" / f"logo-{tag}.webp", "WEBP", quality=90, method=6)
    lgp = lg.copy(); lgp.thumbnail((640, 640), Image.LANCZOS)
    lgp.save(OUT / "brand" / "logo.png", "PNG", optimize=True)

    prods = descobrir()
    print(f"produtos encontrados: {len(prods)}", flush=True)

    manifesto = {"categorias": [], "produtos": []}
    for k, v in sorted(CATS.items(), key=lambda x: x[1]["ordem"]):
        manifesto["categorias"].append({"slug": k, "nome": v["nome"], "ordem": v["ordem"]})

    # ── monta a fila de trabalho ────────────────────────────────────────────
    jobs, plano = [], []
    for p in prods:
        dest = OUT / "products" / p["cat"] / p["slug"]
        dest.mkdir(parents=True, exist_ok=True)

        entradas = []
        for f in p["arquivos"]:
            view, prio, n = classify(f.name)
            entradas.append((prio, n, slug(f.stem), f, view))
        entradas.sort(key=lambda x: (x[0], x[1], x[2]))

        usados, itens = set(), []
        for prio, n, st, f, view in entradas:
            cor = cor_de(f.name)
            key = f"{view}-{n}" + (f"-{cor}" if cor else "")
            base_nome, k = key, 2
            while base_nome in usados:
                base_nome = f"{key}-{k}"; k += 1
            usados.add(base_nome)
            jobs.append((str(f), str(dest), base_nome))
            itens.append({"arquivo": base_nome, "vista": view, "cor": cor})
        plano.append((p, itens))

    print(f"imagens a converter: {len(jobs)} ({WORKERS} processos)", flush=True)

    # ── converte em paralelo ────────────────────────────────────────────────
    dims, total_in, total_out, feitos = {}, 0, 0, 0
    with ProcessPoolExecutor(max_workers=WORKERS) as ex:
        for nome, w, h, sin, sout in ex.map(processar, jobs, chunksize=4):
            total_in += sin
            total_out += sout
            feitos += 1
            dims[nome] = (w, h)
            if feitos % 40 == 0:
                print(f"  {feitos}/{len(jobs)}", flush=True)

    # ── manifesto ───────────────────────────────────────────────────────────
    for p, itens in plano:
        cores = sorted({i["cor"] for i in itens if i["cor"]})
        for i in itens:
            w, h = dims.get(i["arquivo"], (0, 0))
            i["w"], i["h"] = w, h
        manifesto["produtos"].append({
            "slug": p["slug"],
            "codigo": p["codigo"],
            "nome": p["nome"],
            "categoria": p["cat"],
            "cores": cores,
            "imagens": itens,
            "pasta": f"/img/products/{p['cat']}/{p['slug']}",
        })

    with open(OUT.parent.parent / "src" / "data" / "produtos.raw.json", "w", encoding="utf-8") as fh:
        json.dump(manifesto, fh, ensure_ascii=False, indent=2)

    print(f"\nORIGINAL : {total_in/1024/1024:.1f} MB")
    print(f"OTIMIZADO: {total_out/1024/1024:.1f} MB  (3 tamanhos por imagem)")
    print(f"REDUCAO  : {100 - total_out/total_in*100:.1f}%")


if __name__ == "__main__":
    (Path(r"C:\PARKELO\site") / "src" / "data").mkdir(parents=True, exist_ok=True)
    main()
