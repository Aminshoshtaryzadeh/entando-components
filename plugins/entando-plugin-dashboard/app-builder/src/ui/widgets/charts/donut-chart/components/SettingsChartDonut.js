import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { Row, Col, FormGroup, ControlLabel } from 'patternfly-react';
import { required } from '@entando/utils';

import FormattedMessage from 'ui/i18n/FormattedMessage';

import FieldArrayDropDownMultiple from 'ui/common/FieldArrayDropDownMultiple';

const SettingsChartDonut = ({
  datasourceSelected,
  optionColumns,
  optionColumnXSelected,
}) => (
  <div className="SettingsChartDonut">
    <Row>
      <Col xs={1} className="SettingsChartDonut__col">
        <FormGroup className="SettingsChartDonut__form-group">
          <ControlLabel>
            <strong>
              <FormattedMessage id="plugin.chart.values" />
            </strong>
          </ControlLabel>
        </FormGroup>
      </Col>
      <Col xs={11} className="SettingsChartDonut__col">
        <FieldArray
          className="SettingsChartDonut__column-selected"
          name="columns.x"
          idKey={datasourceSelected}
          component={FieldArrayDropDownMultiple}
          optionColumns={optionColumns}
          optionColumnSelected={optionColumnXSelected}
          validate={[required]}
        />
      </Col>
    </Row>
  </div>
);

SettingsChartDonut.propTypes = {
  datasourceSelected: PropTypes.string.isRequired,
  optionColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  optionColumnXSelected: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SettingsChartDonut;
