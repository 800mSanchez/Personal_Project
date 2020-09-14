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
      isUploading: false,
      url: 'http://via.placeholder.com/250x250'
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

 uploadFile = (file, signedRequest, url) => {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
  };

  axios.put(signedRequest, file, options)
      .then(res => {
        this.setState({ isUploading: false, url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.res.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

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
      return <div className="product">
              <div>Title: {e.title}</div>
              <div>Price: ${e.price}</div>
              <div>Location: {e.location}</div>
              <div>Description: {e.description}</div>
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
        <button className="add-btn" onClick={ () => this.addToCart(e.product_id)}>Add</button>
      </div>
    })
    return <div>
      <div className='header'>
        <Header/>
      </div>
      <p className="info">Shop Local Business Nationwide</p>
      <div className="inventory">
        {allInventory}
      </div>
    </div>
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {addToCart})(StoreFront);