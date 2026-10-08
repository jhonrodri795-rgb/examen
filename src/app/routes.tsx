import { createBrowserRouter, isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { Alert, Button } from '@/components/ui';
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

export const router = createBrowserRouter([
  { path: '/exam/:attemptId', lazy: async () => ({ Component: (await import('@/modules/exam-engine/ui/ExamRunnerPage')).ExamRunnerPage }), errorElement: <ErrorPage /> },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
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
]);
