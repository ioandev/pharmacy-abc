import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Home from "./containers/Home";
import Setting from "./containers/Setting";
import Consultations from "./containers/Consultations";
import ConsultationEdit from "./containers/ConsultationEdit";
import ConsultationNew from "./containers/ConsultationNew";
import Patients from "./containers/Patients";
import PatientEdit from "./containers/PatientEdit";
import PatientNew from "./containers/PatientNew";
import Stats from "./containers/Stats";

import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

const NotFound = () => {
  return <div>NotFound</div>;
};

const DashboardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

class App extends Component {
  render() {
    const { settings } = this.props;

    return (
      <MuiThemeProvider theme={settings.theme}>
        <CssBaseline />
        <div style={{ height: "100vh" }}>
          <Router>
            <Switch>
              <DashboardRoute path="/dashboard" component={Home} />
              <DashboardRoute path="/settings" component={Setting} />
              <DashboardRoute path="/consultations/new" component={ConsultationNew} />
              <DashboardRoute path="/consultations/:id" component={ConsultationEdit} />
              <DashboardRoute path="/consultations" component={Consultations} />
              <DashboardRoute path="/patients/new" component={PatientNew} />
              <DashboardRoute path="/patients/:id" component={PatientEdit} />
              <DashboardRoute path="/patients" component={Patients} />
              <DashboardRoute path="/stats" component={Stats} />
              <DashboardRoute exact path="/" component={Home} />
              <EmptyRoute component={NotFound} />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
