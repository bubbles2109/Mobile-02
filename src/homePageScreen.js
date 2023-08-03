import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { fetchDataProduct, creatDataCart, checkProductCart } from './components/handles';
import { useNavigation, useRoute } from '@react-navigation/native';
import userDataSingleton from './components/UserDataSingleton';
import userIdDataSingleton from './components/UserIdDataSingleton';

const HomeScreen = () => {
  const navigation = useNavigation()

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const dataUser = userDataSingleton.getData()

  useEffect(() => {
    const getDataProduct = async () => {
      const dataRef = await fetchDataProduct()
      setData(dataRef)
      setIsLoading(false)
    };

    getDataProduct()
  }, [])

  const selectProduct = (item) => {
    navigation.push('DetailProduct', { item })
  }

  const onPressPlus = async (item) => {
    const userId = userIdDataSingleton.getData()
    if (userId) {
      const isProductInCart = await checkProductCart(userId, item.id)
      if (isProductInCart) {
        Alert.alert('Notification', 'Product is already in the cart.');
      } else {
        await creatDataCart(item, userId);
        Alert.alert('Notification', 'Added product successfully.');
      }
    } else {
      Alert.alert('Notification', 'Please log in before adding to cart.');
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ padding: 10 }} activeOpacity={1} onPress={() => selectProduct(item)}>
        <View style={[styles.slide, { flex: 1 }]}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <Text style={styles.titleItem}>{item.title}</Text>
          <Text>{item.weight}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Text style={styles.priceItem}>{item.price}$</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableOpacity style={styles.button} onPress={() => onPressPlus(item)}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold', padding: 10 }}>Exclusive Offer</Text>
            <FlatList
              //ref={slideRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold', padding: 10 }}>Best Selling</Text>
            <FlatList
              //ref={slideRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  image: {
    height: 150,
    width: 150,
  },
  slide: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10
  },
  titleItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  priceItem: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  button: {
    backgroundColor: '#09b44c',
    alignSelf: 'center',
    borderRadius: 10
  },
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 15,
  }
});

export default HomeScreen;
