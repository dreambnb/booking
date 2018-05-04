DROP TABLE rooms CASCADE;
DROP TABLE booked_dates CASCADE;

CREATE TABLE rooms (
    room_id integer NOT NULL UNIQUE PRIMARY KEY,
    room_name varchar(255),
    room_rate integer,
    guest_name varchar(255),
    host_name varchar(255),
    review_count integer,
    review_grade decimal
);

CREATE TABLE booked_dates (
    id integer NOT NULL PRIMARY KEY,
    date DATE,
    room_id integer CONSTRAINT rec_tool_rec_ref REFERENCES rooms (room_id) ON UPDATE CASCADE ON DELETE CASCADE

);

