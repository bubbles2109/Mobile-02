import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    TextInput
} from 'react-native';
import { fetchDataCart, deleteDocumentByProductId } from './components/handles';
import userIdDataSingleton from './components/UserIdDataSingleton';

const CartScreen = () => {
    const [data, setData] = useState([])
    const [amount, setAmount] = useState({})
    const userId = (userIdDataSingleton.getData()).toString()

    useEffect(() => {
        getDataCart()
    }, [])

    useEffect(() => {
        console.log(amount);
    }, [amount]);

    const getDataCart = async () => {
        const dataRef = await fetchDataCart(userId)
        setData(dataRef)
        console.log(dataRef)

        const initialAmount = {};
        dataRef.forEach((item) => {
            initialAmount[item.id] = 1;
        });
        setAmount(initialAmount);

    }

    const addAmount = (itemId) => {
        setAmount((initialAmount) => ({
            ...initialAmount,
            [itemId]: (initialAmount[itemId]) + 1,
        }));
    };

    const decreaseAmount = (itemId) => {
        setAmount((initialAmount) => ({
            ...initialAmount,
            [itemId]: (initialAmount[itemId]) - 1,
        }));
    };

    const deleteProduct = (itemId) => {
        deleteDocumentByProductId(itemId, userId)
        getDataCart()
    }

    const renderItem = ({ item }) => {
        return (
            <View style={stylesItem.constainerItem}>
                <View style={stylesItem.innerContainerItem}>
                    <TouchableOpacity style={stylesItem.customButton} onPress={() => deleteProduct(item.id)}>
                        <Image style={stylesItem.imgTrash} resizeMode='contain' source={require('../asset/image/trash.png')} />
                    </TouchableOpacity>
                    <Image style={styles.image} resizeMode='contain' source={{ uri: item.image }} />
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 2 }}>
                            <View style={{ position: 'absolute' }}>
                                <Text style={stylesItem.titleItem}>{item.title}</Text>
                                <Text style={stylesItem.weightItem}>{item.weight}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={stylesItem.priceItem}>{item.price}$</Text>
                            </View>
                            <View style={stylesItem.quantityView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute' }}>
                                    <TouchableOpacity style={[stylesItem.button, {backgroundColor: 'red'}]} onPress={() => decreaseAmount(item.id)}>
                                        <Text style={{ fontSize: 20, color: 'white'}}>&#8722;</Text>
                                    </TouchableOpacity>
                                    <TextInput style={stylesItem.textInput} value={(amount[item.id] || 1).toString()} editable={false}></TextInput>
                                    <TouchableOpacity style={[stylesItem.button, {backgroundColor: 'green'}]} onPress={() => addAmount(item.id)}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={styles.title}>Cart</Text>
            </View>
            <View style={{ backgroundColor: '#e3e3e3', flex: 1, margin: 10, borderRadius: 15, padding: 10 }}>
                <FlatList data={data} renderItem={renderItem}>
                </FlatList>
                <TouchableOpacity style={styles.paymentButton}>
                    <Text style={styles.textPayment}>Payment now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#e3e3e3'
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        height: 100,
        width: 130,
    },
    paymentButton: {
        marginHorizontal: 20, 
        marginVertical: 10, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 0.5,
        borderRadius: 15,
        backgroundColor: '#ea9c00',
        height: 50
    },
    textPayment: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: 'white'
    }
});

const stylesItem = StyleSheet.create({
    constainerItem: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10
    },
    innerContainerItem: {
        flexDirection: 'row',
        marginVertical: 5
    },
    customButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 3
    },
    imgTrash: {
        height: 20,
        width: 20
    },
    titleItem: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    weightItem: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    priceItem: {
        position: 'absolute',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    quantityView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    textInput: {
        width: 30,
        padding: 1,
        textAlign: 'center',
        color: 'black',
        fontSize: 20
    },
    button: {
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 5
    }
})

export default CartScreen;
