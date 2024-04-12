declare global {
  namespace Express {
    interface Request {
      loggedInUserId : string;
    }
  }
}
