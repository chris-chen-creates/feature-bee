-- +goose Up
-- +goose StatementBegin
CREATE TABLE Users(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP DEFAULT NULL
) --
-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE Users;
-- +goose StatementEnd