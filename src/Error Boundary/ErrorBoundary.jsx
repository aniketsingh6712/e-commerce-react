import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center mt-5" style={{minHeight:"60vh"}}>
          <div className="alert alert-danger" role="alert">
            <h1 className="display-4">Oops! Something went wrong.</h1>
            <p className="lead">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button className="btn btn-warning" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
