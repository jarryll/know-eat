CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT NOT NULL, password_hashed TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS dates (id SERIAL PRIMARY KEY, date DATE DEFAULT CURRENT_DATE, user_id INTEGER REFERENCES users(id));

CREATE TABLE IF NOT EXISTS food_items (id SERIAL PRIMARY KEY, name TEXT NOT NULL, calories TEXT NOT NULL, notes TEXT, date_id INTEGER REFERENCES dates(id));