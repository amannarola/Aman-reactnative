import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addProduct, getCategoryList, getFilterProduct, getProductList } from '../services';
import Toast from 'react-native-simple-toast';

const ProductDetail = ({ navigation, route }) => {

    const [product, setProduct] = useState(route?.params?.item || {});

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: product?.avatar
                }}
                style={{
                    width: '100%',
                    height: '40%',
                    marginTop: 20
                }}
            />
            <View style={styles.bottomView}>
                <View style={styles.nameView}>
                    <Text style={styles.text}>{product?.name}</Text>
                    <Text style={[styles.text, {
                        right: 0,
                        position: 'absolute',
                    }]}>${product?.price}</Text>
                </View>
                <Text style={styles.descText}>{product?.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16,
        color: 'black',
    },
    itemText: {
        color: 'white'
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        height: '50%',
        width: '100%',
        backgroundColor: 'black',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 15
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18
    },
    descText: {
        color: 'white',
        fontSize: 14,
        fontWeight: "400",
        alignSelf: 'center',
        marginHorizontal: 15
    }
});

export default ProductDetail;