/* Replace with your SQL commands */

CREATE TABLE questions (
  question_id     uuid      DEFAULT   uuid_generate_v4 (),
  question_text   VARCHAR   NOT NULL,
  quiz_id         uuid      NOT NULL,  
  PRIMARY KEY(question_id),
  CONSTRAINT fk_quiz
    FOREIGN KEY(quiz_id)
      REFERENCES quiz(quiz_id)
      ON DELETE CASCADE
);