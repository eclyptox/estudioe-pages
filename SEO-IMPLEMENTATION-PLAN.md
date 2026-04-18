# 🚀 Plan de Implementación SEO - Estudio e
**Fecha:** 2026-04-18  
**Objetivo:** Mejorar visibilidad en Google Search, AI search, y Google Maps  
**Duración Total:** 6 semanas  
**Responsable:** [TU NOMBRE]

---

## 📅 FASES & TIMELINE

### ⏱️ FASE 1: QUICK WINS (Semana 1)
**Objetivo:** Implementar mejoras de bajo esfuerzo con alto impacto

| # | Tarea | Archivo | Esfuerzo | Impacto | Estado |
|---|-------|---------|----------|---------|--------|
| 1 | Fix alt texts | 8 páginas HTML | 20 min | 🔴 Alto | ⬜ Pending |
| 2 | Add breadcrumb schema | index.html | 5 min | 🟡 Medio | ⬜ Pending |
| 3 | Add FAQ schema | index.html | 15 min | 🟡 Medio | ⬜ Pending |
| 4 | Deploy & test | - | 10 min | ✅ Critical | ⬜ Pending |

**Resultado esperado:** Score SEO 87 → 92/100

---

### 📝 FASE 2: CONTENIDO (Semanas 2-3)
**Objetivo:** Mejorar E-A-T y citability

| # | Tarea | Info del Cliente | Esfuerzo | Plazo |
|---|-------|-----------------|----------|-------|
| 5 | Expandir About page | Bio, credenciales, testimonios | 45 min | Semana 2 |
| 6 | Crear FAQ page | Respuestas a preguntas frecuentes | 30 min | Semana 2 |
| 7 | Agregar datos cuantitativos | Proyectos, años, tiempo promedio | 15 min | Semana 2 |
| 8 | Add Review schema | Testimonios con nombres | 20 min | Semana 3 |

**Resultado esperado:** Score SEO 92 → 95/100, E-A-T signals mejorados

---

### 🗺️ FASE 3: LOCAL SEO (Semanas 3-4)
**Objetivo:** Dominar búsquedas locales en Google Maps

| # | Tarea | Responsable | Esfuerzo | Plazo |
|---|-------|-------------|----------|-------|
| 9 | Agregar areaServed schema | Desarrollo | 15 min | Semana 3 |
| 10 | Optimizar GBP | Cliente + Desarrollo | 2-3 horas | Semana 4 |
| 11 | Solicitar reviews | Cliente | Ongoing | Semana 4+ |

**Resultado esperado:** Visibility en Google Maps, locales keywords ranking

---

### 📊 FASE 4: MONITOREO (Semanas 5-6)
**Objetivo:** Setup tracking y reporting

| # | Tarea | Responsable | Esfuerzo | Plazo |
|---|-------|-------------|----------|-------|
| 12 | GSC setup | Desarrollo + Cliente | 30 min | Semana 5 |
| 13 | GA4 setup | Desarrollo + Cliente | 30 min | Semana 5 |
| 14 | Crear dashboard | Desarrollo | 1 hora | Semana 6 |
| 15 | Plan mensual | Ambos | 30 min | Semana 6 |

**Resultado esperado:** Visibilidad total, tracking automático, reporting mensual

---

## 🎯 DETALLES POR FASE

### FASE 1: QUICK WINS (ESTA SEMANA)

#### Tarea #1: Fix Alt Texts
**Ubicación:** 8 páginas HTML  
**Prioridad:** 🔴 CRÍTICA

**Imágenes a actualizar:**
```
index.html:
  - background-sm.webp → "Sala de estar moderna diseñada por estudio e en Dénia"
  - card3-sm.webp → "Proyecto de reforma integral en Costa Blanca"
  - mosaic6-lg.webp → "Cocina a medida con encimeras de cuarzo"
  - (etc. todas las imágenes)

cocinas.html:
  - Todas las imágenes de cocinas → descripciones específicas

javea.html, moraira.html, calpe.html, oliva.html, gandia.html:
  - Imágenes de proyectos locales → "Proyecto de interiorismo en [Ciudad]"

about.html:
  - Foto de Esteban → "Esteban, fundador de estudio e"
```

