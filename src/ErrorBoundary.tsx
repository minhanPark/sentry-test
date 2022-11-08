import React, { Component } from "react";
import * as Sentry from "@sentry/react";

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<Props> {
  state = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("에러가 발생했습니다.");
    console.log({
      error,
      errorInfo,
    });
    this.setState({
      error: true,
    });
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return <h1>에러 발생!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
