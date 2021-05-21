import React from 'react';
import { shallow } from 'enzyme';
import PrivateMessageBox from './PrivateMessageBox';

describe('<PrivateMessageBox />', () => {
  test('renders', () => {
    const wrapper = shallow(<PrivateMessageBox />);
    expect(wrapper).toMatchSnapshot();
  });
});
