const errorHandler = (err, req, res, next) => {
  console.error('❌ Server Error:', err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let instruction = '';

  if (err.name === 'MongoServerError' || message.includes('not allowed to do action') || err.code === 13) {
    statusCode = 403;
    message = 'Database Write Permission Denied';
    instruction = 'The database user in MONGODB_URL lacks write permissions. In MongoDB Atlas -> Database Access, update user role to "Read and write to any database".';
  } else if (message.includes('Authentication failed') || message.includes('bad auth')) {
    statusCode = 401;
    message = 'Database Authentication Failed';
    instruction = 'Please verify the username and password in your MONGODB_URL connection string.';
  }

  res.status(statusCode).json({
    error: message,
    instruction,
    details: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = { errorHandler };
