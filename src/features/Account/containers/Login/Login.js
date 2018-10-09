import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { attemptToLogin } from '../../actions/account';
import { AsyncStorage, Image } from 'react-native';
import Profile from '../Profile/Profile';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%',
    alignContent: 'center'
  },
  textInput: {
    width: '100%'
  }
});

class Login extends Component {
  state = {
    user: '',
    pass: ''
  };

  onInputChangePassword = text => {
    this.setState({ pass: text });
  };

  onInputChangeUser = text => {
    this.setState({ user: text });
  };

  onLogin = () => {
    const { user, pass } = this.state;
    this.props.onLogin(user, pass);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.user.email !== null ? (
          <Profile />
        ) : (
          <View style={styles.inputContainer}>
            {this.props.loginAttempting ? (
              <ActivityIndicator size="large" />
            ) : (
              <React.Fragment>
                <View
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: 15
                  }}
                >
                  <Image
                    resizeMethod="auto"
                    style={{ width: 307, height: 60 }}
                    source={{
                      uri:
                        'https://i0.wp.com/www.blog-aesystech.it/wp-content/uploads/2018/05/cropped-aesys_logo.png?w=1270'
                    }}
                  />
                </View>
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {this.props.loginErrorMsg}
                </Text>
                <TextInput
                  onChangeText={this.onInputChangeUser}
                  style={styles.textInput}
                  placeholder="Email"
                  textContentType="emailAddress"
                  underlineColorAndroid="#CCC"
                />

                <TextInput
                  onChangeText={this.onInputChangePassword}
                  style={styles.textInput}
                  placeholder="Password"
                  textContentType="password"
                  secureTextEntry={true}
                  underlineColorAndroid="#CCC"
                />
                <View style={{ marginTop: 15 }}>
                  <Button onPress={this.onLogin} title="Accedi" />
                </View>
              </React.Fragment>
            )}
          </View>
        )}
      </View>
    );
  }
}

const persistOnStorage = async user => {
  try {
    await AsyncStorage.setItem('@USER', JSON.stringify(user));
  } catch (err) {
    console.warn(err);
  }
};

const mapStateToProps = state => {
  return {
    loginAttempting: state.account.loginAttempting,
    user: state.account.user,
    loginSuccess: state.account.loginSuccess,
    loginErrorMsg: state.account.errors.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user, pass) =>
      dispatch(attemptToLogin(user, pass, persistOnStorage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