**Checklist:**
- [ ] Reemplazar todos los alt="estudio e"
- [ ] Usar keywords naturales (ej: "cocina Dénia", "reforma Alicante")
- [ ] No keyword stuffing
- [ ] Verificar en navegador
- [ ] Commit: "fix: improve image alt texts for SEO and accessibility"
- [ ] Deploy a production

---

#### Tarea #2: Breadcrumb Schema
**Ubicación:** src/pages/index.html  
**Ubicación en código:** Dentro de `<script type="application/ld+json">`

**Código a agregar:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://estudioe.eu/"
    }
  ]
}
```

**Resultado:** Google SERP mostrará "Inicio" en breadcrumb

---

#### Tarea #3: FAQ Schema
**Ubicación:** src/pages/index.html (en array `@graph`)  
**Código a agregar:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuál es el rango de precios para un diseño de interiores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El presupuesto varía según el proyecto. Ofrecemos presupuestos personalizados sin compromiso. Contacta con nosotros para una consulta inicial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo toma una reforma integral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El tiempo depende del alcance del proyecto. Típicamente, una reforma toma entre 6-12 semanas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajáis fuera de Dénia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, trabajamos en toda la Costa Blanca: Jávea, Calpe, Moraira, Oliva, Gándía y otras localidades."
      }
    }
  ]
}
```

**Resultado:** FAQs pueden aparecer en Google Search results

---

#### Tarea #4: Build & Deploy
```bash
npm run build
npm run preview  # Verificar localmente
git add -A
git commit -m "feat: SEO improvements phase 1 - alt texts, breadcrumb, FAQ schema"
git push origin main
```

**Verificación:**
- [ ] Build sin errores
- [ ] Schema Markup Validator: https://schema.org/validate/
- [ ] Lighthouse SEO score ≥95

---

### FASE 2: CONTENIDO (SEMANAS 2-3)

#### Tarea #5: Expandir About Page
**Archivo:** src/pages/about.html  
**Información necesaria del cliente:**
- [ ] Bio completa de Esteban (3-4 párrafos)
- [ ] Años en el negocio, formación
- [ ] Certificaciones, asociaciones profesionales
- [ ] Foto de Esteban (para schema image)
- [ ] 3-5 testimonios con nombre y empresa cliente

**Estructura sugerida:**
```html
<h1>Sobre Estudio e</h1>

<section class="about-bio">
  <h2>Esteban - Fundador & Director</h2>
  <p>Esteban es diseñador de interiores con más de 30 años de experiencia...</p>
</section>

<section class="credentials">
  <h2>Credenciales</h2>
  <ul>
    <li>Certificado en Diseño de Interiores por [institución]</li>
    <li>Miembro de [asociación profesional]</li>
  </ul>
</section>

<section class="testimonials">
  <h2>Lo que dicen nuestros clientes</h2>
  <!-- Testimonials con schema -->
</section>
```

**Schema a agregar:**
```json
{
  "@type": "Person",
  "name": "Esteban [Apellido]",
  "jobTitle": "Diseñador de Interiores",
  "image": "https://estudioe.eu/images/esteban.jpg",
  "description": "Fundador de estudio e con 30+ años de experiencia...",
  "workLocation": {
    "@type": "Place",
    "name": "Dénia, Alicante"
  }
}
```

---

#### Tarea #6: Crear Página FAQ
**Archivo:** src/pages/faqs.html (nueva)  
**Contenido necesario:**
- Preguntas del cliente
- Respuestas detalladas (200+ palabras)
- Catálogo de servicios
- Información de contacto

**Título SEO:** "Preguntas Frecuentes - Diseño de Interiores en Dénia | Estudio e"  
**Meta description:** "Respuestas a preguntas sobre servicios de interiorismo, reforma integral, cocinas a medida y presupuestos en Dénia."

**Schema:** FAQPage con 8-10 preguntas

---

