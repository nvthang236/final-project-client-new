import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import bgImg from '../images/sign-up.jpeg';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { isEmail } from 'validator';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        Universities
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundImage: `url(${bgImg})`,
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  background: {
    backgroundColor: 'white',
    padding: '5px 25px 13px 25px'
  },
  progress: {
    position: 'absolute'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
    textAlign: 'center'
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    errors: {}
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      errors
    } = values;

    if (isEmpty(firstName)) {
      errors.firstName = 'Must not be empty';
    } else {
      delete errors.firstName;
    }

    if (isEmpty(lastName)) {
      errors.lastName = 'Must not be empty';
    } else {
      delete errors.lastName;
    }

    if (isEmpty(email)) {
      errors.email = 'Must not be empty';
    } else if (!isEmail(email)) {
      errors.email = 'Must be a valid email address';
    } else {
      delete errors.email;
    }

    if (isEmpty(password)) {
      errors.password = 'Must not be empty';
    } else {
      delete errors.password;
    }

    if (isEmpty(confirmPassword)) {
      errors.confirmPassword = 'Must not be empty';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Password does not match';
    } else {
      delete errors.confirmPassword;
    }

    setValues({
      ...values,
      errors
    });
    if (!isEmpty(errors)) {
      return;
    }

    setValues({
      ...values,
      loading: true
    });

    axios
      .post('/users/signup', values)
      .then(res => {
        localStorage.setItem('access_token', res.data.token);
        setValues({
          ...values,
          loading: false
        });
        props.history.push('/sign-in');
      })
      .catch(err => {
        setValues({
          ...values,
          errors: err.response.data,
          loading: false
        });
      });
  };

  return (
    <Container className={classes.background} component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={handleChange}
                value={values.firstName}
                error={values.errors.firstName ? true : false}
                helperText={values.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onChange={handleChange}
                value={values.lastName}
                error={values.errors.lastName ? true : false}
                helperText={values.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
                value={values.email}
                error={values.errors.email ? true : false}
                helperText={values.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleChange}
                value={values.password}
                error={values.errors.password ? true : false}
                helperText={values.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                onChange={handleChange}
                value={values.confirmPassword}
                error={values.errors.confirmPassword ? true : false}
                helperText={values.errors.confirmPassword}
              />
            </Grid>
            {values.errors.message && (
              <Grid item xs={12}>
                <Typography variant='body2' className={classes.customError}>
                  {values.errors.message}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={values.loading}
          >
            Sign Up
            {values.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/sign-in' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={3.5}>
        <Copyright />
      </Box>
    </Container>
  );
}
