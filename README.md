# 📒 Il Mio Quaderno di Ricette Vegane

Ciao! Ho deciso di spostare online il mio quaderno di ricette per condividerle più facilmente con chi conosco e con chiunque voglia mangiar bene.
L'idea è semplice: un posto unico, facile da consultare e da aggiornare, dove raccogliere i miei piatti preferiti.

## 📝 Come aggiungere una ricetta

Tutto il sito si basa su semplici file di testo nella cartella `src/notes`. Niente database complicati.

Vuoi aggiungere una tua ricetta? Ecco come fare:

1.  Vai nella cartella `src/notes` e crea un nuovo file. Il nome deve finire con `.md` (esempio: `torta-di-mele.md`).
2.  Copia e incolla questa intestazione all'inizio del file (serve per dare titolo, foto e dettagli):

```yaml
---
title: "Torta di Mele"
date: "2024-01-21"
image: "https://link-immagine.com/torta.jpg"
tags: ["Dolce", "Colazione", "Classico"]
difficulty: "Facile"
time: "45 min"
servings: 6
description: "La classica torta della nonna, ma vegana."
ingredients:
  - "300g Farina"
  - "200g Zucchero"
  - "3 Mele"
---
```

3.  Sotto l'intestazione, scrivi la ricetta come preferisci. Aggiungi pure consigli o note personali!

## 🚀 Il metodo veloce (con Obsidian)

Io uso **Obsidian** per scrivere le ricette perché è comodissimo. Se vuoi fare lo stesso:
1.  Apri la cartella del progetto con Obsidian.
2.  Installa il plugin "Obsidian Git".
3.  Configuralo per salvare in automatico.

In questo modo scrivi come se fosse un blocco note e il sito si aggiorna da solo.

## 🤝 Vuoi contribuire?

Se hai una ricetta vegana che dovremmo assolutamente provare, aggiungila pure!

📌 **Piccola regola**: La ricetta deve avere **almeno una foto**! 📸

1.  Fai un **Fork** di questo repository.
2.  Aggiungi il tuo file `.md` seguendo le istruzioni qui sopra (non dimenticare il campo `image`!).
3.  Mandami una **Pull Request**.

Ogni nuova ricetta è benvenuta nel quaderno!

---

### Per chi vuole smanettare (Esecuzione in locale)
Se vuoi provare il sito sul tuo computer:
```bash
npm run dev
```
Il sito si aprirà solitamente su http://localhost:5173.

