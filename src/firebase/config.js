import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as bcrypt from 'bcryptjs'
import moment from 'moment'

const firebaseConfig = {    
    apiKey: "AIzaSyBzIQSY219142XC9NIsI6Kz6FheIKoeW4c",
    authDomain: "onlinestoreapp-ba5e6.firebaseapp.com",
    projectId: "onlinestoreapp-ba5e6",
    storageBucket: "onlinestoreapp-ba5e6.appspot.com",
    messagingSenderId: "503316412487",
    appId: "1:503316412487:web:5d777e373db56fae81d962"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const googleProvider = new firebase.auth.GoogleAuthProvider()

  export const createUserDocument = async (user, additionalData) => {
    if(!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const {email, displayName, photoURL} = user;
        try {
            await userRef.set({
                email,
                displayName, 
                photoURL,
                ...additionalData
            })
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
  }

  export const userExist = async email => {
      const snapshot = await firestore.collection("users").where("email", "==", email).get();
      return snapshot.empty ? false : true;
  }

  export const createOrderDocument = async (order_details) => {
    const {firstName, lastName, email, phoneNumber, street, streetNumber, apartment, postalCode, city, shipping, cardNumber,cardOwner, securityCode, items, total} = order_details
    const creditCardID = await bcrypt.hash(`${cardNumber}.${cardOwner}.${securityCode}`, 10)
    try {
        await firestore.collection('orders').add({
            customer: {
                firstName,
                lastName,
            },
            email,
            phoneNumber,
            address:{
                street,
                streetNumber,
                apartment,
                postalCode,
                city,
            },
            shippingMethod: shipping,
            creditCardID,
            orderItems: items,
            orderTotal: total,
            orderDate: moment().unix(),
        })    
    } catch (error) {
        console.error("Error creating order document", error)
        throw error;
    }
    
  }
