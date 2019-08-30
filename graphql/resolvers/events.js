const Event = require('../../models/event');
const User = require('../../models/user');
const { toISOString } = require('../../helpers/date');

const events = async () => {
  try {
    const events = await Event.find().populate('creator');
    return events.map(event => {
      return {
        ...event._doc,
        date: toISOString(event._doc.date)
      };
    });
  } catch (err) {
    throw err;
  }
};

const createEvent = async (args, req) => {

  if(!req.isAuth){
    throw new Error('Unauthenticated');
  }

  const userId = req.userId;
  const event = new Event({
    title: args.eventInput.title,
    description: args.eventInput.description,
    price: +args.eventInput.price,
    date: new Date(args.eventInput.date),
    creator: userId
  });

  try {
    let createdEvent;
    const result = await event.save();
    createdEvent = { ...result._doc };
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.createdEvents.push(createdEvent);
    await user.save();
    return createdEvent;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: events,
  createEvent: createEvent
};
