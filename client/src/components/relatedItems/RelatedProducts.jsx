import React, { Component } from 'react';
import axios from 'axios';
import Cards from './Cards.jsx';
import PropTypes from 'prop-types';


class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsIds: []
    };
    this.setRelatedProductsIds = this.setRelatedProductsIds.bind(this);
  }

  componentDidMount() {
    if (this.props.overviewId) {
      this.setRelatedProductsIds()
    }
  }

  setRelatedProductsIds = () => {

    const relatedIdsAPI = `http://localhost:8080/products/${this.props.overviewId}/related`;

    axios(relatedIdsAPI)
      .then((data) => {
        var result = data.data;
        this.setState({
          relatedProductsIds: result
        });
        return result;
      })
      .catch((err) => {
        // console.log('error in setRelatedProductsIds');
        return err;
      })

  }

  render() {

    const items = this.state.relatedProductsIds;

    return(
      <>
      <div className="related-products-carousel"  data-testid='related-products-id'>
        {items && items.map((eachId) =>
          <Cards key={eachId} displayButton={'related-products'} id={eachId} overviewId={this.props.overviewId} handleOverviewIdChange={this.props.handleOverviewIdChange}/>
        )}
      </div>
      </>
    )
}
}

RelatedProducts.propTypes = {
  overviewId: PropTypes.number,
  displayButton: PropTypes.string,
  id: PropTypes.number,
  handleOverviewIdChange: PropTypes.func
}

export default RelatedProducts;
