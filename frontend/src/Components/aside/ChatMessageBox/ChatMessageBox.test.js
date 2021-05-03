import React from 'react';
import { shallow } from 'enzyme';
import ChatMessageBox from './ChatMessageBox';

describe('<ChatMessageBox />', () => {
  test('renders', () => {
    const wrapper = shallow(<ChatMessageBox />);
    expect(wrapper).toMatchSnapshot();
  });
});
