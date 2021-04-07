import React from 'react';
import renderer from 'react-test-renderer';
 
import { Home } from './index';

describe('Home Page', () => {
    test('snapshot renders', () => {
      const component = renderer.create(<Home />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
});