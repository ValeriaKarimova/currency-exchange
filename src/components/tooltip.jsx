import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../styles/tooltip.css';

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
  }

  static defaultProps = {
    content: 'Tooltip content',
    style: {},
  }

  state = {
    visible: false,
  }

  show = () => {
    this.setVisibility(true);
  }

  hide = () => {
    this.setVisibility(false);
  }

  setVisibility = visible => {
    this.setState({ visible });
  }

  render() {
    const { visible } = this.state;
    const { children, content, style } = this.props;

    return (
      <Fragment>
          { visible && <span style={style} className='tooltip'>{content}</span> }
        <span
          className="targetElement"
          onMouseOver={this.show}
          onMouseLeave={this.hide}
        >{children}</span>
      </Fragment>
    );
  }
}

export default Tooltip;
