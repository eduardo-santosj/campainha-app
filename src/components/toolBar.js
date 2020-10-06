import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class MenuAppBar extends Component{
    state = {
        anchorEl: ''
    }
    render() {
        const open = this.state.anchorEl;

        const handleMenu = (event) => {
            this.setState({
                ...this.state, anchorEl: event.currentTarget
            })
        };

        const handleClose = () => {
            this.setState({
                ...this.state, anchorEl: null
            })
        };

        return (
            <div className="menu">
            <AppBar position="static">
                <Toolbar>
                <IconButton 
                    edge="start"
                    aria-controls="menu-appbar"
                    onClick={handleMenu}
                    className="menu-button"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="title">
                    Photos
                </Typography>
                    <div>
                    <IconButton
                        aria-label="account of current user"
                        
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      state
    };
}
  
const connectedMenuAppBar = connect(mapStateToProps)(MenuAppBar);
export { connectedMenuAppBar as MenuAppBar };