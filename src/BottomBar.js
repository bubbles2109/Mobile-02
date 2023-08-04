import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import userDataSingleton from './components/UserDataSingleton';

const BottomBar = ({ activeTab, setActiveTab }) => {
  const userData = userDataSingleton.getData()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[ styles.tab, activeTab === 'home' ]}
        onPress={() => setActiveTab('home')}
      >
        <Image style={[ styles.icon, { tintColor: activeTab === 'home' ? '#09b44c' : 'black' } ]} source={require('../asset/image/home.png')}/>
        <Text style={[ styles.tabText, { color: activeTab === 'home' ? '#09b44c' : 'black' } ]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[ styles.tab, activeTab === 'explore' ]}
        onPress={() => setActiveTab('explore')}
      >
        <Image style={[ styles.icon, { tintColor: activeTab === 'explore' ? '#09b44c' : 'black' } ]} source={require('../asset/image/app.png')}/>
        <Text style={[ styles.tabText, { color: activeTab === 'explore' ? '#09b44c' : 'black' } ]}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[ styles.tab, activeTab === 'cart' ]}
        onPress={() => setActiveTab('cart')}
        disabled={!userData}
      >
        <Image style={[ styles.icon, { tintColor: activeTab === 'cart' ? '#09b44c' : 'black' } ]} source={require('../asset/image/shopping-cart.png')}/>
        <Text style={[ styles.tabText, { color: activeTab === 'cart' ? '#09b44c' : 'black' } ]}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[ styles.tab, activeTab === 'profile' ]}
        onPress={() => setActiveTab('profile')}
      >
        <Image style={[ styles.icon, { tintColor: activeTab === 'profile' ? '#09b44c' : 'black' } ]} source={require('../asset/image/user.png')}/>
        <Text style={[ styles.tabText, { color: activeTab === 'profile' ? '#09b44c' : 'black' } ]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    height: 20, 
    width: 20
  },
  disabledTable: {

  }
};

export default BottomBar;