import { createBrowserRouter, createMemoryRouter, isRouteErrorResponse, Link, useRouteError, type RouteObject } from 'react-router';
import { STATIC_BUILD } from '@/lib/runtime';
import { Alert, Button, Spinner } from '@/components/ui';
import { Layout } from './Layout';
import { DashboardPage } from '@/modules/dashboard/DashboardPage';

function ErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="mx-auto max-w-xl p-8">
      <Alert tone={notFound ? 'warn' : 'bad'} title={notFound ? 'Página no encontrada' : 'Algo salió mal'}>
        {notFound ? 'La dirección no existe.' : 'Se produjo un error inesperado. Tus datos guardados no se han perdido.'}
        {!notFound && error instanceof Error && <pre className="mt-2 whitespace-pre-wrap text-xs">{error.message}</pre>}
      </Alert>
      <Link to="/" className="mt-4 inline-block">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl p-8">
      <Alert tone="warn" title="Página no encontrada">La dirección no existe.</Alert>
      <Link to="/" className="mt-4 inline-block">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}

const loading = (
  <div className="flex min-h-dvh items-center justify-center">
    <Spinner />
  </div>
);

const routes: RouteObject[] = [
  { path: '/exam/:attemptId', lazy: async () => ({ Component: (await import('@/modules/exam-engine/ui/ExamRunnerPage')).ExamRunnerPage }), errorElement: <ErrorPage />, hydrateFallbackElement: loading },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: loading,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'exam/new', lazy: async () => ({ Component: (await import('@/modules/exam-engine/ui/ExamSetupPage')).ExamSetupPage }) },
      { path: 'practice', lazy: async () => ({ Component: (await import('@/modules/dashboard/PracticePage')).PracticePage }) },
      { path: 'results/:attemptId', lazy: async () => ({ Component: (await import('@/modules/results/ResultsPage')).ResultsPage }) },
      { path: 'results/:attemptId/review', lazy: async () => ({ Component: (await import('@/modules/results/ReviewPage')).ReviewPage }) },
      { path: 'history', lazy: async () => ({ Component: (await import('@/modules/history/HistoryPage')).HistoryPage }) },
      { path: 'speaking', lazy: async () => ({ Component: (await import('@/modules/speaking/ui/SpeakingStudioPage')).SpeakingStudioPage }) },
      { path: 'writing', lazy: async () => ({ Component: (await import('@/modules/writing/ui/WritingStudioPage')).WritingStudioPage }) },
      { path: 'bank', lazy: async () => ({ Component: (await import('@/modules/question-bank/ui/BankPage')).BankPage }) },
      { path: 'notes', lazy: async () => ({ Component: (await import('@/modules/history/NotesPage')).NotesPage }) },
      { path: 'settings', lazy: async () => ({ Component: (await import('@/modules/settings/SettingsPage')).SettingsPage }) },
      { path: 'tips', lazy: async () => ({ Component: (await import('@/modules/tips/TipsPage')).TipsPage }) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

// En la versión publicada la URL pertenece al visor: se navega en memoria.
export const router = STATIC_BUILD ? createMemoryRouter(routes) : createBrowserRouter(routes);
