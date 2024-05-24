import React, {useState, useEffect} from 'react';
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
  BackHandler,
  Alert,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderLeft from '../../components/HeaderLeft';
import {connect} from 'react-redux';
import {Searchbar} from 'react-native-paper';
import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {UserAction} from '../../reduxManager/index';
import Loader from '../../components/Loader/Loader';
import {APPLICATION_STRINGS, colors} from '../../utils';
import {Search} from '../../assets';

const Home = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      focusHandler, backHandler.remove();
    };
  }, []);

  const backAction = () => {
    Alert.alert(APPLICATION_STRINGS.holdon, APPLICATION_STRINGS.exitApp, [
      {
        text: APPLICATION_STRINGS.cancel,
        onPress: () => null,
        style: 'cancel',
      },
      {text: APPLICATION_STRINGS.yes, onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  const [showLoader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const DestinationList = [
    {
      id: '1',
      image: require('../../assets/ocean.jpg'),
      name: 'Goa',
      descrip: 'Beach',
    },
    {
      id: '2',
      image: require('../../assets/thailand.jpg'),
      name: 'Thailand',
      descrip: 'Buddist Temple',
    },
    {
      id: '3',
      image: require('../../assets/temple.jpg'),
      name: 'Bangkok',
      descrip: 'Historical',
    },
  ];

  const RecommendedDoctorList = [
    {
      id: '1',
      image: require('../../assets/ocean.jpg'),
      heading: 'Beach',
    },
    {
      id: '2',
      image: require('../../assets/thailand.jpg'),
      heading: 'Temple',
    },
    {
      id: '3',
      image: require('../../assets/temple.jpg'),
      heading: 'Historical',
    },
    {
      id: '3',
      image: require('../../assets/forest.jpeg'),
      heading: 'Forests',
    },
  ];

  const RecommendedDoctors = ({item}) => {
    return (
      <View style={styles.reccomendView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('');
          }}>
          <Image
            source={item.image}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={[styles.cardHeading]}>
          {item.heading}
        </Text>
      </View>
    );
  };

  const renderDestination = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cardMain}
        activeOpacity={0.8}
        onPress={() => {
          if (item.id === '1') {
            navigation.navigate('Destinationdetails')
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
              fontSize: 12,
            }}>
            {item.descrip.trim().replace(/\s+/g, ' ')}
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
        <Text style={styles.emptyTex}>No Destination Found</Text>
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

      <View style={styles.container}>
        <View style={styles.menuView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Text style={styles.grtTxt}>Hey, {'Benjamin'}!</Text>
              <Text style={styles.subhead}>
                Explore the best place in the world
              </Text>
            </View>
          </View>
        </View>

        <Searchbar
          placeholder="Search..."
          placeholderTextColor={'#979797'}
          iconColor="#979797"
          cursorColor={'#111111'}
          caretHidden={false}
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={styles.searchinput}
          style={{
            backgroundColor: colors.white,
            marginHorizontal: 24,
            marginVertical: 20,
            borderRadius: 10,
            borderColor: '#E2E4EA',
            borderWidth: 1,
          }}
          selectionColor={'#2CAAFF33'}
          icon={() => <Search />}
        />

        {/* Recommended List */}

        <View style={{marginLeft: 24, marginBottom: 20}}>
          <Text style={[styles.heading]}>Recommended Places</Text>
          <FlatList
            horizontal
            data={RecommendedDoctorList}
            keyExtractor={item => item.id}
            renderItem={RecommendedDoctors}
          />
        </View>

        {/* Popular Destinations */}
        <Text style={[styles.heading, {marginHorizontal: 24}]}>
          Popular Places
        </Text>
        <FlatList
          data={DestinationList}
          keyExtractor={item => item.id}
          renderItem={renderDestination}
          ListEmptyComponent={showEmptyBtn ? renderEmptyComponent : null}
        />
      </View>
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
  profileView: {
    height: 52,
    width: 52,
    backgroundColor: colors.white,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  menuView: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grtTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: colors.textColor,
  },
  heading: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textColor,
    marginBottom: 16,
  },
  subhead: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  searchinput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  reccomendView:{
    alignItems:"center",
    marginRight: 24,
  },
  cardMain: {
    // flexDirection: 'row',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginHorizontal: 24,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardHeading: {
    color: colors.textColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
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

export default connect(mapStateToProps)(Home);
