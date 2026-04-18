# ⚠️ GSC Analysis - Datos Reales & Problemas Urgentes

**Fecha:** 2026-04-18  
**Período analizado:** Marzo 15 - Abril 16, 2026  
**Fuente:** Google Search Console export

---

## 🚨 Hallazgos Críticos

### 1. CAÍDA DRÁSTICA EN RANKINGS (25 Marzo - 6 Abril)

**Gráfico temporal:**
```
Mid-March:   Posición promedio 9-14 ✅
Late March:  Posición promedio 75+ ❌ (CAÍDA CRÍTICA)
Early April: Posición promedio 45-70 ⚠️
Mid-April:   Posición promedio 13-21 ↗️ (Recuperación lenta)
```

**Análisis:**
- 25-31 Marzo: Caída de 60+ posiciones en pocos días
- Algo cambió técnicamente el sitio alrededor de esa fecha
- Recuperación desde 8 Abril pero aún no al nivel anterior

**Causa probable:**
- Cambio en robots.txt
- Cambio en canonical tags
- Cambio en sitemap
- Cambio de estructura de URLs
- Cambio de servidor/hosting

⚠️ **ACCIÓN:** Revisar git log entre 20-31 Marzo para identificar qué cambió.

---

## 📊 Keywords Actuales (GSC Data)

### Top Performers (Con clicks)
| Keyword | Clics | Impresiones | CTR | Posición | Status |
|---------|-------|------------|-----|----------|--------|
| estudio e | 2 | 20 | 10% | 5.5 | ✅ BIEN |
| estudioe | 1 | 7 | 14.29% | 4.29 | ✅ BIEN |

**Total: 3 clicks, 27 impresiones**

### Medium (Rankea pero sin clicks)
| Keyword | Clics | Impresiones | CTR | Posición | Problema |
|---------|-------|------------|-----|----------|----------|
| muebles de cocina en denia | 0 | 32 | 0% | 6.84 | ⚠️ Title/desc no atrae |
| cocina denia | 0 | 22 | 0% | 14.18 | ⚠️ Página incorrecta |
| tienda de cocinas en denia | 0 | 15 | 0% | 13.93 | ⚠️ Página incorrecta |
| diseño cocinas denia | 0 | 14 | 0% | 14.14 | ⚠️ Página incorrecta |
| cocinas en denia | 0 | 11 | 0% | 10.73 | ⚠️ Página incorrecta |

**Patrón:** Todas estas keywords tiene 0% CTR = Google muestra pero usuario no hace click

### Poor (Posiciones bajas, sin clicks)
| Keyword | Clics | Impresiones | CTR | Posición | Problema |
|---------|-------|------------|-----|----------|----------|
| estudio interiorismo denia | 0 | 29 | 0% | 55.45 | ❌ MUY ATRÁS |
| interiorista denia | 0 | 24 | 0% | 59.12 | ❌ MUY ATRÁS |
| interiorismo denia | 0 | 23 | 0% | 57.83 | ❌ MUY ATRÁS |

**Patrón:** Estas son nuestras PRINCIPALES keywords pero están en posición 55+ (página 6)

---

## 🔴 PROBLEMAS TÉCNICOS

### Problema #1: Duplicación www vs non-www

**URLs encontradas:**
- `http://www.estudioe.eu/` — 6 clicks, 188 impresiones, posición **11** ✅
- `https://estudioe.eu/` — 4 clicks, 83 impresiones, posición **32** ❌

**Impacto:**
- Google ve AMBAS como páginas separadas
- Authority se split entre 2 versiones
- La versión www está rankeando mejor (posición 11) pero con posición promedio baja
- La versión non-www está penalizada (posición 32)

**Causa probable:**
- Falta redirect permanente (301) de www a non-www
- O canonical tag no está claro

**Solución:**
- Verificar `_redirects` en Cloudflare
- Asegurar que www → non-www redirige con 301
- Verificar canonical tag en HTML apunta a versión correcta

---

### Problema #2: Trailing Slash Duplicación

**URLs encontradas:**
- `https://estudioe.eu/contact` — 1 click, 7 impresiones, posición **16.71** ✅
- `https://estudioe.eu/contact/` — 0 clicks, 54 impresiones, posición **54.65** ❌

**Impacto:**
- /contact/ está en posición 54 con 54 impresiones pero **0% CTR**
- Google está mostrando la página en búsqueda pero posición 54 = página 6
- Usuario no hace click porque está muy atrás

**Causa:**
- Inconsistencia en trailing slashes
- Ambas versiones indexadas como páginas diferentes

