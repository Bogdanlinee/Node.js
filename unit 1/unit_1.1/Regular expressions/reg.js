const Validator = {
  validateEmail(value) {
    const reg = /^(?:(?!^[-\.+])[-\.+\a-z\d]){2,20}@(?:[\.\!\$\%\&\’\*\+\/\=\?\^\_\-\w\d]){1,15}(?:\.\w{1,5})$/gmi;

    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  validatePhone(value) {
    const reg = /^(([-\s]*\+38[-\s]*)|([-\s]*))((\()?([-\s]*\d[-\s]*){3}(\))?)(([-\s]*\d[-\s]*){7})(?<!.{25,})$/gmi;

    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  validatePassword(value) {
    const reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z\d_]+(?<=.{8,})$/gmi;

    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}