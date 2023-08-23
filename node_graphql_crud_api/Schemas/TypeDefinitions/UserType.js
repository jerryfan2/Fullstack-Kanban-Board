import graphql, { GraphQLID } from "graphql";
const {GraphQLObjectType, GraphQLString} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    description: "UserType",
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

export default UserType;