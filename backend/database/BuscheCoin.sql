create TABLE if not EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username tinytext not null,
    name tinytext not null,
    surname tinytext not null,
    password char(128) not null,
    email tinytext,
    class tinytext,
    authlevel int not null,
    last_login datetime
);

insert into users (
        username,
        name,
        surname,
        password,
        email,
        class,
        authlevel
    )
values (
        'admin',
        'admin',
        'admin',
        'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec',
        'admin@admin.it',
        '6AIN',
        0
    );