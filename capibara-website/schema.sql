CREATE TABLE IF NOT EXISTS blob_persist (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    blob_data BYTEA
    )