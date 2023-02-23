/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './Components/Header';
  import ShoppingCart from './Components/ShoppingCart';
  import ItemsList from './Components/ItemsList';
  import Footer from './Components/Footer';
  import Profile from './Components/Profile';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import Login from './Components/Login';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isVisible, setVisible] = useState(false);
  const [orderPage, setOrderPage] = useState(false);
  const setModalVisible = () => {
    setVisible(true);
  };

  const setOrdersVisible = () => {
    setOrderPage(true);
  }

  const [logIn, setLogIn] = useState(false)
  
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {logIn ? 
      <View style={styles.backgroundStyle}>
      <Header setModalVisible={setModalVisible}/>
      <ShoppingCart isVisible = {isVisible} setVisible = {setVisible} setModalVisible = {setModalVisible}/>
      {orderPage ? <Profile setOrderPage = {setOrderPage} orderPage = {orderPage}/> : <ItemsList setOrderPage = {setOrdersVisible} /> }     
      <Footer/>
      </View>
      : 
      <Login logIn = {logIn} setLogIn = {setLogIn}/>
      }
      
    </SafeAreaView>
    </Provider>
    
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 5,
    borderColor: '#6A994E',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#386641',
    
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
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
  backgroundStyle: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#F2E8CF',
  }
});


export default App;
