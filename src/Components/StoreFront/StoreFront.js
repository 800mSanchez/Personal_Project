import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './StoreFront.css'

class StoreFront extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inventory: []
    }
    this.getInventory = this.getInventory.bind(this)
  }
  componentDidMount() {
    this.getInventory()
  }

  getInventory() {
    axios.get("/store/inventory").then(res => {
      this.setState({
        inventory: res.data
      })
    }).catch(err => console.log(err))
  }

  addToCart = () => {
    const { inventory } = this.state;
    axios.post('./store/product', { inventory }).then(res => {
      this.props.addToCart(res.data);
      this.props.history.push('/cart')
    }).catch(err => {
      console.log(err);
      alert('Transfer To Cart Failed')
    })
  }


  render() {
    console.log(this.state.inventory)
    let allInventory = this.state.inventory.map(e => {
      return <div className="product-area">
        <div>{e.title} {e.price}</div>
        <div>{e.location}</div>
        <div>{e.description}</div>
        <img className="image" src={e.image} alt="a cherry oak chair" />
        <button onClick={this.addToCart}>Add To Cart</button>
      </div>
    })
    return <div className="storeFront">
      <div>Shop Local Nationwide!</div>
      <div>
        {allInventory}
      </div>
    </div>
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(StoreFront);