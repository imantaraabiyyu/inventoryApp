import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    marginTop: 12
  },
  error: {
    color: '#f00',
    paddingHorizontal: 13
  },
  formLogin: {
    minWidth: 250,
    width: 250,
    alignSelf: 'center'
  },
  formLoginInput: {
    margin: 10,
    color: 'white',
    backgroundColor: 'white',
    textDecorationColor: 'white'
  },
  formLoginButton: {
    width: 100,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: '#263f44'
  },
  logoContainer: {
    flex: 1,
    padding: 50
  },
  shadow: {
    width: 250,
    borderRadius: 180,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#003355',
    shadowOpacity: 1,
    elevation: 25
  },
  frontLogo: {
    width: 250,
    height: 200
  },
  button: {
    flex: 1,
    marginTop: 20,
    marginLeft: 125,
    marginRight: 125,
    alignSelf: 'center'
  },
  fab: { backgroundColor: '#015668', width: 50, height: 50 },
  hiddenItem: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse'
  },
  deleteButton: {
    width: 50,
    height: 50,
    borderRadius: 130,
    marginRight: 12
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  swipeListView: { paddingBottom: 150 },
  flatList: { paddingBottom: 20 },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  inputDefault: {
    padding: 15
  }
});

export default styles;
