import React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUserLoginMutation } from '@todo/queries/useUserLoginMutation';

import type { SignInBoxProps } from './SignInBox.props';
import { SignInBoxWrapper } from './SignInBox.styles';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export const SignInBox: React.FC<SignInBoxProps> = props => {
  const userLoginMutation = useUserLoginMutation();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: values => {
      userLoginMutation.mutate({ 
        email: values.email.toLowerCase(), 
        password: values.password
      });
    },
  });

  return (
    <SignInBoxWrapper>
      <Typography variant="h4" textAlign="center">
        Log in
      </Typography>

      <Box component="form" className="sign-in-form" onSubmit={handleSubmit}>
        <Box className="text-field-wrapper">
          <Typography>Email</Typography>

          <TextField
            id="email"
            placeholder="Email Address"
            name="email"
            type="email"
            required
            fullWidth
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
        </Box>

        <Box className="text-field-wrapper">
          <Typography>Password</Typography>

          <TextField
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            required
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
        </Box>

        <Button type="submit" disabled={userLoginMutation.isPending} fullWidth variant="contained">
          Sign In
        </Button>
      </Box>
    </SignInBoxWrapper>
  );
};

SignInBox.displayName = 'SignInBox';
