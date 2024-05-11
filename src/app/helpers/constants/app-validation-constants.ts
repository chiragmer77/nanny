export class CommonRegexp {
  public static NUMERIC_REGEXP = '^[0-9]*$';
  public static PHONE_NUMBER_REGEXP = '^[0-9+ ]*$';
  public static ALPHA_NUMERIC_REGEXP = '^[A-Za-z0-9 ]*$';
  public static ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP = "^[A-Za-z0-9-.,&' _]*$";
  public static ALPHABETS_REGEXP = '^[A-Za-z ]*$';
  public static USER_NAME_REGEXP =
    '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z\\d#?.!@$%^&*-]+$';
  public static EMAIL_ADDRESS_REGEXP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static PASSWORD_REGEXP =
    /^(?=.*[a-zA-Z])(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d#?!@$%^&*-]{8,}$/;
  public static WEIGHT_REGEXP = /^([0-9]|1[0])?(\.\d{0,1})?$/;
}

export class ValidationConstant {
  public REQUIRED = ` is required`;
}

export const passwordRegex = {
  lowerCaseLetters: /[a-z]/g,
  upperCaseLetters: /[A-Z]/g,
  specialCharacter: /[!@#$%^&*\[\]+//(//)//_;./?:/\,\+=-]/g,
  numbers: /[0-9]/g,
};
