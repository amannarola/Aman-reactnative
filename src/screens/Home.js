import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { getCategoryList, getFilterProduct, getProductList } from '../services';

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState(null);
    const [selectedCat, setSelectedCat] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getList();
        });
        getList();

        return unsubscribe;
    }, []);

    const getList = async () => {
        setLoading(true);
        const response = await getProductList();
        const cats = await getCategoryList();
        let newCats = [...cats?.categories];
        newCats.unshift({ _id: '62e638f41126b53e1c7deb50', name: 'All' });
        setProducts(response?.products);
        setCategories(newCats);
        setLoading(false);
    }

    const productDetails = (item) => {
        navigation?.navigate('ProductDetail', { item: item });
    }

    const renderProducts = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => productDetails(item)}
                style={styles.item}>
                <Image
                    source={{
                        uri: item?.avatar
                    }}
                    style={{
                        width: 120,
                        height: 120
                    }}
                />
                <View style={styles.bottomRow}>
                    <Text
                        style={styles.itemText}
                        numberOfLines={1}>{item?.name}</Text>
                    <Text style={styles.itemText}>${item?.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const filterCat = async (item) => {
        if (item?.name === 'All') {
            setFilterCategories(products);
        } else {
            const newCats = products.filter((i) => {
                return i?.category === item?.name
            });
            setFilterCategories(newCats);
        }
    }

    const renderCategories = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedCat(index);
                    filterCat(item);
                }}
                style={[styles.catView, {
                    backgroundColor: selectedCat === index ? 'white' : 'black',
                }]
                }>
                <Text style={[styles.itemText, {
                    color: selectedCat === index ? 'black' : 'white'
                }]}>{item?.name}</Text>
            </TouchableOpacity >
        )
    }

    const addProduct = () => {
        navigation?.navigate('AddProduct');
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={'black'} size={34} />
            </View>
        )
    }

    return (
        <View style={[styles.container, {
            marginTop: hasNotch() ? 30 : 0
        }]}>
            <Text style={styles.greeting}>
                UPayment Stores
            </Text>
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
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filterCategories ? filterCategories : products}
                renderItem={renderProducts}
                numColumns={2}
            />
            <TouchableOpacity
                onPress={addProduct}
                style={styles.addBtn}>
                <Image
                    source={require('../assets/images/plus.png')}
                    style={{
                        width: 20,
                        height: 20
                    }}
                />
            </TouchableOpacity>
        </View>
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
        margin: 16,
        color: 'black',
    },
    item: {
        margin: 5,
        width: Dimensions.get('window').width / 2.2, //Device width divided in almost a half
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomRow: {
        backgroundColor: 'black',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6
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
    addBtn: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'flex-end',
        right: 40
    }
});

export default Home;