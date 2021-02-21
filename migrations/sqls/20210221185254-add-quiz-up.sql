/* Replace with your SQL commands */

CREATE TABLE quiz (
  quiz_id     uuid      DEFAULT   uuid_generate_v4 (),
  name        VARCHAR   NOT NULL  UNIQUE,
  author_id   uuid      NOT NULL,  
  PRIMARY KEY(quiz_id),
  CONSTRAINT fk_author
    FOREIGN KEY(author_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);