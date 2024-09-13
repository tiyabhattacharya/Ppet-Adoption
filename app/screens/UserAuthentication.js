import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../app/UserPool';

const { width } = Dimensions.get('window');

const UserAuthentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [otpError, setOtpError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+(\d{1,3})\s?(\d{6,14})$/;


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsFormComplete(false); 
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setPhoneNumberError('');
    setOtpError('');
  };

  const handleSignup = async () => {
    let hasError = false;
  
    if (!username.trim()) {
      setUsernameError('Username is required');
      hasError = true;
    } else {
      setUsernameError('');
    }
  
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError('A valid email is required');
      hasError = true;
    } else {
      setEmailError('');
    }
  
    if (!password.trim() || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      hasError = true;
    } else {
      setPasswordError('');
    }
  
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }
  
    if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('A valid phone number with country code is required');
      hasError = true;
    } else {
      setPhoneNumberError('');
    }
  
    if (hasError) return;
  
    const signUpParams = {
      Username: username,
      Password: password,
      Attributes: [
        { Name: 'email', Value: email },
        { Name: 'phone_number', Value: phoneNumber },
      ],
    };
  
    UserPool.signUp(signUpParams.Username, signUpParams.Password, signUpParams.Attributes, null, (err, data) => {
      if (err) {
        console.log('Error signing up:', err.message);
        alert('Error signing up: ' + err.message);
      } else {
        console.log('Sign up successful:', data);
        setOtp('');
        setIsFormComplete(true); 
        alert('Please enter the OTP sent to your phone or email:');
      }
    });
  };
  

  const handleOtpVerification = async () => {
    if (!otp.trim()) {
      setOtpError('OTP is required');
      return;
    } else {
      setOtpError('');
    }

    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    user.confirmRegistration(otp, true, (err, data) => {
      if (err) {
        console.log('Error verifying OTP:', err.message);
        alert('Invalid OTP. Please try again.');
      } else {
        console.log('OTP verified successfully:', data);
        alert('Account created successfully! You can now log in.');
      }
    });
  };

  const handleLogin = async () => {
    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('Login successful:', result);
      },
      onFailure: (err) => {
        console.log('Error logging in:', err.message);
        alert('Error logging in: ' + err.message);
      },
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/banner2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>

          {!isLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

              {!isFormComplete && (
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                  <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {isFormComplete && !isLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
              />
              {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {isLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={toggleForm}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  box: {
    width: width * 0.8,
    maxWidth: 400,
    padding: 20,
    top: -50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#8e2020',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    color: '#8e2020',
  },
  button: {
    height: 50,
    backgroundColor: '#8e2020',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    textAlign: 'center',
    color: '#8e2020',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 15,
  },
});

export default UserAuthentication;