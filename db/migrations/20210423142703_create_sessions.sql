-- +goose Up
-- +goose StatementBegin
CREATE TABLE Sessions(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT REFERENCES User(id),
  session_token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP DEFAULT NULL
) --
-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE Sessions;
-- +goose StatementEnd