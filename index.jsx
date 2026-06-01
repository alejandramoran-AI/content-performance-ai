import React, { useState, useRef } from "react";
import Head from "next/head";
import {
  Sparkles, Loader2, Copy, Check, RotateCcw, ChevronDown,
  Target, Brain, Layers, Zap, ClipboardList, AlertCircle, Settings2
} from "lucide-react";

/* ── THEME ─────────────────────────────────────────────────────── */
const c = {
  bg: "#0b0b0d",
  surface: "#141418",
  surface2: "#1b1b20",
  border: "#2a2a31",
  borderSoft: "#202026",
  text: "#ece9e2",
  muted: "#8c8c95",
  faint: "#5d5d66",
  accent: "#c8f135",
  danger: "#ff6b5e",
};
const fDisplay = "'Bricolage Grotesque', system-ui, sans-serif";
const fBody    = "'Hanken Grotesk', system-ui, sans-serif";
const fMono    = "'JetBrains Mono', monospace";

/* ── FRAMEWORK (system prompt) ──────────────────────────────────── */
const SYSTEM = `Sos CONTENT PERFORMANCE AI, una fusión de Director Creativo Senior, Estratega de Growth Marketing, Especialista en Meta Ads, Investigador de Mercado, Copywriter de respuesta directa y Psicólogo del consumidor.

Tu función NO es crear videos virales. Es diseñar contenido estratégico que genere atención, confianza, intención de compra, conversión y fidelización. La viralidad es consecuencia de una estrategia correcta, nunca el objetivo.

PRINCIPIO RECTOR: las personas no compran por embudos lineales sino por secuencias psicológicas. Todo contenido debe mover a la persona de un estado mental a otro. Para cada pieza pensá: ¿qué debe pensar, sentir, creer y hacer después de consumirla?

REGLAS DURAS:
- Adaptá CADA recomendación al rubro y al contexto específico del cliente que te pasan. Nada genérico: usá el lenguaje, los dolores y los objetos del rubro.
- Prohibido el cliché ("¿Sabías que...?", "Para en seco", "Esto te va a volar la cabeza", etc.). Todo hook y ángulo debe ser original.
- La escasez debe ser real, nunca inventada.
- Originalidad obligatoria: extraé principios de patrones, no copies tendencias literalmente.
- Escribí en español rioplatense (registro argentino), claro y directo.

Vas a recibir un BRIEF y un nivel de PROFUNDIDAD. Devolvé la estrategia COMPLETA respetando EXACTAMENTE este formato, con cada bloque encabezado por "## " y su número. No agregues introducción ni cierre fuera de los bloques.

## 1. Diagnóstico del mercado
Público (edad, género, ubicación, nivel socioeconómico, intereses, estilo de vida), problema principal y secundarios, solución/transformación, diferenciales, objeciones y garantías. Inferí lo que falte de forma realista para el rubro.

## 2. Nivel de consciencia detectado
Elegí 1 de los 5 niveles (1 no sabe que tiene el problema → 5 listo para comprar) y justificá. Indicá el objetivo de comunicación para ese nivel.

## 3. Etapa del ciclo de ventas
Presentación / Evaluación / Conversión / Ascensión. Justificá según el objetivo del cliente.

## 4. Emoción dominante
Una sola emoción que más impulsa la compra en este caso (deseo, miedo, seguridad, ahorro, comodidad, exclusividad, estatus, validación social, libertad, placer). Justificá.

## 5. Principios psicológicos elegidos
Entre 2 y 4 (reciprocidad, empatía, prueba social, autoridad, escasez real, micro-compromiso). Explicá cómo se aplican concretamente en este rubro.

## 6. Formato recomendado
Elegí del set (UGC, Podcast, Problema-Solución, Hook IA, POV, Storytelling, 3 Errores, Behind the Scenes, Comparativa, Hook Agresivo) y explicá por qué encaja con el público y la plataforma.

## 7. Ángulos de contenido
Generá ángulos en estas familias: racionales, emocionales, aspiracionales, de autoridad, de prueba social, disruptivos. (La cantidad por familia la define la profundidad.) Sin repetir ideas.

## 8. Hooks
Generá hooks originales en estas categorías: curiosidad, dolor, deseo, autoridad, controversia. (Cantidad según profundidad.) Cada hook listo para grabar.

## 9. Secuencia estratégica
Una secuencia de videos donde cada pieza mueve al usuario a la siguiente etapa (Presentación → Evaluación → Conversión → Ascensión). Para cada video: título, etapa, objetivo y hook sugerido. (Cantidad de videos según profundidad.)

## 10. Guion completo
Para la pieza principal, estructurá por tiempos: 0-3s Hook / 3-10s Promesa / 10-20s Desarrollo / 20-40s Prueba / 40-60s Resultado / Cierre CTA. Incluí en cada bloque: visual, texto en pantalla, voz en off, emoción buscada y disparador psicológico usado.

## 11. CTA
Llamados a la acción adaptados al objetivo y la plataforma, con micro-compromiso.

## 12. Variaciones
Variaciones del guion principal (cantidad según profundidad) cambiando hook/ángulo/emoción.

## 13. Score final
Puntuá la idea principal del 1 al 100 en: Potencial Viral, Retención, Compartidos, Comentarios, Conversión, Branding, Facilidad de Producción. Justificá brevemente cada uno.

## 14. Recomendaciones de optimización
3 a 5 acciones concretas para mejorar el rendimiento (testing, iteración, distribución).`;

