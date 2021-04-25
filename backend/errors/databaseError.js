class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 204;
  }
}

module.exports = DatabaseError;
