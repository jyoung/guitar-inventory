-- drop the guitars table
DROP TABLE IF EXISTS guitars;

-- create the guitars table
CREATE TABLE IF NOT EXISTS guitars(
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year SMALLINT NULL,
    color VARCHAR(50) NULL
);