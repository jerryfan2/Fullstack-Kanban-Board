import graphql, { GraphQLID } from "graphql";
import ToDoType from './TypeDefinitions/ToDoType.js';

import { toDoModel } from "../Models/ToDo.js";

const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull} = graphql;

// Query Schema
const getAllToDos = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: 'List of All ToDos',
    resolve: async () => await toDoModel.find({})
};

const getToDoByID = {
    type: new GraphQLNonNull(ToDoType),
    description: 'A ToDo by ID',
    args: {
        id: {type: GraphQLID}
    },
    resolve: async (parent, args) => await toDoModel.findOne({_id: args.id})
};

const getToDoByDescription = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: 'ToDos by Description',
    args: {
        description: {type: GraphQLString}
    },
    async resolve(parent, args){
        return await toDoModel.find({ description: args.description });
    }
};

const getToDoByPriority = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: 'ToDos by Priority',
    args: {
        priority: {type: GraphQLString}
    },
    async resolve(parent, args){
        return await toDoModel.find({ priority: args.priority });
    }
};

const getToDoByStatus = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: 'ToDos by Status',
    args: {
        status: {type: GraphQLString}
    },
    async resolve(parent, args){
        return await toDoModel.find({ status: args.status });
    }
};

const getToDoByOwner = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: "ToDos by Owner",
    args: {
        owner: {type: GraphQLString}
    },
    async resolve(parent, args) {
        return await toDoModel.find({ owner: args.owner })
    }
}

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllToDos: getAllToDos,
        getToDoByID: getToDoByID,
        getToDoByDescription: getToDoByDescription,
        getToDoByPriority: getToDoByPriority,
        getToDoByStatus: getToDoByStatus,
        getToDoByOwner: getToDoByOwner
    }
});

export default RootQuery;