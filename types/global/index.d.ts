declare namespace Express {
  interface Request {
    user?: string
    db: import('../index').QvizDB
  }
}
