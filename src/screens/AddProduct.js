import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addProduct, getCategoryList, getFilterProduct, getProductList } from '../services';
import Toast from 'react-native-simple-toast';
import { hasNotch } from 'react-native-device-info';

const AddProduct = ({ navigation }) => {

    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [selectedCat, setSelectedCat] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getProducts() {
            const cats = await getCategoryList();
            setCategories(cats?.categories);
            setLoading(false);
        }
        getProducts();
    }, []);

    const renderCategories = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedCat(item);
                }}
                style={[styles.catView, {
                    backgroundColor: selectedCat?._id !== item?._id ? 'white' : 'black',
                }]
                }>
                <Text style={[styles.itemText, {
                    color: selectedCat?._id !== item?._id ? 'black' : 'white'
                }]}>{item?.name}</Text>
            </TouchableOpacity >
        )
    }

    const addProductDetails = async () => {
        try {
            let params = {
                name: title,
                price: price,
                category: selectedCat?.name,
                description: desc,
                avatar: image,
                developerEmail: 'narolaaman987@gmail.com'
            };
            const response = await addProduct(params);
            if (response?.statusCode === 400) {
                Toast.show(response?.message, Toast.SHORT);
            } else {
                Toast.show(response?.message, Toast.SHORT);
                navigation?.navigate('Home');
            }
        } catch (error) {
            console.log("error==>", error);
        }
    }

    if (loading) {
        return (
            <View style={[styles.container, {
                justifyContent: 'center'
            }]}>
                <ActivityIndicator color={'black'} size={34} />
            </View>
        )
    }

    return (
        <View style={[styles.container, {
            marginTop: hasNotch() ? 30 : 0
        }]}>
            <TextInput
                placeholder='Product title'
                style={styles.input}
                value={title}
                onChangeText={(txt) => {
                    setTitle(txt)
                }}
            />
            <TextInput
                placeholder='Price'
                style={styles.input}
                keyboardType='number-pad'
                value={price}
                onChangeText={(txt) => {
                    setPrice(txt)
                }}
            />
            <TextInput
                placeholder='Description'
                multiline={true}
                style={[styles.input, {
                    height: 70
                }]}
                value={desc}
                onChangeText={(txt) => {
                    setDesc(txt)
                }}
            />
            <TextInput
                placeholder='Image link'
                style={styles.input}
                value={image}
                onChangeText={(txt) => {
                    setImage(txt)
                }}
            />
            <Text style={styles.selectCategory}>Selected Category: {selectedCat?.name}</Text>
            <View style={{
                height: 50,
            }}>
                <FlatList
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingHorizontal: 10
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={renderCategories}
                />
            </View>
            <TouchableOpacity
                onPress={() => addProductDetails()}
                style={styles.addBtn}>
                <Text style={{
                    color: 'white'
                }}>Add Product</Text>
            </TouchableOpacity>
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
    catView: {
        height: 40,
        paddingHorizontal: 10,
        marginLeft: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    input: {
        width: '90%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        paddingLeft: 15,
        marginTop: 20
    },
    selectCategory: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginVertical: 15
    },
    addBtn: {
        backgroundColor: 'black',
        paddingHorizontal: 12,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
    }
});

export default AddProduct;