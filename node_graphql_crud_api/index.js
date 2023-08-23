import express from 'express';
import graphqlHTTP from "express-graphql";
import graphql from "graphql";
import mongoose from "mongoose";

import cookieParser from 'cookie-parser';

import RootQuery from './Schemas/Queries.js';
import Mutation from './Schemas/Mutations.js';

import cors from "cors";

import jwt from "jsonwebtoken";
import "dotenv/config";

const {GraphQLSchema} = graphql;

const app = express();
const PORT = 8080;

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use((req, res, next) => {
    const refreshToken = req.cookies['refresh-token'];
    const accessToken = req.cookies['access-token'];
    if (!refreshToken && !accessToken) {
        return next();
    }
    try {
        if (accessToken) {
            const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.userID = data.userID;
            return next();
        }
    } catch {}
    
    let data;
    try {
        data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ userID: data.userID }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        res.cookie("access-token", accessToken);
    } catch(e) {
        return next();
    }
    next();
})

await mongoose.connect('mongodb://127.0.0.1:27017/toDoMernDB');

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});

app.use('/graphql', (req, res) => {
    return graphqlHTTP.graphqlHTTP({
        schema,
        graphiql: true,
        context: { req, res }
    })(req, res);
});

app.listen(PORT, () => {console.log(`Running on port: http://localhost:${PORT}`)});