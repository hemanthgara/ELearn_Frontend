import * as Yup from "yup";

export const userSignupValidation = Yup.object({
  first_name: Yup.string()
    .min(3, "Must be 3 characters")
    .max(15, "Must be 15 characters or less")
    .required("Required"),

  last_name: Yup.string()
    .min(3, "Must be 3 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),

  loginId: Yup.string().min(5, "Must be 5 characters").required("Required"),

  email: Yup.string().email("Invalid email address").required("Required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "password must contain 8 or more characters"),

  cpassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const facilitatorSignupValidation = Yup.object({
  first_name: Yup.string()
    .min(3, "Must be 3 characters")
    .max(15, "Must be 15 characters or less")
    .required("Required"),

  last_name: Yup.string()
    .min(3, "Must be 3 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),

  loginId: Yup.string().min(5, "Must be 5 characters").required("Required"),

  email: Yup.string().email("Invalid email address").required("Required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "password must contain 8 or more characters"),

  cpassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  contact: Yup.string()
    .min(10, "Must be 10 characters")
    .max(10, "Must be 10 characters")
    .required("Required"),

  gender: Yup.string().required("Required"),
});

export const signinValidation = Yup.object({
  loginId: Yup.string().min(5, "Must be 5 characters").required("Required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "password must contain 8 or more characters"),
});