import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import { DashboardPieChartFormBody } from 'ui/widgets/charts/pie-chart/components/DashboardPieChartForm';
import Stepper from 'ui/widgets/common/components/Stepper';

const props = {
  handleSubmit: jest.fn(),
  onWillMount: jest.fn(),
  onCancel: jest.fn(),
  axis: {
    rotated: false,
  },
  formSyncErrors: {},
  chart: 'pie',
};

describe('DashboardPieChartForm', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DashboardPieChartFormBody {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('contain one Stepper ', () => {
    expect(component.find(Stepper)).toHaveLength(1);
  });

  it('will call onWillMount on componentWillMount', () => {
    expect(props.onWillMount).toHaveBeenCalled();
  });

  it('validateSteps', () => {
    component.setProps({
      formSyncErrors: {
        title: 'title',
        serverName: 'server',
        datasource: 'ds',
      },
    });
    const stepper = component.find(Stepper);
    expect(stepper.prop('validateSteps')).toEqual(expect.arrayContaining([false, true, false]));
  });

  it('validateSteps with columns props', () => {
    component.setProps({
      columns: [{ key: 1 }],
      formSyncErrors: {},
    });
    const stepper = component.find(Stepper);
    expect(stepper.prop('validateSteps')).toEqual(expect.arrayContaining([false, true, false]));
  });
});
