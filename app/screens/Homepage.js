import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DefaultTheme, Provider } from 'react-native-paper';

const themeColors = {
  primary: '#8e2020', 
  secondary: '#f0f0f0', 
  overlay: 'rgba(255, 255, 255, 0.5)', 
  textPrimary: '#8e2020', 
  textSecondary: '#ffffff',
};

export default function Homepage() {

  const navigation = useNavigation();
  const route = useRoute();
  const [activeMenu, setActiveMenu] = useState('Home');

  useEffect(() => {
    const currentRoute = route.name;
    setActiveMenu(currentRoute);
  }, [route.name]);

  const handleGetStarted = () => {
    navigation.navigate('UserAuthentication');
  };

  const handleMenuPress = (routeName) => {
    setActiveMenu(routeName);
    navigation.navigate(routeName);
  };

  return (    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={36} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>PET RESCUE</Text>
        <View style={{ width: 70 }} />
      </View>
      <ImageBackground
        source={require('../../assets/images/banner3.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.scrollItem, styles.itemFirst]}>
            <View style={styles.contentContainer}>
              <Text style={styles.headerText}>List a Pet for Adoption</Text>
              <Text style={styles.descriptionText}>
                Help pets find a new home by listing them for adoption.
              </Text>
            </View>
            <Image source={require('../../assets/images/graphic3.png')} style={styles.image} />
          </View>
          <View style={[styles.scrollItem, styles.itemSecond]}>
            <Image source={require('../../assets/images/graphic1.png')} style={styles.image} />
            <View style={styles.contentContainer}>
              <Text style={styles.headerText}>Adopt a Pet</Text>
              <Text style={styles.descriptionText}>
                Find your perfect companion by adopting a pet in need.
              </Text>
            </View>
          </View>
          <View style={[styles.scrollItem, styles.itemFirst]}>
            <View style={styles.contentContainer}>
              <Text style={styles.headerText}>Get Started</Text>
              <Text style={styles.descriptionText}>
                Begin your journey with us by getting started today!
              </Text>
              <TouchableOpacity title='Get started' style={styles.getStartedButton} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
            <Image source={require('../../assets/images/graphic4.png')} style={styles.image} />
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Bottom Menu Bar */}
      <View style={styles.menuBar}>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'Home' && styles.activeMenuItem]}
          onPress={() => handleMenuPress('Home')}
        >
          <Ionicons name="home" size={24} color={activeMenu === 'Home' ? themeColors.primary : themeColors.textSecondary} />
          <Text style={[styles.menuText, activeMenu === 'Home' && styles.activeMenuText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'AdoptPet' && styles.activeMenuItem]}
          onPress={() => handleMenuPress('AdoptPet')}
        >
          <Ionicons name="paw" size={24} color={activeMenu === 'AdoptPet' ? themeColors.primary : themeColors.textSecondary} />
          <Text style={[styles.menuText, activeMenu === 'AdoptPet' && styles.activeMenuText]}>Adopt a Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'ListPet' && styles.activeMenuItem]}
          onPress={() => handleMenuPress('ListPet')}
        >
          <Ionicons name="add-circle" size={24} color={activeMenu === 'ListPet' ? themeColors.primary : themeColors.textSecondary} />
          <Text style={[styles.menuText, activeMenu === 'ListPet' && styles.activeMenuText]}>List Pet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.secondary,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: themeColors.overlay,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 0,
    backgroundColor: themeColors.primary,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 5,
  },
  heading: {
    color: themeColors.textSecondary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    borderRadius: 10,
  },
  scrollItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: themeColors.overlay,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  itemFirst: {
    flexDirection: 'row',
  },
  itemSecond: {
    flexDirection: 'row-reverse',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 22,
    color: themeColors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: themeColors.textPrimary,
    marginBottom: 10,
  },
  getStartedButton: {
    marginTop: 20,
    backgroundColor: themeColors.primary,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: themeColors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: themeColors.primary,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
  },
  menuItem: {
    alignItems: 'center',
  },
  activeMenuItem: {
    backgroundColor: themeColors.overlay,
    borderRadius: 10,
    padding: 5,
  },
  menuText: {
    color: themeColors.textSecondary,
    fontSize: 12,
  },
  activeMenuText: {
    color: themeColors.primary,
    fontWeight: 'bold',
  },
});
