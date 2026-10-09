# TOEFL Prep Studio

Plataforma web local para practicar y simular el **TOEFL iBT con el formato vigente desde el 21 de enero de 2026**: Reading y Listening adaptativos, Writing con rúbricas y Speaking con micrófono, grabación, análisis acústico, transcripción opcional y evaluación basada en evidencia.

Funciona sin registro y sin servidores externos: todo el progreso se guarda en el navegador (IndexedDB). Los servicios de transcripción e IA son opcionales y se configuran en el servidor mediante variables de entorno.

> Proyecto de práctica independiente, no afiliado a ETS. TOEFL® es una marca registrada de ETS. Las bandas que muestra la aplicación son **estimaciones orientativas**, no puntuaciones oficiales.

---

## Índice

1. [Inicio rápido](#inicio-rápido)
2. [Formato del examen implementado](#formato-del-examen-implementado)
3. [Funcionalidades](#funcionalidades)
4. [Speaking: micrófono, grabación y evaluación](#speaking-micrófono-grabación-y-evaluación)
5. [Configuración de servicios externos](#configuración-de-servicios-externos)
6. [Puntuación](#puntuación)
7. [Banco de preguntas y cómo ampliarlo](#banco-de-preguntas-y-cómo-ampliarlo)
8. [Audio de Listening](#audio-de-listening)
9. [Arquitectura](#arquitectura)
10. [Almacenamiento, privacidad y seguridad](#almacenamiento-privacidad-y-seguridad)
11. [Pruebas](#pruebas)
12. [Limitaciones conocidas](#limitaciones-conocidas)

---

## Inicio rápido

### Opción A — en tu ordenador (experiencia completa, con micrófono)

Requisitos: **Node.js ≥ 22.22**, npm y Git.

```bash
git clone https://github.com/jhonrodri795-rgb/examen.git
cd examen
git checkout claude/toefl-simulation-platform-xxarpc
npm install
npm run dev          # abre http://localhost:5173  (frontend + API en un solo proceso)
```

### Opción B — versión publicada (sin instalar nada)

`npm run build:artifact` genera `dist-artifact/toefl-prep-studio.html`, un único archivo con toda la aplicación que puede publicarse como página. En esa versión no hay servidor (sin transcripción ni IA) y el visor no permite el micrófono, así que Speaking no puede grabar; todo lo demás funciona y el progreso se guarda en el navegador.

Producción local:

```bash
npm run build        # typecheck + build del cliente (dist/) + build del servidor (dist-server/)
npm start            # http://127.0.0.1:8787  (sirve dist/ y la API)
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm test` | Pruebas unitarias e integración (Vitest) |
| `npm run test:e2e` | Pruebas de extremo a extremo (Playwright, Chromium con micrófono simulado) |
| `npm run typecheck` | Comprobación de tipos del cliente, el servidor y la configuración |

El micrófono solo funciona en **contexto seguro**: `http://localhost` o HTTPS. Si sirves la aplicación en otra máquina de la red, usa HTTPS (por ejemplo, detrás de un proxy inverso).

---

## Formato del examen implementado

Antes de definir la estructura se comprobó el formato vigente (ETS: nuevo TOEFL iBT desde el 21‑ene‑2026). No se usa la estructura histórica (lecturas largas, tareas integradas de 2019–2025) para la simulación.

| Sección | Tareas | Ítems en la simulación | Tiempo |
|---|---|---|---|
| Reading (adaptativa, 2 módulos) | Complete the Words · Read in Daily Life · Read an Academic Passage | ≈40–43 | 13 + 14 min |
| Listening (adaptativa, 2 módulos) | Listen and Choose a Response · Conversation · Announcement · Academic Talk | ≈31–33 | 13 + 14 min |
| Writing | Build a Sentence (10) · Write an Email · Academic Discussion | 12 | 6 + 7 + 10 min |
| Speaking | Listen and Repeat (7) · Take an Interview (4 × 45 s, sin preparación) | 11 | ≈8 min |

- Escala: bandas **1–6** en pasos de 0,5 por sección; global = media redondeada a 0,5; alineación con el MCER. Durante la transición ETS informa también una puntuación comparable 0–120 (equivalencias publicadas: 5 ≈ 100, 4,5 ≈ 90, 4 ≈ 80, 3,5 ≈ 70).
- El número exacto de ítems y minutos de Reading/Listening varía en el examen real según la ruta adaptativa; las fuentes publicadas no coinciden del todo. La simulación usa valores dentro del rango publicado y ajustados al banco disponible.
- También hay una **simulación breve** (≈45 min) con la misma estructura.

**Cambiar el formato sin reescribir la aplicación:** toda la estructura (módulos, tareas, número de sets, dificultades, tiempos, umbral adaptativo, navegación, reproducciones, curvas de puntuación, pesos y equivalencias) está en `src/modules/exam-engine/blueprints/toefl-ibt-2026.ts`. Para añadir otro formato, crea un blueprint y regístralo en `blueprints/index.ts`. Cada intento guarda una copia del blueprint, así que los intentos antiguos no se rompen al cambiarlo.

---

## Funcionalidades

**Simulación y práctica**
- Simulación completa, simulación breve, práctica por sección, entrenamiento por tipo de tarea y práctica personalizada desde el banco.
- **Modo examen** (soluciones ocultas hasta entregar, Listening de una sola escucha y sin retroceso) y **modo práctica** (comprobar cada respuesta con explicación, Listening flexible, pausa, tiempo extendido ×1,5 o sin límite, preparación extra opcional en Speaking).
- Reading y Listening **adaptativos**: el módulo 2 se ensambla según los aciertos del módulo 1 (ruta superior/inferior).
- Temporizadores independientes por módulo/tarea basados en marcas de tiempo (exactos aunque la pestaña esté en segundo plano), avisos a 5 y 1 minuto, fin automático al agotarse.
- Panel de revisión con estados (respondida, pendiente, parcial, marcada), marcado para revisión, confirmación antes de finalizar módulo y antes de entregar.
- Autoguardado continuo; tras una recarga o cierre accidental el intento se recupera **en pausa** con el tiempo restante y todas las respuestas.
- Notas durante Listening (se guardan con el intento) y página de notas personales.

**Resultados**
- Correctas, incorrectas, sin responder, % de aciertos por sección, tiempo usado, ruta adaptativa, resultados por tipo de pregunta, fortalezas y debilidades, recomendaciones de estudio.
- Valoración de Writing/Speaking con autoevaluación, análisis local o IA; los resultados se recalculan al valorar.
- Revisión de cada respuesta con la solución y una explicación detallada en español; filtros por sección, incorrectas, sin responder y marcadas.
- Historial, evolución entre intentos (gráfico con vista de tabla), comparación de dos intentos.

**Writing**
- Editor con contador de palabras, temporizador, autoguardado local, historial de borradores (restaurar/eliminar), exportación del texto y del informe (.md).
- Análisis local transparente: extensión, oraciones, diversidad léxica (MATTR), conectores, vocabulario académico (subconjunto AWL), repeticiones, reglas gramaticales de alta precisión, comprobaciones de la tarea y rúbrica heurística 0–5 con justificación.
- Evaluación con IA opcional (coherencia, cohesión, gramática, vocabulario, desarrollo, cumplimiento), con citas verificadas y versión mejorada.

**Interfaz**
- Diseño responsive (móvil, tableta, escritorio), barra lateral, modo claro/oscuro, texto ampliado, navegación por teclado (Alt + ← / →), etiquetas accesibles, gráficos con alternativa en tabla y paleta validada para daltonismo.

---

## Speaking: micrófono, grabación y evaluación

### Micrófono (`src/modules/speaking/microphone.ts`)
- Acceso con `navigator.mediaDevices.getUserMedia({ audio })`, solo al entrar en una actividad de Speaking o al pulsar «Activar micrófono» / «Grabar prueba». Nunca se activa de forma oculta.
- Reutiliza el flujo activo (no vuelve a pedir permiso) y lo detiene con `MediaStreamTrack.stop()` al salir del estudio, al terminar la sección o al pulsar «Detener micrófono».
- Estados: disponible, solicitando permiso, activo, bloqueado, no disponible, ocupado, desconectado, no compatible.
- Detecta permisos revocados (API de permisos + fin de pista), desconexión y nuevos dispositivos (`devicechange`), y permite elegir dispositivo (`enumerateDevices()`).
- Errores gestionados: `NotAllowedError`/`SecurityError` (con instrucciones por navegador: Chrome/Edge, Firefox, Safari, iOS, Android), `NotFoundError`, `OverconstrainedError`, `NotReadableError`/`AbortError`, contexto inseguro.
- Medidor de nivel en tiempo real (Web Audio `AnalyserNode`) y grabación de prueba de 4 s.

### Grabación (`recorder.ts`)
- `MediaRecorder` con formato elegido mediante `MediaRecorder.isTypeSupported()` (webm/Opus → ogg/Opus → mp4/AAC), compatible con los proveedores de transcripción.
- Duración en tiempo real, indicador de grabación, detener, repetir (práctica), escuchar, descargar, vínculo con pregunta/tarea/intento, recuperación desde IndexedDB.
- Respeta los tiempos de preparación y respuesta de cada tarea; **finaliza automáticamente** al llegar al límite. Detecta grabación vacía, demasiado corta o demasiado larga, errores del grabador y desconexión durante la grabación (conserva lo grabado).

### Análisis acústico local — **real, aproximado**
Se calcula en el navegador sobre la señal decodificada: detección de voz por energía (tramas de 20 ms, umbral adaptativo al ruido, fusión de huecos < 250 ms). Mide duración, tiempo efectivo de habla, proporción de habla, número/duración de pausas, pausas largas (≥ 1 s), longitud media de los segmentos de habla, silencio inicial, nivel, saturación y ruido. **No mide pronunciación ni inteligibilidad.**

### Transcripción — proveedor configurable
- **OpenAI** (`whisper-1` por defecto, `verbose_json` con marcas de tiempo por palabra y confianza aproximada por segmento) o cualquier servidor compatible (`OPENAI_BASE_URL`, p. ej. Whisper autoalojado).
- **Deepgram** (`nova-3`, confianza por palabra, puntuación y detección de muletillas `filler_words`).
- Con transcripción: palabras por minuto, velocidad de articulación, muletillas, repeticiones, palabras de baja confianza (marcadas como posible error de reconocimiento, no del estudiante), transcripción sincronizada con el audio (clic en una palabra para escucharla) y alineación con la frase de referencia en Listen and Repeat.
- La transcripción se puede **corregir para estudiar**; la original se conserva y es la que se usa para evaluar.
- No se usa la Web Speech API como mecanismo de transcripción.

### Pronunciación — **real solo si se configura Azure**
- Con `PRONUNCIATION_PROVIDER=azure`, Listen and Repeat se evalúa con *Azure AI Speech Pronunciation Assessment* (audio convertido a WAV 16 kHz mono en el navegador; precisión, fluidez, completitud, prosodia y precisión por palabra).
- Sin ese servicio **no se puntúa la pronunciación**; el informe lo indica expresamente. Un acento no nativo nunca se trata como error.
- La integración con Azure se implementó según la API REST documentada y se probó con respuestas simuladas; no se pudo verificar contra el servicio real en este entorno.

### Evaluación
- **Con IA** (`EVALUATOR_PROVIDER=anthropic`, modelo por defecto `claude-opus-5-5`, SDK oficial con salida estructurada validada con Zod y *fallback* del servidor de Anthropic activado): rúbrica Delivery / Language use / Topic development / Task fulfillment (0–4), aspectos positivos, errores con cita, fragmentos a revisar, versión mejorada, ejercicios y consejos. El servidor **verifica que cada cita aparece literalmente en la transcripción** y descarta las que no; un criterio sin evidencia verificable queda como «No evaluable»; Delivery no se puntúa sin métricas de audio. El audio no se envía al evaluador, solo la transcripción y las métricas.
- **Sin IA**: evaluación heurística con reglas explícitas (pausas, ritmo, muletillas, conectores, extensión, coincidencia de palabras clave, precisión de repetición), siempre marcada como tal.
- **Autoevaluación** con rúbrica en todos los casos.
- Informes exportables (.md/.json), historial, gráfico de evolución por criterio, comparación de dos respuestas y botón «Practicar de nuevo».
- La pestaña «Demo» muestra un informe de ejemplo **claramente identificado** como no procedente de tu voz.

### Cómo probar el micrófono
1. `npm run dev` y abre `http://localhost:5173/speaking`.
2. Pulsa **Activar micrófono** y acepta el permiso del navegador; el estado pasa a «Activo» y el medidor muestra el nivel al hablar.
3. Elige otro dispositivo en el selector si tienes varios.
4. Pulsa **Grabar prueba**: graba 4 s y aparece un reproductor.
5. Pestaña **Practicar** → elige una tarea → **Comenzar**. Al terminar verás el informe.
6. Para probar el bloqueo, deniega el permiso en el navegador: verás el estado «Bloqueado» con instrucciones.

---

## Configuración de servicios externos

Copia `.env.example` a `.env` y rellena solo lo necesario. Las variables se leen en Node (servidor de Vite en desarrollo o `npm start`); **nunca llegan al navegador**.

| Variable | Uso |
|---|---|
| `STT_PROVIDER` | `openai`, `deepgram` o `none` (se autodetecta por la clave) |
| `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_STT_MODEL` | Transcripción OpenAI / compatible |
| `DEEPGRAM_API_KEY`, `DEEPGRAM_MODEL` | Transcripción Deepgram |
| `PRONUNCIATION_PROVIDER`, `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` | Evaluación fonética (Listen and Repeat) |
| `EVALUATOR_PROVIDER`, `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `ANTHROPIC_EFFORT` | Evaluación con IA de Speaking y Writing |
| `MAX_AUDIO_MB`, `MAX_AUDIO_SECONDS`, `MIN_AUDIO_SECONDS`, `MAX_TEXT_CHARS` | Validación de entradas |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MIN`, `PROVIDER_TIMEOUT_MS` | Límite de uso y tiempo máximo por llamada |
| `PORT`, `HOST` | Servidor de producción |

Si el evaluador es `anthropic` sin `ANTHROPIC_API_KEY`, el SDK intenta las credenciales locales (`ant auth login`). Estado de la configuración: **Configuración → Privacidad y servicios externos** o `GET /api/capabilities`.

### API del servidor

| Método y ruta | Descripción |
|---|---|
| `GET /api/health` | Estado |
| `GET /api/capabilities` | Proveedores configurados (sin claves), política de datos y límites |
| `POST /api/speaking/transcribe?durationMs=…` | Cuerpo: audio (`audio/webm`, `ogg`, `mp4`, `mpeg`, `wav`). Devuelve la transcripción |
| `POST /api/speaking/pronunciation?referenceText=…` | Cuerpo: WAV 16 kHz mono. Evaluación fonética |
| `POST /api/speaking/evaluate` | JSON con tarea, transcripción y métricas. Devuelve el informe |
| `POST /api/writing/evaluate` | JSON con tarea y texto. Devuelve el informe |

Las rutas que contactan proveedores exigen la cabecera `x-external-processing-consent: granted` (la interfaz solo la envía tras el consentimiento explícito del usuario), aplican límite de uso, límite de tamaño de cuerpo, validación del tipo declarado **y de la firma binaria** del archivo, duración mínima/máxima (declarada, leída de la cabecera WAV y comprobada con la duración que devuelve el proveedor) y tiempo máximo por llamada. Los errores se devuelven como `{ "error": { "code", "message" } }` con mensajes comprensibles.

---

## Puntuación

| Qué | Tipo |
|---|---|
| Correctas, incorrectas, sin responder, % de aciertos, tiempo, por tipo de pregunta | **Cálculo exacto** |
| Banda 1–6 por sección (Reading/Listening) | Estimación con curvas propias según aciertos y ruta adaptativa |
| Banda de Writing/Speaking | Media ponderada de componentes: Build a Sentence (objetivo) + rúbricas (autoevaluación, heurística o IA; 0–5 → banda 1–6) |
| Global, MCER | Media de las 4 secciones redondeada a 0,5; solo si las 4 están puntuadas |
| Escala 0–120 | Solo dentro de las equivalencias publicadas por ETS (3,5–5); fuera de ese rango no se extrapola |

La interfaz distingue siempre los cálculos exactos de las estimaciones y advierte que no son puntuaciones oficiales de ETS.

---

## Banco de preguntas y cómo ampliarlo

Banco inicial **original** (108 sets, 299 ítems), con 10 temas (biología, historia, geología, ingeniería, medioambiente, psicología, economía, sociología, arte, tecnología, más astronomía y lingüística) y tres niveles de dificultad:

| Tarea | Sets | Ítems |
|---|---|---|
| Complete the Words | 8 | 80 |
| Read in Daily Life | 8 | 22 |
| Read an Academic Passage | 9 | 45 |
| Listen and Choose a Response | 24 | 24 |
| Conversation / Announcement / Academic Talk | 6 / 4 / 7 | 18 / 10 / 28 |
| Build a Sentence | 20 | 20 |
| Write an Email / Academic Discussion | 5 / 5 | 5 / 5 |
| Listen and Repeat / Take an Interview | 3 / 4 | 21 / 16 |
| Opinión con preparación (formato anterior, solo práctica) | 5 | 5 |

Cada pregunta tiene identificador único, sección, tarea, habilidad (tipo de pregunta), dificultad, enunciado, opciones, respuesta correcta, explicación detallada, material de apoyo y puntuación.

**Añadir contenido sin tocar la lógica:**
1. **En el código:** crea un archivo en `src/modules/question-bank/data/**` que exporte `sets: ContentSet[]` (tipos en `types.ts`). El registro lo descubre automáticamente (`import.meta.glob`) y `npm test` valida identificadores únicos, índices de respuesta, citas resaltadas, etc.
2. **Desde la interfaz:** Banco de preguntas → **Importar pack JSON** (array de sets u objeto `{ "name", "sets" }`). Se valida con las mismas reglas y se guarda en IndexedDB. El botón **Plantilla** descarga un ejemplo.

Sintaxis de Complete the Words: `{{prefijo|letras-que-faltan}}`, por ejemplo `{{vis|its}}`.

---

## Audio de Listening

Por defecto el audio se genera con la **síntesis de voz del navegador** (voces y velocidad configurables; voces distintas o tono distinto por hablante). Si el navegador no tiene síntesis de voz, se muestra la transcripción como alternativa accesible.

Para usar grabaciones de mayor calidad:
1. Coloca los archivos en `public/audio/` (mp3, m4a, ogg o wav).
2. Edita `public/audio/manifest.json` asociando el id del set con el archivo:
   ```json
   { "ls-cv-reserve-book": "ls-cv-reserve-book.mp3", "ls-at-transits": "transits.m4a" }
   ```
3. Recarga la aplicación. (Alternativa: añade `audioSrc: '/audio/archivo.mp3'` al set en el código.)

Los ids están visibles en el Banco de preguntas. El guion de cada set (`script`) sirve de transcripción y de guía para grabar.

---

## Arquitectura

```
src/
  app/                    Layout, rutas (carga diferida), proveedores (ajustes, banco, micrófono, consentimiento, avisos)
  components/ui|exam|charts   Componentes reutilizables (Radix UI, iconos Lucide, gráficos SVG accesibles)
  lib/                    Utilidades, cliente de la API
  modules/
    dashboard/            Inicio y práctica por sección
    exam-engine/          Blueprints, ensamblaje, rutas adaptativas, temporizadores, motor de estados (funciones puras), UI del examen
    reading/ listening/ writing/ speaking/   Vistas y lógica de cada sección (TTS, editor, análisis, micrófono, grabadora, análisis acústico, pipeline)
    question-bank/        Tipos, datos, registro, validador, explorador
    scoring/              Puntuación por ítem, bandas, resultados, recomendaciones
    results/ history/     Resultados, revisión, historial, notas
    settings/ storage/    Ajustes; IndexedDB, repositorios, exportación/importación
    tips/                 Formato y estrategias
shared/                   Contrato de tipos cliente ↔ servidor
server/                   API Hono: validación, límites, proveedores STT/pronunciación/IA (solo en servidor)
e2e/                      Pruebas Playwright
```

El motor del examen (`exam-engine/engine.ts`) es un conjunto de funciones puras `Attempt → Attempt` (crear, comenzar sección, responder, navegar, finalizar módulo con enrutamiento adaptativo, entregar, recuperar, valorar); la interfaz solo las invoca y persiste el resultado.

---

## Almacenamiento, privacidad y seguridad

- **IndexedDB** (`idb`): intentos (respuestas, temporizadores, resultados, valoraciones), grabaciones (como `ArrayBuffer`, nunca en `localStorage`), informes de Speaking y Writing, borradores, notas, packs importados y ajustes. `localStorage` solo guarda el tema para evitar parpadeos.
- Guardado por **revisión**: cada cambio incrementa `rev` y el repositorio rechaza, en la misma transacción, escrituras más antiguas (p. ej. otra pestaña con datos obsoletos); el autoguardado de borradores no sobrescribe un texto más reciente.
- **Exportación/importación** JSON (con o sin audio), en modo combinar (conserva lo más reciente) o reemplazar; borrado del historial de Speaking o de todos los datos.
- Controles: activar/desactivar el guardado local de grabaciones, consentimiento para servicios externos (preguntar / siempre / nunca), consulta de qué datos se envían y a quién, eliminar grabaciones e informes.
- El servidor **no almacena** audio, textos ni informes: procesa cada solicitud en memoria y solo registra metadatos (duración de la llamada, código de error).
- Las claves solo existen en variables de entorno del servidor; `GET /api/capabilities` nunca las expone (cubierto por pruebas).
- Producción: cabeceras `Content-Security-Policy`, `Permissions-Policy: microphone=(self)`, `X-Content-Type-Options`, `Referrer-Policy`; API con `Cache-Control: no-store`.
- **Migrar a PostgreSQL u otro backend:** sustituye las funciones de `src/modules/storage/repositories.ts` por llamadas a una API (misma firma) y añade las rutas correspondientes en `server/`; el resto de la aplicación no cambia.

---

## Pruebas

```bash
npm test             # 100 pruebas (Vitest)
npm run test:e2e     # 11 pruebas (Playwright, Chromium con dispositivo de audio simulado)
```

Cubren, entre otros:
- **Banco:** validación de todo el contenido, huecos de Complete the Words, cobertura de temas, rechazo de packs inválidos.
- **Motor:** ensamblaje sin repeticiones y reproducible, prioridad de contenido no visto, navegación libre/solo avance, conservación de respuestas, bloqueo tras comprobar, rutas adaptativas superior/inferior, temporizadores (límite, extendido, sin límite, fin por tiempo), recuperación de sesiones interrumpidas, entrega anticipada, práctica personalizada, cálculo de bandas y recálculo al valorar.
- **Puntuación:** opción única/múltiple, huecos, orden de fragmentos y alternativas, escalas, MCER, equivalencias 0–120.
- **Almacenamiento:** guardado/recuperación, rechazo de revisiones antiguas, autoguardado de borradores, grabaciones, borrado de datos, exportación/importación con audio.
- **Speaking:** permiso concedido/denegado, sin micrófono, micrófono ocupado, contexto inseguro, cambio y desconexión de dispositivo, pista finalizada, liberación de pistas, selección de formato, grabación manual, **fin automático por límite de tiempo**, error de grabación, interrupción, grabación vacía/corta/larga, VAD (pausas, silencio, zumbido estacionario, saturación, volumen bajo), métricas de transcripción, alineación, evaluación heurística.
- **Servidor:** configuración, validación de audio (vacío, corto, largo, grande, firma falsa, tipo no admitido), API no configurada (503), consentimiento obligatorio (428), transcripción correcta/fallida/tiempo agotado/sin voz, duración real excesiva, límite de uso (429), tamaño de cuerpo (413), validación de cuerpos, mapeo de respuestas de OpenAI, Deepgram y Azure, verificación de evidencias del evaluador.
- **E2E:** todas las páginas sin errores; Reading completo en modo examen (navegación, marcado, módulo adaptativo, resultados, revisión); recarga con recuperación; Listening sin retroceso; autoguardado de Writing; micrófono simulado con prueba, grabación y análisis; Speaking en modo examen con fin por tiempo y avance automático; permiso denegado y omisión de la sección; consentimiento, transcripción y evaluación con IA (red interceptada en la prueba), rechazo del consentimiento sin llamadas externas, transcripción fallida y evaluación incompleta con informe parcial.

---

## Limitaciones conocidas

- No se han probado proveedores reales (OpenAI, Deepgram, Azure, Anthropic) por falta de claves en el entorno de desarrollo: las integraciones se verificaron con respuestas simuladas y siguen sus APIs documentadas.
- Las bandas son estimaciones con curvas propias y no replican el escalado de ETS. Writing/Speaking dependen de la valoración elegida.
- El análisis acústico usa detección de voz por energía: el ruido de fondo intenso o la música pueden alterar pausas y tiempo de habla.
- Whisper tiende a omitir muletillas y puede normalizar la gramática; el recuento de muletillas y la detección de errores pueden quedarse cortos (el informe lo indica).
- La calidad del Listening con síntesis de voz depende de las voces instaladas en el navegador/sistema; para una práctica realista conviene añadir grabaciones.
- Al recargar durante un examen, el temporizador se pausa en el último guardado (en el examen oficial no existe pausa).
- Los datos viven en un único navegador; para usarlos en otro dispositivo, exporta e importa.
