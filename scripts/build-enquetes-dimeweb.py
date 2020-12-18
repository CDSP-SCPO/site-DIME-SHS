#!/usr/bin/env python3
import csv

def print_project(p, lang, f):
    title = p["title"]
    if p["description_%s" % lang]:
        if lang == "en":
            title += ": "
        else:
            title += " : "
        title += p["description_%s" % lang]
    print("- title: \"%s\"" % title, file=f)
    print("  date: %s" % p["date"], file=f)
    print("  authors:", file=f)
    for a in p["authors"].split("\n"):
        print("  - %s" % a.strip(), file=f)
    if p["lien_web"]:
        print("  lien_web: %s" % p["lien_web"], file=f)


with open("data/dime-web.csv") as f:
    projects = list(csv.DictReader(f))


with open("data/enquetes/dime-web.fr.yml", "w") as fr, open("data/enquetes/dime-web.en.yml", "w") as en:
    print("title: Projets accompagnés par Dime Web", file=fr)
    print("title: Projects supported by Dime Web", file=en)
    print("items:", file=fr)
    print("items:", file=en)
    for p in projects:
        for f in p:
            p[f] = p[f].strip()
        print_project(p, "fr", fr)
        print_project(p, "en", en)

