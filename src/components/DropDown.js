import React, {useState, Fragment} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import colors from '../utils/colors';
import images from '../utils/images';
import fonts from '../utils/fonts';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Button from './Button';
import {useTranslation} from 'react-i18next';
import {countries} from '../utils/mockData';
const DropDown = props => {
  const [text, setText] = useState(props.placeholder);
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation();
  const onPress = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const renderItem = itemInfo => {
    const item = itemInfo.item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const pressedButton = () => {
    setShowModal(false);
  };
  const ListSeparator = () => <View style={styles.listSeparator} />;
  const ModalFragment = () => {
    return (
      <Modal
        isVisible={showModal}
        avoidKeyboard={true}
        swipeDirection="down"
        onSwipeComplete={closeModal}>
        <SafeAreaView>
          <View style={styles.content}>
            <FlatList
              data={countries}
              renderItem={renderItem}
              ItemSeparatorComponent={ListSeparator}
            />
            <Button text={t('button.confirm')} onPress={pressedButton} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  };
  return (
    <Fragment>
      <ModalFragment />
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
        <Image source={images.arrowDown} />
      </TouchableOpacity>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 16,
    paddingStart: 16,
  },
  content: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
    borderColor: colors.opacityBlack,
  },
  text: {
    textAlign: 'left',
    flex: 1,
    fontFamily: fonts.REGULAR,
    fontSize: 17,
    color: colors.darkGray,
  },
  listSeparator: {
    height: 1,
    backgroundColor: colors.separatorColor,
  },
  itemContainer: {
    height: 44,
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: fonts.REGULAR,
    fontSize: 15,
  },
});
export default DropDown;
