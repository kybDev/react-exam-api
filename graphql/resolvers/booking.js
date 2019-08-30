const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { singleEvent, userSupply } = require('./merge');
const { toISOString } = require('../../helpers/date');

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: userSupply.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: toISOString(booking._doc.createdAt),
    updatedAt: toISOString(booking._doc.updatedAt)
  };
};

const bookings = async (args, req) => {
  if(!req.isAuth){
    throw new Error('Unauthenticated');
  }

  try {
    const bookings = await Booking.find().populate(['user', 'event']);
    return bookings.map(booking => {
      return transformBooking(booking);
    });
  } catch (err) {
    throw err;
  }
};

const bookEvent = async  (args, req) => {
  if(!req.isAuth){
    throw new Error('Unauthenticated');
  }
  const userId = req.userId;

  const fetchEvent = await Event.findOne({ _id: args.eventId });
  if (!fetchEvent) {
    throw new Error('Event Not Exist');
  }
  try {
    const booking = new Booking({
      event: fetchEvent,
      user: userId
    });

    const result = await booking.save();
    return transformBooking(result);
  } catch (err) {
    throw err;
  }
};

const cancelBooking = async (args, req)  => {
  if(!req.isAuth){
    throw new Error('Unauthenticated');
  }
  try {
    const booking = await Booking.findById(args.bookingId).populate('event');
    if (!booking) {
      throw new Error('Event Not Exist');
    }

    const event = {
      ...booking.event._doc,
      creator: userSupply.bind(this, booking.event._doc.creator)
    };

    await Booking.deleteOne({ _id: args.bookingId });

    return event;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  bookings: bookings,
  bookEvent: bookEvent,
  cancelBooking: cancelBooking
};
