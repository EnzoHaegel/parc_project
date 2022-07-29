-- DELETE TABLE -------------------------------------------------------

-- drop table users if exist
DROP TABLE IF EXISTS `users`;

DROP TABLE IF EXISTS `user_role`;

DROP TABLE IF EXISTS `roles`;

DROP TABLE IF EXISTS `theme`;

DROP TABLE IF EXISTS `role_scripts_allowed`;

DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `role_permission`;

-- CREATE TABLE -------------------------------------------------------

-- create users table
CREATE TABLE `users` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `role_id` INTEGER NOT NULL DEFAULT 2,
    `profile_picture` VARCHAR(255) NOT NULL DEFAULT 'default.jpg',
    `scripts_allowed` VARCHAR(1023) NOT NULL DEFAULT '{"scripts":[]}'
);

-- scripts_allowed example:
-- {
--     "scripts": [
--         "script1",
--         "script2"
--     ]
-- }

-- -- create theme table of the client
-- CREATE TABLE `theme` (
--     `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
--     `name` VARCHAR(255) NOT NULL,
-- );

-- create role table
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL
);

-- create user_role table
CREATE TABLE `user_role` (
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL
);

-- create role_scripts_allowed table
CREATE TABLE `role_scripts_allowed` (
    `role_id` INTEGER NOT NULL,
    `scripts_allowed` VARCHAR(1023) NOT NULL DEFAULT '{"scripts":[]}'
);

-- create theme table
CREATE TABLE `theme` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL
);

-- INSERT ---------------------------------------------------------------

-- insert default roles
INSERT INTO
    `roles` (`id`, `name`)
VALUES
    (1, 'admin');

INSERT INTO
    `roles` (`id`, `name`)
VALUES
    (2, 'user');

-- insert default user
INSERT INTO
    users (username, email, password)
VALUES
    ('admin', 'mail@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99');

-- set role_id of admin to 1
UPDATE
    users
SET
    role_id = 1
WHERE
    username = 'admin';

-- insert random user
INSERT INTO
    users (username, email, password)
VALUES
    ('user', 'oui@mail.com', 'secret');

-- insert role script allowed for role_id 1 admin
INSERT INTO
    role_scripts_allowed (role_id)
VALUES
    (1);

INSERT INTO
    role_scripts_allowed (role_id, scripts_allowed)
VALUES
    (2, '{"scripts": ["random", "test"]}');

-- insert default theme blue-grey
INSERT INTO
    theme (name)
VALUES
    ('blue-grey');
