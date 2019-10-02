import React from 'react';
import {Route, Switch} from 'react-router-dom';

//from carbon's components
import {Content} from 'carbon-components-react/lib/components/UIShell';

//from our components
import FButton from './components/atoms/FButton';
import FHeader from './components/organisms/FHeader';

//from our content
import Home from './content/Home';
import Expenditure from './content/Expenditure';
import Receipts from './content/Receipts';

import './App.scss';

function App() {
  return (<div>
    <FHeader/>
    <Content>
      <Switch>
        <Route exact="exact" path="/" component={Home}/>
        <Route exact="exact" path="/expenditure" component={Expenditure}/>
        <Route exact="exact" path="/receipts" component={Receipts}/>
      </Switch>
    </Content>
  </div>);
}

export default App;
