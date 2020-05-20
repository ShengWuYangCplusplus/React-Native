import React from 'react';
import {View} from 'react-native';
import {AuthContext} from './src/Context';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './src/pages/loading/index';
import MessageScreen from './src/pages/message/index'
import SignInScreen from './src/pages/login/index';
import HomeScreen from './src/pages/home/index';
import MeScreen from './src/pages/me/index';
import DeviceStorage from './src/Storage/DeviceStorage';
import Send from './src/pages/send/index'
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
  </AuthStack.Navigator>
);
const DefaultStack=createStackNavigator()

function DefaultScreen(){
  return (
    <DefaultStack.Navigator  headerMode="none">
      <DefaultStack.Screen 
        name="App"
        component={TabScreen}
        options={{
          animationEnabled: false,
        }}></DefaultStack.Screen>
      <DefaultStack.Screen name="SendDetail" component={Send}  options={{
          animationEnabled: false,
        }}/>
    </DefaultStack.Navigator>
  )
}
const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, color) => {
  return (
    <View
      style={{
        width: focused ? 24 : 18,
        height: focused ? 24 : 18,
        backgroundColor: color,
      }}
    />
  );
};

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Mine') {
            iconName = focused ? 'md-contact' : 'md-contact';
          } else if (route.name === 'Message') {
            iconName = focused ? 'md-text' : 'md-text';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: '首页'}}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{title: '好友'}}
      />
      <Tab.Screen name="Mine" component={MeScreen} options={{title: '我的'}} />
    </Tab.Navigator>
  );
}


const RootStack = createStackNavigator();
const RootStackScreen = ({userToken = false}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DefaultScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        let token = DeviceStorage.get('token').then(() => {
          setUserToken(token);
        });
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
