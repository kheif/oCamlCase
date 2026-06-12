import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ContentPage from './components/ContentPage';
import Playground from './features/playground/Playground';
import MiniExerciseIndex from './features/mini-exercises/MiniExerciseIndex';
import ExercisesHub from './features/exercises/ExercisesHub';
import MiniExercisePage from './features/mini-exercises/MiniExercisePage';
import Toycaml from './features/toycaml/Toycaml';
import TreeLab from './features/treelab/TreeLab';
import Lexing from './features/interpreter/Lexing';
import Parsing from './features/interpreter/Parsing';
import Dynamics from './features/interpreter/Dynamics';
import Recursion from './features/interpreter/Recursion';
import Home from './features/home/Home';
import { contentRoutes } from './content/registry';
import { LearnModeProvider } from './learn/LearnMode';

export default function App() {
  return (
    <LearnModeProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/playground" element={<Playground />} />
        <Route path="/playground.html" element={<Navigate to="/playground" replace />} />
        {/* Full-screen mini exercise (no sidebar) */}
        <Route path="/exercises/mini/:id" element={<MiniExercisePage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExercisesHub />} />
          <Route path="/exercises/mini" element={<MiniExerciseIndex />} />
          <Route path="/concepts/static-semantics" element={<Toycaml />} />
          <Route path="/concepts/tree-lab" element={<TreeLab />} />
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
      </BrowserRouter>
    </LearnModeProvider>
  );
}
