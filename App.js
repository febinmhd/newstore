import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import ShopReducer from './Store.js'
import Tabnavigator from './Navigator.js'


const rootreducer = combineReducers({
  ShopReducer
});

const store= createStore(rootreducer);


export default function App() {
  return (<Provider store={store}>
    <Tabnavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
