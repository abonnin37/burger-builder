import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// sert à lier enzime à react
configure({adapter: new Adapter()});

// On commence une série de tests unitaire sur <NavigationItems />
describe('<NavigationItems />', () => {
    let wrapper;

    // On peut réaliser des actions avant chaque test dans :
    beforeEach(() => {
        // On émule notre composant
        wrapper = shallow(<NavigationItems />);
    });

    // On crée un test unitaire
    it('should render two <NavigationItem /> if the user is not authenticate', () => {
        // On décrit ce que l'on attend en fonction de l'environnement installé
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> if the user is authenticate', () => {
        // On donne une propriété à notre composant émulé déjà créé
        wrapper.setProps({isAuth: true});

        // On décrit ce que l'on attend en fonction de l'environnement installé
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render a specific logout <NavigationItem /> if the user is authenticate', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Log-out</NavigationItem>)).toEqual(true);
    });
});