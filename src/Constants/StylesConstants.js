import { makeStyles, createMuiTheme } from "@material-ui/core";
export const BACKGROUND_COLOR = 'rgb(47,49,47)'
export const THEME_COLOR = 'rgb(71,72,110)'
export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const theme = createMuiTheme({
    overrides: {
        // MuiTable: {
        //     input: {
        //         color: 'rgb(255,255,255)'
        //     },
        //     MuiInputLabel: {
        //         root: {
        //             color: 'rgb(255,255,255)'
        //         }
        //     },
        //     MuiInputBase: {
        //         root: {
        //             color: 'rgb(0,0,0)'
        //         }
        //     },
        //     MuiInputAdornment: {
        //         root: {
        //             color: 'rgb(0,0,0)'
        //         }
        //     }
        // },

        // MuiInputBase: {
        //     input: {
        //         color: 'rgb(255,255,255)'
        //     }
        // },
        // MuiInputLabel: {
        //     root: {
        //         color: 'rgb(255,255,255)'
        //     }
        // },
        MuiLink: {
            root: {
                color: 'rgb(255,255,255)'
            }
        },
        // MuiTypography: {
        //     root: {
        //         color: 'rgb(255,255,255)'
        //     }
        // }
    },
    palette: {
        primary: {
            main: 'rgb(71,72,110)',
        },
        secondary: {
            main: 'rgb(47,49,47)',
        },
    },
});