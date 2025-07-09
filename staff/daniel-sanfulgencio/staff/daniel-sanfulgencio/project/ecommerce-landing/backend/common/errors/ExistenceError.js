export class ExistenceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExistenceError';
    this.status = 404;
  }
}
