declare namespace Express {
  interface Request {
    user?: import('../index').User
    db: import('../index').QvizDB
  }
}
