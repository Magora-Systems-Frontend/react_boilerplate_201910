import React from 'react';
import { Button } from 'antd';

export function withError(WrappedComponent) {
  class HOC extends React.PureComponent {
    state = {
      isError: false
    };

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    toggleError = (newState) => {
      if (!this.mounted) return;
      this.setState({ isError: newState });
    };

    render() {
      const { isError } = this.state;

      if (isError) {
        return (
          <div className="flex align-items-center justify-content-center flex-column">
            <div className="fs-20 mt-3 mb-3 semi-bold">Connection error</div>
            <Button type="primary" onClick={() => this.toggleError(false)}>
              Try Again
            </Button>
          </div>
        );
      }

      return <WrappedComponent toggleError={this.toggleError} {...this.props} />;
    }
  }

  return HOC;
}
