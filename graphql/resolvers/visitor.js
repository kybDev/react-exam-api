const Visitor = require('../../models/visitor');

const visitors = async (args, req) => {
  try {
    const pageNo = +args.pageNo;
    const size = +args.size;
    const query = {};

    if (pageNo < 0 || pageNo === 0) {
      throw new Error('invalid page number, should start with 1');
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    const totalCount = await Visitor.countDocuments();
    const totalPages = Math.ceil(totalCount / size);

    const visits = await Visitor.find() .skip(query.skip).limit(size);;
    const visitsResult =  visits.map(result => {
      return { ...result._doc };
    });

    console.log(visitsResult)

    return {
      visits:visitsResult,
      totalPage : totalPages
    }

    
  } catch (err) {
    throw err;
  }
};

const createVisit = async (args, req) => {
  try {
    const visit = new Visitor({
      ipAddress: args.ip,
      device: args.device
    });

    const result = await visit.save();
    return { ...result._doc };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  visitors: visitors,
  createVisit: createVisit
};
