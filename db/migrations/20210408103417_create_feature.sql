-- +goose Up
-- +goose StatementBegin
CREATE TABLE Feature(
  id         INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) NOT NULL UNIQUE,
  active     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP DEFAULT NULL
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE Feature;
-- +goose StatementEnd
