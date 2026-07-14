import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ContentPage from './components/ContentPage';
import ScrollToTop from './components/ScrollToTop';
import Home from './features/home/Home';
import { contentRoutes } from './content/registry';
import { LearnModeProvider } from './learn/LearnMode';

// Heavy interactive features load on demand so content pages stay light.
const Playground = lazy(() => import('./features/playground/Playground'));
const MiniExerciseIndex = lazy(() => import('./features/mini-exercises/MiniExerciseIndex'));
const ExercisesHub = lazy(() => import('./features/exercises/ExercisesHub'));
const ChallengesIndex = lazy(() => import('./features/exercises/ChallengesIndex'));
const MiniExercisePage = lazy(() => import('./features/mini-exercises/MiniExercisePage'));
const PracticePage = lazy(() => import('./features/practice/PracticePage'));
const PracticeKindIndex = lazy(() => import('./features/practice/PracticeKindIndex'));
const Toycaml = lazy(() => import('./features/toycaml/Toycaml'));
const TreeLab = lazy(() => import('./features/treelab/TreeLab'));
const InterpreterOverview = lazy(() => import('./features/interpreter/Overview'));
const Lexing = lazy(() => import('./features/interpreter/Lexing'));
const Parsing = lazy(() => import('./features/interpreter/Parsing'));
const Dynamics = lazy(() => import('./features/interpreter/Dynamics'));
const Recursion = lazy(() => import('./features/interpreter/Recursion'));

export default function App() {
  return (
    <LearnModeProvider>
      <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/playground" element={<Playground />} />
        <Route path="/playground.html" element={<Navigate to="/playground" replace />} />
        {/* Full-screen exercises (no sidebar) */}
        <Route path="/exercises/mini/:id" element={<MiniExercisePage />} />
        <Route path="/exercises/practice/:id" element={<PracticePage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExercisesHub />} />
          <Route path="/exercises/challenges" element={<ChallengesIndex />} />
          <Route path="/exercises/mini" element={<MiniExerciseIndex />} />
          <Route path="/exercises/practice" element={<Navigate to="/exercises" replace />} />
          <Route path="/exercises/practice/kind/:kind" element={<PracticeKindIndex />} />
          <Route path="/concepts/static-semantics" element={<Toycaml />} />
          <Route path="/concepts/tree-lab" element={<TreeLab />} />
          <Route path="/interpreter" element={<InterpreterOverview />} />
          <Route path="/interpreter/lexing" element={<Lexing />} />
          <Route path="/interpreter/parsing" element={<Parsing />} />
          <Route path="/interpreter/dynamics" element={<Dynamics />} />
          <Route path="/interpreter/recursion" element={<Recursion />} />
          {contentRoutes
            .filter((r) => r.path !== '/')
            .map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={
                <ContentPage
                  html={r.html}
                  title={r.title}
                  description={r.description}
                  path={r.path}
                />
              }
            />
          ))}
          {contentRoutes
            .filter((r) => r.path !== '/')
            .map((r) => (
              <Route
                key={r.path + '.html'}
                path={r.path + '.html'}
                element={<Navigate to={r.path} replace />}
              />
            ))}
          {/* Old combined page was split into variants + exceptions */}
          <Route
            path="/concepts/constructors-exceptions"
            element={<Navigate to="/concepts/variants" replace />}
          />
          <Route
            path="/concepts/constructors-exceptions.html"
            element={<Navigate to="/concepts/variants" replace />}
          />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      </Suspense>
      </BrowserRouter>
    </LearnModeProvider>
  );
}
