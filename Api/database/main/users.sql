create table users
(
    id         INTEGER      not null
        primary key autoincrement,
    username   VARCHAR(255) not null,
    email      VARCHAR(255) not null,
    password   VARCHAR(255) not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    role_id    INTEGER   default 2 not null
);

