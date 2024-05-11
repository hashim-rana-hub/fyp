import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  privacyFlag: Yup.boolean()
    .isTrue('Please agree with our privacy policy')
    .required('Please agree with our privacy policy'),
});

export const CatNameSchema = Yup.object().shape({
  name: Yup.string()
    .max(20)
    .matches(/^[a-zA-Z ]+$/, 'Name should only contain alphabets')
    .required()
    .label('Name'),
});
