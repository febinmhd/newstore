import React, { Component } from 'react'
import { View,Text,Image, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

class Cart extends Component {
  state={
    quantity:null,
    name:null,
    image:null,
    unitprice:null,
    quantity:null,
    totalprice:null
  }

  async quantity (itemname,val){
    if(val==='+'){
      for (let i = 0; i < this.props.ShopReducer.cart.length; i++){  
          if (this.props.ShopReducer.cart[i][0][0]=== itemname){
          await this.setState({name:this.props.ShopReducer.cart[i][0][0]})
          await this.setState({image:this.props.ShopReducer.cart[i][0][1]})
          await this.setState({unitprice:this.props.ShopReducer.cart[i][0][2]})
          await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]+1})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          this.props.ShopReducer.cart.splice(i,1)
          }}
          this.props.addquantity(this.state.name,this.state.image,this.state.unitprice,this.state.quantity,this.state.totalprice)
  
    }
    else{
      for (let i = 0; i < this.props.ShopReducer.cart.length; i++){  
          if (this.props.ShopReducer.cart[i][0][0]=== itemname){
          await this.setState({name:this.props.ShopReducer.cart[i][0][0]})
          await this.setState({image:this.props.ShopReducer.cart[i][0][1]})
          await this.setState({unitprice:this.props.ShopReducer.cart[i][0][2]})
          if(this.props.ShopReducer.cart[i][0][3]>1){
            await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]-1})
          }
          else{
        Alert.alert(
          'DELETE',
          'Are you sure to delete this item from the cart??',
          [
            {text: 'Delete from cart', onPress: () => this.delete(this.props.ShopReducer.cart[i][0][0])},
            {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},  
          ],
          { cancelable: true }
  
        )
        await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]})
          }
        await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          this.props.ShopReducer.cart.splice(i,1)
          }}
          this.props.addquantity(this.state.name,this.state.image,this.state.unitprice,this.state.quantity,this.state.totalprice)
  
    }
  }

  async delete (product){
    

    for (let i = 0; i < this.props.ShopReducer.cart.length; i++){
        if( this.props.ShopReducer.cart[i][0][0]=== product){
        //  console.log(product)
        //  console.log(this.props.ShopReducer.cart[i][0][0])
         this.props.ShopReducer.cart.splice(i,1)
         console.log(this.props.ShopReducer.cart)
         await this.props.delete();
        }}
        
    
  }
    render() {
        return (
            <ScrollView>
                <Text>CART</Text>
                <Text>CART  :  {this.props.ShopReducer.cart}</Text>
                <Text> {this.props.ShopReducer.products[1]}</Text>
                
                {this.props.ShopReducer.cart.map((cartitems,index)=>
                <View key={index}>
                  <Text>INDEX : {index}</Text>
                <Text>NAME : {cartitems[0][0]}</Text>
                <Image source={cartitems[0][1]} style={{width: 185, height: 185, borderRadius:25,margin:5}} />
                <Text>UNIT PRICE : {cartitems[0][2]}</Text>
                <Text>QUANITY: {cartitems[0][3]}</Text>
                <Text>TOTAL PRICE : {cartitems[0][4]}</Text>
                <Button onPress={()=>this.quantity(cartitems[0][0],'+')} title="+"/>
                <Button onPress={()=>this.quantity(cartitems[0][0],'-')} title="-"/>
                <Button onPress={()=>this.delete(cartitems[0][0])} title="delete"/>
                </View>
                )}
                
      
            </ScrollView>
           
        )
    }
}

const mapStateToProps= (state)=>{
    return{
        ShopReducer: state.ShopReducer
    }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    setname:(name)=>{
      dispatch({
        type:"setname",
        payload:name
      })
    },
    setcart:(cart)=>{
      dispatch({
        type:"setcart",
        payload:cart
      })
    },
    addquantity:(name,image,unitprice,quantity,totalprice)=>{
      dispatch({
        type:"addquantity",
        payload:[name,image,unitprice,quantity,totalprice]
      })
    },
    delete:()=>{
      dispatch({
        type:"delete",
        payload:null
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);