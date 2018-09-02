import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch-native';
import CustomRangeSlider from './components/CustomRangeSlider';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ReactiveBase
          app="housing"
          credentials="0aL1X5Vts:1ee67be1-9195-4f4b-bd4f-a91cd1b5e4b5"
          type="listing"
        >
          <CustomRangeSlider title="Price($)" field="price" step={10} componentId="PriceSensor" />
          <ReactiveList
            dataField="price"
            componentId="ResultsSensor"
            react={{
              "and": ["PriceSensor"]
            }}
            onData={(res) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <Image resizeMode="contain" style={{ width: '90%', height: 200 }} source={{ uri: res.image }}/>
                  <Text style={{ fontWeight: 'bold' }}>{res.name}</Text>
                  <Text>${res.price}</Text>
                </View>
              )
            }}
          />
        </ReactiveBase>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
});

