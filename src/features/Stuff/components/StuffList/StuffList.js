import React from 'react';
import { Text, FlatList } from 'react-native';
import Stuff from '../Stuff/Stuff';

const StuffList = props => {
  let handleRemove = key => {
    return () => props.remove(key);
  };

  return (
    <FlatList
      data={props.list}
      renderItem={({ item, index }) => {
        console.log(item);
        return (
          <Stuff
            description={item.description}
            remove={handleRemove(item.key)}
          />
        );
      }}
    />
  );
  {
    /*     
</FlatList>
  return props.list.map((item, i) => (
    <Stuff key={i} description={item} remove={handleRemove(i)} />
  )); */
  }
};

export default StuffList;
