# L'Ombre — Protocole des 36 Questions & Dynamiques Relationnelles

Application web d'ingénierie relationnelle combinant le protocole psychologique des 36 questions d'Arthur Aron, les tactiques de scénographie et profiler comportemental (Robert Greene, Dutton & Aron), l'arsenal verbal de crise (Chris Voss, mentalisme / cold reading) et la règle Pic-Fin de Kahneman.

## Fonctionnalités

- **4 Grandes Sections Chronologiques** :
  1. **Avant** : Calibrage, architecture physique (Capilano) & Profiler de cibles (Robert Greene).
  2. **Pendant** : Les 36 Questions (Séries I, II, III) avec décryptage tactique de l'ombre, signaux faibles, répliques magnétiques et simulateur de réactions.
  3. **Urgence** : Arsenal verbal d'intervention rapide (Cold reading, techniques de négociation Chris Voss).
  4. **Fin** : Climax avec minuteur immersif de 4 minutes de contact visuel silencieux & Règle Pic-Fin.
- **Design Signature Apple / OpenRouter** :
  - Thème Clair (Light par défaut) & Thème Sombre (OLED Premium).
  - Glassmorphism, cartes spotlight interactives et micro-animations fluides.
  - Moteur audio Web Audio API natif (sans dépendances audio externes).
  - Palette de commandes (`⌘K` / `Ctrl+K`) et Mode Focus Zen (`F`).
  - Interface 100% responsive sur mobile, tablette et desktop.

## Installation & Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en local
npm run dev

# Compiler pour la production
npm run build
```

## Déploiement GitHub Pages

Ce dépôt inclut un workflow GitHub Actions (`.github/workflows/deploy.yml`) qui compile et déploie automatiquement l'application sur GitHub Pages lors de chaque push sur la branche `main`.
