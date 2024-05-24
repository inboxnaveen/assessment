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
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import Loader from '../../components/Loader/Loader';

const Bookings = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
    return focusHandler;
  }, []);

  const [showLoader, setLoader] = useState(false);

  const DestinationList = [
    {
      id: '1',
      image: require('../../assets/ocean.jpg'),
      name: 'Goa',
      descrip: 'Beach',
      status: 'On Process',
    },
    {
      id: '2',
      image: require('../../assets/thailand.jpg'),
      name: 'Thailand',
      descrip: 'Buddist Temple',
      status: 'Upcoming',
    },
    {
      id: '3',
      image: require('../../assets/temple.jpg'),
      name: 'Bangkok',
      descrip: 'Historical',
      status: 'Completed',
    },
  ];

  const renderDestination = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cardMain}
        activeOpacity={0.8}
        onPress={() => {
          if (item.id === '1') {
            navigation.navigate('Destinationdetails');
          }
        }}>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardHeading}>{item.name}</Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: colors.Grey,
              fontSize: 14,
            }}>
            {item.descrip.trim().replace(/\s+/g, ' ')}
          </Text>
          <Text
            style={[
              styles.statusTxt,
              {
                color:
                  item.status == 'On Process'
                    ? colors.colorMain
                    : item.status == 'Upcoming'
                    ? colors.warningColor
                    : item.status == 'Completed'
                    ? colors.successColor
                    : null,
                backgroundColor:
                  item.status == 'On Process'
                    ? '#2378EF1A'
                    : item.status == 'Upcoming'
                    ? '#FECC321A'
                    : item.status == 'Completed'
                    ? '#1CBE8E1A'
                    : null,
              },
            ]}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [showEmptyBtn, setShowEmptyBtn] = useState(false);

  //Empty destination View
  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyTex}>You have no bookings yet</Text>
      </View>
    );
  };

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
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.headerTxt}>My Trip Details</Text>
          </View>
          <FlatList
            data={DestinationList}
            keyExtractor={item => item.id}
            renderItem={renderDestination}
            ListEmptyComponent={showEmptyBtn ? renderEmptyComponent : null}
          />
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
    backgroundColor: colors.dustyGrey,
  },
  headerView:{
    alignItems:"center",
    marginBottom:20,
  },
  headerTxt:{
    fontFamily:"Poppins-SemiBold",
    fontSize:20,
    color:colors.black
  },
  statusTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-end',
  },
  cardMain: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginHorizontal: 24,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardHeading: {
    color: colors.textColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  emptyView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTex: {
    color: colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginVertical: 24,
    marginLeft: 10,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(Bookings);
