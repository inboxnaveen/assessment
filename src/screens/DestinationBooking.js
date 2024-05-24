import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
  PermissionsAndroid,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  Keyboard,
  useWindowDimensions,
  Modal,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, useTheme} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../components/Loader/Loader';
import Api from '../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import colors from '../utils/colors';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import AppButton from '../components/AppButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Success} from '../assets';

const DestinationBooking = props => {
  const {navigation} = props;
  useEffect(() => {
    console.log('userInfo', props.userInfo);
  }, []);

  const [showLoader, setLoader] = useState(false);

  const [secondModalVisibility, setSecondModalVisibility] = useState(false);

  const [dateParam, setDateParam] = useState('Select Start Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [enddateParam, setEndDateParam] = useState('Select End Date');
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  // showing datepicker
  const showDatePicker = visible => {
    setDatePickerVisibility(visible);
  };

  //hiding date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handling Date
  const handleConfirm = date => {
    setDateParam(moment(date).format('DD-MM-YYYY'));
    setDatePickerVisibility(false);
  };

  // showing End datepicker
  const showEndDatePicker = visible => {
    setEndDatePickerVisibility(visible);
  };

  //hiding End date picker
  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  // Handling End Date
  const handleEndConfirm = date => {
    setEndDateParam(moment(date).format('DD-MM-YYYY'));
    setEndDatePickerVisibility(false);
  };

  const onSubmit = () => {
    setSecondModalVisibility(true);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {showLoader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.fieldscontainer}>
            <Text style={styles.label}>Select Start Date </Text>
            <TouchableOpacity
              onPress={() => {
                showDatePicker(!isDatePickerVisible);
              }}
              style={styles.dateView}>
              <Text style={styles.dateText}>{dateParam}</Text>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/Calendardate.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.fieldscontainer}>
            <Text style={styles.label}>Select End Date </Text>
            <TouchableOpacity
              onPress={() => {
                showEndDatePicker(!isEndDatePickerVisible);
              }}
              style={styles.dateView}>
              <Text style={styles.dateText}>{enddateParam}</Text>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/Calendardate.png')}
              />
            </TouchableOpacity>
          </View>

          <AppButton
            style={styles.loginBtn}
            onPress={() => {
              onSubmit();
              // navigation.navigate('OrderDetails');
            }}
            title="Confirm"
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={'date'}
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode={'date'}
            minimumDate={new Date()}
            onConfirm={handleEndConfirm}
            onCancel={hideEndDatePicker}
          />

          {/* Second modal */}
          <Modal
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            visible={secondModalVisibility}>
            <View style={styles.modalBg}>
              <View style={styles.modalViewBg}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                  }}>
                  <View style={{marginBottom: 14}}>
                    <Success />
                  </View>
                  <Text style={styles.successText}>
                    Thanks for the submitting the details
                  </Text>
                  <Text style={styles.successSubText}>
                    Our Backend team will reach out soon!
                  </Text>
                </View>
                <AppButton
                  style={{}}
                  onPress={() => {
                    navigation.navigate('Home');
                  }}
                  title="Home"
                />
              </View>
            </View>
          </Modal>
        </View>
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
    backgroundColor: colors.white,
  },
  heading: {
    color: colors.headTxt,
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  subHeading: {
    color: colors.headTxt,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    marginVertical: 10,
  },
  fieldscontainer: {
    marginHorizontal: 24,
  },
  label: {
    color: '#1E1E1E',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: colors.white,
    color: colors.black,
    //paddingHorizontal: 10,
    // height: 50,
    // borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 16,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  dateView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    height: 55,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  desc: {
    color: colors.descTxt,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  GroundContainer: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#F2F2F2',
  },
  loginBtn: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
  BtnText: {
    color: colors.headTxt,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  input: {
    color: colors.welcomeTxt,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
    marginHorizontal: 25,
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  modalBg: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewBg: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    width: '90%',
  },
  label: {
    color: '#888888',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 5,
  },
  modalheadView: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  modalHead: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: colors.black,
  },
  successText: {
    marginHorizontal: 40,
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },
  successSubText: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
    themeInfo: state.themeData,
  };
}
export default connect(mapStateToProps)(DestinationBooking);
