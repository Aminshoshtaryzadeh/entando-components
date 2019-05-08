import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'patternfly-react';
import FormattedMessageLocal from 'ui/i18n/FormattedMessage';
import DashboardConfigDatasourceStatusContainer from 'ui/dashboard-config/common/containers/DashboardConfigDatasourceStatusContainer';

const addDatasource = (fields, obj) => {
  const {
    datasourceCode,
    datasourceValue: { datasource, datasourceURI },
  } = obj;
  if (obj.datasourceValue.datasource !== undefined) {
    fields.push({ datasourceCode, datasource, datasourceURI });
  }
};

const removeDatasource = (fields, index) => {
  fields.remove(index);
};
const DashboardConfigDatasource = ({
  fields,
  datasourceValue,
  datasources,
  datasourceCode,
}) => (
  <div className="DashboardConfigDatasource">
    <Row>
      <Col xs={12}>
        <div className="btn-toolbar pull-right">
          <Button
            className="DashboardConfigDatasource__datasource-btn"
            disabled={
              datasourceValue.datasource === undefined ||
              datasourceCode === undefined
            }
            type="button"
            bsStyle="default"
            onClick={() =>
              addDatasource(fields, { datasourceCode, datasourceValue })
            }
          >
            <FormattedMessageLocal id="common.add" />
          </Button>
        </div>
      </Col>
      {datasources.length === 0 ? null : (
        <Col xs={12}>
          <table className="DashboardConfigDatasource__table table table-striped table-bordered table-reponsive">
            <thead>
              <tr>
                <th width="20%">
                  <FormattedMessageLocal id="plugin.config.datasourceCode" />
                </th>
                <th width="35%">
                  <FormattedMessageLocal id="plugin.config.datasource" />
                </th>
                <th width="35%">
                  <FormattedMessageLocal id="plugin.config.datasourceURI" />
                </th>
                <th>
                  <FormattedMessageLocal id="plugin.config.datasourceStatus" />
                </th>
                <th width="3%">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {datasources.map((ds, index) => (
                <tr key={`datasource-${ds.datasourceCode}`}>
                  <td>{ds.datasourceCode}</td>
                  <td>{ds.datasource}</td>
                  <td>{ds.datasourceURI}</td>
                  <td>
                    <DashboardConfigDatasourceStatusContainer datasourceCode={ds.datasourceCode} />
                  </td>
                  <td className="text-center">
                    <Icon
                      type="fa"
                      size="lg"
                      name="trash"
                      onClick={() => removeDatasource(fields, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      )}
    </Row>
  </div>
);
const DATASOURCE_TYPE = {
  datasource: PropTypes.string,
  datasourceURI: PropTypes.string,
};
DashboardConfigDatasource.propTypes = {
  datasourceValue: PropTypes.shape(DATASOURCE_TYPE),
  datasourceCode: PropTypes.string.isRequired,
  datasources: PropTypes.arrayOf(PropTypes.shape(DATASOURCE_TYPE)),
  fields: PropTypes.shape({}),
};
DashboardConfigDatasource.defaultProps = {
  datasourceValue: {
    datasource: undefined,
    datasourceURI: undefined,
  },
  datasources: [],
  fields: {},
};
export default DashboardConfigDatasource;
