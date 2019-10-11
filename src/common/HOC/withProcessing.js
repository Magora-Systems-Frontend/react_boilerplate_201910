import React from 'react';

export function withProcessing(WrappedComponent) {
  class HOC extends React.PureComponent {
    state = {
      isProcessing: false
    };

    toggleProcessing = (newState) => {
      this.setState({ isProcessing: newState });
    };

    render() {
      const { isProcessing } = this.state;

      return <WrappedComponent toggleProcessing={this.toggleProcessing} isProcessing={isProcessing} {...this.props} />;
    }
  }

  return HOC;
}
