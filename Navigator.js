import Shop from './Shop.js'
import Cart from './Cart.js'
import Viewproducts from './Viewproducts'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { View } from 'react-native';

const stacknavigator = createStackNavigator({
    
    ONLINESHOP:Shop,
    Viewproducts:Viewproducts,
    ONLINECART:Cart
})

const tabnavigator = createBottomTabNavigator({
        ONLINESHOP:stacknavigator,
        Cart:Cart
})

export default createAppContainer(tabnavigator);