import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {ArrowLeft} from '../assets';

const HeaderLeft = ({navigation}) => {
  const goBackOnPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={goBackOnPress}
      activeOpacity={0.5}>
      <ArrowLeft />
      {/* <Icon name="arrow-left" size={15} color={colors.textColor} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginRight: 10,
  },
});

export default HeaderLeft;
