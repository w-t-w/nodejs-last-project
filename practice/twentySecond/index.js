const {graphql, buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello: () => {
        console.log('hello GraphQL!');
        return 'hello GraphQL!'
    }
};

graphql({
    schema,
    source: '{ hello }',
    rootValue
}).then((response) => {
    console.log(response, response.data.hello);
});