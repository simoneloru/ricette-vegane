# 🌱 Ricette Vegane

Questo sito è il tuo ricettario digitale, facile da aggiornare e bellissimo da vedere.

## Come aggiungere una ricetta

Tutto vive nella cartella `src/notes`. Ogni ricetta è un semplice file di testo (Markdown).

1.  Crea un file `.md` dentro `src/notes`, es: `torta-cioccolato.md`.
2.  Incolla questa struttura all'inizio del file (si chiama Frontmatter):

```yaml
---
title: "Torta al Cioccolato"
date: "2024-01-02"
image: "https://link-immagine.com/torta.jpg"
tags: ["Dolce", "Cioccolato", "Veloce"]
difficulty: "Facile"
time: "40 min"
servings: 8
description: "La torta più soffice del mondo."
ingredients:
  - "300g Farina 00"
  - "200g Zucchero"
  - "50g Cacao Amaro"
---
```

3.  Sotto, scrivi il procedimento come un normale testo. Puoi usare **grassetto**, liste, etc.

## ⚡️ Workflow Consigliato con Obsidian

Per rendere tutto facilissimo e non toccare mai il terminale:

1.  Apri questa cartella (`RicetteVegane`) come "Vault" in Obsidian.
2.  Installa il plugin della community **"Obsidian Git"**.
3.  Configuralo per fare il backup automatico (es. ogni 10 minuti) o usa il comando "Obsidian Git: Commit files and push" quando hai finito di scrivere.

In questo modo, ti basta scrivere la ricetta in Obsidian, aspettare il salvataggio automatico (o premere una scorciatoia), e il sito si aggiornerà da solo!

## Come Pubblicare (Prima Volta)

1.  Crea una nuova repository **vuota** su GitHub.
2.  Carica questi file (se sai usare il terminale):
    ```bash
    git remote add origin <URL_DELLA_TUA_REPO>
    git branch -M main
    git push -u origin main
    ```
3.  Attiva **GitHub Pages** (Settings -> Pages -> Source: GitHub Actions).

### Per testare in locale (sul tuo Mac)
Se vuoi vedere il sito mentre lo modifichi:
```bash
npm run dev
```
Apri il link che appare (solitamente http://localhost:5173).

