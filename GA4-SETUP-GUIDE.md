# 📊 Google Analytics 4 Setup Guide
**Para:** Estudio e  
**Fecha:** 2026-04-18  
**Tiempo estimado:** 30-45 minutos

---

## 📋 Pre-requisitos

- [ ] Acceso a Google Analytics (https://analytics.google.com)
- [ ] Acceso a GitHub o capacidad de dar instrucciones al desarrollador
- [ ] URL del sitio: `https://estudioe.eu`

---

## 🚀 PASO 1: Crear propiedad GA4

1. Abre https://analytics.google.com
2. Click en **Admin** (abajo a la izquierda)
3. En la sección "Propiedad", click en **+ Crear propiedad**

### Llenar formulario:

| Campo | Valor |
|-------|-------|
| Nombre de propiedad | `Estudio e - Interiorismo` |
| Zona horaria | `Europa/Madrid` |
| Moneda | `EUR (€)` |
| Industria | `Servicios Profesionales` |
| Tamaño negocio | `Pequeña` |

**Click en "Crear propiedad"**

---

## PASO 2: Crear stream (flujo) web

Google te pedirá qué tipo de datos rastrear.

Selecciona: **Web**

### Configurar stream web:

| Campo | Valor |
|-------|-------|
| Nombre del stream | `estudioe.eu` |
| URL del sitio web | `https://estudioe.eu` |
| Nombre de stream | `Web` |

**Click en "Crear stream"**

---

## PASO 3: Obtener ID de medición

Google mostrará:

```
ID de medición (Measurement ID):  G-XXXXXXXXXX
```

**Copia este ID** - lo necesitarás en el siguiente paso.

También verás:

```
ID de la propiedad (Property ID):  123456789
```

Guarda ambos.

---

## PASO 4: Instalar GA4 tag en el sitio

### Opción A: Si tienes acceso a GitHub (Recomendado)

1. Abre GitHub: https://github.com/eclyptox/estudioe-pages
2. Ve a archivo: `src/pages/index.html`
3. Busca la sección `<head>` (dentro de los primeros 100 líneas)
4. Antes del cierre `</head>`, agrega:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Reemplaza `G-XXXXXXXXXX` con tu Measurement ID**

5. Copia el código a todas las páginas HTML (si quieres rastrear todo el sitio):
   - `src/pages/about.html`
   - `src/pages/cocinas.html`
   - `src/pages/contact.html`
   - `src/pages/javea.html`
   - `src/pages/moraira.html`
   - `src/pages/calpe.html`
   - `src/pages/oliva.html`
   - `src/pages/gandia.html`

**O:**

Pídele al desarrollador que lo haga (más eficiente).

6. Deploy: `git push` al repositorio
7. El sitio se actualizará automáticamente en 2-5 minutos

### Opción B: Si NO tienes acceso a GitHub

Envía el código anterior al desarrollador y pídele que lo instale.

---

## PASO 5: Verificar instalación

**Espera 5-10 minutos** después de instalar el tag.

De vuelta en GA4:

1. Ve a **Admin** → **Property Settings**
2. Busca **"Data streams"**
3. Selecciona tu stream web: `estudioe.eu`
4. Deberías ver: **"Recibiendo datos" ✅**

Si ves rojo con **"No recibiendo datos"**:
- Espera otros 10 minutos
- Verifica que el tag esté correctamente instalado
- Abre el sitio en navegador y revisa Console (F12) para errores

---

## PASO 6: Configurar conversiones (Eventos)

Las conversiones son acciones importantes (contactos, calls, etc).

### Evento 1: Form Submission (Contacto)

1. En GA4, ve a **Events** (menú izquierdo)
2. Click en **Create event**
3. Configura:

```
Event name: contact_form_submission
Event parameter: form_type
Parameter value: website_contact
```

4. Click **Create**

**Qué trackea:**
- Cada vez que alguien envía el formulario de contacto

### Evento 2: Phone Click

1. **Create event**
2. Configura:

```
Event name: phone_click
Event parameter: phone_number
Parameter value: +34965787547
```

**Qué trackea:**
- Cada click en el botón de teléfono

### Evento 3: Email Click

1. **Create event**
2. Configura:

```
Event name: email_click
Event parameter: email_address
Parameter value: esteban@estudioe.eu
```

**Qué trackea:**
- Cada click en el enlace de email

---

## PASO 7: Configurar Conversiones/Objetivos

Las conversiones son eventos que consideras valiosos.

1. Ve a **Conversions** (menú izquierdo)
2. Click en **+ New conversion event**
3. Selecciona el evento: `contact_form_submission`
4. Click en **Create**

Repite para:
- `phone_click`
- `email_click`

**Qué significa:**
- GA4 ahora rastreará cuántas de estas acciones ocurren
- Las verás en reportes como "Conversiones"
- Meta: 3+ conversiones/mes

---

## PASO 8: Configuración de View

Para ver mejor los datos:

1. Ve a **Admin** → **Data settings** → **Data streams**
2. Abre tu stream: `estudioe.eu`
3. Revisa:
   - [ ] **Enhanced measurement** está ON
     - Esto trackea automáticamente: scrolls, outbound clicks, site search, video plays, file downloads

4. Click **Save**

---

## PASO 9: Dashboard Inicial

Ahora GA4 está recopilando datos. Verás reportes automáticos en:

**Menú izquierdo:**
- **Acquisition** → De dónde vienen los usuarios
- **Engagement** → Qué hacen en el sitio
- **Monetization** → (opcional para e-commerce)
- **Retention** → Usuarios que regresan
- **Users** → Datos demográficos

### KPI Principal: Organic Traffic

1. Ve a **Acquisition** → **Traffic Acquisition**
2. Filtra por: **Source/Medium = organic / google**
3. Verás:
   - Users: Usuarios únicos de búsqueda
   - Sessions: Visitas totales
   - Engagement rate: % que interactuaron

**Meta mes 1:** 0-10 usuarios  
**Meta mes 3:** 30-50 usuarios  
**Meta mes 6:** 100+ usuarios

---

## PASO 10: Conectar con GSC (Opcional pero Recomendado)

Para ver qué keywords traen tráfico:

1. Ve a **Admin** → **Property Settings**
2. Busca **Google Search Console**
3. Click en **Link**
4. Selecciona tu propiedad GSC: `estudioe.eu`
5. Click **Link**

Ahora en GA4 verás:
- **Acquisition** → **Google Organic Search**
- Palabras clave que generan tráfico

---

## 📊 Monitoreo Semanal

**Cada lunes (10 minutos):**

1. Abre GA4
2. Ve a **Acquisition** → **Traffic Acquisition**
3. Revisa:
   - [ ] ¿Hay tráfico orgánico?
   - [ ] ¿Cuántos usuarios nuevos?
   - [ ] ¿Cuál es el top landing page?

4. Ve a **Conversions**
5. Revisa:
   - [ ] ¿Cuántas conversiones esta semana?
   - [ ] ¿De dónde vienen?

---

## 🎯 Métricas Clave

| Métrica | Descripción | Meta Mes 1 | Meta Mes 3 |
|---------|-------------|-----------|-----------|
| Organic Users | Usuarios de búsqueda | 0-5 | 20+ |
| Organic Sessions | Visitas de búsqueda | 0-10 | 50+ |
| Engagement Rate | % que interactúan | 40%+ | 50%+ |
| Conversions | Contactos/llamadas | 1+ | 5+ |
| Conversion Rate | % de sesiones que convierten | 5%+ | 10%+ |

---

## 🔐 Seguridad & Acceso

**Propietario:** Tu cuenta Google  
**Compartir acceso:** Admin → Account access

Para agregar usuario:
1. Admin
2. Account access management
3. + Invite users
4. Email del usuario: `tu-email@example.com`
5. Role: **Editor** (puede ver y crear reportes)

---

## ❓ Solución de problemas

### "GA4 no recibe datos"

1. Abre el sitio en navegador
2. Abre Console: F12 → Console
3. Busca errores rojo (TypeError, etc)
4. Si hay error: revisa que el tag GA4 esté bien instalado

### "Veo datos pero muy pocos"

Normal en primeros 7 días. GA4 necesita tiempo para recopilar.
- Espera 1-2 semanas
- Mientras tanto, haz click en el sitio tú mismo para test

### "Conversiones no aparecen"

1. Verifica que hayas creado el evento correctamente
2. Prueba haciendo el evento (ej: haz click en teléfono)
3. Espera 5 minutos
4. Ve a Events → lista debería actualizar

---

## 📝 Próximos pasos

Una vez GA4 esté instalado y recopilando datos:

1. **Semana 1-2:** Familiarízate con el dashboard
2. **Semana 3-4:** Crea reportes personalizados (si quieres)
3. **Mes 2:** Conecta con Google Ads (si haces publicidad)
4. **Mes 3:** Analiza datos de 3 meses para patrones

---

## 📚 Recursos útiles

- [GA4 oficial help center](https://support.google.com/analytics)
- [Cómo leer reportes](https://support.google.com/analytics/answer/10091879)
- [Eventos custom](https://support.google.com/analytics/answer/11396839)

---

**Documento creado:** 2026-04-18  
**Para:** Estudio e  
**Versión:** 1.0

*Próximo: Dashboard Setup Guide*