#### Tarea #7: Datos Cuantitativos
**Archivos:** index.html, about.html, cocinas.html

**Datos a incorporar:**
```html
<!-- Ejemplo en homepage -->
<p>Estudio e ha completado <strong>más de 500 proyectos</strong> desde 1995.</p>
<p>Nuestros proyectos tienen un tiempo promedio de ejecución de <strong>8-12 semanas</strong>.</p>
<p>Con <strong>98% de satisfacción de clientes</strong>, somos líderes en interiorismo en la Costa Blanca.</p>
```

**Impacto:** Mejora credibilidad y citability en AI search (ChatGPT, Perplexity)

---

#### Tarea #8: Review Schema
**Archivo:** src/pages/index.html (actualizar LocalBusiness schema)

**Código a agregar:**
```json
{
  "@type": "LocalBusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "28",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "María García"
      },
      "reviewBody": "Excelente trabajo. La reforma de nuestra cocina fue perfecta. Recomendamos 100%."
    }
    // ... más testimonios
  ]
}
```

**Resultado:** Stars aparecen en Google Search

---

### 🗺️ FASE 3: LOCAL SEO (SEMANAS 3-4)

#### Tarea #9: areaServed Schema
**Archivos:** javea.html, moraira.html, calpe.html, oliva.html, gandia.html, cocinas.html

**Actualización en Service schema:**
```json
{
  "@type": "Service",
  "name": "Diseño de Cocinas a Medida en Jávea",
  "description": "...",
  "areaServed": [
    {
      "@type": "City",
      "name": "Jávea"
    },
    {
      "@type": "City",
      "name": "Dénia"
    }
  ]
}
```

**Impacto:** Google Map indexing, local search visibility

---

#### Tarea #10: Google Business Profile
**Responsable:** Cliente (con soporte de desarrollo)  
**Timeline:** 2-3 horas

