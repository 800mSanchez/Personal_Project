import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../../Store/storefrontReducer';
import './StoreFront.css'
import Header from './Header';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';

class StoreFront extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inventory: [],
      isUploading: false
    }
    this.getInventory = this.getInventory.bind(this)
  }
  componentDidMount() {
    this.getInventory()
  }

  getSignedRequest = ([file]) => {
    this.setState({isUploading: true})
 
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
 
    axios.get('/store/images', {
      params: {
        'file-name': fileName,
        'file-type': file.type
      }
    }).then( (response) => {
      const { signedRequest, url } = response.data 
      this.uploadFile(file, signedRequest, url)
    }).catch( err => {
      console.log(err)
    })
 }

  getInventory() {
    axios.get("/store/inventory").then(res => {
      this.setState({
        inventory: res.data
      })
    }).catch(err => console.log(err))
  }

  addToCart = (product_id) => {
    axios.post('/cart/product', { product_id, quantity: 1 }).then(res => {
      this.props.addToCart(res.data);
    }).catch(err => {
      console.log(err);
      alert('Transfer To Cart Failed')
    })
  }


  render() {
    const {isUploading} = this.state
    console.log(this.state.inventory)
    let allInventory = this.state.inventory.map(e => {
      return <div>
        {e.title} {e.price}
        {e.location}
        {e.description}
        <Dropzone
        className="drop-zone"
        onDropAccepted={this.getSignedRequest}
        accept="image/*"
        multiple={false}>
        {({getRootProps, getInputProps}) => (
        <div 
            style = {{
            position: 'relative',
            width: 160,
            height: 80,
            borderWidth: 5,
            marginTop: 25,
            borderColor: 'gray',
            borderStyle: 'dashed',
            borderRadius: 5,
            display: 'inline-block',
            fontSize: 17,}}
            {...getRootProps()}>
            <input {...getInputProps()} />
            {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
        </div>
        )}
    </Dropzone> 
        <button onClick={ () => this.addToCart(e.product_id)}>Add</button>
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

export default connect(mapStateToProps, {addToCart})(StoreFront);