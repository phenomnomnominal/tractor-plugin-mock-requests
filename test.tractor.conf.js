module.exports = {
    port: 4321,
    environments: [
        'http://localhost:4321'
    ],
    mochaSpecs: {
        directory: './test'
    },
    mockRequests: {
        directory: './test'
    },
    pageObjects: {
        directory: './test'
    }
};
