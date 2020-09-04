INSERT INTO users (username, password_hashed) VALUES ('patientZero', 'aae68611be8262bd3c43e5cf124f1792a5a5609b92db4fa2ebe888f433d72631');

INSERT INTO users (username, password_hashed) VALUES ('lisaM', '7fc7d61b84148012ff048f01e063738db5088864830d19acb1b45f0c41780f1c');

INSERT INTO dates (user_id) VALUES (1);

INSERT INTO food_items (name, calories, notes, date_id) VALUES ('chicken rice', 360, 'just testing this shit out', 1);



SELECT users.username, dates.date, food_items.name, food_items.calories, food_items.notes  FROM users INNER JOIN dates ON users.id = dates.user_id INNER JOIN food_items ON dates.id = food_items.date_id WHERE users.username = 'patientZero' AND dates.date= CURRENT_DATE;