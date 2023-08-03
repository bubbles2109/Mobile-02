import React, { useState, useRef, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import userDataSingleton from './components/UserDataSingleton';
import userIdDataSingleton from './components/UserIdDataSingleton';
import { getProfileUser } from './components/handles';

const ProfileScreen = () => {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false);

  const dataUser = userDataSingleton.getData()

  const navigation = useNavigation()

  useEffect(() => {
    const getProfile = async () => {
      if (dataUser) {
        const { profileData, profileId } = await getProfileUser(dataUser.email)
        setData(profileData)
        await userIdDataSingleton.setData(profileId)
        console.log(profileData)
      } else {
        setData(null)
      }
    }

    getProfile()
  }, [dataUser])

  const userName = data ? data.name : 'Guess'

  const onPressLogout = () => {
    userDataSingleton.setData(null)
    userIdDataSingleton.setData(null)
    setReload(!reload)
    setData(null)
    navigation.navigate('MainContainer')
  };

  const onPressSignIn = () => {
    navigation.navigate('Login')
  }

  const onPressSignUp = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.imageView}>
          <Image style={styles.image} resizeMode='contain' source={require('../asset/image/user.png')} />
        </View>
        <Text style={styles.usernameTitle}>{userName}</Text>
      </View>
      <View style={styles.subView}>
        {dataUser ? (
          <TouchableOpacity
            style={styles.customButton}
            onPress={onPressLogout}>
            <View style={styles.innerButton}>
              <View
                style={[
                  styles.innerButon_imageView,
                  { backgroundColor: '#ffaa96', borderColor: 'red' },
                ]}
              >
                <Image
                  style={{ height: 30, width: 30, tintColor: 'red' }}
                  source={require('../asset/image/logout.png')}
                />
              </View>
              <Text style={styles.innerButton_title}>Logout</Text>
            </View>
            <Text style={{ fontWeight: 'bold' }}>{'\u3009'}</Text>
          </TouchableOpacity>
        ) : (
          <><TouchableOpacity style={styles.customButton} onPress={onPressSignIn}>
            <View style={styles.innerButton}>
              <View style={[styles.innerButon_imageView, { backgroundColor: '#ccf2ee', borderColor: 'green' }]}>
                <Image style={{ height: 30, width: 30, tintColor: 'green' }} source={require('../asset/image/login.png')} />
              </View>
              <Text style={styles.innerButton_title}>Sign In</Text>
            </View>
            <Text style={{ fontWeight: 'bold' }}>{'\u3009'}</Text>
          </TouchableOpacity><TouchableOpacity style={styles.customButton} onPress={onPressSignUp}>
              <View style={styles.innerButton}>
                <View style={[styles.innerButon_imageView, { backgroundColor: '#ffdee8', borderColor: '#fe346e' }]}>
                  <Image style={{ height: 30, width: 30, tintColor: '#fe346e' }} source={require('../asset/image/register.png')} />
                </View>
                <Text style={styles.innerButton_title}>Sign Up</Text>
              </View>
              <Text style={{ fontWeight: 'bold' }}>{'\u3009'}</Text>
            </TouchableOpacity></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9971ee',
    padding: 30
  },
  imageView: {
    backgroundColor: 'white',
    height: 150,
    width: 150,
    padding: 20,
    borderRadius: 100
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  usernameTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    padding: 10
  },
  subView: {
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    padding: 20
  },
  customButton: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerButon_imageView: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2
  },
  innerButton_title: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10
  }
});

export default ProfileScreen;