const DEPTH = {
  rapido:      "PROFUNDIDAD: RÁPIDO. Ángulos: 1 por familia. Hooks: 3 por categoría. Secuencia: 3 videos. Guion: 1 principal. Variaciones: 2. Sé conciso.",
  equilibrado: "PROFUNDIDAD: EQUILIBRADO. Ángulos: 2 por familia. Hooks: 5 por categoría. Secuencia: 5 videos. Guion: 1 completo. Variaciones: 3.",
  completo:    "PROFUNDIDAD: COMPLETO. Ángulos: 3 por familia. Hooks: 8 por categoría. Secuencia: 7 videos. Guion: 1 completo y detallado. Variaciones: 4.",
};

const PLATAFORMAS = ["Instagram Reels", "TikTok", "Meta Ads (Feed/Stories)", "YouTube Shorts", "Multi-plataforma"];
const OBJETIVOS   = ["Presentación / Awareness", "Evaluación / Consideración", "Conversión / Ventas", "Ascensión / Fidelización", "Secuencia completa"];
const NIVELES     = ["Auto (que lo detecte la IA)", "1 - No sabe que tiene el problema", "2 - Sabe que tiene el problema", "3 - Busca soluciones", "4 - Compara alternativas", "5 - Listo para comprar"];
const FORMATOS    = ["Auto (que lo elija la IA)", "UGC", "Podcast", "Problema-Solución", "Hook IA", "POV", "Storytelling", "3 Errores", "Behind the Scenes", "Comparativa", "Hook Agresivo"];
const RUBROS      = ["Estética / Belleza", "Gastronomía", "Inmobiliaria", "Fitness / Gym", "E-commerce", "Indumentaria", "Salud / Bienestar", "Educación / Cursos", "Servicios profesionales", "Tecnología / SaaS", "Automotriz", "Turismo"];

const SECTION_ICONS = [Target, Brain, Layers, Zap, Brain, Layers, Sparkles, Zap, Layers, ClipboardList, Target, Layers, Target, Settings2];

/* ── MARKDOWN RENDERER ─────────────────────────────────────────── */
function inline(t) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i} style={{ color: c.text, fontWeight: 700 }}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  );
}

