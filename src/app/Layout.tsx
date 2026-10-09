import { useEffect, useState, useSyncExternalStore } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import {
  BarChart3, BookOpen, GraduationCap, History, Home, Lightbulb, Library, Menu, Mic, Moon, NotebookPen, PenLine, PlayCircle, Settings, Sun, X,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/format';
import { useSettings } from './context';

const NAV = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/exam/new', label: 'Nueva simulación', icon: PlayCircle },
  { to: '/practice', label: 'Práctica por sección', icon: GraduationCap },
  { to: '/speaking', label: 'Estudio de Speaking', icon: Mic },
  { to: '/writing', label: 'Estudio de Writing', icon: PenLine },
  { to: '/bank', label: 'Banco de preguntas', icon: Library },
  { to: '/history', label: 'Historial y progreso', icon: History },
  { to: '/notes', label: 'Notas', icon: NotebookPen },
  { to: '/tips', label: 'Consejos y formato', icon: Lightbulb },
  { to: '/settings', label: 'Configuración', icon: Settings },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Navegación principal" className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive ? 'bg-white/12 text-white' : 'text-sky-100/80 hover:bg-white/8 hover:text-white',
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-300 text-navy-950">
        <BookOpen className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight text-white">TOEFL Prep Studio</p>
        <p className="text-[11px] leading-tight text-sky-200/80">Formato iBT 2026</p>
      </div>
    </div>
  );
}

/** Tema aplicado realmente (clase en <html>), actualizado cuando cambia. */
function useAppliedDark(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const obs = new MutationObserver(cb);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => obs.disconnect();
    },
    () => document.documentElement.classList.contains('dark'),
    () => false,
  );
}

export function ThemeToggle() {
  const { settings, update } = useSettings();
  const dark = useAppliedDark();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
      onClick={() => update({ theme: dark ? 'light' : 'dark' })}
      data-theme={settings.theme}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

export function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="min-h-dvh">
      <a href="#main" className="sr-only-focusable fixed left-2 top-2 z-[70] rounded bg-surface px-3 py-2 text-sm text-ink shadow">
        Saltar al contenido
      </a>
      {/* Barra lateral de escritorio */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-6 bg-navy-900 py-5 lg:flex dark:bg-navy-950 dark:border-r dark:border-line">
        <Brand />
        <div className="flex-1 overflow-y-auto px-3">
          <NavItems />
        </div>
        <div className="px-6 text-[11px] leading-relaxed text-sky-200/70">
          Práctica independiente. No afiliada a ETS. Las puntuaciones son estimaciones orientativas.
        </div>
      </aside>

      {/* Cabecera móvil */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface/95 px-4 py-2 backdrop-blur lg:hidden">
        <Button variant="ghost" size="icon" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          <BarChart3 className="h-4 w-4 text-accent" aria-hidden /> TOEFL Prep Studio
        </span>
        <ThemeToggle />
      </header>

      {/* Cajón móvil */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col gap-6 bg-navy-900 py-5">
            <div className="flex items-center justify-between pr-3">
              <Brand />
              <button className="rounded-lg p-2 text-sky-100 hover:bg-white/10" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-3">
              <NavItems onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <div className="hidden justify-end px-8 pt-4 lg:flex">
          <ThemeToggle />
        </div>
        <main id="main" className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
