import * as yup from 'yup';

export const SignupValidation=yup.object({
    Name:yup.string().min(2).max(20).required("Please enter name"),
    UserName:yup.string().min(2).max(20).required("Please enter user name"),
    Email:yup.string().email().required("Please enter email"),
    Password:yup.string().min(2).max(20).required("Please enter name"),
})