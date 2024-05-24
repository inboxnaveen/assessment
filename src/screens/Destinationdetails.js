import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import colors from '../utils/colors';
import AppButton from '../components/AppButton';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {ArrowLeftWhite} from '../assets';
import PagerView from 'react-native-pager-view';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Api from '../utils/Api';
import {UserAction} from '../reduxManager/index';
import Loader from '../components/Loader/Loader';

const DestinationDetails = props => {
  const {navigation, route} = props;

  useEffect(() => {}, []);

  const goBackOnPress = () => {
    navigation.goBack();
  };

  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageScroll = event => {
    const {offset, position} = event.nativeEvent;
    setCurrentPage(position + offset);
  };

  const PropertyDetailsImage = [
    {
      id: '1',
      image: require('../assets/ocean.jpg'),
    },
    {
      id: '2',
      image: require('../assets/ocean.jpg'),
    },
    {
      id: '3',
      image: require('../assets/ocean.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.carousalView}>
            <PagerView
              ref={pagerRef}
              style={{flex: 1}}
              onPageScroll={handlePageScroll}
              initialPage={0} // Set initial page
              pageMargin={0}>
              {PropertyDetailsImage.map(item => (
                <View key={item.index}>
                  <Image
                    source={item.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cotain',
                    }}
                  />
                </View>
              ))}
            </PagerView>
            <View style={styles.indicatorContainer}>
              {PropertyDetailsImage.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    currentPage === index ? styles.activeIndicator : null,
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.detailsView}>
            <Text style={styles.heading}>Goa</Text>
            <Text style={styles.descrip}>
              Goa is a small state located on the western coast of India, known
              for its scenic beauty, vibrant culture, and rich history. It is
              renowned for its stunning beaches, such as Baga, Anjuna, and
              Palolem, which attract tourists from around the world. Goa was a
              Portuguese colony until 1961, and this colonial history is evident
              in its architecture, cuisine, and festivals. The state also boasts
              diverse wildlife, lush forests, and a laid-back lifestyle. Key
              attractions include the Basilica of Bom Jesus, Dudhsagar Falls,
              and the vibrant nightlife in towns like Panaji and Margao.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DestinationBooking');
          }}
          style={[styles.applyBtn]}
          activeOpacity={0.8}>
          <Text style={styles.applyText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  carousalView: {
    flex: 1,
    height: 280,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.Grey,
    margin: 3,
  },
  activeIndicator: {
    backgroundColor: colors.secondaryColor,
    width: 20,
  },

  detailsView: {
    marginHorizontal: 24,
  },
  heading: {
    color: colors.textColor,
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  subheading: {
    color: colors.textColor,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  hr: {
    borderColor: colors.dustyGrey,
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  descrip: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.Grey,
    textAlign: 'justify',
  },
  buttonView: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  applyBtn: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 18,
    alignItems: 'center',
    // width: 155,
    marginHorizontal: 24,
    backgroundColor: colors.secondaryColor,
  },
  closeText: {
    color: colors.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.2,
  },
  applyText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.2,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(DestinationDetails);
