import React from "react";
import { withRouter } from "react-router-dom";
// import "babel-polyfill";

import "./Sidebar.css";
import classnames from "classnames";


class Sidebar extends React.Component {
  state = {
    selectedFilter: "",
    filter: [
      {year: '', active: false},
      {launch: '', active: false},
      {landing: '', active: false}
    ],
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
  

  handleLaunchYear = async (event, text) => {
    this.classNameHandler(event, 'year', text, 0);    
  };

  handleSuccessfullYear = async(event, text)=> {
    this.classNameHandler(event, 'launch', text, 1);
  }

  handleSuccessfullLanding = async(event, text)=> {
    this.classNameHandler(event, 'landing', text, 2);
  }

  classNameHandler(event, currentFilter, text, index) {
    const isActive = event.target.classList.value.includes('active');
    const filter = [...this.state.filter];
    if (!isActive) {
      filter[index][currentFilter] = text;
    } else {
      filter[index][currentFilter] = '';
    }
    console.log(isActive)
    this.setState({filter: filter});
    this.props.onLaunchFilter(filter);
  }

  renderLaunch = () => {
    const { launch, selectedFilter, filter } = this.state;
    
    return (
      Array.isArray(launch) &&
      launch.map((year, i) => (
        <button
          type="button"
          className={classnames("btn btn-primary", {
            active: filter[0].year === year,
          })}
          key={i}
          onClick={(event) => this.handleLaunchYear(event, year)}
        >
          {year}
        </button>
      ))
    );
  };

  renderSuccessFullLaunch = () => {
    const { successfullLaunch, selectedFilter, filter } = this.state;
    return (
      Array.isArray(successfullLaunch) &&
      successfullLaunch.map((data, i) => (
        <button
          type="button"
          className={classnames("btn btn-primary", {
            active: filter[1].launch === data,
          })}
          key={i}
          onClick={(event) => this.handleSuccessfullYear(event, data)}
        >
          {data}
        </button>
      ))
    );
  };
  renderSuccessfullLanding = () => {
    const { successfullLanding, selectedFilter, filter } = this.state;
    return (
      Array.isArray(successfullLanding) &&
      successfullLanding.map((data, i) => (
        <button
          type="button"
          className={classnames("btn btn-primary", {
            active: filter[2].landing === data,
          })}
          key={i}
          onClick={(event)=> this.handleSuccessfullLanding(event, data)}
        >
          {data}
        </button>
      ))
    );
  };

  render() {
    // console.log('---handleLaunchYear----', this.state)
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
