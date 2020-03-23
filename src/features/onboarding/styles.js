import fonts from "../../utils/fonts";
import colors from "../../utils/colors";
import layout from "../../utils/layout";
import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    saveArea: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      marginTop: 24,
      margin: layout.margin,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
    },
    title: {
      fontFamily: fonts.Medium,
      fontSize: 22,
      color: colors.darkBlue,
    },
    subtitle: {
      fontFamily: fonts.REGULAR,
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10,
      color: colors.darkGray,
    },
    countrySelectionTitle: {
      fontFamily: fonts.Medium,
      fontSize: 17,
    },
  });