import React from 'react';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Typography,
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Dots } from 'react-activity';
import { sendEmailWithPassword } from "../../Firebase/FirebaseRegistration";
import { toast } from 'react-toastify';
import { useStyles } from "../../Constants/StylesConstants";
import { useHistory } from "react-router-dom";


export default function SignInSide() {
    const classes = useStyles();
    const [email, setEmail] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const history = useHistory()


    const forgotPassword = async () => {
        if (email.length === 0) {
            toast.error("Invalid input.")
            return
        }

        setLoading(true)
        const response = await sendEmailWithPassword(email);

        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success("Reset instructions sent !")
            history.push(`${process.env.PUBLIC_URL}`)
        }

        setLoading(false)
    }

    return (

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Forgot Password
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <center>{isLoading && <Dots />} </center>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => forgotPassword()}
                >
                    Send Reset Instructions
                </Button>
                <Grid container >
                    <Grid item>
                        <Link href={`${process.env.PUBLIC_URL}/signin`} variant="body2">
                            {"SIGN IN"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}