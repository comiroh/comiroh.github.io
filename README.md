# Site public COMIROH — Notes de déploiement

## Contenu du dossier
```
comiroh-site/
├── index.html            (Accueil)
├── presentation.html      (Présentation / Direction)
├── programmes.html        (Cycles et matières)
├── contact.html           (Coordonnées + formulaire)
├── preinscription.html    (Formulaire de préinscription)
├── css/style.css
└── js/script.js
```

## Mettre le site en ligne
Ce sont des fichiers statiques : aucune installation n'est nécessaire.
- **Le plus simple** : déposer tout le dossier `comiroh-site` sur un hébergement mutualisé (via FTP/cPanel), sur Netlify, Vercel ou GitHub Pages — glisser-déposer suffit sur Netlify.
- Un nom de domaine du type `comiroh.edu.ht` ou `comiroh.org` renforcerait la crédibilité de l'établissement.

## À faire avant publication (important)
1. ✅ **Coordonnées réelles** — logo officiel, adresse, téléphones, WhatsApp, e-mail, horaires, Google Maps et Facebook sont maintenant intégrés sur tout le site.
2. ✅ **Chiffres clés de la page d'accueil** — mis à jour avec les données confirmées : 800+ élèves, 52 enseignants, 16 classes, 3 cycles.
3. **Formulaires (Contact et Préinscription)** — ✅ **branchés sur Formspree**, vers l'adresse `dessaline2015@gmail.com` :
   - Contact → `https://formspree.io/f/xppaydkr`
   - Préinscription → `https://formspree.io/f/mzepjroz`
   Chaque soumission valide côté site est envoyée par e-mail. Pensez à :
   - **Confirmer l'e-mail de vérification** que Formspree envoie après le tout premier test de soumission (sinon les messages suivants ne sont pas livrés) ;
   - **Vérifier les pièces jointes** (photo, bulletin) : selon le plan Formspree utilisé (gratuit ou payant), les fichiers joints peuvent être limités en taille ou en nombre par mois — à tester avec un vrai fichier avant publication ;
   - Si vous voulez plus tard alimenter directement une base de données au lieu d'un e-mail, on pourra brancher ces mêmes formulaires sur le futur backend Laravel/Django décrit dans votre document d'architecture.
4. ✅ **Photos de la direction** — le PDG (Luckson Merat) et le Directeur Pédagogique (Gesler ELISMA) apparaissent maintenant sur la page Présentation ; la photo du Directeur Pédagogique figure aussi sur l'accueil.
5. ✅ **Carte** — le lien « Voir COMIROH sur Google Maps » pointe désormais vers votre localisation réelle.
6. **Logo** — le fichier `images/logo.jpg` a un fond blanc ; si vous obtenez un jour une version à fond transparent (PNG), elle s'intégrera encore mieux dans l'en-tête bleu marine.

## Compléments ajoutés
- 4e cycle **Formation Professionnelle** intégré partout (accueil, page Programmes) avec 5 filières : Enseignement, Plomberie, Électricité, Cosmétologie, Arts culinaires — durées, horaires et conditions d'admission à préciser par la direction.
- **Nouvelle page d'accueil** (v2) : hero avec accroche « Former aujourd'hui les leaders de demain », section « Pourquoi choisir COMIROH », 6 niveaux d'enseignement, section « Notre approche pédagogique », actualités, section Vie scolaire (ancre `#vie-scolaire`), tout dans le style navy/or existant.
- **Menu mis à jour** sur toutes les pages : Accueil, Présentation, Programmes, Admission/Préinscription, Vie scolaire, Contact, bouton « Se préinscrire ».
- **Nouvelle page `mentions-legales.html`** — modèle générique à faire relire/compléter avant publication (voir l'encadré en haut de la page).
- **Photo de couverture (hero)** : le hero est prêt à afficher une vraie photo de l'école. Ajoutez simplement un fichier `images/hero.jpg` (photo de l'établissement ou d'élèves en situation d'apprentissage) — le voile bleu marine semi-transparent s'appliquera automatiquement par-dessus. Sans ce fichier, un dégradé bleu marine s'affiche à la place (aucune erreur visible).

## Prochaines étapes possibles
- Ajouter des pages Actualités / Galerie une fois que vous aurez du contenu réel (textes, photos) à publier.
- Brancher le formulaire de préinscription sur une vraie base de données (première brique de l'espace Direction/Administration décrit dans votre architecture).
- Ajouter l'espace Parent/Élève/Enseignant sécurisé dans une phase 2, comme prévu dans le document d'architecture complet.
