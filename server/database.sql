CREATE TABLE mocrypto;

CREATE TABLE account (
	id SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	surname VARCHAR(255) NOT NULL,
	username VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	type VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE cryptocurrency (
	id VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	shortname VARCHAR(255) NOT NULL,
	price FLOAT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE portfolio (
	crypto_id VARCHAR(255) NOT NULL,
	user_id INTEGER NOT NULL,
	short_name VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	amount FLOAT NOT NULL,
	PRIMARY KEY (crypto_id)
);

CREATE TABLE transaction (
	id SERIAL NOT NULL,
	user_id INT NOT NULL, 
	value FLOAT NOT NULL, 
	base_crypto VARCHAR(255) NOT NULL, 
	type VARCHAR(255) NOT NULL,
	PRIMARY KEY(id)
);


INSERT INTO cryptocurrency (id, name, shortname, price)
VALUES ('1', 'Tether', 'USDT', 1.0);

INSERT INTO cryptocurrency (id, name, shortname, price)
VALUES ('2', 'Bitcoin', 'BTC', 5000);

INSERT INTO cryptocurrency (id, name, shortname, price)
VALUES ('3', 'Etherium', 'ETH', 1500);
