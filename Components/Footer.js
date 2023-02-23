/**
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {  Text, View, StyleSheet} from 'react-native';

 const Footer = () => {
    return(
        <View style={styles.sectionContainer}>
        <Text style={styles.text}>Location</Text>
        <Text style={styles.text2}>7437 Keyon Light  New Keshaunfort OR, 24164-5436</Text>
        <Text style={styles.text2}>Hours: M-F 9:00am-11:00pm</Text>
        </View>
    )
    

  }
  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 0,
      paddingHorizontal: 5,
      borderColor: '#BC4749',
      borderWidth: 3,
      borderRadius: 10,
      backgroundColor: '#386641',
      alignItems: 'center',
    },
    text: {
      fontSize: 30,
      fontWeight: '500',
      textAlign: 'center',      
      color: '#BC4749',
      fontFamily: 'Abel-Regular',
      textDecorationLine: 'underline',
      textShadowColor: '#000000',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 5,
    },
    text2: {
      fontSize: 15,
      textAlign: 'center',      
      color: '#BC4749',
      fontFamily: 'Abel-Regular',
      textShadowColor: '#000000',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 5,
    }
  });
  export default Footer;