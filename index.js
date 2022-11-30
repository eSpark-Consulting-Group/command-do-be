// index.js

const { ApolloServer } = require("apollo-server-express")
const { readFileSync } = require("fs");
const path = require("path");
const { prisma } = require("./src/database");
const { application } = require("./src/schema/rootModule");
const admin = require("firebase-admin");
const { createServer } = require('http');
const express = require("express");
const { env } = require("process");
const cron = require('node-cron');
const Notification = require("./src/services/NotificationServices");
const { getUserFcmTokens } = require("./src/utils/helperFunctions");

const app = express();
const httpServer = createServer(app);
const schema = application.createSchemaForApollo()

const PRIVATE_KEY = process.env.PRIVATE_KEY

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env?.PROJECT_ID,
    privateKey: PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env?.FIREBASE_CLIENT_EMAIL,
  }),
  // databaseURL: process.env.DATABASE_URL
});


const server = new ApolloServer({
  schema,
  context: {
    prisma,
  },
  introspection: true,
  subscriptions: {
    // onConnect: () => console.log('Connected to websocket'),
  },
});


const PORT = process.env.PORT || 4000
server.applyMiddleware({ app })

server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

cron.schedule('* * * * MON,TUE,WED,THU,FRI', async () => {
  console.log("Triggerd 0 7 * * MON,TUE,WED,THU,FRI");
  Notification.send(
    await getUserFcmTokens(),
    {},
    "Time is running Out! ⏰",
    "Order Closing in 30mins! Hurry Up 🚀"
  );
});

cron.schedule('0 5 * * MON,TUE,WED,THU,FRI',async () => {
  console.log("Triggerd 0 10 * * MON,TUE,WED,THU,FRI");
  Notification.send(
    await getUserFcmTokens(),
    {},
    "Time to Order ⏰",
    "Place Your Lunch Orders Now 🥪!"
  );
});

//   node-prisma-apollo-backend:
//   working_dir: /Users/mudassirraza/Desktop/Projects/node-prisma-apollo-backend
//   restart: always
//   build:
//     context: .
//   volumes:
//     - .:/app:delegated
//   command: yarn dev
//   ports:
//     - 4000:4000
