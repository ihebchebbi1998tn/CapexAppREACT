import React, { Component } from 'react';
import axios from 'axios';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  componentDidCatch(error, errorInfo) {
    if (this.isNetworkError(error) || this.isGeneralError(error)) {
      this.setState({ hasError: true });
      console.error('Error caught by boundary:', error, errorInfo);
      logErrorToService(error, errorInfo);
    }
  }

  isNetworkError(error) {
    return (
      axios.isAxiosError(error) &&
      error.response === undefined &&
      error.message === 'Network Error'
    );
  }

  isGeneralError(error) {
    return !axios.isAxiosError(error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, retryCount: this.state.retryCount + 1 });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>An unexpected network error occurred.</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Example logging function (replace with your preferred logging solution)
const logErrorToService = (error, errorInfo) => {
  // Implement your logging logic here
  console.error('Error logged:', error, errorInfo);
};
