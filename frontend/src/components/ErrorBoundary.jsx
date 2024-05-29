import React, { Component } from 'react';
import Layout from './Layout';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Ha ocurrido un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Algo salió mal. Por favor, recarga la página.</div>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;