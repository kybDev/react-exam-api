const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Visitor {
    _id: ID!
    ipAddress : String!
    device : String!
    createdAt: String!
    updatedAt: String!
}


type VisitList {
    visits:[Visitor!]
    totalPage: Int!
    currentPage: Int!
}


type RootQuery {
    visitors(pageNo : Int!, size: Int!, startDate: String!, filter: String!, sortColumn: String!, sortBy: String!) : VisitList!
}

type RootMutation {
    visitorsV2(pageNo : Int!, size: Int!, startDate: String!, filter: String!, sortColumn: String!, sortBy: String!) : VisitList!
    createVisit(ip: String!, device: String!): Visitor
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);
