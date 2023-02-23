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
     TextInput
   } from 'react-native';
   
   import {useSelector, useDispatch} from 'react-redux';
   import axios from "axios";
   import { getUsers } from '../security/options';
   import { setUser } from '../actions/actions';
   
   const Login = (props) => {
     
    //LOGIN PAGE
     const dispatch = useDispatch();
     const [users, setUsers] = useState([]);
     const [userNameText, onChangeText] = useState("");
     const [passwordInput, onChangeText2] = useState("");
     const [userName, setUserName] = useState([]);
     //REGISTER PAGE
     const [newUserPage, setNewUserPage] = useState(false);
     const [firstNameText, fNameTxtChange] = useState('');
     const [lastNameText, lNameTxtChange] = useState('');
     const [newUserName, newUserTxtChange] = useState('');
     const [newPassword, newPasswordTxtChange] = useState('');
     const [confirmPassword, confirmPasswordTxtChange] = useState('');
     const [errorMSG, setErrorMSG] = useState('');
     const [reloadUsers, setReloadUsers] = useState(false);
     const {storedUser} = useSelector(state => state.cartReducer);
     
    //SET USERNAME IF EXISTS IN USERS
     const localSetUser = () => {
      if(userExists(userNameText) && userName.length === 0){
        setUserName(users.filter(user => user.Username.toString() === userNameText.toString()));
      };
    };

  const userExists = (userInput) => {
    if(users.filter(user => user.Username.toString() === userInput.toString()).length > 0){
      
      return true;
    }
    return false;
  }

  //AXIOS REQUEST TO FILL USERS
  useEffect(() => {
      if(users.length == 0 || reloadUsers == true){
      axios.request(getUsers).then(function (response){
        
        if (response.status >= 200 && response.status <= 299){
            setUsers(response.data);
            
        }
        else{
            alert("Oops! Looks like we're having issues")
            
        }
        
        
      }).catch(function (error){
          console.error(error);
      });
      setReloadUsers(false);
    }   
    
    //SET USER TO STORE AND LOAD APP
    if(userName.length === 1){
      if(userName[0].Username.toString() === userNameText.toString() && userName[0].Password.toString() === passwordInput.toString()){
        let userInfo = userName[0];
        dispatch(setUser(userInfo));
        props.setLogIn(true);
      }
     
    }
    //SET NEW USER TEXT TO NEW USER OBJECT
    
     
  }, [userNameText, userExists, passwordInput, userName, errorMSG, newUserName, firstNameText, lastNameText, newPassword]);

  //SETTING UP AXIOS FOR NEW USER
  const setNewUserText = () => {
    if(userExists(newUserName)){
      setErrorMSG('Username already exists');
    }
      if(!userExists(newUserName)){
        if(firstNameText != '' && lastNameText != '' && newPassword != '' && newPassword === confirmPassword){
          axios.put('https://jy1182ju0l.execute-api.us-east-1.amazonaws.com/production/users/' + newUserName,
          {
            'FirstName': firstNameText,
            'LastName': lastNameText,
            'Password': newPassword,
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
          setReloadUsers(true);
          setNewUserPage(false);
          setErrorMSG('');
        }
        
        else{
          setErrorMSG("All fields must be filled out")
        }
        
      }
      
      
    
  }

     return(
      
       <View style={[ styles.sectionContainer]}>
        { !newUserPage ? 
        <View>
        <Text style={styles.text}>Login</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={userNameText}
            placeholder="Username"
          />
          
          <TextInput
            style={styles.input}
            onChangeText={onChangeText2}
            value={passwordInput}
            placeholder="Password"
          /> 
         <Pressable onPress={() => {if(storedUser !== null){localSetUser()}}} style={styles.button}><Text style={styles.buttonColor}>Login</Text></Pressable>
         <Pressable onPress={() => {if(newUserPage == false){setNewUserPage(true)}}} style={styles.button}><Text style={styles.buttonColor}>Register</Text></Pressable>
         </View>
         : 
         <View>
        <Text style={styles.text}>Register</Text>
        <TextInput
            style={styles.input}
            onChangeText={fNameTxtChange}
            value={firstNameText}
            placeholder="First Name"
          />
          
          <TextInput
            style={styles.input}
            onChangeText={lNameTxtChange}
            value={lastNameText}
            placeholder="Last Name"
          /> 
          <TextInput
            style={styles.input}
            onChangeText={newUserTxtChange}
            value={newUserName}
            placeholder="Username"
          /> 
          <TextInput
            style={styles.input}
            onChangeText={newPasswordTxtChange}
            value={newPassword}
            placeholder="Password"
          /> 
          <TextInput
            style={styles.input}
            onChangeText={confirmPasswordTxtChange}
            value={confirmPassword}
            placeholder="Confirm Password"
          /> 
        <Text style={styles.text2}>{errorMSG}</Text>
         <Pressable onPress={() => {if(newUserPage == true){setNewUserText()}}} style={styles.button}><Text style={styles.buttonColor}>Register</Text></Pressable>
         <Pressable onPress={() => {if(newUserPage == true){setNewUserPage(false)}}} style={styles.button}><Text style={styles.buttonColor}>Go Back</Text></Pressable>
         </View>
        }    
         </View>
         
     )
     
 
   }
   const styles = StyleSheet.create({
     sectionContainer: {
       marginTop: 32,
       padding: 25,
       borderColor: '#6A994E',
       borderWidth: 3,
       borderRadius: 10,
       backgroundColor: '#386641',
       marginHorizontal: 15,
       
     },
     input: {
      backgroundColor: '#F2E8CF',
      borderRadius: 10,
      marginVertical: 5,
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
     text: {
       textAlign: 'center',      
       color: '#BC4749',
       fontFamily: 'Abel-Regular',
       fontSize: 24,
       textShadowColor: 'rgba(0, 0, 0, 0.75)',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 10
     },
     text2: {
       textAlign: 'center',      
       color: '#BC4749',
       fontFamily: 'Abel-Regular',
       fontSize: 20,
       textShadowColor: 'rgba(0, 0, 0, 0.75)',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 10,
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
   export default Login;