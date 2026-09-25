import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import React from "react";
import appStore from "./store/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import NotFound from "./components/NotFound";
import { ThemeProvider } from "./components/theme-provider";
import { AlertTriangle, RotateCw } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              An unexpected error occurred. Reloading the page usually fixes it.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-4 overflow-auto rounded-lg bg-muted p-3 text-left text-xs text-muted-foreground">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <RotateCw className="h-4 w-4" /> Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Routes that need a signed-in user. Body only renders routes once the
// session check has finished, so a missing user here really means signed out.
function RequireAuth({ children }) {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

function GuestOnly({ children }) {
  const user = useSelector((store) => store.user);
  if (user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>
              <Route element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/connections" element={<RequireAuth><Connections /></RequireAuth>} />
                <Route path="/requests" element={<RequireAuth><Requests /></RequireAuth>} />
                <Route path="/chat/:targetUserId" element={<RequireAuth><Chat /></RequireAuth>} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
