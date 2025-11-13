# 🎨 Design du site "Bien gérer son argent"

## 📋 Aperçu

Ce site a été créé dans le cadre de la **Journée Oser Tous les Métiers (JOM)** pour sensibiliser les adolescents à la gestion financière.

Le design a été pensé pour être :
- ✨ **Moderne et doux** : Couleurs pastel et chaleureuses
- 💡 **Accessible** : Facile à lire et à comprendre
- 🎯 **Authentique** : Garde l'esprit d'un site fait par une jeune fille
- 📱 **Responsive** : Fonctionne sur tous les écrans

---

## 🎨 Palette de couleurs

### Couleurs principales
- **Crème** (`#FAF7F0`) - Fond principal
- **Beige** (`#F5EFE6`) - Éléments secondaires
- **Gris chaud** (`#D8C4B6`) - Bordures et accents
- **Bleu doux** (`#8BA5C3`) - Titres et boutons principaux
- **Vert doux** (`#A8DADC`) - Succès et éléments positifs
- **Corail** (`#F4978E`) - Alertes douces et mots importants

### Couleurs d'accent
- **Orange chaud** (`#F4A261`) - Avertissements
- **Rouge doux** (`#E76F51`) - Dangers

---

## 🖼️ Images utilisées

### Bannière principale
- **Source** : Unsplash (photo libre de droit)
- **Thème** : Carnet et stylo (représente la planification financière)
- **URL** : `https://images.unsplash.com/photo-1554224311-beee460ae6fb`

Les images Unsplash sont gratuites et peuvent être utilisées sans attribution, mais tu peux en changer si tu veux !

### Comment changer la bannière ?
1. Va sur [Unsplash](https://unsplash.com)
2. Cherche des mots-clés comme : "student studying", "budget planning", "teenager writing", "savings"
3. Copie l'URL de l'image
4. Dans `style.css`, trouve la ligne `header {` et remplace l'URL dans `url('...')`

---

## ✍️ Typographie

**Police principale** : [Inter](https://fonts.google.com/specimen/Inter)
- Police moderne et très lisible
- Utilisée par de nombreux sites actuels
- Gratuite sur Google Fonts

### Tailles de texte
- **Titre principal (h1)** : 3.2em
- **Titres de section (h2)** : 2.2em
- **Sous-titres (h3)** : 1.6em
- **Texte normal** : 1.05em
- **Texte courant** : 16px (base)

---

## 🎯 Éléments du design

### Cartes
- Coins arrondis (20px)
- Ombres douces
- Bordures subtiles
- Hover effect léger (remonte de 3px)

### Boutons
- Coins arrondis (12px)
- Couleurs cohérentes avec la palette
- Effet au survol : remonte et change de couleur
- Police : Inter 600 (semi-bold)

### Onglets
- Navigation claire en haut
- Onglet actif : fond bleu doux
- Onglets inactifs : fond beige
- Transition douce entre les onglets

---

## 📱 Responsive

Le site s'adapte automatiquement aux petits écrans :
- Les colonnes se mettent en 1 colonne sur mobile
- Les onglets passent en vertical
- Le texte reste lisible
- Les espacements sont réduits mais gardent de l'air

---

## 🛠️ Personnalisation

### Changer les couleurs
Toutes les couleurs sont définies au début de `style.css` dans les **variables CSS** :

```css
:root {
    --color-cream: #FAF7F0;    /* Change ici pour modifier le fond */
    --color-soft-blue: #8BA5C3; /* Change ici pour modifier les titres */
    /* etc... */
}
```

C'est pratique car si tu changes une couleur ici, elle change partout automatiquement !

### Ajouter des images
Tu peux ajouter des images décoratives dans les sections :

```html
<img src="ton-image.jpg" alt="Description" style="width: 100%; border-radius: 16px; margin: 20px 0;">
```

### Modifier les espacements
Les espacements sont aussi des variables :
- `--spacing-xs` : 8px (petit)
- `--spacing-sm` : 16px (moyen)
- `--spacing-md` : 24px (normal)
- `--spacing-lg` : 40px (grand)
- `--spacing-xl` : 60px (très grand)

---

## 💡 Conseils pour la suite

### Bonnes pratiques respectées
✅ Code organisé et commenté
✅ Variables CSS pour faciliter les modifications
✅ Design cohérent sur tout le site
✅ Accessible (bon contraste, texte lisible)
✅ Responsive (fonctionne sur mobile)

### Si tu veux aller plus loin
- Ajoute plus de photos dans les sections
- Crée des icônes personnalisées
- Ajoute des animations douces
- Teste le site sur différents appareils

---

## 📚 Ressources utiles

### Images gratuites
- [Unsplash](https://unsplash.com) - Photos professionnelles
- [Pexels](https://www.pexels.com) - Photos et vidéos
- [Pixabay](https://pixabay.com) - Images libres

### Couleurs
- [Coolors](https://coolors.co) - Générateur de palettes
- [Adobe Color](https://color.adobe.com) - Roue chromatique

### Polices
- [Google Fonts](https://fonts.google.com) - Polices gratuites
- [Font Pair](https://www.fontpair.co) - Combinaisons de polices

---

## 🎉 Résultat

Le site est maintenant :
- **Doux et accueillant** avec des couleurs pastel
- **Moderne** avec une typographie actuelle
- **Professionnel mais authentique** - pas "template IA"
- **Facile à modifier** grâce aux variables CSS
- **Prêt pour GitHub Pages** !

Bon courage pour la présentation ! 🚀

