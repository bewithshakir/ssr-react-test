import React from "react";
import { withRouter } from "react-router-dom";
// import "babel-polyfill";

import "./Sidebar.css";
import classnames from "classnames";

import { launchService } from "./launchService";
import { launchSuccessService } from "./launchSuccessService";
import { launchLandingService } from "./launchLandingService";
import { CardModel } from "../shared/cardModel";
import { getQueryService } from "../shared/getQueryService";

class Sidebar extends React.Component {
  state = {
    selectedFilter: "",
    launch: [
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ],
    successfullLaunch: ["true", "false"],
    successfullLanding: ["true", "false"],
  };

  componentDidMount() {
    const activeFilter = getQueryService(this.props);
    console.log('---did mount--', activeFilter)
    this.handleSearch(activeFilter)
    // if active filter is not set then default filter will be 2006
    /* if (!activeFilter) {
        
    } else {
      // Filter will only work work withing the range shown.
      if (this.state.launch.indexOf(activeFilter) >= 0) {
        
      } else {
        alert("Filter selected is not found");
      }
    } */
    //
  }
  handleSearch(query) {    
    if (query) {
        const search = query.split('=');
        const val = search[1];
        const queryStr = search[0];
        // console.log('---------------', queryStr, val)
        if (query.includes('launch_year')) {
            console.log('launc year')
            this.handleLaunchYear(val);
        }
        else if (query.includes('launch_succes')) {
            console.log('launc sucess')
            this.handleSuccessfullYear(val);
        }
        else if (query.includes('land_success')) {
            console.log('query 2---', query)
        }
    } else {
        this.handleLaunchYear('2006');
        
    }
    
  }

  handleLaunchYear = async (year) => {
    this.getRespectiveData(launchService, year, 'launch_year');
  };

  handleSuccessfullYear = async(val)=> {
    // launch_success
    this.getRespectiveData(launchSuccessService, val, 'launch_succes');
  }

  handleSuccessfullLanding = async(val)=> {
    // launch_success
    this.getRespectiveData(launchLandingService, val, 'land_success');
  }

  async getRespectiveData(service, val, query, limit='100') {

    this.props.history.push(`/home?limit=${limit}&${query}=${val}`);
    this.props.onLaunchFilter(null, true);
    this.setState({ selectedFilter: query+val });

    if (val && limit) {
        const data = await service(val, limit).getData();
        if (data && Array.isArray(data)) {
          const filteredData = data.map(
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
          // dispatch data to parent
          this.props.onLaunchFilter(filteredData, false);
        }
    }

  }

  renderLaunch = () => {
    const { launch, selectedFilter } = this.state;
    return (
      Array.isArray(launch) &&
      launch.map((year, i) => (
        <button
          type="button"
          className={classnames("btn btn-primary", {
            active: selectedFilter === 'launch_year'+year,
          })}
          key={i}
          onClick={() => this.handleLaunchYear(year)}
        >
          {year}
        </button>
      ))
    );
  };

  renderSuccessFullLaunch = () => {
    const { successfullLaunch, selectedFilter } = this.state;
    return (
      Array.isArray(successfullLaunch) &&
      successfullLaunch.map((data, i) => (
        <button
          type="button"
          className={classnames("btn btn-primary", {
            active: selectedFilter === 'launch_succes'+data,
          })}
          key={i}
          onClick={() => this.handleSuccessfullYear(data)}
        >
          {data}
        </button>
      ))
    );
  };
  renderSuccessfullLanding = () => {
    const { successfullLanding, selectedFilter } = this.state;
    return (
      Array.isArray(successfullLanding) &&
      successfullLanding.map((data, i) => (
        <button
          type="button"
          className={classnames("btn btn-primary", {
            active: selectedFilter === 'land_succes'+data,
          })}
          key={i}
          onClick={()=> this.handleSuccessfullLanding(data)}
        >
          {data}
        </button>
      ))
    );
  };

  render() {
    return (
      <aside className="aside_section">
        <h4>Filters</h4>

        <h5 className="sub_hdr">Launch Year</h5>
        <div className="button_section">{this.renderLaunch()}</div>

        <h5 className="sub_hdr">Successfull Launch</h5>
        <div className="button_section">{this.renderSuccessFullLaunch()}</div>

        <h5 className="sub_hdr">Successfull Landing</h5>
        {<div className="button_section">{this.renderSuccessfullLanding()}</div>}
      </aside>
    );
  }
}
export default withRouter(Sidebar);
