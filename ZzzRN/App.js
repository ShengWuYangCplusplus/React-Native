import * as React from 'react';
import { Button,View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import DemoHomeScreen from './src/pages/home/index'
import Login from './src/pages/login/index'
import Mine from './src/pages/mine/index'
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Icon name="ios-menu" size={30} color="red" />
      <Icon name="ios-arrow-down" size={30} color="red" />
      <Icon name="ios-arrow-forward" size={30} color="red" />
      
      <Button title="Go to Details" onPress={()=>navigation.navigate('Details')}></Button>
      <Button title="Go to DemoIndex" onPress={()=>navigation.navigate('DemoHome')}></Button>
      <Button title="Login" onPress={()=>navigation.navigate('Login')}></Button>
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="DemoHome" component={DemoHomeScreen} />
        <Stack.Screen name="Mine" component={Mine} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;