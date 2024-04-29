const fastify = require('fastify')();
const mongoose = require('mongoose');
const cors = require('fastify-cors');

const userRouter = require('./Router/userRouter.js')
const budgetRouter = require('./Router/budgetRouter.js')

// Middleware for CORS
fastify.register(cors, {
  origin: '*',
});


mongoose.connect('mongodb+srv://abhishek-verma:Nis12341234@cluster0.aagekjb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


fastify.register(userRouter, { prefix: "/user" });
fastify.register(budgetRouter, { prefix: "/budget" });

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});


const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log('Server running on port 5000');
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
