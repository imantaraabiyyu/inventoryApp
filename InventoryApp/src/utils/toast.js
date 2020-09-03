import { Toast } from 'native-base';

export function showError(error) {
  Toast.show({
    text: error.message,
    buttonText: 'OK',
    type: 'danger',
    duration: 3000
  });
}
