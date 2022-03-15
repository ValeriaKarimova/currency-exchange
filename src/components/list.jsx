import React, { Component, Fragment } from 'react';
import '../styles/list.css'

class ListItems extends Component {
  render() {
    const dataArr = Object.keys(this.props.data);
    return dataArr.map((elem) => (
      <li className='list__item' key={this.props.data[elem].CharCode}>
        <span>{this.props.data[elem].CharCode}</span>
        <span>{this.props.data[elem].Value}</span>
        <span>{(this.props.data[elem].Value - this.props.data[elem].Previous).toFixed(2)}</span>
      </li>
    ));
  }
}

class List extends Component {
  render() {
    return <ul className='list'><ListItems data={this.props.data} /></ul>
  }
}

class ListContainer extends Component {
  render() {
    return <main><List data={this.props.data}/></main>
  }
}

export default ListContainer;
