import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export const signupSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  role: Yup.string()
    .oneOf(['admin', 'manager', 'employee'], 'Select a valid role')
    .required('Role is required'),
})

export const userSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  dob: Yup.string().required('DOB is required'),
  salary: Yup.number()
    .typeError('Salary must be a number')
    .required('Salary is required')
    .min(0, 'Salary cannot be negative'),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Number must be 10 digits')
    .required('Number is required'),
  role: Yup.string()
    .oneOf(['admin', 'manager', 'employee'], 'Select a valid role')
    .required('Role is required'),
})