**Solución:**
- Decidir: ¿con trailing slash o sin?
- Implementar redirect 301 consistente
- Asegurar canonical apunta a versión preferida

---

### Problema #3: Páginas Internas NO Indexadas

**URLs que NO aparecen en GSC:**
- `/cocinas/` ❌
- `/javea/` ❌
- `/moraira/` ❌
- `/calpe/` ❌
- `/oliva/` ❌
- `/gandia/` ❌
- `/about/` ❌

**Patrón:** Solo homepage y /contact aparecen. Todas las páginas internas están FUERA de GSC.

**Causa probable:**
1. robots.txt bloquea estas páginas
2. Páginas tienen noindex meta tag
3. Páginas no están linkeadas desde homepage
4. Páginas son demasiado nuevas (aún no crawleadas)

**Solución:**
1. Revisar robots.txt - debe permitir `/cocinas/`, `/javea/`, etc
2. Revisar HTML - debe NOT tener `<meta name="robots" content="noindex">`
3. Agregar links a estas páginas desde homepage y sitemap
4. Solicitar indexación en GSC manualmente

---

## 📈 CTR Analysis (Por qué 0% en keywords que rankean)

Todas estas keywords tienen 0% CTR:
- "muebles de cocina en denia" (posición 6.84, 32 impresiones)
- "cocina denia" (posición 14.18, 22 impresiones)
- "tienda de cocinas en denia" (posición 13.93, 15 impresiones)

**¿Por qué 0% CTR?**
- Título no es atractivo
- Meta description no es atractiva
- Página que rankea es INCORRECTA para esa keyword
- Usuario ve resultado pero no hace click

**Solución:** Ir a GSC → Performance → click keyword → "Páginas" → Ver cuál página está rankeando → Optimizar título/description de ESA página

---

## ✅ PLAN DE ACCIÓN URGENTE

### Fase 1: Diagnóstico (Hoy)
1. [ ] Revisar git log 20-31 Marzo para causa de caída
2. [ ] Verificar `_redirects` - ¿está redirigiendo www → non-www?
3. [ ] Verificar `_headers` - ¿está en lugar correcto?
4. [ ] Revisar canonical tag en homepage - ¿apunta a versión correcta?
5. [ ] Revisar robots.txt - ¿está bloqueando `/cocinas/`, `/javea/`, etc?
6. [ ] Revisar HTML head - ¿hay noindex tags accidentales?

### Fase 2: Fixes Técnicos (Esta semana)
1. [ ] Implementar redirect 301: www → non-www
2. [ ] Implementar redirect 301: /contact → /contact/
3. [ ] Asegurar canonical tags en TODAS páginas
4. [ ] Verificar robots.txt permite todas las páginas principales
5. [ ] Remover cualquier noindex meta tag
6. [ ] Build + Deploy a Cloudflare

### Fase 3: Re-indexación (Después de deploy)
1. [ ] Aguardar 24-48h para Google recrawl
2. [ ] En GSC → Url Inspection → Inspeccionar cada página interna
3. [ ] Si no indexada → Click "Request indexation"
4. [ ] Monitorear posiciones durante 2 semanas

### Fase 4: CTR Optimization (Semana 2-3)
1. [ ] GSC → Performance → Ver cada keyword
2. [ ] Para cada keyword → Páginas → Identificar cuál página rankea
3. [ ] Optimizar TITLE y META DESCRIPTION de esa página
4. [ ] Target: mínimo 3-5% CTR en posiciones <20

---

## 📋 Checklist de Datos GSC

**Total Keywords vistas:** 27  
**Keywords con clicks:** 2 (branded only)  
**Keywords sin clicks:** 25 (0% CTR)  

**Total Clics:** 3  
**Total Impresiones:** 464  
**Promedio CTR:** 0.65%  
**Promedio Posición:** 25.5  

**Dato inquietante:** Solo 3 clicks en últimas 4-5 semanas. Normal para startup pero Google AÚN NO confía en el sitio.

---

## ⏰ Timeline Recomendado

- **Hoy (18 Abril):** Diagnóstico causa caída
- **Mañana (19 Abril):** Implementar fixes técnicos
- **20 Abril:** Deploy a producción
- **21-25 Abril:** Aguardar recrawl de Google
- **26 Abril:** Revisar posiciones actualizadas
- **Semana 2:** Optimizar CTR

---

**Documento generado:** 2026-04-18  
**Próxima revisión:** 2026-04-25 (después de Google recrawl)  
**Prioridad:** CRÍTICA
