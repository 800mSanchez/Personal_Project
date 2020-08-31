import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Store extends React.Component {
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
        return (
        <div> This is the StoreFront</div>
        )
    }
}

export default Store;