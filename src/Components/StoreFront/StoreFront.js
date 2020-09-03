import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './StoreFront.css'
import Header from './Header';

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
    }).catch(err => {
      console.log(err);
      alert('Transfer To Cart Failed')
    })
  }


  render() {
    console.log(this.state.inventory)
    let allInventory = this.state.inventory.map(e => {
      return <div>
        {e.title} {e.price}
        {e.location}
        {e.description}
        <img className="image" src={e.image} alt="a cherry oak chair" />
        <button onClick={this.addToCart}>Add</button>
      </div>
    })
    return <div className="storeContainer">
      <div className='header'>
        <Header/>
      </div>
      <div className="inventory">
        {allInventory}
      </div>
    </div>
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(StoreFront);