const Visitor = require('../../models/visitor');
const { toISOString } = require('../../helpers/date');

const visitors = async (args, req) => {
  try {
    const pageNo = +args.pageNo;
    const size = +args.size;
    const startDate = args.startDate;
    const filter = args.filter;

    let lt, gte;

    let date = new Date(startDate);

   
    switch (filter) {
      case 'today':
        gte = new Date(new Date().setDate(new Date().getDate() - 1));
        lt = new Date();
        break;
      case 'yesterday':
        gte = new Date(date.setDate(date.getDate() - 1));
        lt =  new Date(date.setDate(date.getDate() + 1));

        break;

      case 'lastWeek':
        gte = new Date(date.setDate(date.getDate() - 7));
        lt = new Date(date.setDate(date.getDate() + 7));
        break;
      case 'thisMonth':
        gte = new Date(date.getFullYear(), date.getMonth(), 1);
        lt = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        break;
    }

    const dateFilter = {
      $gte: gte,
      $lte: lt
    };


   

    if (pageNo < 0 || pageNo === 0) {
      throw new Error('invalid page number, should start with 1');
    }

    const totalCount = await Visitor.countDocuments({
      createdAt: { ...dateFilter }
    });
    const totalPages = Math.ceil(totalCount / size);
    const skip = size * (pageNo - 1);
    const visits = await Visitor.find({
      createdAt: { ...dateFilter }
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);
    const visitsResult = visits.map(result => {
      return {
        ...result._doc,
        createdAt: new Date(result._doc.createdAt).toLocaleDateString()
      };
    });

    return {
      visits: visitsResult,
      totalPage: totalPages,
      currentPage: pageNo
    };
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
  createVisit: createVisit,
  visitorsV2:visitors
};
