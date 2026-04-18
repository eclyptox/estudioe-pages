# 🔍 Google Search Console Setup Guide
**Para:** Estudio e  
**Fecha:** 2026-04-18  
**Tiempo estimado:** 30 minutos

---

## 📋 Checklist Pre-Setup

- [ ] Acceso a Google Account (recomendado: crear cuenta separada para SEO)
- [ ] Acceso a dominio estudioe.eu (para verificación DNS o HTML file)
- [ ] Acceso a Google Analytics 4 (opcional pero recomendado)

---

## 🚀 PASO 1: Ir a Google Search Console

1. Abre https://search.google.com/search-console
2. Haz click en **"+ Crear propiedad"**

![GSC Step 1]

---

## PASO 2: Seleccionar tipo de propiedad

**Elige: "Dominio"** (no "Prefijo de URL")

```
Dominio: estudioe.eu
```

Esto incluye todas las variantes (http, https, www, non-www, subdomains).

**Click en "Continuar"**

---

## PASO 3: Verificar propiedad (DNS)

### Opción A: DNS (Recomendado para Cloudflare)

Google te dará un registro TXT como:
```
google-site-verification=abc123xyz789...
```

**Si usas Cloudflare:**

1. Abre Cloudflare Dashboard (https://dash.cloudflare.com)
2. Selecciona dominio: **estudioe.eu**
3. Ve a: **DNS** → **Records**
4. Click en **+ Add record**
5. Configura:
   - Type: **TXT**
   - Name: **@** (o dejar en blanco)
   - Content: **google-site-verification=abc123xyz789...**
   - TTL: **Auto**
6. Click **Save**

**De vuelta en GSC:**
7. Click en **"Verificar"**
8. Espera 1-5 minutos (propagación DNS)
9. GSC confirmará: ✅ Verificación exitosa

### Opción B: HTML file (Si DNS no funciona)

1. Descarga el archivo HTML que GSC proporciona
2. Sube a `/public/` en el proyecto:
   ```
   public/google-site-verification-abc123.html
   ```
3. Build y deploy: `npm run build` + push a main
4. Cloudflare servirá el archivo automáticamente
5. De vuelta en GSC, click **"Verificar"**

**Recomendación:** Usa DNS (Opción A) - es más permanente.

---

## PASO 4: Configuración Inicial

Una vez verificado, GSC te mostrará el dashboard.

### Configuración de dominio preferido

1. Click en **⚙️ Configuración** (abajo a la izquierda)
2. Busca **"Dominio preferido"**
3. Selecciona: **https://estudioe.eu/** (sin www)

(Esto es importante para consolidar todos los datos en una sola versión del dominio)

---

## PASO 5: Enviar Sitemap

1. En GSC, ve a **Sitemaps** (menú izquierdo)
2. En el cuadro de texto, escribe:
   ```
   https://estudioe.eu/sitemap-0.xml
   ```
3. Click en **"Enviar"**
4. Espera a que GSC lo procese

**Qué significa:**
- ✅ **Éxito**: GSC lee el sitemap correctamente
- ⚠️ **Advertencia**: Algunos URLs tienen problemas (revisar "Cobertura")
- ❌ **Error**: Sitemap no accesible o mal formado

Si hay errores, revisa la sección "Cobertura" para detalles.

---

## PASO 6: Monitoreo Inicial

### Sección: Coverage (Cobertura)

Muestra el estado de indexación:
- **Válido**: URLs indexadas correctamente ✅
- **Válido con advertencias**: Indexadas pero con problemas
- **Excluido**: URLs no indexadas (revisar por qué)
- **Error**: URLs con problemas

**Meta:** Mínimo 10 URLs "Válidas"

### Sección: Performance (Rendimiento)

- Clicks: Cuántas veces aparece en SERPs
- Impresiones: Cuántas veces se muestra en búsqueda
- CTR: Click-through rate
- Posición promedio: Ranking

**Meta:**
- Impresiones: 50+ (primer mes)
- Posición: <10 (primeras 10 posiciones)
- CTR: >2% (optimizar con títulos/descripciones si <2%)

---

## PASO 7: Inspeccionar URLs Principales

**Acción:** Verifica que tus páginas clave estén indexadas.

1. Click en **"Inspección de URLs"** (arriba)
2. Escribe cada URL:
   - `https://estudioe.eu/`
   - `https://estudioe.eu/cocinas/`
   - `https://estudioe.eu/javea/`
   - `https://estudioe.eu/moraira/`
   - `https://estudioe.eu/calpe/`

3. Para cada una, GSC mostrará:
   - ✅ **Indexada**: Todo bien
   - ⏳ **En cola para indexación**: Espera 1-2 días
   - ❌ **No indexada**: Revisar por qué

**Si dice "No indexada":**
- Click en **"Solicitar indexación"** para acelerar

---

## PASO 8: Configurar Targeting Geográfico (Opcional)

Como sirves a Dénia y Costa Blanca:

1. Ve a **⚙️ Configuración**
2. Busca **"Geolocalización"**
3. Selecciona: **España**

(Esto ayuda a Google a entender que es un negocio local español)

---

## PASO 9: Monitoreo Mensual

### Lista de revisión semanal:

**Lunes de cada semana:**
- [ ] Revisar "Performance" - ¿Hay impresiones nuevas?
- [ ] Revisar "Coverage" - ¿Hay errores nuevos?
- [ ] Revisar "Core Web Vitals" - ¿Estado OK?

**Último viernes del mes:**
- [ ] Export de datos de Performance (para dashboard)
- [ ] Revisar keywords top 10
- [ ] Anotar cambios en posiciones

---

## 🎯 KPIs a Monitorear

| Métrica | Baseline (Mes 1) | Target (Mes 3) | Target (Mes 6) |
|---------|-----------------|-----------------|-----------------|
| Impresiones | - | 200+ | 500+ |
| Clicks | - | 10+ | 50+ |
| Posición promedio | - | <10 | <5 |
| URLs indexadas | 10+ | 10 | 10 |

---

## ❓ Solución de problemas

### "Mi sitemap no aparece"
1. Verifica que `https://estudioe.eu/sitemap-0.xml` sea accesible
2. Abre en navegador, debe mostrar XML
3. Espera 24h para reindexar

### "Las URLs no se indexan"
1. Revisa "Coverage" → "Excluido" → por qué
2. Causas comunes:
   - Noindex en meta robots
   - Redireccionamiento
   - Duplicate (revisar canonical)
3. Si es error, abre "Detalles" para solución

### "Bajo CTR (<2%)"
1. Revisa títulos y meta descriptions en Search Console
2. Haz clic en la query → "Páginas"
3. Identifica cuál tiene bajo CTR
4. Mejora el título/descripción en el código
5. Deploy y espera 1-2 semanas

---

## 📝 Notas importantes

- **Frecuencia de revisión:** Semanal (30 min) + Mensual (1 hora)
- **Tiempo para ver datos:** GSC tarda 24-48h para datos nuevos
- **URLs indexadas:** No se indexan al instante; espera 3-7 días
- **Posiciones:** No cambian rápido; revisa cada 2 semanas
- **Errores:** Si no se resuelven en 7 días, revisar causa raíz

---

## 🔐 Seguridad & Acceso

- **Propietario:** Tu cuenta Google (recomendado: cuenta de empresa)
- **Compartir acceso:** Settings → Usuarios e Permisos → Agregar usuario
- **No compartir credenciales:** Usa acceso de Google, no contraseña

---

**Documento creado:** 2026-04-18  
**Para:**  Estudio e  
**Próximo paso:** GA4 Setup Guide
