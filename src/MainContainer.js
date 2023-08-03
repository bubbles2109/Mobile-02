import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import HomeScreen from './homePageScreen';
import ExploreScreen from './ExploreScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';

const MainContainer = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showHeader, setShowHeader] = useState(true)
  const [searchText, setSearchText] = useState('');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'cart':
        return <CartScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'cart' || tabName === 'profile') {
      setShowHeader(false)
    } else {
      setShowHeader(true)
    }
  };

  const handleSearch = () => {
    // Xử lý tìm kiếm dựa trên searchText
  };

  return (
    <View style={styles.container}>
      <HeaderBar showHeader={showHeader} searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
      <View style={{flex: 1}}>
        {renderScreen()}
      </View>
      <BottomBar activeTab={activeTab} setActiveTab={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainContainer;