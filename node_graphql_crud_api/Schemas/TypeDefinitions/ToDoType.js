import graphql, { GraphQLID } from "graphql";
const {GraphQLObjectType, GraphQLString} = graphql;

const ToDoType = new GraphQLObjectType({
    name: "ToDo",
    description: "ToDoType",
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        priority: { type: GraphQLString },
        status: { type: GraphQLString },
        owner: { type: GraphQLString }
    })
})

export default ToDoType;