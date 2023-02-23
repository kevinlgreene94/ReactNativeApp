/**
 *
 * @format
 * @flow strict-local
 */
 import React, { useEffect, useState } from 'react';
 import {
     StyleSheet,
     Text,
     View,
     Pressable,
     FlatList,
     Image
   } from 'react-native';
   import { addItem, getItems } from '../actions/actions';
   import {useSelector, useDispatch} from 'react-redux';
   import axios from "axios";
   const ItemsList = (props) => {
     const {cart} = useSelector(state => state.cartReducer);
     const dispatch = useDispatch();
     const {items} = useSelector(state => state.cartReducer);
     let count = cart.length;
     const options = {
      method: 'GET',
      url: 'https://jy1182ju0l.execute-api.us-east-1.amazonaws.com/production/items',
      headers: {
          'x-api-key': 'fB63SvtwFw8wUguLfABOW5L8sz122CHE6dRfOZzL',
      }
  };
    const [isLoading, setLoading] = useState(true);
    //ADD ITEM TO CART
     const addAnItem = item => {
           let newItem = {'key': count,'name': item.Name, 'price': item.Price, 'itemID': item.ItemID};
           dispatch(addItem(newItem));      
     };
     //AXIOS CALL FOR ITEMS
     useEffect(() => {
      if(items.length == 0){
      axios.request(options).then(function (response){
        if (response.status >= 200 && response.status <= 299){
           
            dispatch(getItems(response.data));
            
        }
        else{
            alert("Oops! Looks like we're having issues")
            
        }
        
    }).catch(function (error){
        console.error(error);
    });
  } 
  if(items.length > 0){
    setLoading(false);
    
  }
     }, [cart, count, items]);
     //RENDER ITEMS
     const renderItem = ({item}) =>(
       <View style={styles.sectionContainer}>
               <Text style={styles.text}>{item.Name}</Text>
               <Image style={styles.image} source={{uri:item.Image}}/>
               <Text style={styles.text2}>${item.Price}</Text>
               <Pressable style={[styles.button]} onPress={() => {if(item != null){addAnItem(item)}}}><Text style={styles.buttonColor}>Add to Cart</Text></Pressable>
               
       </View>
      
     )
     
     return(
       <View style={[{flex: 3, marginBottom: 100}]}>
        {isLoading ? <Text style={styles.text}>Loading...</Text> :
        <View>
        <View style={styles.navigationBar}>
        <Text style={styles.sectionTitle}>Menu</Text>
        <Pressable style={styles.button} title="Orders" onPress={() => props.setOrderPage(true)}> 
         <Text style={styles.buttonColor}>Orders</Text>
         </Pressable> 
         </View>
        <FlatList
           data={items[0]}
           renderItem = {renderItem}
           keyExtractor = {item => item.ItemID}/>
        </View>
           }        
       </View>
         
     )
     
 
   }
   const styles = StyleSheet.create({
     sectionContainer: {
       marginTop: 24,
       paddingHorizontal: 5,
       borderColor: '#BC4749',
       borderWidth: 5,
       borderRadius: 10,
       backgroundColor: '#386641',
       marginHorizontal: 15,
       
     },
     sectionTitle: {
      textAlign: 'center',      
      color: '#BC4749',
      fontFamily: 'Abel-Regular',
      fontSize: 32,
      textShadowColor: '#000000',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5
     },
     navigationBar: {
      paddingHorizontal: 5,
      borderColor: '#BC4749',
      borderWidth: 5,
      borderRadius: 10,
      backgroundColor: '#386641',
      marginTop: 5,
     },
     highlight: {
       fontWeight: '700',
     },
     button: {
       borderRadius: 10,
       padding: 10,
       elevation: 2,
       backgroundColor: '#6A994E',
       alignSelf: 'center',
       marginBottom: 10,
       
     },
     text: {
       textAlign: 'center',      
       color: '#BC4749',
       fontFamily: 'Abel-Regular',
       fontSize: 24,
       textShadowColor: '#000000',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 5
     },
     text2: {
       textAlign: 'center',      
       color: '#BC4749',
       fontFamily: 'Abel-Regular',
       fontSize: 20,
       textShadowColor: '#000000',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 5,
       textDecorationLine: 'underline',
       marginBottom: 10,
     },
     buttonColor: {
       color: '#BC4749', 
       fontFamily: 'Abel-Regular',
      
     },
     image: {
       alignSelf: 'center',
       marginVertical: 10,
       borderColor: '#BC4749',
       borderWidth: 5,
       borderRadius: 10,
       backgroundColor: '#F2E8CF',
       width: 139,
       height: 100,
     }
   });
   export default ItemsList;