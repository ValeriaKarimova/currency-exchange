import React, { Component, Fragment } from 'react';
import '../styles/tooltip.css';

class Tooltip extends Component {
  state = {
    visible: false,
  };

  show() {
    this.setVisibility(true);
  }

  hide() {
    this.setVisibility(false);
  }

  setVisibility(visible) {
    this.setState({ visible });
  }

  render() {
    const { visible } = this.state;
    const { children, content, style } = this.props;

    return (
      <Fragment>
        {visible && (
          <span style={style} className="tooltip">
            {content}
          </span>
        )}
        <span
          className="targetElement"
          onMouseOver={this.show}
          onMouseLeave={this.hide}
        >
          {children}
        </span>
      </Fragment>
    );
  }
}

export default Tooltip;
