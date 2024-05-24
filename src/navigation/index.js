import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../components/RootNavigation';
import AuthStack from './authNavigation';
import BottomTab from './BottomTabNavigation';
import SplashScreenPage from '../screens/splashscreen';
import HeaderLeft from '../components/HeaderLeft';
import colors from '../utils/colors';
import EditProfile from '../screens/editProfile';
import Destinationdetails from '../screens/Destinationdetails';
import DestinationBooking from '../screens/DestinationBooking';

const Stack = createNativeStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreenPage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
       
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: 'Edit Profile',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleStyle: {fontSize: 20,fontFamily:"Poppins-SemiBold"},
            headerLeft: () => <HeaderLeft navigation={navigationRef} />,
          }}
        />
         <Stack.Screen
          name="Destinationdetails"
          component={Destinationdetails}
          options={{
            headerTitle: 'Destination Details',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleAlign:"center",
            headerTitleStyle: {fontSize: 20,fontFamily:"Poppins-SemiBold"},
            headerLeft: () => <HeaderLeft navigation={navigationRef} />,
          }}
        />
         <Stack.Screen
          name="DestinationBooking"
          component={DestinationBooking}
          options={{
            headerTitle: 'Destination Booking',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleStyle: {fontSize: 20,fontFamily:"Poppins-SemiBold"},
            headerLeft: () => <HeaderLeft navigation={navigationRef} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
