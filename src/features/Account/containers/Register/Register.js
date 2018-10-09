import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../actions/account';

class Register extends Component {
  state = {
    email: '',
    password: '',
    passwordRepeat: '',
    isEmailValid: false,
    isPasswordMatching: false
  };

  onTextEnter = prop => text => {
    let newState = { ...this.state };

    newState[prop] = text;
    this.setState({
      email: newState.email,
      password: newState.password,
      passwordRepeat: newState.passwordRepeat
    });
  };

  validatePassword = () => {
    const { password, passwordRepeat } = this.state;

    this.setState({
      isPasswordMatching: password === passwordRepeat && password.length > 6
    });
  };

  validateEmail = () => {
    const { email } = this.state;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ isEmailValid: re.test(String(email).toLowerCase()) });
  };

  onSignupSubmit = () => {
    if (this.state.isEmailValid && this.state.isPasswordMatching) {
      console.log('EHI, SONO TRUE');
      this.props.onSignUp(this.state.email, this.state.password);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.signUpAttempting ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.inputContainer}>
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

            <Text>{this.props.signUpError}</Text>

            <TextInput
              value={this.state.email}
              onChangeText={this.onTextEnter('email')}
              onSelectionChange={this.validateEmail}
              underlineColorAndroid={this.state.isEmailValid ? 'green' : 'red'}
              placeholder="Email"
            />
            <TextInput
              value={this.state.password}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={this.onTextEnter('password')}
              underlineColorAndroid={
                this.state.isPasswordMatching ? 'green' : 'red'
              }
              placeholder="Password"
              onSelectionChange={this.validatePassword}
            />
            <TextInput
              value={this.state.passwordRepeat}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={this.onTextEnter('passwordRepeat')}
              underlineColorAndroid={
                this.state.isPasswordMatching ? 'green' : 'red'
              }
              placeholder="Conferma password"
              onSelectionChange={this.validatePassword}
            />
            <View style={{ marginTop: 15 }}>
              <Button title="Registrati" onPress={this.onSignupSubmit} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

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
    alignContent: 'center',
    padding: 15
  },
  textInput: {
    width: '100%'
  }
});

const persistOnStorage = async user => {
  try {
    await AsyncStorage.setItem('@USER', JSON.stringify(user));
  } catch (err) {
    console.warn(err);
  }
};

const mapStateToProps = state => {
  return {
    signUpAttempting: state.account.signUpAttempting,
    signUpError: state.account.signUpError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password) =>
      dispatch(signUp(email, password, persistOnStorage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
