class CpError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends CpError {}
class NotFound extends CpError {}

export { BadRequest, NotFound, CpError };
