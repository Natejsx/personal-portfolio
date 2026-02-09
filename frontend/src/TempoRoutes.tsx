import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

export function TempoRoutes() {
  // Only attempt to load tempo routes in Tempo environment
  if (!import.meta.env.VITE_TEMPO) {
    return null;
  }

  // Use dynamic import for tempo-routes
  const TempoRoutesComponent = lazy(() =>
    import('tempo-routes')
      .then((module) => {
        const routes = module.default;
        return { default: () => useRoutes(routes) };
      })
      .catch(() => ({ default: () => null }))
  );

  return (
    <Suspense fallback={null}>
      <TempoRoutesComponent />
    </Suspense>
  );
}
