import React, { Component } from 'react'
import { View,Text,Image, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

class Shop extends Component {
  state={
    quantity:null,
    name:null,
    image:null,
    unitprice:null,
    quantity:null,
    totalprice:null,
    positive:true
  }


  async quantity (name,image,unitprice,val){
    
    if(val==='+'){
    //  this.props.addquantity(name,image,unitprice,val)

          await this.setState({name:name})
          await this.setState({image:image})
          await this.setState({unitprice:unitprice})
          await this.setState({quantity:1})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          


    for (let i = 0; i < this.props.ShopReducer.cart.length; i++){
    //  console.log(this.props.ShopReducer.cart[i][0][0])
      
      if( this.props.ShopReducer.cart[i][0][0]=== name){
          await this.setState({name:this.props.ShopReducer.cart[i][0][0]})
          await this.setState({image:this.props.ShopReducer.cart[i][0][1]})
          await this.setState({unitprice:this.props.ShopReducer.cart[i][0][2]})
          await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]+1})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          this.props.ShopReducer.cart.splice(i,1)
        
      }
      
  }

   this.props.addquantity(this.state.name,this.state.image,this.state.unitprice,this.state.quantity,this.state.totalprice)
  }  

  else{
    //  this.props.addquantity(name,image,unitprice,val)

          await this.setState({name:name})
          await this.setState({image:image})
          await this.setState({unitprice:unitprice})
          await this.setState({quantity:0})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          


    for (let i = 0; i < this.props.ShopReducer.cart.length; i++){
    //  console.log(this.props.ShopReducer.cart[i][0][0])
      
      if( this.props.ShopReducer.cart[i][0][0]=== name){
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
        
      }
      
  }

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
            <View>
                <Text>SHOP</Text>
        <Text>CART  :  {this.props.ShopReducer.cart}</Text>
               
               {this.props.ShopReducer.products.map((product,index)=>
                <View key={index} style={{marginLeft:60}}>
                    <View style={{margin:20}}>
                  <Text>PRODUCT NAME   :  {product[0]}</Text>   
                  <Image source={product[1]} style={{width: 185, height: 185, borderRadius:25,margin:5}} />
                  <Text>PRICE     :   {product[2]}</Text>
                  {this.props.ShopReducer.cart.map((cartitems,index)=>
                  
                  cartitems[0][0]===product[0] ? 
                  <View key={index}>
                    <Text>QUANTITY : {cartitems[0][3]}</Text>
                    <Text>TOTAL PRICE : {cartitems[0][4]}</Text>
                  </View>
                  :null
                

                  )}

                  
                  <Button title="Add to cart"/>

                  <Button onPress={()=>this.quantity(product[0],product[1],product[2],'+')} title="+"/>
                  <Button onPress={()=>this.quantity(product[0],product[1],product[2],'-')} title="-"/>
                  <Button onPress={()=>this.delete(product[0])} title="delete"/>

                  </View>
                  </View>
               )}
            </View>
            </ScrollView>
        )
    }
}
//await this.props.setcart(this.state.cart)
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
    setcart:(name,calculation)=>{
      dispatch({
        type:"setcart",
        payload:[name,calculation]
      })
    },
    addquantity:(name,image,unitprice,quantity,totalprice)=>{
        dispatch({
          type:"addquantity",
          payload:[name,image,unitprice,quantity,totalprice]
        })
      },
      subquantity:(name,calculation)=>{
        dispatch({
          type:"subquantity",
          payload:[name,calculation]
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

export default connect(mapStateToProps,mapDispatchToProps)(Shop);