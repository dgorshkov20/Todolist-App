import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Todolist from './container/Todolist/Todolist';
import About from './container/About/About'
import Auth from './container/Auth/Auth'
import Layout from './hoc/Layout/Layout';

class App extends React.Component {


  render() {

    return (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/about" component={About}/>
          <Route path="/" component={Todolist}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
