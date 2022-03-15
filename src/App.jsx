import Header from './components/header';
import React, {Fragment} from 'react';
import './App.css';
import Footer from './components/footer';
import ListContainer from './components/list';
import Data from './components/data';


function App() {
  return <Fragment>
    <Header />
    <ListContainer />
    <Footer />
  </Fragment>
}

export default App;
