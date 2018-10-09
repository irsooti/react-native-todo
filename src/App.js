import React, { Component } from 'react';
import { anonNavigator, authenticatedNavigator } from './common/navigation';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {
  loginSuccessful,
  verifyToken
} from './features/Account/actions/account';

const AnonNavigator = anonNavigator();
const AuthenticatedNavigator = authenticatedNavigator();

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.user.email !== null ? (
          <AuthenticatedNavigator />
        ) : (
          <AnonNavigator />
        )}
      </React.Fragment>
    );
  }

  async componentDidMount() {
    // await AsyncStorage.clear();
    try {
      let result = await AsyncStorage.getItem('@USER');
      if (result !== null) {
        let user = JSON.parse(result);
        this.props.reAuthenticate(user.refreshToken, user);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reAuthenticate: (refreshToken, user) =>
      dispatch(verifyToken(refreshToken, user))
  };
};

const mapStateToProps = state => ({
  user: state.account.user,
  userLoggedIn: state.account.userLoggedIn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
