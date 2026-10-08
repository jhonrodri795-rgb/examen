import { useEffect, useRef, useState } from 'react';
import { NotebookPen, Plus, Trash2 } from 'lucide-react';
import { Button, Card, EmptyState, PageHeader } from '@/components/ui';
import { formatDate } from '@/lib/format';
import { newId } from '@/lib/random';
import { deleteNote, listNotes, saveNote } from '@/modules/storage/repositories';
import type { NoteRecord } from '@/modules/storage/db';
import { cn } from '@/lib/format';

/** Notas personales (vocabulario, estrategias, errores frecuentes). */
export function NotesPage() {
  const [notes, setNotes] = useState<NoteRecord[]>([]);
  const [current, setCurrent] = useState<NoteRecord | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    void listNotes().then((n) => {
      setNotes(n);
      setCurrent(n[0] ?? null);
    }).catch(() => undefined);
  }, []);

  const edit = (patch: Partial<NoteRecord>) => {
    if (!current) return;
    const next = { ...current, ...patch, updatedAt: Date.now() };
    setCurrent(next);
    setNotes((list) => list.map((n) => (n.id === next.id ? next : n)));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void saveNote(next), 400);
  };

  const create = async () => {
    const n: NoteRecord = { id: newId('note'), title: 'Nueva nota', text: '', createdAt: Date.now(), updatedAt: Date.now() };
    await saveNote(n);
    setNotes((l) => [n, ...l]);
    setCurrent(n);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Notas personales" description="Guarda vocabulario, plantillas y errores frecuentes. Se guardan automáticamente en este navegador." actions={<Button onClick={create} icon={<Plus className="h-4 w-4" />}>Nueva nota</Button>} />
      {notes.length === 0 ? (
        <EmptyState icon={<NotebookPen className="h-8 w-8" />} title="Sin notas" description="Crea tu primera nota para organizar tu estudio." action={<Button onClick={create}>Crear nota</Button>} />
      ) : (
        <div className="grid gap-4 md:grid-cols-[16rem_1fr]">
          <Card className="p-2">
            <ul className="space-y-1">
              {notes.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => setCurrent(n)} className={cn('w-full rounded-lg px-3 py-2 text-left text-sm', current?.id === n.id ? 'bg-accent-soft text-ink' : 'text-ink-2 hover:bg-surface-3')}>
                    <span className="block truncate font-medium">{n.title || 'Sin título'}</span>
                    <span className="block text-xs text-muted">{formatDate(n.updatedAt)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
          {current && (
            <Card className="space-y-3 p-4">
              <label htmlFor="note-title" className="sr-only">Título</label>
              <input id="note-title" value={current.title} onChange={(e) => edit({ title: e.target.value })} className="w-full rounded-lg border border-line bg-surface px-3 py-2 font-semibold text-ink" />
              <label htmlFor="note-text" className="sr-only">Contenido</label>
              <textarea id="note-text" value={current.text} onChange={(e) => edit({ text: e.target.value })} rows={16} className="w-full rounded-lg border border-line bg-surface p-3 text-ink" placeholder="Escribe aquí…" />
              <Button
                variant="ghost"
                className="text-bad"
                icon={<Trash2 className="h-4 w-4" />}
                onClick={async () => {
                  await deleteNote(current.id);
                  const rest = notes.filter((n) => n.id !== current.id);
                  setNotes(rest);
                  setCurrent(rest[0] ?? null);
                }}
              >
                Eliminar nota
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
