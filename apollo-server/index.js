import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import resolvers from './resolvers'

const typeDefs = fs.readFileSync(path.join(__dirname, 'model.graphql'),{encoding:'utf-8'})
const myGraphQLSchema = makeExecutableSchema({typeDefs, resolvers})
const PORT = 3002;
const app = express();

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ 
	schema: myGraphQLSchema,
}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}/graphiql`)
});
