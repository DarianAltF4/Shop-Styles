import React, { Component } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';


class RelatedItemsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewId: 64626,
      overviewIdName: '',
      overviewIdFeatures: [],
      relatedProductsIds: []
    }
    this.setOverviewId = this.setOverviewId.bind(this);
    this.setOverviewIdData = this.setOverviewIdData.bind(this);
  }

  // this.props.product_id: '',
  // this.props.setOverviewId(id)

  componentDidMount() {
    this.setOverviewId(this.state.overviewId);
    console.log(this.props.product_id);
    console.log(this.props.changeOverviewId);
  }

  setOverviewId(id) {
    this.setState({
      overviewId: id,
      relatedProductsIds: []
    })
    this.setOverviewIdData();
  }

  setOverviewIdData() {

    const overviewIdAPI = `http://localhost:8080/products/${this.state.overviewId}`;
    const relatedIdsAPI = `http://localhost:8080/products/${this.state.overviewId}/related`;

    axios(overviewIdAPI)
      .then((data) => {
        var result = data.data;
        const valueArrayMaker = (objArr) => {
          let newArray = [];
          objArr.forEach((obj) => {
            if (obj.value !== null) {
              newArray.push(obj.value);
            }
          })
          return newArray;
        }
        var itemFeatures = valueArrayMaker(result.features)
        this.setState({
          overviewIdName: result.name,
          overviewIdFeatures: itemFeatures
        })
        return result;
      })
      .then(() => {
        axios(relatedIdsAPI)
          .then((data) => {
            var result = data.data;
            var uniqueResults = [...new Set(result)].filter(id => id !== this.state.overviewId);
            this.setState({
              relatedProductsIds: uniqueResults
            });
            return uniqueResults;
          })
          .catch((err) => {
            console.log('error in setRelatedProductsIds');
            return err;
          })
      })
      .catch((err) => {
        console.log('error in setOverviewIdData');
        return err;
      })

  }

  render() {

    return (
      <>
        <div className="related-items-widget">
          <RelatedProducts overviewId={this.state.overviewId} overviewIdName={this.state.overviewIdName} overviewIdFeatures={this.state.overviewIdFeatures} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} />
          <YourOutfit overviewId={this.state.overviewId} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} setRelatedProductsIds={this.setRelatedProductsIds} />
          <div id="comparison-modal-overlay"></div>
        </div>
      </>
    )
  }
}

import PropTypes from 'prop-types';

RelatedItemsWidget.propTypes = {
  product_id: PropTypes.string,
  changeOverviewId: PropTypes.func
}


export default RelatedItemsWidget;