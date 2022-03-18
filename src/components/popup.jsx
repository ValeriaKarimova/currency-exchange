import React, { Component, Fragment } from 'react';
import '../styles/popup.css';

class ListItems extends Component {
  render() {
    const content = this.props.content;
    if (content == null) return;
    return content.map((item) => (
      <li className="popup__list-item" key={item.date}>
        {`${item.date}: `}
        <strong>{item.currency.toFixed(2)}</strong>
      </li>
    ));
  }
}

class Popup extends Component {
  render() {
    const { name, visibility, content, onClose } = this.props;
    if (visibility) {
      return (
        <Fragment>
          <div className="popup__wrapper">
            <div className="popup">
              <span className="popup__close" onClick={() => onClose()}>
                X
              </span>
              <h2>{name}</h2>
              <ul className="popup__list">
                <ListItems content={content} />
              </ul>
            </div>
          </div>
        </Fragment>
      );
    }
    return <div></div>;
  }
}

export default Popup;
