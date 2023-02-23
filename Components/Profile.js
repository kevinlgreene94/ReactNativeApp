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
  } from 'react-native';

 import {useSelector} from 'react-redux';
 import axios from "axios";
 import { getOrders } from '../security/options';


 const Profile = (props) => {

 const [loading, setLoading] = useState(true);
 const [userOrders, setUserOrders] = useState([]);
 const {storedUser} = useSelector(state => state.cartReducer);
 let orderLength = 0;
//SET USER ORDERS
const setLocalOrders = (data) => {
    setUserOrders(data);
}
//AXIOS CALL FOR USERORDERS
 useEffect(() => {
    if(userOrders.length == 0 && loading == true){
    axios.request(getOrders).then(function (response){
     //FILTER RESULTS BEFORE SETTING TO USER ORDERS 
      if (response.status >= 200 && response.status <= 299){
         setLocalOrders(response.data.filter(userOrder => userOrder.Username.toString() === storedUser[0].Username.toString()));   
         setLoading(false);
      }
      else{
          alert("Oops! Looks like we're having issues")
          
      }
      
      
    }).catch(function (error){
        console.error(error);
    });
  }   
  
}, [userOrders, ordersExist, orderLength]);
//CHECK IF ORDER EXISTS
const ordersExist = (user) => {
    if(userOrders.filter(order => order.Username.toString() === user.Username.toString()).length > 0){
      return true;
    }
    return false;
  }
  
  //DISPLAY ORDERS IN USER ORDERS
  const renderItem = (order) =>(
    <View style={styles.sectionDescription}>
            
            <Text style={styles.text2}>Date Ordered: {order.Date}</Text>
            <Text style={styles.text2}>Number of Items: {order.TotalQTY}</Text>
            <Text style={styles.text2}>Price: ${order.Price}</Text>
    </View>
  )

return(
    <View style={styles.sectionContainer}>
        <View style={styles.navigationBar}>
        <Text style={styles.sectionTitle}>Orders</Text>
        <Pressable style={styles.button} onPress={() => props.setOrderPage(false)}><Text style={styles.buttonColor}>Menu</Text></Pressable>
        </View>
        { loading ? <View><Text style={styles.text}>Loading...</Text></View> 
        : 
        <View>
        
        <FlatList
           data={userOrders}
           renderItem = {({item}) => renderItem(item)}
           keyExtractor = {order => order.OrderID}
           extraData={userOrders}/>
        </View>
           }

    </View>
)

 }

 const styles = StyleSheet.create({
    sectionContainer: {
      paddingHorizontal: 1,
      flex: 3,
      marginBottom: 100
    },
    input: {
     backgroundColor: '#F2E8CF',
     borderRadius: 10,
     marginVertical: 5,
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
    sectionDescription: {
      marginTop: 32,
      padding: 50,
      borderColor: '#BC4749',
      borderWidth: 3,
      borderRadius: 10,
      backgroundColor: '#386641',
      marginHorizontal: 15,
      flex: 1,
      justifyContent: 'space-evenly'
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
      marginVertical: 5,
      
    },
    text: {
      textAlign: 'center',      
      color: '#BC4749',
      fontFamily: 'Abel-Regular',
      fontSize: 32,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
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
      borderColor: '#6A994E',
      borderWidth: 3,
      borderRadius: 10,
    }
  });

 export default Profile;