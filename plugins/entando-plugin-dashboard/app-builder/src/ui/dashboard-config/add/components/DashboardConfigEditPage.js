import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';

import FormattedMessageLocal from 'ui/i18n/FormattedMessage';
import DashboardConfigFormContainer from 'ui/dashboard-config/common/containers/DashboardConfigFormContainer';
import PageTitle from 'ui/PageTitle';

const DashboardConfigEditPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <FormattedMessage id="menu.integration" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <FormattedMessage id="menu.components" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <FormattedMessageLocal id="plugin.title" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <FormattedMessageLocal id="plugin.dashboardSetting" />
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <PageTitle titleId="plugin.title" helpId="ConfigPage.help" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <DashboardConfigFormContainer mode="edit" />
      </Col>
    </Row>
  </Grid>
);


export default DashboardConfigEditPage;