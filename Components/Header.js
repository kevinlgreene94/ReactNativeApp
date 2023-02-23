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
  Image,
  Pressable,
  ImageBackground
 } from 'react-native';
 import {useSelector} from 'react-redux';
 import NetInfo from '@react-native-community/netinfo';
 const Header = (props) => {
  //CHECK CONNECTION STATUS
     const [connection, setConnection] = useState(true);
     NetInfo.addEventListener(networkState => {
         if (networkState.isConnected === false) {
           setConnection(false);
         }
       })
       
     const {cart} = useSelector(state => state.cartReducer);
     return (
       <ImageBackground source={require('./images/logo.png')} resizeMode="cover" style={styles.header}>
       <View>
         {connection ? <View style={styles.status}>
                       <Image style={styles.onlineImage} source={require("./images/green.png")}/> 
                       <Text style={styles.buttonText}>Online</Text>
                     </View> : 
               <View style={styles.status}>
                 <Image style={styles.onlineImage} source={require("./images/red.png")}/> 
                 <Text style={styles.buttonText}>Offline</Text>
               </View>
               }         
         <Pressable style={styles.button} title="Cart" onPress={props.setModalVisible}>
         <Image style={styles.onlineImage} source={require("./images/cart.png")}/> 
         <Text style={styles.text2}>{cart.length}</Text>
         </Pressable>
         </View>
        </ImageBackground>
     );
   };
   const styles = StyleSheet.create({
     background: {
       paddingBottom: 40,
       paddingTop: 96,
       paddingHorizontal: 32,
     },
     logo: {
       opacity: 0.2,
       overflow: 'visible',
       resizeMode: 'cover',
       marginLeft: -128,
       marginBottom: -192,
     },
     text: {
       fontSize: 35,
       fontWeight: '500',
       textAlign: 'center',      
       color: '#BC4749',
       fontFamily: 'Abel-Regular',
       textDecorationLine: 'underline',
       textShadowColor: 'rgba(0, 0, 0, 0.75)',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 10
     },
     text2: {
      textAlign: 'center',      
       color: '#BC4749',
       fontFamily: 'Abel-Regular',
       fontSize: 15,
       
     },
     header:{
         backgroundColor: '#386641',
           borderColor: '#BC4749',
           borderWidth: 5,
           borderRadius: 10,
           flex: 1,
     },
     onlineImage:{
         height: 25,
         width: 20,
         alignSelf: 'flex-start',
     },
     status: {
         flexDirection: 'row',
         alignSelf: 'flex-start',
         justifyContent: 'flex-start',
         
     },
     button: {
       borderRadius: 10,
       padding: 10,
       elevation: 2,
       backgroundColor: '#6A994E',
       alignSelf: 'flex-end',
       flexDirection: 'row',
       marginRight: 5,
     },
     buttonText:{
       textAlign: 'center',      
       color: '#BC4749',
       fontFamily: 'Abel-Regular',
       textDecorationLine: 'underline'
     },
     image: {
      alignSelf: 'center',
      marginVertical: 0,
      borderRadius: 10,
    }
   });
   export default Header;