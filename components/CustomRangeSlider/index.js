import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveComponent } from '@appbaseio/reactivesearch-native';
import RangeSlider from './RangeSlider';

class CustomRangeSlider extends Component {
  render() {

    const {
      componentId,
      field,
      title,
      step,
    } = this.props;

    return (
      <ReactiveComponent
        componentId={componentId}
        defaultQuery={() => ({
          aggs: {
            maximum: { max: { field } },
            minimum: { min: { field } },
          },
        })}
      >
        <RangeSlider title={title} field={field} step={step} id={componentId} />
      </ReactiveComponent>
    );
  }
}

CustomRangeSlider.propTypes = {
  componentId: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  step: PropTypes.number,
  title: PropTypes.string.isRequired,
};

CustomRangeSlider.defaultProps = {
  step: 1,
};

export default CustomRangeSlider;
