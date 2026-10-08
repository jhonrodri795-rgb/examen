/**
 * Gráficos SVG sin dependencias.
 * - Colores categóricos en orden fijo (validados para daltonismo en claro/oscuro).
 * - Líneas de 2 px, marcadores de 8 px, rejilla recesiva, un único eje Y.
 * - Leyenda + etiquetas directas (la identidad nunca depende solo del color).
 * - Capa de hover/teclado con tooltip y vista de tabla alternativa.
 */
import { useId, useMemo, useState, type KeyboardEvent } from 'react';
import { Table2, LineChart as LineIcon } from 'lucide-react';
import { Button } from '@/components/ui';

export const SERIES_COLORS = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)'];

export interface Series {
  key: string;
  label: string;
  /** Índice fijo de color: el color sigue a la entidad, no a su posición. */
  colorIndex: number;
  values: (number | null)[];
}

interface LineChartProps {
  title: string;
  xLabels: string[];
  series: Series[];
  yMin: number;
  yMax: number;
  yStep: number;
  format?: (v: number) => string;
  height?: number;
  emptyText?: string;
}

export function LineChart({ title, xLabels, series, yMin, yMax, yStep, format = (v) => v.toFixed(1), height = 260, emptyText = 'Sin datos todavía.' }: LineChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const id = useId();
  const W = 640;
  const H = height;
  const m = { top: 16, right: 96, bottom: 36, left: 40 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const n = xLabels.length;
  const x = (i: number) => m.left + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v: number) => m.top + ih - ((v - yMin) / (yMax - yMin)) * ih;
  const ticks = useMemo(() => {
    const out: number[] = [];
    for (let v = yMin; v <= yMax + 1e-9; v += yStep) out.push(+v.toFixed(2));
    return out;
  }, [yMin, yMax, yStep]);
  const hasData = series.some((s) => s.values.some((v) => v != null));

  // Etiquetas directas al final de cada serie, separadas para no solaparse.
  const endLabels = useMemo(() => {
    const items = series
      .map((s) => {
        let idx = -1;
        for (let i = s.values.length - 1; i >= 0; i--) if (s.values[i] != null) { idx = i; break; }
        return idx < 0 ? null : { s, idx, v: s.values[idx]!, y: y(s.values[idx]!) };
      })
      .filter((v): v is NonNullable<typeof v> => !!v)
      .sort((a, b) => a.y - b.y);
    for (let i = 1; i < items.length; i++) if (items[i]!.y - items[i - 1]!.y < 14) items[i]!.y = items[i - 1]!.y + 14;
    // Si las etiquetas se salen por abajo, se desplazan hacia arriba manteniendo la separación.
    const bottom = m.top + ih;
    const overflow = (items[items.length - 1]?.y ?? 0) - bottom;
    if (overflow > 0) for (const it of items) it.y -= overflow;
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, yMin, yMax, height]);

  const onKey = (e: KeyboardEvent) => {
    if (!n) return;
    if (e.key === 'ArrowRight') setHover((h) => Math.min(n - 1, (h ?? -1) + 1));
    else if (e.key === 'ArrowLeft') setHover((h) => Math.max(0, (h ?? n) - 1));
    else if (e.key === 'Escape') setHover(null);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <figcaption className="text-sm font-semibold text-ink">{title}</figcaption>
        <div className="flex flex-wrap items-center gap-3">
          {series.length > 1 && (
            <ul className="flex flex-wrap gap-3 text-xs text-ink-2" aria-label="Leyenda">
              {series.map((s) => (
                <li key={s.key} className="flex items-center gap-1.5">
                  <svg width="16" height="8" aria-hidden>
                    <line x1="0" y1="4" x2="16" y2="4" stroke={SERIES_COLORS[s.colorIndex]} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {s.label}
                </li>
              ))}
            </ul>
          )}
          <Button variant="ghost" size="sm" onClick={() => setTable((t) => !t)} aria-pressed={table} icon={table ? <LineIcon className="h-4 w-4" /> : <Table2 className="h-4 w-4" />}>
            {table ? 'Gráfico' : 'Tabla'}
          </Button>
        </div>
      </div>

      {!hasData ? (
        <p className="rounded-lg border border-dashed border-line p-6 text-center text-sm text-muted">{emptyText}</p>
      ) : table ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted">
              <tr>
                <th className="py-1 pr-3 font-medium">Intento</th>
                {series.map((s) => (
                  <th key={s.key} className="py-1 pr-3 font-medium">{s.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {xLabels.map((lbl, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="py-1 pr-3 text-ink-2">{lbl}</td>
                  {series.map((s) => (
                    <td key={s.key} className="py-1 pr-3 tabular-nums text-ink">{s.values[i] == null ? '—' : format(s.values[i]!)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full touch-none select-none"
            role="img"
            aria-labelledby={`${id}-desc`}
            tabIndex={0}
            onKeyDown={onKey}
            onBlur={() => setHover(null)}
            onPointerLeave={() => setHover(null)}
            onPointerMove={(e) => {
              const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
              const px = ((e.clientX - rect.left) / rect.width) * W;
              if (n <= 1) return setHover(0);
              const i = Math.round(((px - m.left) / iw) * (n - 1));
              setHover(Math.max(0, Math.min(n - 1, i)));
            }}
          >
            <desc id={`${id}-desc`}>{`${title}. Usa las flechas izquierda y derecha para recorrer los valores, o la vista de tabla.`}</desc>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={m.left} x2={m.left + iw} y1={y(t)} y2={y(t)} stroke="var(--grid)" strokeWidth="1" />
                <text x={m.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize="11" fill="var(--muted)">
                  {format(t)}
                </text>
              </g>
            ))}
            {xLabels.map((lbl, i) =>
              n <= 8 || i % Math.ceil(n / 8) === 0 || i === n - 1 ? (
                <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--muted)">
                  {lbl}
                </text>
              ) : null,
            )}
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={m.top} y2={m.top + ih} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" />}
            {series.map((s) => {
              const color = SERIES_COLORS[s.colorIndex];
              const segs: string[] = [];
              let cur = '';
              s.values.forEach((v, i) => {
                if (v == null) {
                  if (cur) segs.push(cur);
                  cur = '';
                } else cur += `${cur ? 'L' : 'M'}${x(i)},${y(v)}`;
              });
              if (cur) segs.push(cur);
              return (
                <g key={s.key}>
                  {segs.map((d, k) => (
                    <path key={k} d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  ))}
                  {s.values.map((v, i) =>
                    v == null ? null : (
                      <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 5 : 4} fill={color} stroke="var(--surface)" strokeWidth="2" />
                    ),
                  )}
                </g>
              );
            })}
            {endLabels.map((l) => (
              <text key={l.s.key} x={x(l.idx) + 10} y={l.y} dy="0.32em" fontSize="11" fill="var(--ink-2)">
                {l.s.label} {format(l.v)}
              </text>
            ))}
          </svg>
          {hover !== null && (
            <div
              className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-lg"
              style={{ left: `${(x(hover) / W) * 100}%`, transform: x(hover) > W * 0.6 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)' }}
              role="status"
            >
              <p className="mb-1 font-medium text-muted">{xLabels[hover]}</p>
              {series.map((s) => (
                <p key={s.key} className="flex items-center gap-2">
                  <svg width="12" height="6" aria-hidden>
                    <line x1="0" y1="3" x2="12" y2="3" stroke={SERIES_COLORS[s.colorIndex]} strokeWidth="2" />
                  </svg>
                  <strong className="tabular-nums text-ink">{s.values[hover] == null ? '—' : format(s.values[hover]!)}</strong>
                  <span className="text-ink-2">{s.label}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}

export interface BarDatum {
  key: string;
  label: string;
  value: number;
  /** Texto auxiliar (p. ej. "7/10"). */
  detail?: string;
}

/** Barras horizontales de una sola serie (un solo tono, sin leyenda). */
export function BarChart({ title, data, max = 1, format = (v) => `${Math.round(v * 100)} %`, emptyText = 'Sin datos todavía.' }: { title: string; data: BarDatum[]; max?: number; format?: (v: number) => string; emptyText?: string }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <figure className="space-y-2">
      <figcaption className="text-sm font-semibold text-ink">{title}</figcaption>
      {data.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line p-6 text-center text-sm text-muted">{emptyText}</p>
      ) : (
        <ul className="space-y-1.5">
          {data.map((d) => {
            const pct = max > 0 ? Math.max(0, Math.min(1, d.value / max)) : 0;
            return (
              <li
                key={d.key}
                className="grid grid-cols-[minmax(7rem,12rem)_1fr_auto] items-center gap-3 rounded-md px-1 py-0.5 text-sm focus-within:bg-surface-3 hover:bg-surface-3"
                onPointerEnter={() => setHover(d.key)}
                onPointerLeave={() => setHover(null)}
                tabIndex={0}
                onFocus={() => setHover(d.key)}
                onBlur={() => setHover(null)}
                aria-label={`${d.label}: ${format(d.value)}${d.detail ? ` (${d.detail})` : ''}`}
              >
                <span className="truncate text-ink-2" title={d.label}>{d.label}</span>
                <span className="relative h-3 rounded-r bg-surface-3" aria-hidden>
                  <span
                    className="absolute inset-y-0 left-0 rounded-r-[4px]"
                    style={{ width: `${pct * 100}%`, background: 'var(--series-1)', opacity: hover && hover !== d.key ? 0.55 : 1 }}
                  />
                </span>
                <span className="w-20 text-right tabular-nums text-ink">
                  {format(d.value)}
                  {d.detail && <span className="ml-1 text-xs text-muted">{d.detail}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </figure>
  );
}
