CREATE IF NOT EXISTS blob_persist (
    id INT PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    blob_data BYTEA
    )