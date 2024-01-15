import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import Home from './src/screens/Home';
import { getUser } from './src/services/api/firestore';
import { User } from './src/services/api/types';
import Login from './src/screens/Login';
import Join from 'src/screens/Join';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const rootLayoutStyle = { flex: 1, ...backgroundStyle };
  const navigate = useNavigation();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async userCoreInfo => {
      if (!userCoreInfo) {
        navigate('login');
        return;
      }
      const userInfo = await getUser(userCoreInfo.uid);
      setUser({ ...userInfo, core: userCoreInfo });
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  return (
    <SafeAreaView style={rootLayoutStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Join" component={Join} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
