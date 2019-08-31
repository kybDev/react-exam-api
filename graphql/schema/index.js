const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Visitor {
    _id: ID!
    ipAddress : String!
    device : String!
    createdAt: String!
    updatedAt: String!
}

type Booking {
    _id: ID!
    event : Event!
    user : User!
    createdAt: String!
    updatedAt: String!
}

input BookingInput {
    event: String!
    user: String!
}


type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type VisitList {
    visits:[Visitor!]
    totalPage: Int!
}

input UserInput {
    email: String!
    password: String!
}


type RootQuery {
    visitors(pageNo : Int!, size: Int!, filter: String!) : VisitList!
    events: [Event!]!
    users:[User!]!
    bookings:[Booking!]!
    login(email: String!, password: String!) : AuthData!
}

type RootMutation {
    createVisit(ip: String!, device: String!): Visitor
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!) : Booking!
    cancelBooking(bookingId : ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);
