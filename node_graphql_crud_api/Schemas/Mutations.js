import graphql from "graphql";
import ToDoType from './TypeDefinitions/ToDoType.js';
import UserType from "./TypeDefinitions/UserType.js"
import CreateToDoInputType from "./TypeDefinitions/CreateToDoInputType.js";

import { toDoModel } from "../Models/ToDo.js";
import { userModel } from "../Models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import 'dotenv/config';

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull} = graphql;

// Mutation Schema
const createToDo = {
    type: ToDoType,
    description: "Create To Do",
    args: {
        toDo: { type: new GraphQLNonNull(CreateToDoInputType) }
    },
    async resolve(parent, args, context) {
        const currentUser = await getUserFromRefreshToken(context);
        if (!currentUser) return;
        const newToDo = new toDoModel({...args.toDo, owner: currentUser.username});
        await newToDo.save();
        return newToDo;
    }
};

const updateToDo = {
    type: ToDoType,
    description: "Update To Do",
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: GraphQLString },
        priority: { type: GraphQLString },
        status: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const toUpdate = await toDoModel.findByIdAndUpdate(args.id, 
            {description: args.description, priority: args.priority, status: args.status }, { new : true });
        return toUpdate;
    }
};

const deleteToDo = {
    type: ToDoType,
    description: "Delete To Do",
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
        const toDelete = await toDoModel.findByIdAndDelete(args.id);
        return toDelete;
    }
};

const signUpUser = {
    type: UserType,
    description: "Sign Up New User",
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        try {
            const checkExists = await userModel.findOne({ username: args.username });
            if (checkExists !== null) return;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const newUser = new userModel({username: args.username, password: hashedPassword});
            await newUser.save();
            return newUser;
        } catch(e) {
            console.log(e);
        }
    }
}

const loginUser = {
    type: UserType,
    description: "Login User",
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args, context) {
        const user = await userModel.findOne({ username: args.username });
        if (user === null) {
            console.log("Cannot find user");
            return;
        } try {
            if (await bcrypt.compare(args.password, user.password)) {
                const accessToken = jwt.sign({ userID: args.username }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15min'});
                const refreshToken = jwt.sign({ userID: args.username }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
                context.res.cookie("access-token", accessToken);
                context.res.cookie("refresh-token", refreshToken);

                console.log("User logged in");
            } else {
                console.log("Login unsuccessful");
                return;
            }
        } catch(e) {
            console.log(e);
            return;
        }
        return user;
    }
}

const logoutUser = {
    type: UserType,
    description: "Logout User",
    args: {},
    async resolve(parent, args, context) {
        const user = getUserFromRefreshToken(context);
        context.res.clearCookie("refresh-token");
        context.res.clearCookie("access-token");
        return user;
    }
}

const Mutation = new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
        createToDo: createToDo,
        updateToDo: updateToDo,
        deleteToDo: deleteToDo,

        signUpUser: signUpUser,
        loginUser: loginUser,
        logoutUser: logoutUser
    }
});

async function getUserFromRefreshToken(context) {
    const refreshToken = context.req.cookies['refresh-token'];
    const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return await userModel.findOne({ username: data.userID });
}

export default Mutation;