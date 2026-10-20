# CV public sécurisé

## Objectif

CV premium une page A4, prévisualisation navigateur, impression/PDF locale, présentation 3D optionnelle inspirée de [fimbox/html-in-canvas](https://github.com/fimbox/html-in-canvas), avec séparation stricte public / privé.

## Données

| Fichier | Rôle |
|---------|------|
| `src/cv/data/cv.public.json` | Uniquement des champs explicitement approuvés |
| `private/cv.private.example.json` | Modèle local — ne jamais committer de vraies valeurs |
| `private/cv.private.json` | Local only (gitignored) |

Le frontend public n’importe **jamais** `private/`.

## Contacts publics actuels

Approuvés car déjà présents sur le portfolio public (`src/config/site.ts`) :

- email
- LinkedIn
- GitHub
- localisation régionale `Paris`

Non publiés :

- téléphone → placeholder `[PHONE_PUBLIC_APPROVED]`
- adresse résidentielle
- portrait

## Rideau 3D (html-in-canvas)

Référence : [HtmlCloth](https://github.com/fimbox/html-in-canvas/blob/main/plugins/html-cloth.mjs) et [démo](https://x.com/tokufxug/status/2046044649677316229).

Le plugin original dépend d’ArrivalScript, PlayCanvas et Ammo. L’intégration locale (`src/cv/canvas/HtmlCanvasAdapter.ts`) reprend le même contrat visuel :

- le CV HTML public est la texture du rideau
- physique cloth (Verlet, bord supérieur ancré)
- poke / drag sur le tissu, orbite autour, zoom
- les liens du CV restent cliquables via raycast UV
- texture live si Chrome html-in-canvas (`drawElementImage` / `texElementImage2D`)
- sinon capture locale `html2canvas` (aucun service distant)

La vue papier reste disponible. DOM public uniquement. Téléphone, adresse résidentielle et portrait restent exclus.

## Commandes

```bash
npm run cv:privacy
npm run dev
# ouvrir /fr/cv/ ou /en/cv/
# Vue papier pour la lecture A4
```

## Publication

**Ne pas pousser / déployer** tant que :

1. `npm run cv:privacy` est vert
2. le contenu de `cv.public.json` a été relu manuellement
3. aucune donnée privée n’apparaît dans HTML/PDF générés
4. une autorisation explicite de publication a été donnée
