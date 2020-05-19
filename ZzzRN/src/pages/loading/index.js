import * as React from 'react';
import {View, Text} from 'react-native';

function BaseCenterView({children}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  );
}


export default function SplashScreen() {
  return (
    <BaseCenterView>
      <Text>loading...</Text>
    </BaseCenterView>
  );
}
