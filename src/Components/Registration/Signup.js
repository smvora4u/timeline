import React from 'react';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    makeStyles
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Dots } from 'react-activity';
import { signInUser } from "../../Firebase/FirebaseRegistration";
import { toast } from 'react-toastify';
import { useStyles } from "../../Constants/StylesConstants";
import { useHistory } from "react-router-dom";


export default function SignInSide() {
    const classes = useStyles();
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const history = useHistory()


    const signupPressed = async () => {
        
        if (email.length === 0 || password.length === 0 || name.length === 0) {
            toast.error("Invalid input.")
            return
        }

        setLoading(true)
        const response = await signInUser({
            name: name,
            email: email,
            password: password
        });

        if (response.error) {
            toast.error(response.error);
        } else {
            history.push(`${process.env.PUBLIC_URL}`)
            toast.success("Signed up !")
        }
        setLoading(false)
    }

    return (

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
                    </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="email"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <center>{isLoading && <Dots />} </center>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => signupPressed()}
                >
                    Sign Up
                        </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href={`${process.env.PUBLIC_URL}/forgot_password`} variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item xs style={{ textAlign: 'right' }}>
                        <Link href={`${process.env.PUBLIC_URL}/signin`} variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}