-- +goose Up
-- +goose StatementBegin
ALTER TABLE Feature
ADD created_by INT
AFTER active;
-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
ALTER TABLE Feature DROP COLUMN created_by;
-- +goose StatementEnd