import * as yup from "yup"

export const loginFormValidationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(32).required()
})

export const signUpFormValidationSchema = yup.object({
    name: yup.string().min(2).max(32).required(),
    lastname: yup.string().min(2).max(31).required(),
    email: yup.string().email().required(),
    username: yup.string().min(4).max(31).required(),
    password: yup.string().min(4).max(31).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null])
})