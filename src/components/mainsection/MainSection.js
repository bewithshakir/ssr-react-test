import React from "react";
import PropTypes from "prop-types";
import "./MainSection.css";

import {CardItem} from './cardItem';

class MainSection extends React.Component {
  renderCard = (respectiveData) => {
    let renderMarkup = '';
      if (respectiveData && respectiveData.data && Array.isArray(respectiveData.data) ) {
        if (respectiveData.data.length) {
          renderMarkup = respectiveData.data.map((item, i) => {
            return <CardItem item={item}  key={i}/>
          });
        } else {
          renderMarkup = <div className="col-md-12"><h4 style={{textAlign:'center'}}>No data found</h4></div>
        }
      }
      
      
    return renderMarkup;
  };
  render() {
    const {data} = this.props;
    return <div className="row main_content_section">
      {data.loader && <div className="col-md-12"><h2 style={{textAlign:'center'}}>Data is loading...</h2></div>}
      {this.renderCard(data)}
    </div>;
  }
}
export default MainSection;

MainSection.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
};
