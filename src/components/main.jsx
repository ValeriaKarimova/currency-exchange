import React, { Component } from 'react';
import '../styles/main.css';
import Popup from './popup';
import Tooltip from './tooltip';

function Difference(props) {
  const name =
    props.currentValue < props.previousValue ? 'decrease' : 'increase';

  return (
    <span className={name}>
      {(((props.currentValue - props.previousValue) / props.previousValue) * 100).toFixed(2) + '%'}
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
    const { data } = this.props;
    return (
      <ul className="list">
        <ListItems data={data} />
      </ul>
    );
  }
}

class Main extends Component {
  state = {
    data: {},
    isVisible: false,
    targetName: '',
    content: [],
  };

  lastData = [];

  componentDidMount() {
    this.fetchData();
    this.fetchPreviousData(1);
  }

  fillPopup(name) {
    const previousCurrency = [];
    this.lastData.forEach((item) => {
      const dateArr = item.date.split('T');
      const date = dateArr[0].split('-').reverse().join('.');
      const contentInfo = {
        date: date,
        currency: item.currency[name].Value,
      };
      previousCurrency.push(contentInfo);
    });
    return previousCurrency;
  }

  fetchPreviousData(i) {
    const today = Date.now();
    let yesterday = today - i * 86400000;
    const date = new Date(yesterday);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 10 ? month : `0${month}`;
    let day = date.getDate();
    day = day > 10 ? day : `0${day}`;
    let BASE_PATH = `https://www.cbr-xml-daily.ru/archive/${year}/${month}/${day}/daily_json.js`;

    fetch(BASE_PATH)
      .then((res) => res.json())
      .then((result) => {
        const info = {
          date: result.Date,
          currency: result.Valute,
        };
        this.lastData.push(info);
        if (this.lastData.length < 10) {
          this.fetchPreviousData(i + 1);
        } else {
          return;
        }
      })
      .catch((error) => {
        if (error) {
          console.log(`No data for ${date}`);
          this.fetchPreviousData(i + 1);
        }
      });
  }

  fetchData() {
    const BASE_PATH = 'https://www.cbr-xml-daily.ru/daily_json.js';

    fetch(BASE_PATH)
      .then((res) => res.json())
      .then((result) => this.setState({ data: result.Valute }))
      .catch((error) => error);
  }

  handleClick(event) {
    if (event.target.className == 'code') {
      const name = event.target.innerText;
      this.setState({
        isVisible: true,
        targetName: name,
        content: this.fillPopup(name),
      });
    }
  }

  onPopupClose() {
    this.setState({ isVisible: false });
  }

  render() {
    const { data, isVisible, content, targetName } = this.state;
    return (
      <main className="main" onClick={(event) => this.handleClick(event)}>
        <Popup
          name={targetName}
          visibility={isVisible}
          content={content}
          onClose={() => this.onPopupClose()}
        />
        <List data={data} />
      </main>
    );
  }
}

export default Main;
