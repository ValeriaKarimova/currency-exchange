import React, { Component, Fragment } from 'react';
import '../styles/list.css';
import Tooltip from './tooltip';

function Difference(props) {
  let name = 'increase';
  if (props.currentValue < props.previousValue) {
    name = 'decrease';
  }
  return (
    <span className={name}>
      {(
        ((props.currentValue - props.previousValue) / props.previousValue) *
        100
      ).toFixed(2) + '%'}
    </span>
  );
}

class ListItems extends Component {
  render() {
    const { data } = this.props;
    const dataArr = Object.keys(data);
    return dataArr.map((elem) => (
      <li className="list__item" key={data[elem].CharCode}>
        <Tooltip content={data[elem].Name}>
          <span className="code">{data[elem].CharCode}</span>
        </Tooltip>
        <span>{Math.round(data[elem].Value).toFixed(2)}</span>
        <Difference
          currentValue={data[elem].Value}
          previousValue={data[elem].Previous}
        />
      </li>
    ));
  }
}

class List extends Component {
  render() {
    return (
      <ul className="list">
        <ListItems data={this.props.data} />
      </ul>
    );
  }
}

class ListContainer extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const BASE_PATH = 'https://www.cbr-xml-daily.ru/daily_json.js';

    fetch(BASE_PATH)
      .then((res) => res.json())
      .then((result) => this.setState({ data: result.Valute }))
      .catch((error) => error);
  }

  render() {
    return (
      <main className="main">
        <List data={this.state.data} />
      </main>
    );
  }
}

export default ListContainer;
