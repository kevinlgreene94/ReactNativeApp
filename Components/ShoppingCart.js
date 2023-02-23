/**
 *
 * @format
 * @flow strict-local
 */
 import React, { useEffect, useState } from 'react';
 import { FlatList, Text, View, StyleSheet, Modal, Alert, Button, TextInput, Pressable, Image} from 'react-native';
 import {useSelector, useDispatch} from 'react-redux';
 import { removeItem} from '../actions/actions';
 import UUID from 'react-native-uuid';
 import axios from 'axios';
 import { getOrders } from '../security/options';
 const ShoppingCart = (props) =>{
 
   const {cart} = useSelector(state => state.cartReducer);
   const [cartNull, setCartNull] = useState(false);
   const dispatch = useDispatch();
   const removeAnItem = item => dispatch(removeItem(item));
   const {storedUser} = useSelector(state => state.cartReducer);
   const [orders, setOrders] = useState([]);
   const [successTXT, setSuccessTXT] = useState('');
   //REMOVE ITEMS FROM CART
   const handleRemoveItem = item => {
     removeAnItem(item);
   }
   //ADD TOTAL
   function addTotal(cart){
     let newTotal = 0;
     cart.map((item) => newTotal += item.price);
     return newTotal;
   }
   //CHECK IF ITEM EXISTS IN CART
   const exists = cartItem => {
     if(cart.filter(item => item.key === cartItem.key).length > 0){
       return true;
     }
     return false;
   }
   //AXIOS CALL FOR ORDERS
   useEffect(() => {
    if(orders.length === 0){
    axios.request(getOrders).then(function (response){
      
      if (response.status >= 200 && response.status <= 299){
         setOrders(response.data);
      }
      else{
          alert("Oops! Looks like we're having issues")
          
      }
      
      
    }).catch(function (error){
        console.error(error);
    });
     if(cart != null){
       setCartNull(true);
       addTotal(cart);
     }
     else{
       setCartNull(false);
     }
    }
   }, []);
   //RENDER ITEMS IN CART
     const renderItem = ({item}) =>(
       <View style={styles.item}>
               <Text style={styles.text}>{item.name}</Text>
               <Text style={styles.text}>${item.price}</Text>
               <Pressable style={[styles.removeButton]} onPress={() => {if(exists(item)){handleRemoveItem(item)}}}><Image source={require('./images/trashcan.png')}/></Pressable>
       </View>
             
     )
  
   //SETTING UP AXIOS FOR NEW ORDER
     const sendOrder = () => {
      var testUUID = UUID.v1();
      var day = new Date().getDate(); 
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var date = month + '-' + day + '-' + year;
      var total = addTotal(cart).toFixed(2);
       if(orders.filter(order => order.OrderID ===testUUID).length === 0){
          axios.put('https://jy1182ju0l.execute-api.us-east-1.amazonaws.com/production/orders/' + testUUID,
          {
            'Date': date.toString(),
            'Price': total.toString(),
            'TotalQTY': cart.length.toString(),
            'Username': storedUser[0].Username.toString(),
          },
          {headers: {
            'x-api-key': 'fB63SvtwFw8wUguLfABOW5L8sz122CHE6dRfOZzL',
         }}
          ).catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
           } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
          });
          cart.map(item => {handleRemoveItem(item)});
          setSuccessTXT('Your order has been placed!');
        }    
     };
     
     return(
         <View>
         <Modal
               animationType='slide'
               transparent={true}
               visible={props.isVisible}
               onRequestClose={() => {
                 Alert.alert("Modal has been closed.");
                 props.setModalVisible(!props.isVisible);
               }}>
                 <View style={styles.centerModal}>
                   <View style={styles.modalStyles}>
                   <Text style={[styles.text, { fontSize: 24, marginBottom: 5 }]}>Shopping Cart</Text>
                   {cartNull ? 
                      <FlatList
                        data={cart}
                        renderItem = {renderItem}
                        keyExtractor = {item => item.key}/>
                         : 
                        <Text style={styles.text}>Nothing to show here!</Text>
                    }
                   <Text style={styles.text}>{successTXT}</Text>
                   <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {if(cart.length > 0){sendOrder()}}}><Text style={styles.text3}>Checkout</Text></Pressable>
                   <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {props.setVisible(false); setSuccessTXT('');}}><Text style={styles.text3}>Close</Text></Pressable>
                   <Text style={[styles.text]}>{cart.length} items</Text>
                   <Text style={styles.text}>Total : ${addTotal(cart).toFixed(2)} </Text>
                 </View>
               </View>
             </Modal>
             </View>
     )
     
 }
 export default ShoppingCart;
 const styles = StyleSheet.create({
     centerModal: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
       },
       modalStyles: {
         height: '75%',
         width: '95%',
         borderColor: '#BC4749',
         backgroundColor: '#386641',
         padding: 35,
         alignItems: 'center',
         margin: 20,
         shadowColor: "#f0f0f0",
         borderWidth: 4,
         shadowOffset: {
           width: 0,
           height: 2
         },
         borderRadius: 20,
       },
       buttonClose: {
         backgroundColor: "#6A994E",
       },
       button: {
         borderRadius: 10,
         padding: 10,
         elevation: 2,
         marginVertical: 10,
       },
       text: {
         color: '#BC4749',
         fontFamily: 'Abel-Regular',
         fontSize: 18,
         textShadowColor: '#000000',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 5,
         marginHorizontal: 15,
       },
       text2: {
         fontFamily: 'Abel-Regular',
       },
       text3: {
         color: '#BC4749',
         fontFamily: 'Abel-Regular',
         
       },
       item: {
       borderColor: '#6A994E',
       borderWidth: 1,
       borderRadius: 10,
       flexDirection: 'row',
       alignContent: 'center',
       marginVertical: 5,
       paddingVertical: 5,
       paddingHorizontal: 10,
       width: '100%',
       alignItems: 'center',
       justifyContent: 'flex-end',
       },
       removeButton: {
         marginHorizontal: 10,
         borderRadius: 5,
         padding: 5,
         backgroundColor: '#BC4749',
         alignSelf: 'flex-end',
       },
       
 })