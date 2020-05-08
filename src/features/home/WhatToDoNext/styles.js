import {StyleSheet} from 'react-native';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import layout from '../../../utils/layout';

export default StyleSheet.create({
  subtitle: {
    fontFamily: fonts.REGULAR,
    textAlign: 'left',
    fontSize: 15,
    marginStart: 10,
    flex: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    paddingTop: 10,
  },
  itemContainer: {
    width: '100%',
    paddingLeft: layout.margin,
    paddingRight: layout.margin,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: fonts.Medium,
    fontSize: 17,
    color: colors.brownishGrey,
    padding: layout.margin,
  },
});
