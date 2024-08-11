echo "-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create phrases table
CREATE TABLE IF NOT EXISTS phrases (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES topics(id),
  content TEXT NOT NULL
);" > migrations/001_create_initial_tables.sql
