
import './App.css';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import history from './history';
import Layout from './layout';
function App() {
  return (
 <Router history={history} >
          <Switch>
            <Route  path="/" component={Layout}/>
            {/* <Redirect to="/path1" /> */}
          </Switch>
          
   </Router>
  );
}

export default App;
