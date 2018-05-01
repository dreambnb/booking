import React from 'react';
import sinon from 'sinon';
import Form from '../src/components/Form.jsx';
import Price from '../src/components/Price.jsx';

let defaultProps = {
  room: {
    room_id: 5,
    room_rate: 999,  
  },
};

describe('<Form />', () => {

  test('Should render Form', () =>{
    const wrapper = shallow(<Form room={5}/>);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should send user info to the server when user clicks the Book button', () => {
    const onButtonClick = sinon.spy();
    sinon.spy(Form.prototype, 'sendBookingRequest');
    const wrapper = mount((
      <Form onButtonClick={onButtonClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(Form.prototype.sendBookingRequest.calledOnce).toBe(true);
    Form.prototype.sendBookingRequest.restore();
  });

  test('Should display Price component if showPrice state is true', () => {
    const wrapper = mount( <Form />);
    wrapper.setState({ showPrice: true });
    expect(wrapper.find('#price-component')).toHaveLength(1);
  });

  test('Should have default value as 1 adult guest', () => {
    const wrapper = mount(<Form />);
    let adultNumber = wrapper.state().adults;
    expect(adultNumber).toBe(1);
  });

  test('Should set user information when incrementGuest gets invoked', () => {
    const wrapper = mount(<Form {...defaultProps} />);
    sinon.spy(Form.prototype, 'setUserInfo');
    wrapper.instance().incrementGuest();
    expect(Form.prototype.setUserInfo.calledOnce).toBe(true);
    Form.prototype.setUserInfo.restore();
  });

  test('Should set user information when decrementGuest gets invoked', () => {
    const wrapper = mount(<Form {...defaultProps} />);
    sinon.spy(Form.prototype, 'setUserInfo');
    wrapper.instance().decrementGuest();
    expect(Form.prototype.setUserInfo.calledOnce).toBe(true);
    Form.prototype.setUserInfo.restore();
  });


  test('Should calculate all numbers when setUserInfo gets invoked', () => {
    const wrapper = mount(<Form {...defaultProps} />);
    wrapper.setState({ adults: 1, children: 1, days: 5 });
    wrapper.instance().setUserInfo();
    wrapper.update();
    let totalGuestNumber = wrapper.state().userInfo.totalGuests;
    expect(totalGuestNumber).toBe(2);
    let totalPriceNumber = wrapper.state().userInfo.totalPrice;
    expect(totalPriceNumber).toBe(4995);
    let totalDayNumber = wrapper.state().userInfo.totalDays;
    expect(totalDayNumber).toBe(5);
  });

  test('Should display the dropdown menu if showMenu is true', () => {
    const wrapper = mount(<Form {...defaultProps} />);
    wrapper.setState({ showMenu: true });
    expect(wrapper.find('#infant')).toHaveLength(1);
  });

  test('Should call incrementGuest when infant plus icon gets clicked', () => {
    const wrapper = mount(( <Form {...defaultProps} /> ));
    sinon.spy(Form.prototype, 'incrementGuest');
    wrapper.setState({ showMenu: true });
    wrapper.find('#infant-plus').at(0).simulate('click');
    expect(Form.prototype.incrementGuest.calledOnce).toBe(true);
    Form.prototype.incrementGuest.restore();
  });

  test('Should call decrementGuest when infant minus icon gets clicked', () => {
    const wrapper = mount(( <Form {...defaultProps} /> ));
    sinon.spy(Form.prototype, 'decrementGuest');
    wrapper.setState({ showMenu: true });
    wrapper.find('#infant-minus').hostNodes().simulate('click');
    expect(Form.prototype.decrementGuest.calledOnce).toBe(true);
    Form.prototype.decrementGuest.restore();
  });

  test('Should call incrementGuest when adult plus icon gets clicked', () => {
    const wrapper = mount(( <Form {...defaultProps} /> ));
    sinon.spy(Form.prototype, 'incrementGuest');
    wrapper.setState({ showMenu: true });
    wrapper.find('#adult-plus').at(0).simulate('click');
    expect(Form.prototype.incrementGuest.calledOnce).toBe(true);
    Form.prototype.incrementGuest.restore();
  });

  test('Should call decrementGuest when adult minus icon gets clicked', () => {
    const wrapper = mount(( <Form {...defaultProps} /> ));
    sinon.spy(Form.prototype, 'decrementGuest');
    wrapper.setState({ showMenu: true });
    wrapper.find('#adult-minus').hostNodes().simulate('click');
    expect(Form.prototype.decrementGuest.calledOnce).toBe(true);
    Form.prototype.decrementGuest.restore();
  });

  test('Should call incrementGuest when children plus icon gets clicked', () => {
    const wrapper = mount(( <Form {...defaultProps} /> ));
    sinon.spy(Form.prototype, 'incrementGuest');
    wrapper.setState({ showMenu: true });
    wrapper.find('#children-plus').at(0).simulate('click');
    expect(Form.prototype.incrementGuest.calledOnce).toBe(true);
    Form.prototype.incrementGuest.restore();
  });

  test('Should call decrementGuest when children plus icon gets clicked', () => {
    const wrapper = mount(( <Form {...defaultProps} /> ));
    sinon.spy(Form.prototype, 'decrementGuest');
    wrapper.setState({ showMenu: true });
    wrapper.find('#children-minus').hostNodes().simulate('click');
    expect(Form.prototype.decrementGuest.calledOnce).toBe(true);
    Form.prototype.decrementGuest.restore();
  });
});

