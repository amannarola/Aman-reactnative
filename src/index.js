import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import AddProduct from './screens/AddProduct';
import ProductDetail from './screens/productDetails';

const Stack = createNativeStackNavigator();

const MainRoute = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddProduct" component={AddProduct} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16
    }
});

export default MainRoute;