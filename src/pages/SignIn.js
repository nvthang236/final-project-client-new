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
import bgImg from '../images/sign-in.jpeg';
import { UniversityContext } from '../context';
import { isEmpty } from 'lodash';
import { isEmail } from 'validator';
import axios from 'axios';

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
    marginTop: theme.spacing(6),
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
    marginTop: theme.spacing(4)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  background: {
    backgroundColor: 'white',
    padding: '10px 25px 44px 25px'
  },
  progress: {
    position: 'absolute'
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    loading: false,
    errors: {}
  });
  const context = React.useContext(UniversityContext);
  const { loginUser } = context;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password, errors } = values;

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
      .post('/auth/login', values)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('access_token', token);
        axios.defaults.headers.common['X-Access-Token'] = token;
        axios
          .get('/auth/user')
          .then(res => {
            console.log('------------------------------------');
            console.log('res.data', res.data);
            console.log('------------------------------------');
            loginUser(res.data);
            props.history.push('/');
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log('------------------------------------');
        console.log('err', err);
        console.log('------------------------------------');
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
            value={values.email}
            error={values.errors.email ? true : false}
            helperText={values.errors.email}
          />
          <TextField
            variant='outlined'
            margin='normal'
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={values.loading}
          >
            Sign In
            {values.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Link href='/sign-up' variant='body2'>
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
