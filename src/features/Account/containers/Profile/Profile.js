import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, AsyncStorage, StyleSheet } from 'react-native';
import { logout } from '../../actions/account';

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginRight: 10 }}>
          <Text> Ciao, {this.props.user.email} </Text>
        </View>
        <View>
          <Button onPress={this.props.onLogout} title="Logout" />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      AsyncStorage.removeItem('@USER')
        .then(() => {
          dispatch(logout());
        })
        .catch(err => console.warn(err));
    }
  };
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
