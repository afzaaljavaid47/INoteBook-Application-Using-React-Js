import * as yup from 'yup';

export const LoginValidation=yup.object({
    UserName:yup.string().min(2).max(20).required("Please enter user name"),
    Password:yup.string().min(2).max(20).required("Please enter name"),
})