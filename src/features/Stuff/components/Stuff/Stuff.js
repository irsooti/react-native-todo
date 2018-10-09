import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stuff = props => {
  return (
    <TouchableOpacity style={style.container} onPressOut={props.remove}>
      <Icon size={25} style={{ marginRight: 5 }} name="check" />

      <Text style={{ width: '100%' }}>{props.description}</Text>
      {/* <Button style={style.halfColumn} onPress={props.remove} title="Rimuovi" /> */}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    borderRadius: 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EEE',
    padding: 15
  }
});

export default Stuff;
