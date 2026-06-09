import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="hud-panel p-8 text-center">
            <h2 className="font-display text-2xl text-primary mb-4">SYSTEM ERROR</h2>
            <p className="text-foreground/80 mb-4">Mission control unavailable</p>
            <button
              onClick={() => window.location.reload()}
              className="font-mono-hud text-xs px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
              data-hot
            >
              RETRY MISSION
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}