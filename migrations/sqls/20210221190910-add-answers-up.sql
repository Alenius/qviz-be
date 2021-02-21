/* Replace with your SQL commands */

CREATE TABLE answers (
  answer_id           uuid            DEFAULT   uuid_generate_v4 (),
  accepted_answers    VARCHAR(1024)   NOT NULL,
  extra_info          VARCHAR(1024),
  question_id         uuid            NOT NULL,  
  PRIMARY KEY(answer_id),
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(question_id)
      ON DELETE CASCADE
);