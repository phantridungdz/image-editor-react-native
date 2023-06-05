/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import ViewImageScreen from './screens/ViewImageScreen';

const Stack = createStackNavigator();

// eslint-disable-next-line no-undef
export default NavigationStack = () => {
  return (
    <NavigationContainer className="bg-black">
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="ViewImageScreen" component={ViewImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
