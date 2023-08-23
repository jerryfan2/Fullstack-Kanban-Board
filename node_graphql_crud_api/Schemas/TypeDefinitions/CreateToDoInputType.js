import graphql from "graphql";
const {GraphQLInputObjectType, GraphQLString, GraphQLNonNull} = graphql;

const CreateToDoInputType = new GraphQLInputObjectType({
    name: "CreateToDoInputType",
    fields: {
        description: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLString) },
        status: {type: new GraphQLNonNull(GraphQLString)}
    }
});

export default CreateToDoInputType;