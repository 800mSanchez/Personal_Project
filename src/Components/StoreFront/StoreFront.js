import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class StoreFront extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inventory: []
        }
        this.getInventory = this.getInventory.bind(this)
    }
    componentDidMount(){
        this.getInventory()
    }

    getInventory(){
        axios.get("/store/inventory").then(res => {
          this.setState({
            inventory: res.data
          })
        }).catch(err => console.log(err))
      }


      

    render() {
      console.log(this.state.inventory)
      let allInventory = this.state.inventory.map(e => {
      return <div>{e.title}</div>
      })
        return <div>
        <div> This is the StoreFront</div>
        <div>{allInventory}</div>
        </div>
    }
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(StoreFront);