import { Component, ErrorInfo, PropsWithChildren } from "react";

const refreshPage = () => {
  window.location.reload();
};
export class ErrorBoundary extends Component<PropsWithChildren<unknown>> {
  state: { hasError: boolean };

  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-1 justify-center items-center flex-col">
          <img
            src="/assets/wrong.jpg"
            alt="Something went wrong"
            className="items-center justify-center text-center"
          />
          <div>
            <button className="main_button" onClick={refreshPage}>
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
