import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  image: {
    flex: 1,
    height: 160,
    justifyContent: 'center'
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    paddingBottom: 10
  },
  titleName: { marginBottom: 15, fontSize: 20 },
  description: { fontFamily: 'sans-serif', fontSize: 12 },
  itemName: { fontFamily: 'sans-serif', fontSize: 15, marginBottom: 5 }
});

export default styles;
