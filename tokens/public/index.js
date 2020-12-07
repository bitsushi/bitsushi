import hydrate from "preact-iso/hydrate";
import lazy, { ErrorBoundary } from "preact-iso/lazy";
import { LocationProvider, Router } from "preact-iso/router";
import Header from "./header.js";
import Home from "./pages/home/index.js";
import NotFound from "./pages/_404.js";

const About = lazy(() => import("./pages/about/index.js"));

export function App() {
  return (
    <LocationProvider>
      <div class="app">
        <Header />
        <ErrorBoundary>
          <Router>
            <Home path="/" />
            <About path="/about" />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  const { default: prerender } = await import("preact-iso/prerender");
  return await prerender(<App {...data} />);
}
