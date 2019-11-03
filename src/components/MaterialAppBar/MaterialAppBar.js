import React from 'react';
import {AppBar, Toolbar, Typography, Button, Link} from '@material-ui/core';
import './MaterialAppBar.css'
import {StylesProvider} from '@material-ui/styles';
import {Link as RouterLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom'


function MaterialAppBar(props) {

    return (
        <StylesProvider injectFirst>
            <AppBar position="static" elevation={0} className="MaterialAppBar">
                <Toolbar className="Toolbar">
                    <Typography component={RouterLink} to="/" variant="h4" noWrap className="Toolbar-title">
                        ESG Investor
                    </Typography>
                    <nav>
                        <Link component={RouterLink} variant="button" color="inherit" to="/" className="Link">
                            Pull Data
                        </Link>
                    </nav>
                    <Button color="inherit" variant="outlined" className="Button">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </StylesProvider>
    );
}

export default withRouter(MaterialAppBar);