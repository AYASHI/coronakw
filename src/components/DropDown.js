import React, {useState, Fragment} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import colors from '../utils/colors';
import images from '../utils/images';
import fonts from '../utils/fonts';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Button from './Button';
import {useTranslation} from 'react-i18next';
import Spacer from './Spacer';
const DropDown = props => {
  const [text, setText] = useState(props.placeholder);
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const {t} = useTranslation();
  const onPress = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const renderItem = itemInfo => {
    const item = itemInfo.item;
    const checked = false;
    // selectedItems.hasOwnProperty(item.id) && selectedItems[item.id] === true;
    const handleTouch = () => {
      // setSelectedItems(prev => {
      //   const temp = {id: item.id, checked: !checked};
      //   return {...prev, temp};
      // });
      props.changedAnswer({id: item.id, checked: !checked, text: item.text});
      setShowModal(false);
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={handleTouch}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Image
          source={checked ? images.check : images.uncheck}
          style={styles.checkImage}
        />
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
        onSwipeComplete={closeModal}
        onBackButtonPress={closeModal}>
        <SafeAreaView>
          <View style={styles.content}>
            <FlatList
              data={props.data}
              renderItem={renderItem}
              ItemSeparatorComponent={ListSeparator}
              keyExtractor={item => item.id + ''}
            />
            <Spacer />
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
        <Text style={styles.text}>{props.placeholder}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemText: {
    fontFamily: fonts.REGULAR,
    fontSize: 15,
  },
  checkImage: {
    width: 15,
    height: 15,
  },
});
export default DropDown;
