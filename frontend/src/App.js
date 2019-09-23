import React, { lazy, Suspense } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SnackbarProvider } from 'notistack';
import { Drawer } from 'components/Drawer';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { About } from 'components/About';
import { PrivateRoute } from 'modules/PrivateRoute';
import { LoginSuccess, LoginFailure } from 'modules/Login';
import { LoginPage } from 'pages/LoginPage.js';

import logo from './ui/logo/theodercafe.png';
import { Questioning } from './components/Questioning';

import style from './App.style';

const Admin = lazy(() => import('./admin/Admin'));

const App = ({ classes }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = open => () => {
    setIsDrawerOpen(open);
  };
  return (
    <Router>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <div className={classes.app}>
          <AppBar classes={{ root: classes.appBar }} position="fixed">
            <ToolBar className={classes.toolBar}>
              <Link to="/">
                <img src={logo} alt="logo" height="20" />
              </Link>
              <IconButton edge="start" className={classes.menuButton} aria-label="Menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </ToolBar>
          </AppBar>
          <ToolBar className={classes.shim} />
          <Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route exact path="/a-propos" component={About} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/login/success" component={LoginSuccess} />
              <Route path="/login/failure" component={LoginFailure} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <Route path="/" component={Questioning} />
            </Switch>
          </Suspense>
          <Drawer open={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </div>
      </SnackbarProvider>
    </Router>
  );
};

export default withStyles(style)(App);
