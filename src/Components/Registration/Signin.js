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
import { loginUser } from "../../Firebase/FirebaseRegistration";
import { toast } from 'react-toastify';
import { useStyles } from "../../Constants/StylesConstants";
import { useHistory } from "react-router-dom";

export default function SignInSide() {
    const classes = useStyles();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const history = useHistory()

    const signinPressed = async () => {
        if (email.length === 0 || password.length === 0) {
            toast.error("Invalid input.")
            return
        }

        setLoading(true)
        const response = await loginUser({
            email: email,
            password: password
        });

        if (response.error) {
            toast.error(response.error);
        } else {
            history.push(`${process.env.PUBLIC_URL}`)
            toast.success("Logged In !")
        }
        setLoading(false)
    }

    return (

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                    onClick={() => signinPressed()}
                >
                    Sign In
                        </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href={`${process.env.PUBLIC_URL}/forgot_password`} variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item xs style={{ textAlign: 'right' }}>
                        <Link href={`${process.env.PUBLIC_URL}/signup`} variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}