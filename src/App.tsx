import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Spinner from './components/layout/Spinner';

const About = lazy(() => import('./components/pages/About'));
const Home = lazy(() => import('./components/pages/Home'));
const NotFound = lazy(() => import('./components/pages/NotFound'));
const User = lazy(() => import('./components/users/User'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minutes
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/user/:login" element={<User />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
