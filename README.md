# Content Performance AI™
### by @alemetaads

App de estrategia de contenido con IA. Cargás el cliente y el rubro, y te devuelve diagnóstico completo, hooks, ángulos, secuencia y guion.

---

## ✅ Cómo deployarla en Vercel (paso a paso)

### PASO 1 — Conseguí tu API key de Anthropic
1. Entrá a https://console.anthropic.com
2. Creá una cuenta o iniciá sesión
3. Andá a **API Keys** → **Create Key**
4. Copiá la key (se muestra una sola vez, guardala)
5. Cargá créditos en **Billing** (mínimo $5, alcanzan para cientos de generaciones)

---

### PASO 2 — Subí el código a GitHub
1. Creá cuenta en https://github.com (gratis)
2. Hacé clic en **New repository**
3. Nombre: `content-performance-ai` → **Create repository**
4. Hacé clic en **uploading an existing file**
5. Arrastrá TODOS los archivos y carpetas de este ZIP (descomprimido)
6. Hacé clic en **Commit changes**

---

### PASO 3 — Deployá en Vercel
1. Entrá a https://vercel.com y creá cuenta con tu GitHub
2. Hacé clic en **Add New Project**
3. Seleccioná el repositorio `content-performance-ai`
4. Antes de deployar, expandí **Environment Variables** y agregá:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tu key del Paso 1
5. Hacé clic en **Deploy**
6. En 1-2 minutos tenés tu URL (ej: `content-performance-ai.vercel.app`)

---

## 💰 Costo por uso
Cada generación de estrategia completa cuesta aprox. **$0.02–$0.15 USD** dependiendo de la profundidad elegida. Podés monitorear el gasto en console.anthropic.com → Usage.

---

## 🛠️ Archivos del proyecto
```
content-performance-ai/
├── pages/
│   ├── index.jsx          ← La app
│   ├── _app.js            ← Config global
│   └── api/
│       └── generate.js    ← Proxy a Anthropic (guarda la API key segura)
├── styles/
│   └── globals.css        ← Estilos base
├── package.json
├── next.config.mjs
└── .env.local.example     ← Plantilla para la API key
```

---

## ❓ Problemas comunes

**"Error de API"** → Revisá que la API key esté bien cargada en Vercel (Settings → Environment Variables) y que tenga créditos.

**La app carga pero no genera** → Verificá que el nombre de la variable sea exactamente `ANTHROPIC_API_KEY` (sin espacios, todo mayúsculas).

**Quiero cambiar el dominio** → En Vercel, andá a tu proyecto → Settings → Domains → Add Domain.
