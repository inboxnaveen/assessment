import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  useWindowDimensions,
  Animated,
} from 'react-native';
import colors from '../../utils/colors';
import {UserAction} from '../../reduxManager/index';
import {
  ProfileEdit,
  UserProfile,
  Lock,
  Logout,
  Shield,
  Info,
} from '../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import Loader from '../../components/Loader/Loader';

const Profile = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
    return focusHandler;
  }, []);

  //OnLogout
  const clearStorage = () => {
    UserAction.resetUserDetails();
    navigation.popToTop();
    navigation.navigate('AuthStack');
  };

  const [showLoader, setLoader] = useState(false);
  const [profileList, setProfileList] = useState(false);
  const [imageError, setImageError] = useState(false);

  //Get Profile Api

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar
        hidden={false}
        backgroundColor={colors.dustyGrey}
        barStyle="dark-content"
      />
      {showLoader ? (
        <Loader />
      ) : (
        <ScrollView nestedScrollEnabled style={styles.container}>
          <View style={{margin: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: colors.textColor,
                fontSize: 28,
              }}>
              Profile
            </Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {profileList.profile_img ? (
              <Image
                source={{
                  uri: profileList.profile_img,
                }}
                style={{
                  height: 120,
                  width: 120,
                  // marginTop: 25,
                  borderRadius: 60,
                }}
                resizeMode="cover"
              />
            ) : (
              <Image
                style={{
                  width: 120,
                  height: 120,
                  // marginTop: 25,
                  borderRadius: 60,
                }}
                source={require('../../assets/user_logo.png')}
                resizeMode="contain"
              />
            )}

            <Text style={styles.nameText}>Benjamin</Text>
            <Text style={styles.emailText}>benjamin@yourdomain.com</Text>
          </View>
          <View style={styles.hrline} />

          <View style={{marginHorizontal: 20}}>
            <TouchableOpacity
              style={styles.detailsView}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <View style={[styles.detailsSubView, {marginLeft: 4}]}>
                <UserProfile />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Regular',
                    color: colors.textColor,
                    marginLeft: 24,
                  }}>
                  Edit Profile
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textColor} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsView}
              onPress={() => {
                clearStorage();
              }}>
              <View style={[styles.detailsSubView, {marginLeft: 2}]}>
                <Logout />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Regular',
                    color: '#F75555',
                    marginLeft: 20,
                  }}>
                  Logout
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textColor} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.dustyGrey,
  },
  nameText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.textColor,
  },
  emailText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.textColor,
  },
  hrline: {
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
    margin: 20,
  },
  detailsView: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(Profile);
