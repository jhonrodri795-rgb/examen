import { useEffect, useRef, useState } from 'react';
import { Database, Download, Headphones, Mic, Palette, RefreshCw, Server, ShieldCheck, Timer, Trash2, Upload, Volume2 } from 'lucide-react';
import { useBank, useCapabilities, useSettings, useToast } from '@/app/context';
import { Alert, Badge, Button, Card, CardHeader, ConfirmDialog, PageHeader, Select, Switch } from '@/components/ui';
import { downloadText } from '@/lib/api';
import { BLUEPRINTS } from '@/modules/exam-engine/blueprints';
import { englishVoices, loadVoices, playScript } from '@/modules/listening/tts';
import { MicSetupPanel } from '@/modules/speaking/ui/MicPanel';
import { clearAllData, clearSpeakingHistory } from '@/modules/storage/repositories';
import { exportAll, importAll } from '@/modules/storage/export-import';
import type { Theme } from './settings';

export function SettingsPage() {
  const { settings, update } = useSettings();
  const { caps, refresh, loading } = useCapabilities();
  const { reload } = useBank();
  const toast = useToast();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [confirm, setConfirm] = useState<'all' | 'speaking' | null>(null);
  const [usage, setUsage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void loadVoices().then(() => setVoices(englishVoices()));
    void navigator.storage?.estimate?.().then((e) => {
      if (e.usage != null && e.quota) setUsage(`${(e.usage / 1024 / 1024).toFixed(1)} MB usados de ~${Math.round(e.quota / 1024 / 1024)} MB disponibles`);
    });
  }, []);

  const doExport = async (includeAudio: boolean) => {
    try {
      const data = await exportAll({ includeAudio });
      downloadText(JSON.stringify(data, null, 2), `toefl-prep-datos-${new Date().toISOString().slice(0, 10)}.json`, 'application/json');
      toast('Datos exportados.', 'ok');
    } catch (e) {
      toast(`Error al exportar: ${(e as Error).message}`, 'bad');
    }
  };

  const doImport = async (file: File) => {
    try {
      const summary = await importAll(JSON.parse(await file.text()), importMode);
      const total = Object.values(summary.imported).reduce((a, b) => a + b, 0);
      toast(`Importados ${total} registros${summary.warnings.length ? `. ${summary.warnings.join(' ')}` : ''}`, 'ok');
      await reload();
      setTimeout(() => window.location.reload(), 800);
    } catch (e) {
      toast(`Error al importar: ${(e as Error).message}`, 'bad');
    }
  };

  const voiceOptions = [{ value: '', label: 'Automática' }, ...voices.map((v) => ({ value: v.name, label: `${v.name} (${v.lang})` }))];

  return (
    <div className="space-y-6">
      <PageHeader title="Configuración" description="Apariencia, valores predeterminados de los exámenes, audio, micrófono, privacidad y datos." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Apariencia y accesibilidad" icon={<Palette className="h-5 w-5" />} />
          <div className="space-y-3 p-5">
            <Select id="theme" label="Tema" value={settings.theme} onChange={(v) => update({ theme: v as Theme })} options={[{ value: 'system', label: 'Según el sistema' }, { value: 'light', label: 'Claro' }, { value: 'dark', label: 'Oscuro' }]} />
            <Switch id="large" checked={settings.largeText} onCheckedChange={(v) => update({ largeText: v })} label="Texto más grande" description="Aumenta el tamaño base del texto un 12,5 %." />
          </div>
        </Card>

        <Card>
          <CardHeader title="Exámenes" icon={<Timer className="h-5 w-5" />} description="Valores iniciales al configurar una práctica." />
          <div className="space-y-3 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Select id="def-mode" label="Modo" value={settings.defaultMode} onChange={(v) => update({ defaultMode: v as 'practice' | 'exam' })} options={[{ value: 'practice', label: 'Práctica' }, { value: 'exam', label: 'Examen' }]} />
              <Select id="def-timing" label="Tiempo" value={settings.defaultTiming} onChange={(v) => update({ defaultTiming: v as 'standard' | 'extended' | 'untimed' })} options={[{ value: 'standard', label: 'Estándar' }, { value: 'extended', label: 'Extendido ×1,5' }, { value: 'untimed', label: 'Sin límite (práctica)' }]} />
              <Select className="sm:col-span-2" id="def-bp" label="Estructura" value={settings.defaultBlueprintId} onChange={(v) => update({ defaultBlueprintId: v })} options={BLUEPRINTS.map((b) => ({ value: b.id, label: b.name }))} />
            </div>
            <Switch id="def-instant" checked={settings.instantFeedback} onCheckedChange={(v) => update({ instantFeedback: v })} label="Comprobar respuestas al momento (práctica)" />
            <Switch id="def-relaxed" checked={settings.relaxedListening} onCheckedChange={(v) => update({ relaxedListening: v })} label="Listening flexible (práctica)" />
          </div>
        </Card>

        <Card>
          <CardHeader title="Audio de Listening" icon={<Headphones className="h-5 w-5" />} description="Síntesis de voz del navegador (si no hay grabaciones en public/audio)." />
          <div className="space-y-3 p-5">
            {voices.length === 0 && <Alert tone="warn">No se encontraron voces en inglés en este navegador. El Listening mostrará la transcripción como alternativa.</Alert>}
            <div className="grid gap-3 sm:grid-cols-2">
              <Select id="v-f" label="Voz femenina" value={settings.ttsVoiceFemale ?? ''} onChange={(v) => update({ ttsVoiceFemale: v || null })} options={voiceOptions} />
              <Select id="v-m" label="Voz masculina" value={settings.ttsVoiceMale ?? ''} onChange={(v) => update({ ttsVoiceMale: v || null })} options={voiceOptions} />
            </div>
            <div>
              <label htmlFor="rate" className="mb-1 block text-xs font-medium text-muted">Velocidad: {settings.ttsRate.toFixed(2)}×</label>
              <input id="rate" type="range" min={0.7} max={1.2} step={0.05} value={settings.ttsRate} onChange={(e) => update({ ttsRate: Number(e.target.value) })} className="w-full accent-sky-600" />
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<Volume2 className="h-4 w-4" />}
              onClick={() => playScript([
                { speaker: 'W', voice: 'female', text: 'Hi! Are you ready for the listening section?' },
                { speaker: 'M', voice: 'male', text: 'I think so. Let me grab my headphones.' },
              ], { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate })}
            >
              Probar voces
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Micrófono" icon={<Mic className="h-5 w-5" />} />
          <div className="space-y-3 p-5">
            <MicSetupPanel compact />
            <Select id="prep-default" label="Preparación extra en Speaking (práctica)" value={String(settings.speakingPrepSec)} onChange={(v) => update({ speakingPrepSec: Number(v) })} options={[0, 10, 15, 30].map((n) => ({ value: String(n), label: n ? `${n} s` : 'Ninguna (formato 2026)' }))} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Privacidad y servicios externos" icon={<ShieldCheck className="h-5 w-5" />} actions={<Button size="sm" variant="ghost" loading={loading} onClick={() => void refresh()} icon={<RefreshCw className="h-4 w-4" />}>Comprobar</Button>} />
          <div className="space-y-3 p-5 text-sm">
            <Switch id="p-save" checked={settings.saveRecordings} onCheckedChange={(v) => update({ saveRecordings: v })} label="Guardar grabaciones de Speaking localmente" />
            <Select id="p-consent" label="Envío de audio/texto a proveedores" value={settings.cloudConsent} onChange={(v) => update({ cloudConsent: v as 'ask' | 'granted' | 'denied' })} options={[{ value: 'ask', label: 'Preguntar cada sesión' }, { value: 'granted', label: 'Permitir siempre' }, { value: 'denied', label: 'Nunca (solo análisis local)' }]} />
            <div className="space-y-2 rounded-lg bg-surface-3 p-3">
              <p className="flex items-center gap-2 font-medium text-ink"><Server className="h-4 w-4" /> Servidor local {caps ? <Badge tone="ok">conectado · v{caps.version}</Badge> : <Badge>no disponible</Badge>}</p>
              {caps && (
                <ul className="space-y-1 text-xs text-ink-2">
                  <li>Transcripción: {caps.stt.configured ? `${caps.stt.provider} (${caps.stt.model})` : 'no configurada'}</li>
                  <li>Pronunciación: {caps.pronunciation.configured ? caps.pronunciation.provider : 'no configurada'}</li>
                  <li>Evaluador IA: {caps.evaluator.configured ? `${caps.evaluator.provider} (${caps.evaluator.model})` : 'no configurado'}</li>
                  <li>Límites: {Math.round(caps.limits.maxAudioBytes / 1024 / 1024)} MB · {caps.limits.minAudioSec}–{caps.limits.maxAudioSec} s por audio</li>
                  <li>{caps.storage}</li>
                </ul>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Datos" icon={<Database className="h-5 w-5" />} description={usage ?? 'Todo se guarda en IndexedDB de este navegador.'} />
          <div className="space-y-4 p-5 text-sm">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => void doExport(false)}>Exportar (sin audio)</Button>
              <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => void doExport(true)}>Exportar con grabaciones</Button>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <Select id="imp-mode" label="Al importar" value={importMode} onChange={(v) => setImportMode(v as 'merge' | 'replace')} options={[{ value: 'merge', label: 'Combinar (conserva lo más reciente)' }, { value: 'replace', label: 'Reemplazar todos los datos' }]} />
              <input ref={fileRef} type="file" accept=".json,application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void doImport(f); e.target.value = ''; }} />
              <Button variant="outline" size="sm" icon={<Upload className="h-4 w-4" />} onClick={() => fileRef.current?.click()}>Importar archivo</Button>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line pt-4">
              <Button variant="ghost" size="sm" className="text-bad" icon={<Trash2 className="h-4 w-4" />} onClick={() => setConfirm('speaking')}>Borrar historial de Speaking</Button>
              <Button variant="danger" size="sm" icon={<Trash2 className="h-4 w-4" />} onClick={() => setConfirm('all')}>Borrar todos los datos</Button>
            </div>
          </div>
        </Card>
      </div>
      <ConfirmDialog
        open={!!confirm}
        onOpenChange={(v) => !v && setConfirm(null)}
        title={confirm === 'all' ? '¿Borrar todos los datos?' : '¿Borrar el historial de Speaking?'}
        tone="danger"
        confirmLabel="Borrar"
        description={confirm === 'all' ? 'Se eliminarán intentos, grabaciones, borradores, notas, packs importados y ajustes de este navegador. Exporta antes si quieres conservarlos.' : 'Se eliminarán todas las grabaciones e informes de Speaking.'}
        onConfirm={async () => {
          if (confirm === 'all') {
            await clearAllData();
            toast('Datos borrados.', 'ok');
            setTimeout(() => window.location.reload(), 600);
          } else {
            await clearSpeakingHistory();
            toast('Historial de Speaking borrado.', 'ok');
          }
        }}
      />
    </div>
  );
}
