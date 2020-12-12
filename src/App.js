import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";


import HeaderNavbar from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MainSection from "./components/mainsection/MainSection";



class App extends React.Component {
 constructor(props) {
   super();
   this.state = {
    reletiveData: {
      data: null,
      loader: false,
    },
  };
 }

  componentDidMount() {}
  onLaunchFilter = (data, isLoader) => {
    // make data immutable
    const reletiveData = { ...this.state.reletiveData };
    reletiveData.data = data;
    reletiveData.loader = isLoader;
    this.setState({ reletiveData: reletiveData });
  };

  render() {
    const { reletiveData } = this.state;
    console.log("app-", reletiveData);
    return (
      <div className="App custom_margin_grid">
          <HeaderNavbar />

          <div className="container main">
            <div className="row">
              <div className="col-md-2 left">
                <Sidebar onLaunchFilter={this.onLaunchFilter} />
              </div>
              <div className="col-md-10">
                <Switch>
                  <Route
                    exact
                    path={"/home"}
                    render={(props) => (
                      <MainSection {...props} data={reletiveData} />
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to={"/home"} />}
                  />
                </Switch>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
