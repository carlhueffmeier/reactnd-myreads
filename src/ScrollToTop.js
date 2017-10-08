import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Makes sure we scroll to the top on page transitions
// https://reacttraining.com/react-router/web/guides/scroll-restoration
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
