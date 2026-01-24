# 🔍 Debug CORS - Guide de Dépannage

## Problème: Erreur CORS en Production

### Ce qui a été corrigé

1. ✅ Le code CORS ne lance plus d'erreur HTTP 500
2. ✅ Ajout de logs pour voir les origines autorisées
3. ✅ Trim automatique des espaces dans ALLOWED_ORIGINS

## 🔧 Vérifications sur Coolify

### 1. Vérifier que la variable est bien définie

Dans Coolify → Logs, au démarrage du serveur, vous devriez voir:

```
🔒 CORS - Origines autorisées: [ 'https://nutrition.goshop.africa' ]
```

Si vous voyez autre chose, la variable n'est pas correctement définie.

### 2. Format correct de ALLOWED_ORIGINS

**Correct:**
```env
ALLOWED_ORIGINS=https://nutrition.goshop.africa
```

**Avec plusieurs origines:**
```env
ALLOWED_ORIGINS=https://nutrition.goshop.africa,http://localhost:3000
```

**❌ Incorrect (espaces):**
```env
ALLOWED_ORIGINS=https://nutrition.goshop.africa, http://localhost:3000
```

### 3. Vérifier les logs en temps réel

Quand une requête arrive, vous verrez dans les logs:

**Si autorisée:**
```
✅ CORS - Origin autorisée: https://nutrition.goshop.africa
```

**Si refusée:**
```
❌ CORS - Origin refusée: https://other-domain.com
   Origines autorisées: [ 'https://nutrition.goshop.africa' ]
```

## 🧪 Tests CORS

### Test 1: Vérifier depuis le navigateur

Ouvrez la console du navigateur (F12) et exécutez:

```javascript
fetch('https://votre-api.coolify.app/health', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log('✅ API OK:', data))
.catch(err => console.error('❌ Erreur:', err));
```

### Test 2: Vérifier les headers CORS

```bash
curl -H "Origin: https://nutrition.goshop.africa" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://votre-api.coolify.app/api/calculate \
     -v 2>&1 | grep -i "access-control"
```

Vous devriez voir:
```
< Access-Control-Allow-Origin: https://nutrition.goshop.africa
< Access-Control-Allow-Credentials: true
```

### Test 3: Test simple GET

```bash
curl -H "Origin: https://nutrition.goshop.africa" \
     https://votre-api.coolify.app/health \
     -i
```

## 🐛 Problèmes Courants

### Problème 1: Variable ALLOWED_ORIGINS non lue

**Symptôme:** Logs montrent `[ 'http://localhost:3000', 'http://localhost:3001', 'https://nutrition.goshop.africa' ]`

**Cause:** La variable d'environnement n'est pas définie

**Solution:**
1. Vérifier dans Coolify → Variables d'environnement
2. S'assurer qu'il n'y a pas de faute de frappe: `ALLOWED_ORIGINS` (tout en majuscules)
3. Redéployer après avoir ajouté la variable

### Problème 2: Protocol mismatch

**Symptôme:** Erreur CORS même avec la bonne origine

**Cause:** Différence entre http:// et https://

**Solution:**
```env
# Si votre frontend est en HTTPS, utilisez HTTPS
ALLOWED_ORIGINS=https://nutrition.goshop.africa

# Si en développement local (HTTP)
ALLOWED_ORIGINS=http://localhost:3000,https://nutrition.goshop.africa
```

### Problème 3: Trailing slash

**Symptôme:** CORS bloqué même avec la bonne URL

**Cause:** L'origin peut inclure ou non un trailing slash

**Solution:** Pas de trailing slash dans ALLOWED_ORIGINS
```env
# ✅ Correct
ALLOWED_ORIGINS=https://nutrition.goshop.africa

# ❌ Incorrect
ALLOWED_ORIGINS=https://nutrition.goshop.africa/
```

### Problème 4: Sous-domaine www

**Symptôme:** Fonctionne sur `nutrition.goshop.africa` mais pas sur `www.nutrition.goshop.africa`

**Solution:** Ajouter les deux:
```env
ALLOWED_ORIGINS=https://nutrition.goshop.africa,https://www.nutrition.goshop.africa
```

### Problème 5: Cache navigateur

**Symptôme:** L'erreur persiste même après correction

**Solution:**
1. Vider le cache du navigateur
2. Ou tester en mode navigation privée
3. Ou faire Ctrl+Shift+R (hard refresh)

## 📝 Checklist de Débogage

Suivez ces étapes dans l'ordre:

- [ ] **Vérifier les logs Coolify** - Chercher "🔒 CORS - Origines autorisées"
- [ ] **Vérifier ALLOWED_ORIGINS** - Pas d'espaces, bon protocol (https)
- [ ] **Redéployer** - Après modification de variables
- [ ] **Vider cache navigateur** - Ctrl+Shift+R
- [ ] **Tester avec curl** - Vérifier headers Access-Control
- [ ] **Vérifier console navigateur** - Voir le message d'erreur exact

## 🔍 Messages d'Erreur Communs

### "has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause:** L'API ne retourne pas le header CORS

**Solution:**
1. Vérifier que le serveur est démarré
2. Vérifier les logs pour voir si la requête arrive
3. Vérifier que `app.use(cors(corsOptions))` est avant les routes

### "has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header must not be '*'"

**Cause:** Utilisation de wildcard avec credentials

**Solution:** C'est déjà corrigé dans le code (on utilise origin spécifique)

### "Access to fetch at '...' from origin '...' has been blocked"

**Cause:** L'origine n'est pas dans ALLOWED_ORIGINS

**Solution:**
1. Vérifier l'URL exacte du frontend (avec ou sans www)
2. Ajouter cette URL dans ALLOWED_ORIGINS
3. Redéployer

## 🚀 Solution Rapide

Si rien ne fonctionne, faire un reset complet:

```bash
# 1. Sur Coolify, dans les variables d'environnement:
ALLOWED_ORIGINS=https://nutrition.goshop.africa

# 2. Redéployer complètement
# Coolify → Deploy

# 3. Vérifier les logs au démarrage
# Chercher: "🔒 CORS - Origines autorisées"

# 4. Tester avec curl
curl -H "Origin: https://nutrition.goshop.africa" \
     https://votre-api.coolify.app/health -i

# 5. Vérifier que vous voyez:
# Access-Control-Allow-Origin: https://nutrition.goshop.africa
```

## 📞 Si ça ne fonctionne toujours pas

Collectez ces informations:

1. **Logs Coolify** - Les 50 dernières lignes au démarrage
2. **Commande curl** - Le résultat complet de:
   ```bash
   curl -H "Origin: https://nutrition.goshop.africa" \
        https://votre-api.coolify.app/health -v
   ```
3. **Console navigateur** - Le message d'erreur CORS exact
4. **Variables d'environnement** - Screenshot (masquer secrets)

Avec ces informations, on pourra identifier le problème exact.
