# Google Search Console

Consultar datos de Google Search Console para estudioe.eu usando la herramienta CLI centralizada.

## Configuración inicial (una sola vez)

La herramienta Search Console CLI se encuentra en un repositorio separado:

```bash
~/Code/search-console-cli/
```

### 1. Configurar OAuth

```bash
cd ~/Code/search-console-cli
pip install -r requirements.txt
python3 search_console.py setup
```

Esto abrirá tu navegador pidiendo que autorices con tu cuenta de Google. Las credenciales se guardarán automáticamente.

## Uso

### Ver top búsquedas de estudioe.eu

```bash
cd ~/Code/search-console-cli
python3 search_console.py queries estudioe.eu
```

Salida:
```
🔍 Top búsquedas para estudioe.eu (últimos 28 días):
----------------------------------------------------------------------------------------------------
Búsqueda                                 Clics  Impresiones      CTR   Posición
----------------------------------------------------------------------------------------------------
estudio e                                   1           20     5.0%        5.2
estudioe                                    1            6    16.7%        5.0
arquitecto en moraira                       0            2     0.0%       85.0
cocina denia                                0            9     0.0%       17.8
```

### Ver estadísticas generales

```bash
python3 search_console.py stats estudioe.eu
```

Salida:
```
📊 Estadísticas para estudioe.eu (últimos 28 días):
------------------------------------------------------------
  Total clics:          4
  Total impresiones:    288
  Posición promedio:    20.3
  CTR promedio:         1.4%
```

### Ver todo junto

```bash
python3 search_console.py all estudioe.eu
```

### Opciones avanzadas

```bash
# Últimos 90 días
python3 search_console.py queries estudioe.eu --days 90

# Top 20 resultados
python3 search_console.py queries estudioe.eu --limit 20

# Salida en JSON
python3 search_console.py queries estudioe.eu --json

# Listar todos los dominios verificados
python3 search_console.py list
```

## Alias útil (opcional)

Para simplificar, puedes crear un alias en tu shell:

```bash
# Agregar a ~/.zshrc o ~/.bashrc
alias gsc="cd ~/Code/search-console-cli && python3 search_console.py"

# Luego puedes usar:
gsc queries estudioe.eu
gsc stats estudioe.eu
gsc all estudioe.eu
```

## Campos de datos

### Top búsquedas

- **Búsqueda**: Término exacto que usuarios buscaron
- **Clics**: Cuántas veces hicieron clic en tu sitio desde resultados
- **Impresiones**: Cuántas veces tu sitio apareció en resultados
- **CTR**: Click-through rate (clics ÷ impresiones)
- **Posición**: Posición promedio en resultados de búsqueda

### Estadísticas

- **Total clics**: Clics acumulados en el período
- **Total impresiones**: Impresiones acumuladas en el período
- **Posición promedio**: Qué tan bien ranquea el sitio en general
- **CTR promedio**: Eficiencia general de conversión

## Interpretación de datos

- **CTR bajo** → El sitio aparece pero pocos clican (mejorar título/descripción)
- **Posición alta (>10)** → Está fuera de la primera página (mejorar contenido/SEO)
- **Muchas impresiones, pocos clics** → Falta claridad o relevancia en el título
- **Pocas impresiones** → Bajo volumen de búsqueda o baja autoridad

## Documentación completa

Para más opciones y detalles, ver:

```bash
cd ~/Code/search-console-cli
cat README.md
```

## Troubleshooting

### "Credenciales no encontradas"

```bash
cd ~/Code/search-console-cli
python3 search_console.py setup
```

### "User does not have access to domain"

Verifica que tu cuenta de Google es propietaria de estudioe.eu en:
https://search.google.com/search-console

### Credenciales corrutas

```bash
rm ~/.config/gcloud/search-console-credentials.json
cd ~/Code/search-console-cli
python3 search_console.py setup
```
