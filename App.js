import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './app/screens/Homepage';
import UserAuthentication from './app/screens/UserAuthentication';

const Stack = createStackNavigator();

// ... other imports

const MyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Homepage} />
      {/* Add the new route here */}
      <Stack.Screen name="UserAuthentication" component={UserAuthentication} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyNavigator />
    </NavigationContainer>
  );
}

export default App;