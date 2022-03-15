import React, { Component, Fragment } from 'react';
import '../styles/list.css'

function Difference(props) {
  let name = 'increase';
  if(props.currentValue < props.previousValue) {
    name = 'decrease';
  }
  return <span className={name}>{(props.currentValue - props.previousValue).toFixed(2)}</span>
}

class ListItems extends Component {
  render() {
    const dataArr = Object.keys(this.props.data);
    return dataArr.map((elem) => (
      <li className='list__item' key={this.props.data[elem].CharCode}>
        <span>{this.props.data[elem].CharCode}</span>
        <span>{this.props.data[elem].Value}</span>
        <Difference currentValue={this.props.data[elem].Value} previousValue={this.props.data[elem].Previous}/>
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
  state = {
    data: {},
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const BASE_PATH = 'https://www.cbr-xml-daily.ru/daily_json.js';

    fetch(BASE_PATH)
      .then(res => res.json())
      .then(result => this.setState({data: result.Valute}))
      .catch(error => error);
  }

  render() {
    return <main className='main'><List data={this.state.data}/></main>
  }
}

export default ListContainer;
