import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import './Navbar.css'

const Navbar = ( {title} ) => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () =>{
        setOpen(true);
    }

    return (
        <div className='drawer'>
            <AppBar position='sticky' className='drawer__appBar'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className='drawer__appBar-menuButton'
                    >
                        <MenuIcon />        
                    </IconButton>
                    <h1>
                        {title}
                    </h1>
                    <AccountCircle />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar