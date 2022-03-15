import Header from './components/header';
import React, {Fragment} from 'react';
import './App.css';
import Footer from './components/footer';
import List from './components/list';
import ListContainer from './components/list';


function App() {
  const DATA = {
    "AUD": {
      "ID": "R01010",
      "NumCode": "036",
      "CharCode": "AUD",
      "Nominal": 1,
      "Name": "РђРІСЃС‚СЂР°Р»РёР№СЃРєРёР№ РґРѕР»Р»Р°СЂ",
      "Value": 53.7266,
      "Previous": 53.5354
  },
  "AZN": {
      "ID": "R01020A",
      "NumCode": "944",
      "CharCode": "AZN",
      "Nominal": 1,
      "Name": "РђР·РµСЂР±Р°Р№РґР¶Р°РЅСЃРєРёР№ РјР°РЅР°С‚",
      "Value": 43.9812,
      "Previous": 44.0268
  }
  }
  return <Fragment>
    <Header />
    <ListContainer data={DATA}/>
    <Footer />
  </Fragment>
}

export default App;
