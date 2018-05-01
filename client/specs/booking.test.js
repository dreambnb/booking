import React from 'react';
import sinon from 'sinon';
import Booking from '../src/components/Booking.jsx';


describe('<Booking />', () => {
  test('Should fetch all room data from the server upon mounting', () => {
    sinon.spy(Booking.prototype, 'getRoomData');
    const wrapper = mount( < Booking room={5} /> );
    expect(Booking.prototype.getRoomData.calledOnce).toBe(true);
    Booking.prototype.getRoomData.restore();
  });


  test('Should fetch a different room data again when the room id gets updated', () => {
    sinon.spy(Booking.prototype, 'getRoomData');
    const wrapper = mount( < Booking room={5} /> );
    wrapper.setProps({ room: 21 });
    expect(Booking.prototype.getRoomData.calledTwice).toBe(true);
    Booking.prototype.getRoomData.restore();
  });
});
