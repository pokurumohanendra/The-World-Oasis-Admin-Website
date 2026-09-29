// src/ui/ErrorBoundary.jsx
import { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("💥 Render Error:", error);        // logs to console
        console.error("📍 Component Stack:", info.componentStack); // shows WHERE
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong: {this.state.error?.message}</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
