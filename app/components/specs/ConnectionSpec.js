import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Connection from '../Connection';

describe('Connection component: ', () => {
    it('should render disconnected status by default', () => {
        const expectedHtml = '<div class="connection-status disconnected"><span>System status:</span> Disconnected </div>';

        const wrapper = shallow(<Connection />);
        expect(wrapper.html()).to.be.eql(expectedHtml);
    });

    it('should render connected when passed in props', () => {
        const expectedHtml = '<div class="connection-status connected"><span>System status:</span> Connected </div>';

        const wrapper = shallow(<Connection connectionStatus={'Connected'} />);
        expect(wrapper.html()).to.be.eql(expectedHtml);
    });

    it('should render subscription error if supplied', () => {
        const expectedHtml = '<div class="connection-status disconnected"><span>System status:</span> Disconnected - Everything is wrong</div>';

        const wrapper = shallow(<Connection subscriptionError={'Everything is wrong'} />);
        expect(wrapper.html()).to.be.eql(expectedHtml);
    });
});
