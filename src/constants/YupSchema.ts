import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().min(4,"Username must be at least 4 characters").required("Username is required"),
    password: yup.string().min(6,"Password must be at least 6 characters").required("Password is required"),
  });
  export const signUpSchema = yup.object().shape({
    firstname:yup.string(),
    email: yup.string().email().required("Email is a required field"),
    username: yup.string().min(4,"Username must be at least 4 characters").required("Username is required"),
    password: yup.string().min(6,"Password must be at least 6 characters").required("Password is required"),
    confirmpassword:yup.string().oneOf([yup.ref("password"),null], "Passwords must match").required("Confirm Password is required")
  });