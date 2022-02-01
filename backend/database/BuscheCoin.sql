create TABLE if not EXISTS users (
    id int PRIMARY KEY AUTO_INCREMENT,
    username tinytext not null,
    name tinytext not null,
    surname tinytext not null,
    password char(128) not null,
    email tinytext,
    class tinytext,
    authlevel int not null,
    last_login datetime,
    balance int not null default 0 CHECK (balance >= 0)
);

create table if not EXISTS objectTypes (
    id int PRIMARY KEY AUTO_INCREMENT,
    name tinytext not null,
    description text NOT NULL,
    min_value int NOT NULL DEFAULT 0 CHECK (min_value >= 0)
);

CREATE TABLE if not EXISTS objects (
    id int PRIMARY KEY AUTO_INCREMENT,
    typeId int,
    name tinytext not null,
    ownerId int,
    creatorId int,
    constraint foreign key (typeId) REFERENCES objectTypes (id),
    constraint foreign key (ownerId) REFERENCES users (id),
    constraint foreign key (creatorId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id int PRIMARY KEY AUTO_INCREMENT,
    sellerId int,
    buyerId int,
    value int NOT NULL,
    timestamp DATETIME NOT NULL,
    constraint foreign key (sellerId) references users (id),
    constraint foreign key (buyerId) references users (id)
);

insert into objecttypes (name, description, min_value)
VALUES ('skip_interrogazione', 'Evita una chiamata da interrogato', 50);

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

insert into objects (typeId, name, ownerId, creatorId)
values (1, "Oggetto di test", 1, 1);