/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_id    uuid      DEFAULT   uuid_generate_v4 (),
  first_name VARCHAR,
  last_name  VARCHAR,
  username  VARCHAR   NOT NULL UNIQUE,
  password  VARCHAR   NOT NULL,
  PRIMARY KEY(user_id)
);