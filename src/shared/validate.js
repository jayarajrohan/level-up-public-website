import { extend } from "vee-validate";
import {
  required,
  regex,
  alpha_spaces,
  numeric,
  email,
  min,
  alpha,
} from "vee-validate/dist/rules";

let type;

//field should at least particular amount of characters
extend("min", {
  ...min,
  message(fieldName, placeHolder) {
    return `${fieldName} should be at least ${placeHolder.length} characters`;
  },
});

//field can't be empty
extend("required", {
  ...required,
  message: "This field is required",
});

//inserted value should match the regex
extend("regex", {
  ...regex,
  message() {
    return "";
  },
});

// field should contain char
extend("alpha", {
  ...alpha,
  message: "This field should only contain alphabetic characters",
});

//inserted value should not exceed the length
extend("length", {
  validate(value, { length }) {
    type = typeof value;
    return value.length === length;
  },
  params: ["length"],
  message(fieldName, placeHolder) {
    return type === `object`
      ? `You should only select ${placeHolder.length} ${fieldName}`
      : `Entered ${fieldName} is Invaild`;
  },
});

//inserted value can contain alphabetic characters and spaces
extend("alphaSpaces", {
  ...alpha_spaces,
});

//inserted value should not start with a particular character
extend("notStartsWith", {
  validate(value, { char }) {
    return !value.startsWith(char);
  },
  params: ["char"],
  message: (fieldName, placeHolder) => {
    return `${fieldName} should not start with a "${
      placeHolder.char === " " ? `space` : placeHolder.char
    }"`;
  },
});

//inserted value should not end with a particular character
extend("notEndsWith", {
  validate(value, { char }) {
    return !value.endsWith(char);
  },
  params: ["char"],
  message: (fieldName, placeHolder) => {
    return `${fieldName} should not end with a "${
      placeHolder.char === " " ? `space` : placeHolder.char
    }"`;
  },
});

//inserted value should not contain consecutive particular characters
extend("notConsecutive", {
  validate(value, { char }) {
    return !value.includes(char);
  },
  params: ["char"],
  message: (fieldName, placeHolder) => {
    return `${fieldName} should not contain consecutive "${
      placeHolder.char === "  " ? `spaces` : placeHolder.char
    }"`;
  },
});

//inserted value shoud contain numbers

extend("numeric", {
  ...numeric,
  message: "This field only contains numerics",
});

//email
extend("email", (value) => {
  if (email.validate(value)) {
    return true;
  }

  return "Please enter valid Email ID";
});

extend("onlyAlphaNumericsAndUnderscores", {
  validate(value) {
    const regex = /^[a-zA-Z0-9_]*$/;
    return regex.test(value);
  },
  message: (fieldName) => {
    return `${fieldName} should only contain alphabets, numerals and underscores`;
  },
});

extend("password", {
  validate(value) {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])[A-Za-z\d!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/]{6,}$/;
    return regex.test(value);
  },
  message: (fieldName) => {
    return `${fieldName} should have at least one upper case letter, one lower case letter, one numeral, one special character and should be at least 6 characters long`;
  },
});
