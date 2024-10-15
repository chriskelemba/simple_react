import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import ProductForm from './components/ProductForm';
import DisplayProducts from './components/DisplayProducts';
import DisplaySales from './components/DisplaySales';
import RegForm from './components/RegForm';
import LoginForm from './components/LoginForm';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div>
      <Router>
      <LoginForm setToken={setToken} />
        <Switch>
          <Route path="/RegForm">
            <RegForm/>
          </Route>
        </Switch>
      </Router>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/ContactUs">
            <ContactUs/>
          </Route>
          <Route path="/ProductForm">
            <ProductForm/>
          </Route>
          <Route path="/DisplayProducts">
            <DisplayProducts/>
          </Route>
          <Route path="/DisplaySales">
            <DisplaySales/>
          </Route>
          <Route path="/RegForm">
            <RegForm/>
          </Route>
          <Route path="/LoginForm">
            <LoginForm/>
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
