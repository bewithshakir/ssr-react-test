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
import { initialLaunchService } from './initialLaunchService';
import { launcherService } from './launcherService';
import { CardModel } from "./components/shared/cardModel";



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

  componentDidMount() {
    this.isLoader(null, true);
    launcherService('https://api.spaceXdata.com/v3/launches?limit=100').getData().then( res=> {
      this.renderData(res);
    })
  }
  renderData(data) {
    const filteredData = data && data.map(
      (item) =>
        new CardModel(
          item.links.mission_patch_small,
          item.mission_name,
          item.mission_id,
          item.launch_year,
          item.launch_success,
          item.rocket.first_stage.cores[0].land_success
        )
    );
    this.isLoader(filteredData, false);
    
  }
  isLoader = (data, isLoader) => {
    // make data immutable
    const reletiveData = { ...this.state.reletiveData };
    reletiveData.data = data;
    reletiveData.loader = isLoader;
    this.setState({ reletiveData: reletiveData });
  };
  onLaunchFilter = (filter) => {
    this.isLoader(null, true);

    let url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    if (filter[0].year) {
      const val = filter[0]['year'];
      url+= `&launch_year=${val}`;
    }
    if (filter[1].launch) {
      const val = filter[1]['launch'];
      url+= `&launch_success=${val}`;
    }
    if (filter[2].landing) {
      const val = filter[2]['landing'];
      url+= `&land_success=${val}`;
    }
    console.log('url from sidebar', url)
    launcherService(url).getData().then( res=> {
      console.log('data', res)
      this.renderData(res);
    })
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
