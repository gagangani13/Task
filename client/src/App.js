import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Login/Layout";
import { Provider } from "react-redux";
import store from "./components/store/store";
import Home from "./components/Home/Home";
function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Layout />
            </Route>
            <Route path="/Home" exact>
              <Home/>
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Provider>
    </>
  );
}

export default App;
