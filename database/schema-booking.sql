DROP TABLE bookings CASCADE;
-- drop table booked_dates cascade; 

CREATE TABLE bookings (
    id integer NOT NULL UNIQUE PRIMARY KEY,
    user_id integer, 
    checkin timestamp with time zone, 
    length integer,
    checkout timestamp with time zone,
    listing_id integer CONSTRAINT rec_tool_rec_ref REFERENCES rooms (room_id) ON UPDATE CASCADE ON DELETE CASCADE
);