function MD({ text }) {
  const lines = text.split("\n");
  const out = [];
  let list = [];

  const flush = () => {
    if (!list.length) return;
    out.push(
      <ul key={"u" + out.length} style={{ margin: "6px 0 12px", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 5 }}>
        {list.map((it, i) => <li key={i} style={{ color: c.muted, lineHeight: 1.55 }}>{inline(it)}</li>)}
      </ul>
    );
    list = [];
  };

  lines.forEach((ln, idx) => {
    const t = ln.trim();
    if (!t) { flush(); return; }
    if (/^###?\s/.test(t)) {
      flush();
      out.push(<div key={"h"+idx} style={{ fontFamily: fMono, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: c.accent, marginTop: 14, marginBottom: 6 }}>{t.replace(/^###?\s/, "")}</div>);
    } else if (/^[-*]\s/.test(t) || /^\d+\.\s/.test(t)) {
      list.push(t.replace(/^([-*]|\d+\.)\s/, ""));
    } else {
      flush();
      out.push(<p key={"p"+idx} style={{ color: c.muted, lineHeight: 1.6, margin: "0 0 10px" }}>{inline(t)}</p>);
    }
  });
  flush();
  return <div>{out}</div>;
}

/* ── MAIN APP ──────────────────────────────────────────────────── */
export default function Home() {
  const [f, setF] = useState({
    cliente: "", rubro: "", producto: "", publico: "", problema: "",
    diferenciales: "", objeciones: "", oferta: "",
    plataforma: PLATAFORMAS[0], objetivo: OBJETIVOS[2],
    nivel: NIVELES[0], formato: FORMATOS[0], depth: "equilibrado",
  });
  const [adv,      setAdv]      = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [sections, setSections] = useState(null);
  const [raw,      setRaw]      = useState("");
  const [err,      setErr]      = useState("");
  const [copied,   setCopied]   = useState(false);
  const [open,     setOpen]     = useState({});
  const resultRef = useRef(null);

  const up    = k => e => setF({ ...f, [k]: e.target.value });
  const ready = f.cliente && f.rubro && f.producto && f.publico && f.problema;

  function buildPrompt() {
    return `BRIEF DEL CLIENTE
Cliente / Marca: ${f.cliente}
Rubro / Industria: ${f.rubro}
Producto o servicio: ${f.producto}
Público objetivo: ${f.publico}
Problema principal que resuelve: ${f.problema}
Diferenciales: ${f.diferenciales || "(inferir según el rubro)"}
Objeciones frecuentes: ${f.objeciones || "(inferir según el rubro)"}
Oferta / precio / garantía: ${f.oferta || "(no especificado)"}
Plataforma principal: ${f.plataforma}
Objetivo de campaña: ${f.objetivo}
Nivel de consciencia: ${f.nivel}
Formato preferido: ${f.formato}

${DEPTH[f.depth]}

Generá la estrategia completa siguiendo tu formato de 14 bloques.`;
  }

  async function generate() {
    setErr(""); setLoading(true); setSections(null); setRaw("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM, userPrompt: buildPrompt() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");

      const text = (data.content || [])
        .filter(b => b.type === "text")
        .map(b => b.text)
        .join("\n")
        .trim();

      if (!text) throw new Error("Respuesta vacía");

      setRaw(text);
      const blocks = text.split(/\n(?=##\s)/).filter(b => b.trim());
      const parsed = blocks.map(b => {
        const nl = b.indexOf("\n");
        return {
          title: (nl === -1 ? b : b.slice(0, nl)).replace(/^##\s*/, "").trim(),
          body:  nl === -1 ? "" : b.slice(nl + 1).trim(),
        };
      });
      setSections(parsed.length ? parsed : [{ title: "Estrategia", body: text }]);
      setOpen({ 0: true });
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      setErr(e.message || "No se pudo generar la estrategia. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function copyAll() {
    navigator.clipboard?.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  /* ── FIELD STYLES ── */
  const labelS = {
    fontFamily: fMono, fontSize: 11, letterSpacing: ".08em",
    textTransform: "uppercase", color: c.faint, marginBottom: 6, display: "block",
  };
  const inputS = {
    width: "100%", background: c.surface2, border: `1px solid ${c.border}`,
    borderRadius: 10, padding: "11px 13px", color: c.text,
    fontFamily: fBody, fontSize: 15,
  };

  const Field = ({ label, k, area, req, ph }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={labelS}>{label}{req && <span style={{ color: c.accent }}> *</span>}</label>
      {area
        ? <textarea value={f[k]} onChange={up(k)} placeholder={ph} rows={2} style={{ ...inputS, resize: "vertical", lineHeight: 1.45 }} />
        : <input    value={f[k]} onChange={up(k)} placeholder={ph} style={inputS} list={k === "rubro" ? "rubros" : undefined} />}
    </div>
  );

  const Select = ({ label, k, opts }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={labelS}>{label}</label>
      <div style={{ position: "relative" }}>
        <select value={f[k]} onChange={up(k)} style={{ ...inputS, appearance: "none", paddingRight: 34 }}>
          {opts.map(o => <option key={o} value={o} style={{ background: c.surface }}>{o}</option>)}
        </select>
        <ChevronDown size={16} color={c.faint} style={{ position: "absolute", right: 12, top: 14, pointerEvents: "none" }} />
      </div>
    </div>
  );

  /* ── RENDER ── */
  return (
    <>
      <Head>
        <title>Content Performance AI™</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontFamily: fBody }}>
        <datalist id="rubros">{RUBROS.map(r => <option key={r} value={r} />)}</datalist>

        <div style={{ maxWidth: 640, margin: "0 auto", padding: "28px 18px 64px" }}>

          {/* HEADER */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={19} color="#000" strokeWidth={2.4} />
            </div>
            <div style={{ fontFamily: fMono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: c.faint }}>@alemetaads · sistema</div>
          </div>
          <h1 style={{ fontFamily: fDisplay, fontSize: 34, lineHeight: 1.02, fontWeight: 700, margin: "10px 0 8px", letterSpacing: "-.02em" }}>
            Content Performance <span style={{ color: c.accent }}>AI</span>
          </h1>
          <p style={{ color: c.muted, fontSize: 15, lineHeight: 1.5, margin: "0 0 26px", maxWidth: 520 }}>
            Cargá el cliente y el rubro. Devuelve la estrategia completa —diagnóstico, psicología, hooks, secuencia y guion— lista para producir.
          </p>

          {/* FORM */}
          {!sections && !loading && (
            <div style={{ animation: "pop .4s ease" }}>
              <div style={{ background: c.surface, border: `1px solid ${c.borderSoft}`, borderRadius: 16, padding: "20px 18px" }}>
                <Field label="Cliente / Marca"         k="cliente"  req ph="Ej: Studio Glow" />
                <Field label="Rubro / Industria"        k="rubro"    req ph="Ej: Estética / Belleza" />
                <Field label="Producto o servicio"      k="producto" area req ph="¿Qué vende exactamente?" />
                <Field label="Público objetivo"         k="publico"  area req ph="¿A quién le habla?" />
                <Field label="Problema que resuelve"    k="problema" area req ph="El dolor central del cliente" />

                <button
                  onClick={() => setAdv(!adv)}
                  style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", color: c.muted, fontFamily: fMono, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer", padding: "8px 0", marginTop: 2 }}
                >
                  <Settings2 size={14} /> Opciones avanzadas
                  <ChevronDown size={14} style={{ transform: adv ? "rotate(180deg)" : "none", transition: ".2s" }} />
                </button>

                {adv && (
                  <div style={{ paddingTop: 6, borderTop: `1px solid ${c.borderSoft}`, marginTop: 4 }}>
                    <Field label="Diferenciales"               k="diferenciales" area ph="¿Por qué te eligen a vos y no a otro?" />
                    <Field label="Objeciones frecuentes"        k="objeciones"    area ph="Precio, confianza, tiempo, riesgo..." />
                    <Field label="Oferta / precio / garantía"   k="oferta"             ph="Ej: Primera sesión gratis" />
                    <Select label="Plataforma"                  k="plataforma"    opts={PLATAFORMAS} />
                    <Select label="Objetivo de campaña"         k="objetivo"      opts={OBJETIVOS} />
                    <Select label="Nivel de consciencia"        k="nivel"         opts={NIVELES} />
                    <Select label="Formato"                     k="formato"       opts={FORMATOS} />
                  </div>
                )}
              </div>

              {/* DEPTH */}
              <div style={{ marginTop: 16 }}>
                <label style={labelS}>Profundidad</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[["rapido","Rápido"],["equilibrado","Equilibrado"],["completo","Completo"]].map(([v,l]) => (
                    <button key={v} onClick={() => setF({ ...f, depth: v })} style={{ padding: "11px 6px", borderRadius: 10, cursor: "pointer", fontFamily: fBody, fontSize: 14, fontWeight: 600, background: f.depth === v ? c.accent : c.surface2, color: f.depth === v ? "#000" : c.muted, border: `1px solid ${f.depth === v ? c.accent : c.border}` }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generate}
                disabled={!ready}
                style={{ width: "100%", marginTop: 18, padding: "15px", borderRadius: 12, border: "none", cursor: ready ? "pointer" : "not-allowed", background: ready ? c.accent : c.surface2, color: ready ? "#000" : c.faint, fontFamily: fDisplay, fontSize: 17, fontWeight: 700, letterSpacing: "-.01em", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}
              >
                <Sparkles size={19} strokeWidth={2.4} /> Generar estrategia
              </button>
              {!ready && <p style={{ color: c.faint, fontSize: 13, textAlign: "center", marginTop: 10 }}>Completá los campos con *</p>}
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div style={{ background: c.surface, border: `1px solid ${c.borderSoft}`, borderRadius: 16, padding: "48px 24px", textAlign: "center", animation: "pop .3s ease" }}>
              <Loader2 size={34} color={c.accent} style={{ animation: "spin 1s linear infinite" }} />
              <p style={{ fontFamily: fDisplay, fontSize: 19, fontWeight: 600, margin: "18px 0 6px" }}>Diseñando la estrategia…</p>
              <p style={{ color: c.muted, fontSize: 14 }}>Investigación → psicología → hooks → guion. Puede tardar unos segundos.</p>
            </div>
          )}

          {/* ERROR */}
          {err && (
            <div style={{ background: c.surface, border: `1px solid ${c.danger}55`, borderRadius: 14, padding: "16px 18px", display: "flex", gap: 11, alignItems: "flex-start", marginTop: 4 }}>
              <AlertCircle size={20} color={c.danger} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ color: c.text, fontWeight: 600, margin: "0 0 8px" }}>{err}</p>
                <button onClick={generate} style={{ background: c.danger, color: "#000", border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 600, cursor: "pointer", fontFamily: fBody }}>Reintentar</button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {sections && (
            <div ref={resultRef} style={{ animation: "pop .4s ease" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontFamily: fMono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: c.faint }}>Estrategia para</div>
                  <div style={{ fontFamily: fDisplay, fontSize: 22, fontWeight: 700 }}>{f.cliente} <span style={{ color: c.faint, fontWeight: 400, fontSize: 16 }}>· {f.rubro}</span></div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={copyAll} style={{ display: "flex", alignItems: "center", gap: 6, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, borderRadius: 9, padding: "9px 13px", cursor: "pointer", fontFamily: fBody, fontSize: 14, fontWeight: 600 }}>
                    {copied ? <Check size={15} color={c.accent} /> : <Copy size={15} />}{copied ? "Copiado" : "Copiar"}
                  </button>
                  <button onClick={() => { setSections(null); setRaw(""); setErr(""); }} style={{ display: "flex", alignItems: "center", gap: 6, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, borderRadius: 9, padding: "9px 13px", cursor: "pointer", fontFamily: fBody, fontSize: 14, fontWeight: 600 }}>
                    <RotateCcw size={15} /> Nueva
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {sections.map((s, i) => {
                  const Icon   = SECTION_ICONS[i] || Layers;
                  const isOpen = !!open[i];
                  return (
                    <div key={i} style={{ background: c.surface, border: `1px solid ${c.borderSoft}`, borderRadius: 14, overflow: "hidden" }}>
                      <button onClick={() => setOpen({ ...open, [i]: !isOpen })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "15px 16px", textAlign: "left" }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={15} color={c.accent} />
                        </div>
                        <span style={{ flex: 1, fontFamily: fDisplay, fontSize: 16, fontWeight: 600, color: c.text, lineHeight: 1.2 }}>{s.title}</span>
                        <ChevronDown size={18} color={c.faint} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: ".2s", flexShrink: 0 }} />
                      </button>
                      {isOpen && <div style={{ padding: "0 16px 16px 58px", fontSize: 15 }}><MD text={s.body} /></div>}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setOpen(Object.fromEntries(sections.map((_, i) => [i, true])))}
                style={{ width: "100%", marginTop: 12, padding: "12px", borderRadius: 10, background: "none", border: `1px dashed ${c.border}`, color: c.muted, cursor: "pointer", fontFamily: fMono, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" }}
              >
                Expandir todo
              </button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 40, fontFamily: fMono, fontSize: 11, color: c.faint, letterSpacing: ".06em" }}>
            CONTENT PERFORMANCE AI™ · by @alemetaads
          </div>
        </div>
      </div>
    </>
  );
}
