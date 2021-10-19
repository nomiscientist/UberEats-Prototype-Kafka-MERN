import enableHooks from 'jest-react-hooks-shallow';

import * as React from 'react';
import { shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Favorites from './favorites.js';
import * as requests from './favoritesRequests';

configure({ adapter: new Adapter()});

enableHooks(jest);

jest.mock('./favoritesRequests');    

describe('Favorites: When the user is logged in testing form components', () => {
    let container;
    const props = { setRestaurantList: jest.fn() };
    const wrapper = shallow(<div><Favorites {...props}/></div>);
    beforeAll(() => {
        requests.getFavoriteRestaurants.mockResolvedValue();
      });
    beforeEach(() => {
        container = wrapper.find('Favorites').dive();
    });
    it('the request api should not be hit if no if the request is empty', () => {
        expect(requests.getFavoriteRestaurants).toBeCalledTimes(0);
      });

      it('the props function should not be called if the request is empty', () => {
        expect(props.setRestaurantList).toBeCalledTimes(0);
      });
    });