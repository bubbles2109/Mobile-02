import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert
} from 'react-native';
import userIdDataSingleton from './components/UserIdDataSingleton';
import { checkProductCart, creatDataCart } from './components/handles';

const DetailProductScreen = () => {
  const navigation = useNavigation();
  
  const route = useRoute();
  const { item } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  const [isProductDetailExpanded, setIsProductDetailExpanded] = useState(false);
  const [isNutritionExpanded, setIsNutritionExpanded] = useState(false);

  const displayTextDetail = isProductDetailExpanded ? item.productDetail : '';
  const displayTextNutrition = isNutritionExpanded ? item.nutrition : '';

  const urlEmptyHeart = require('../asset/image/heart.png')
  const urlHeartFull = require('../asset/image/heart-full.png')

  const selectBackBtn = () => {
    navigation.goBack()
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const truncateProductDetail = () => {
    setIsProductDetailExpanded(!isProductDetailExpanded);
  }

  const truncateNutrition = () => {
    setIsNutritionExpanded(!isNutritionExpanded);
  }

  const onPressAddToCart = async () => {
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
      navigation.navigate('Login')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerDetails}>
        <TouchableOpacity style={styles.customButton} onPress={selectBackBtn}>
          <Text style={styles.backButton}>&#8826;</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={ styles.container }>
            <View style={{ backgroundColor: '#f2f3f2', width: '100%' }}>
              <Image style={ styles.image } resizeMode='contain' source={{ uri: item.image }} />
            </View>
          </View>
          <View style={{ flex: 2, padding: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: '85%'}}>
                <Text style={ styles.titleItem }>{item.title}</Text>
                <Text style={{ fontSize: 15 }}>{item.weight}</Text>
              </View>
              <View style={ styles.container }>
                <TouchableOpacity onPress={toggleFavorite}>
                  <Image
                    source={isFavorite ? urlHeartFull : urlEmptyHeart}
                    style={ styles.favoriteImage }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={ styles.statisticsView }>
              <View style={[ styles.container, { flexDirection: 'row' } ]}>
                <Image style={{ height: 20, width: 20 }} source={require('../asset/image/star.png')} />
                <Text style={{ padding: 10 }}>4.9 Rating</Text>
              </View>
              <View style={ styles.dotView }></View>
              <View style={ styles.container }>
                <Text style={{ padding: 10 }}>2.3K+ Review</Text>
              </View>
              <View style={ styles.dotView }></View>
              <View style={ styles.container }>
                <Text style={{ padding: 10 }}>2.9K+ Sold</Text>
              </View>
            </View>
            <View style={{ borderTopWidth: 0.5, borderTopColor: 'gray' }}>
              <TouchableOpacity onPress={truncateProductDetail} style={ styles.descriptionView }>
                <Text style={ styles.titleDescription }>Product Detail</Text>
                <Text style={[ styles.titleDescription, { fontSize: 20 } ]}>{isProductDetailExpanded ? '\ufe40' : '\u3009'}</Text>
              </TouchableOpacity>

              {isProductDetailExpanded && (
                <View>
                  {displayTextDetail.split('/n').map((line, index) => (
                    <Text key={index}>{line}</Text>
                  ))}
                </View>
              )}
            </View>
            <View style={{ borderTopWidth: 0.5, borderTopColor: 'gray' }}>
              <TouchableOpacity onPress={truncateNutrition} style={ styles.descriptionView }>
                <Text style={ styles.titleDescription }>Nutrition</Text>
                <Text style={[ styles.titleDescription, { fontSize: 20 } ]}>{isNutritionExpanded ? '\ufe40' : '\u3009'}</Text>
              </TouchableOpacity>

              {isNutritionExpanded && (
                <View>
                  {displayTextNutrition.split('/n').map((line, index) => (
                    <Text key={index}>{line}</Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={ styles.bottomView }>
        <View style={ styles.innerBottomView }>
          <View style={{flex: 1}}>
            <Text style={{ fontWeight: 'bold' }}>Total price: </Text>
            <Text style={ styles.titleItem }>{item.price}$</Text>
          </View>
          <View style={{flex: 1.5}}>
            <TouchableOpacity style={styles.addToCartButton} onPress={onPressAddToCart}>
              <View style={[ styles.container, { backgroundColor: '#2b2d41', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 } ]}>
                <Image style={[ styles.favoriteImage, { tintColor: 'white' } ]} source={require('../asset/image/shopping-cart.png')} />
              </View>
              <View style={[ styles.container, { flex: 3 } ]}>
                <Text style={ styles.titleAddtoCart }>Add To Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerDetails: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  customButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10
  },
  backButton: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width: '100%', 
    height: 250
  },
  titleItem: {
    fontSize: 30, 
    color: 'black', 
    fontWeight: 'bold'
  },
  favoriteImage: {
    width: 30, 
    height: 30
  },
  statisticsView: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10
  },
  dotView: {
    width: 7, 
    height: 7, 
    backgroundColor: 'gray', 
    borderRadius: 7
  },
  descriptionView: {
    paddingVertical: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  titleDescription: {
    fontSize: 15, 
    color: 'black', 
    fontWeight: 'bold'
  },
  bottomView: {
    height: 80, 
    bottom: 0, 
    backgroundColor: '#f2f3f2'
  },
  innerBottomView: {
    flex: 1, 
    marginHorizontal: 20, 
    marginVertical: 10, 
    flexDirection: 'row'
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: '#09b44c'
  },
  titleAddtoCart: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'white'
  }
});

export default DetailProductScreen;
