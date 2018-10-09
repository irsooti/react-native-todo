import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Login from '../Login/Login';
class AccountDashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15
  }
});

export default AccountDashboard;
