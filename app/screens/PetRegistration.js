import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Picker, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native'; 
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker'; 

const themeColors = {
  primary: '#8e2020',  
  secondary: '#f0f0f0',
  overlay: 'rgba(255, 255, 255, 0.5)', 
  textPrimary: '#8e2020', 
  textSecondary: '#ffffff',
};

export default function PetRegistration() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeMenu, setActiveMenu] = useState('Homepage');
  const [vaccinated, setVaccinated] = useState('Yes');
  const [petImage, setPetImage] = useState(null);
  const [vaccinationCertificate, setVaccinationCertificate] = useState(null); 
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    const currentRoute = route.name;
    setActiveMenu(currentRoute);
  }, [route.name]);

  const handleMenuPress = (routeName) => {
    setActiveMenu(routeName);
    navigation.navigate(routeName === 'Home' ? 'Home' : routeName);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPetImage(result.uri);
    }
  };

  const pickPDF = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.type !== 'cancel') {
      setVaccinationCertificate(result.uri);
    }
  };

  const handleFormSubmit = () => {
    let formErrors = {};

    if (!ownerName.match(/^[A-Za-z\s]+$/)) formErrors.ownerName = 'Owner Name is required and should only contain letters and spaces.';
    if (!petName.match(/^[A-Za-z\s]+$/)) formErrors.petName = 'Pet Name is required and should only contain letters and spaces.';
    if (!petType.match(/^[A-Za-z\s]+$/)) formErrors.petType = 'Pet Type is required and should only contain letters and spaces.';
    if (!breed.match(/^[A-Za-z\s]+$/)) formErrors.breed = 'Breed is required and should only contain letters and spaces.';
    if (!age) formErrors.age = 'Age is required.';
    if (!weight) formErrors.weight = 'Weight is required.';
    if (!location) formErrors.location = 'Location is required.';
    if (!phoneNumber.match(/^\d{10}$/)) formErrors.phoneNumber = 'Phone Number is required and should be 10 digits long.';
    if (vaccinated === 'Yes' && !vaccinationCertificate) formErrors.vaccinationCertificate = 'Vaccination certificate is required if vaccinated.';

    if (Object.keys(formErrors).length === 0) {
      
      console.log('Form submitted');
    } else {
      
      setErrors(formErrors);
      Alert.alert('Error', 'Please fill out all fields correctly.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={36} color='white' />
        </TouchableOpacity>
        <Text style={styles.heading}>PET RESCUE</Text>
        <View style={{ width: 70 }} />
      </View>

      <ImageBackground
        source={{ uri: '../../assets/images/banner3.png' }} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        {activeMenu === 'ListPet' ? (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.formHeader}>Register Pet for Adoption</Text>

            <TextInput
              style={styles.input}
              placeholder="Owner Name"
              placeholderTextColor="#888"
              value={ownerName}
              onChangeText={setOwnerName}
            />
            {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Pet Name"
              placeholderTextColor="#888"
              value={petName}
              onChangeText={setPetName}
            />
            {errors.petName && <Text style={styles.errorText}>{errors.petName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Pet Type (e.g., Dog, Cat)"
              placeholderTextColor="#888"
              value={petType}
              onChangeText={setPetType}
            />
            {errors.petType && <Text style={styles.errorText}>{errors.petType}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Breed"
              placeholderTextColor="#888"
              value={breed}
              onChangeText={setBreed}
            />
            {errors.breed && <Text style={styles.errorText}>{errors.breed}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor="#888"
              value={location}
              onChangeText={setLocation}
            />
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Vaccinated:</Text>
              <Picker
                selectedValue={vaccinated}
                style={styles.dropdown}
                onValueChange={(itemValue) => setVaccinated(itemValue)}
              >
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>

            {vaccinated === 'Yes' && (
              <>
                <TouchableOpacity style={styles.pdfUploadButton} onPress={pickPDF}>
                  <Text style={styles.buttonText}>Upload Vaccination Certificate (PDF)</Text>
                </TouchableOpacity>
                {errors.vaccinationCertificate && <Text style={styles.errorText}>{errors.vaccinationCertificate}</Text>}
                {vaccinationCertificate && <Text style={styles.pdfText}>PDF Selected</Text>}
              </>
            )}

            <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
              <Text style={styles.buttonText}>Upload Pet Image</Text>
            </TouchableOpacity>
            {petImage && <Text style={styles.imageText}>Image Selected</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View />
        )}
      </ImageBackground>

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
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#8e2020',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileButton: {
    marginLeft: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop:10,
    marginBottom:10
  },
  formHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: themeColors.primary,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownContainer: {
    marginBottom: 10,
    borderRadius: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: themeColors.primary,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    color: '#888',
    borderRadius: 10,
    padding: 5
  },

  pdfText: {
    color: themeColors.textSecondary,
    backgroundColor:themeColors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },

  pdfUploadButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },

  imageUploadButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageText: {
    color: themeColors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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

