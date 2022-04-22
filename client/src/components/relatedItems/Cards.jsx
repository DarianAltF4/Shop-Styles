import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      price: null,
      salePrice: null,
      category: '',
      name: '',
      features: []
    };
    this.setCard = this.setCard.bind(this);
    this.clickModal = this.clickModal.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
  }

  componentDidMount() {
    this.setCard();
  }

  setCard() {

    const stylesAPI = `http://localhost:8080/styles/${this.props.id}`;
    const productsAPI = `http://localhost:8080/products/${this.props.id}`;

    axios.get(stylesAPI)
      .then((data) => {
        var result = data.data;
        this.setState({
          image: result.results[0].photos[0].thumbnail_url,
          price: result.results[0].original_price,
          salePrice: result.results[0].sale_price
        });
        return result;
      })
      .then(() => {
        axios.get(productsAPI)
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
              category: result.category,
              name: result.name,
              features: itemFeatures
            });
            return result;
          })
          .catch((err) => {
            console.log('API call to /products error');
            return err;
          })
      })
      .catch((err) => {
        console.log('API call to /styles error');
        return err;
      })

  }

  clickModal(e) {
    e.preventDefault();
    console.log('modal will render')
  }

  clickDelete() {
    this.props.deleteYourOutfits(this.props.id);
  }


  render() {
    return (
      <>
      {this.state.image && this.state.image !== null &&
        <div className="card" data-testid='test-id' id={this.props.id}>

          <div className="card-image">
            <img src={this.state.image} alt='This is an image of the product as described below.' onClick={()=> this.props.setOverviewId(this.props.id)}/>

            {this.props.displayButton === 'related-products' ?
              <>
              <button className="overlay" onClick={this.clickModal}></button>
                <div className="comparison-modal" id="comparison-modal">
                  <div className="comparison-modal-header">
                    <div className="comparison-modal-title">COMPARING</div>
                    <button className="comparison-modal-close-button">&times;</button>
                  </div>
                  <div className="comparison-modal-header">
                    <div className="comparison-overview-name">{this.props.overviewIdName}</div>
                    <div className="comparison-current-item-name">{this.state.name}</div>
                  </div>
                  <div className="comparison-modal-body">
                    <ul className="comparison-modal-list">

                    </ul>
                  </div>
                </div>
              <div className="comparison-modal-overlay"></div>

              </>

              : <button className="overlay" onClick={this.clickDelete}></button> }


          </div>


          <div className="card-description">
            <br />
            <div className="text-category">
              {this.state.category}
            </div>

              <button onClick={()=> this.props.setOverviewId(this.props.id)} className="set-text-name">{this.state.name}</button>

            <div className="text-price">
              {this.state.price}
            </div>

            <br />
            <Ratings id={this.props.id} />
          </div>
        </div>}
      </>
    )
  }

}

Cards.propTypes = {
    id: PropTypes.number,
    overviewId: PropTypes.number,
    overviewIdName: PropTypes.string,
    overviewIdFeatures: PropTypes.array,
    setOverviewId: PropTypes.func,
    displayButton: PropTypes.string,
    deleteYourOutfits: PropTypes.func,
    setRelatedProductsIds: PropTypes.func
}



export default Cards;