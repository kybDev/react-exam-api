const Event = require('../../models/event');
const User = require('../../models/user');
const { toISOString } = require('../../helpers/date');

const transformEvent = event => {
  return {
    ...event._doc,
    date: toISOString(event._doc.date),
    creator: userSupply.bind(this, event.creator)
  };
}

const eventsSupply = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return transformEvent(event);
    });
    return events;
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const userSupply = async userId => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdEvents: eventsSupply.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  eventsSupply: eventsSupply,
  singleEvent: singleEvent,
  userSupply: userSupply
};
