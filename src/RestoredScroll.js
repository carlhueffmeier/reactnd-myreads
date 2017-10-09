import React, { Component } from 'react';
import { withRouter } from 'react-router';

// A simple solution to keep scroll position of an element
// during page transitions
class RestoredScroll extends Component {
  componentDidMount(prevProps) {
    // Restore scroll position when component mounts
    this.path = this.props.location.pathname;
    const scrollTop = sessionStorage.getItem(`scrollTop-${this.path}`);
    if (scrollTop) {
      this.element.scrollTop = scrollTop;
    }
  }

  componentWillUnmount() {
    // Save scroll position to session storage
    const scrollTop = this.element.scrollTop;
    sessionStorage.setItem(`scrollTop-${this.path}`, scrollTop);
  }

  render() {
    const { className, children } = this.props;
    return (
      <div
        className={className}
        ref={element => {
          this.element = element;
        }}
      >
        {children}
      </div>
    );
  }
}

export default withRouter(RestoredScroll);