**Checklist:**
- [ ] GBP existe y está verificado
- [ ] Categorías correctas: "Interior Designer", "Home Improvement Service"
- [ ] Descripción: 250+ caracteres, keywords naturales
- [ ] Fotos: 10+ imágenes de proyectos (antes/después)
- [ ] Horarios actualizados
- [ ] Teléfono y email verificados
- [ ] Página web vinculada (https://estudioe.eu)
- [ ] Servicio de mensajería habilitado
- [ ] Formulario de presupuesto agregado

**Gestionar:**
- Responder reviews (dentro de 48h)
- Solicitar reviews a clientes satisfechos
- Publicar actualizaciones semanales (posts, fotos, eventos)

---

#### Tarea #11: Solicitar Reviews
**Responsable:** Cliente

**Estrategia:**
1. Después de cada proyecto finalizado, pedir review en Google
2. Mensaje tipo: "Le encantaría una opinión en Google: [LINK GBP]"
3. Objetivo: 3-4 reviews mensuales
4. Meta: 40+ reviews en 3 meses, rating 4.8+

---

### 📊 FASE 4: MONITOREO (SEMANAS 5-6)

#### Tarea #12: Google Search Console
**Responsable:** Cliente (con acceso a GSC)

**Setup:**
1. Ir a https://search.google.com/search-console
2. Agregar propiedad: https://estudioe.eu
3. Verificar con DNS (recomendado) o HTML file
4. Enviar sitemap: https://estudioe.eu/sitemap-0.xml
5. Configurar:
   - [ ] International targeting: Spain
   - [ ] Preferred domain: https version
   - [ ] Mobile-friendly report

**Monitoreo mensual:**
- Impressions y CTR por keyword
- Coverage (errores de indexación)
- Mobile usability
- Core Web Vitals

---

#### Tarea #13: Google Analytics 4
**Responsable:** Cliente (con acceso a GA4)

**Setup:**
1. Crear propiedad en GA4: https://analytics.google.com
2. Instalar GA4 tag globalmente (agregarlo a template de Astro)
3. Configurar eventos:
   - [ ] Form submission (contacto)
   - [ ] Teléfono click: +34965787547
   - [ ] Email click: esteban@estudioe.eu
   - [ ] GBP review click

4. Marcar conversión: "Contact" goal

**Tag a agregar:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

#### Tarea #14: Dashboard de Monitoreo
**Crear archivo:** SEO-MONITORING-DASHBOARD.md

**KPIs a trackear:**
```
MENSUAL:
□ Google Search impressions (target: +10% month-over-month)
□ CTR orgánico (target: >3%)
□ Organic traffic (GA4)
□ Contact form submissions
□ Phone calls (track con Call Tracking)
□ Google Maps views
□ GBP reviews (cantidad + rating promedio)
□ Search position para 10 keywords principales

TRIMESTRAL:
□ Organic revenue (si aplica)
□ AI search citations (Google AI Mode, ChatGPT)
□ Backlinks (ahrefs/semrush)
□ Competitor analysis
□ Content gap analysis
```

---

## 📋 CHECKLIST DE DEPLOYMENT

### Antes de cada deploy:
```bash
# Validar código
npm run build

# Validar schema
# Ir a: https://schema.org/validate/

# Lighthouse audit
npm run preview  # Luego abrir DevTools → Lighthouse

# Spell check
# Revisar manualmente ortografía

# Mobile test
# Usar Chrome DevTools responsive design
```

### Después del deploy:
```bash
# Invalidar cache (si aplica)
# En Cloudflare: Purge cache

# Inspeccionar en GSC
# https://search.google.com/search-console → URL Inspection

# Verificar en móvil
# Probar en dispositivo real o emulador
```

---

## 🎯 OBJETIVOS & KPIs

### Objetivo 1: Visibilidad en Google Search
**KPI:** +5 keywords en top 10 en 3 meses  
**Target:** "interiorismo Dénia", "cocinas a medida", "reforma Alicante"

### Objetivo 2: Tráfico Orgánico
**KPI:** +50% organic sessions en 3 meses  
**Current:** TBD (definir con GA4)

### Objetivo 3: Contactos
**KPI:** +3 contactos/mes desde search orgánico  
**Target:** 15+ contactos en 3 meses

### Objetivo 4: Local Dominance
**KPI:** Top 3 Google Maps para "interior designer Dénia"  
**Target:** Posición 1 en 6 meses

---

## 💰 ESTIMACIÓN DE ESFUERZO

| Fase | Tareas | Horas Dev | Horas Cliente | Total |
|------|--------|-----------|---------------|-------|
| 1 | 4 | 1 | 0.5 | 1.5h |
| 2 | 4 | 1.5 | 3 | 4.5h |
| 3 | 3 | 0.5 | 3 | 3.5h |
| 4 | 4 | 2 | 2 | 4h |
| **TOTAL** | **15** | **5h** | **8.5h** | **13.5h** |

---

## 📅 ROADMAP MENSUAL DESPUÉS DE IMPLEMENTACIÓN

### Mes 1 (Mayo 2026)
- [ ] Monitor KPIs iniciales
- [ ] Solicitar 3-4 reviews en GBP
- [ ] Publicar 2 posts en GBP
- [ ] Revisar GSC coverage

### Mes 2 (Junio 2026)
- [ ] Análisis de competitors
- [ ] Evaluar keyword rankings
- [ ] Crear plan de content adicional si necesario
- [ ] Update About page si hay nuevos proyectos

### Mes 3 (Julio 2026)
- [ ] Audit de rendimiento integral
- [ ] Reporte ejecutivo al cliente
- [ ] Planificar fase 2 si es necesario
- [ ] Revisar ROI de inversión SEO

---

## 🚨 RIESGOS & MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| Cliente no proporciona info | Media | Alto | Enviar recordatorio semana 1 |
| Google indexa lentamente | Baja | Medio | Usar GSC URL Inspection |
| Cambios no se reflejan | Baja | Bajo | Clear Cloudflare cache |
| Competencia mejora también | Alta | Bajo | Revisar competitors mensualmente |

---

**Documento creado:** 2026-04-18  
**Próxima revisión:** 2026-05-18  
**Autor:** [TU NOMBRE]
