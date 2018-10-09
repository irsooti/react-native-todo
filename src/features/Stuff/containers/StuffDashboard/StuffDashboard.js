import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showStuff, addStuff, deleteStuff } from '../../actions/stuff';
import StuffList from '../../components/StuffList/StuffList';
class StuffDashboard extends Component {
  state = {
    description: ''
  };

  onChangeTextDescription = text => {
    this.setState({ description: text });
  };

  onGoToAccount = () => {
    this.props.navigation.navigate('Account');
  };

  onDrawerOpen = () => {
    this.props.navigation.openDrawer();
  };

  onRemoveDescription = key => {
    this.props.onRemoveStuff(key);
  };
  onAddDescription = () => {
    this.props.onAddStuff(this.state.description);
  };

  componentDidMount() {
    this.props.onLoadStuff();
  }

  render() {
    return (
      <View>
        <View style={styles.addBarContainer}>
          <View style={{ width: '70%' }}>
            <TextInput
              style={{ marginRight: 10 }}
              placeholder="Scrivi memo..."
              selectionColor="red"
              underlineColorAndroid="#CCC"
              onChangeText={this.onChangeTextDescription}
            />
          </View>
          <Button
            style={{ flexShrink: 1, width: '30%' }}
            title="Aggiungi"
            onPress={this.onAddDescription}
          />
        </View>
        <View style={styles.container}>
          <StuffList
            remove={this.onRemoveDescription}
            list={this.props.stuffList}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  addBarContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    width: '100%',
    backgroundColor: '#F7F7F7'
  }
});

const mapStateToProps = state => {
  return {
    stuffList: state.stuff.stuff
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadStuff: () => dispatch(showStuff()),
    onAddStuff: description => dispatch(addStuff(description)),
    onRemoveStuff: key => dispatch(deleteStuff(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StuffDashboard);
