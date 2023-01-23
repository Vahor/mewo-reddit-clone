CREATE TABLE users(
name TEXT PRIMARY KEY,
username TEXT NOT NULL,
password TEXT NOT NULL,
picture_url TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE tweets(
id INTEGER PRIMARY KEY AUTOINCREMENT,
body TEXT NOT NULL,
user_id TEXT NOT NULL,
created_at DATETIME NOT NULL,
FOREIGN KEY(user_id) REFERENCES users(name)
);

CREATE TABLE tweets_comments(
id INTEGER PRIMARY KEY AUTOINCREMENT,
body TEXT NOT NULL,
tweet_id INTEGER NOT NULL,
user_id TEXT NOT NULL,
created_at DATETIME NOT NULL,
FOREIGN KEY(tweet_id) REFERENCES tweets(id),
FOREIGN KEY(user_id) REFERENCES users(name)
);

CREATE TABLE tweets_favorites(
tweet_id INTEGER,
user_id TEXT,
PRIMARY KEY (tweet_id, user_id)
) WITHOUT ROWID;
