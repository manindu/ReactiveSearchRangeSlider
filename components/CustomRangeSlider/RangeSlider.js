import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RangeSlider extends Component {
  state = {
    minimum: 0,
    maximum: 0,
    multiSliderValue: [0, 0],
    firstTime: true,
  };

  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  };

  performQuery = (props, queryValue) => {
    props.setQuery({
      query: {
        range: {
          [this.props.field]: queryValue,
        },
      },
    });
  };

  onValuesChangeFinish = () => {
    const queryValue = { gte: this.state.multiSliderValue[0], lte: this.state.multiSliderValue[1] };
    this.performQuery(this.props, queryValue);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.aggregations &&
      nextProps.aggregations.maximum &&
      nextProps.aggregations.minimum
    ) {
      if (
        nextProps.aggregations.minimum.value !== this.state.minimum ||
        nextProps.aggregations.maximum.value !== this.state.maximum
      ) {
        this.setState({
          minimum: nextProps.aggregations.minimum.value,
          maximum: nextProps.aggregations.maximum.value,
          multiSliderValue: [
            nextProps.aggregations.minimum.value,
            nextProps.aggregations.maximum.value,
          ],
        });
      }

      if (this.state.firstTime) {
        nextProps.setQuery({
          query: {
            match_all: {},
          },
        });
        this.setState({ firstTime: false });
      }
    }
  }

  render() {
    const {
      title,
      step,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text>{this.state.multiSliderValue[0]} - {this.state.multiSliderValue[1]}</Text>
        </View>
        <MultiSlider
          values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
          sliderLength={SCREEN_WIDTH * 0.85}
          onValuesChange={this.multiSliderValuesChange}
          onValuesChangeFinish={this.onValuesChangeFinish}
          min={this.state.minimum}
          max={this.state.maximum}
          step={step}
          allowOverlap={false}
          snapped
          touchDimensions={{
            height: 80,
            width: 80,
          }}
        />
      </View>

    );
  }
}

RangeSlider.propTypes = {
  setQuery: PropTypes.func,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  step: PropTypes.number,
};

RangeSlider.defaultProps = {
  step: 1,
  setQuery: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  image: {
    width: 40,
    height: 40,
  },
  valueContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});

export default RangeSlider;
