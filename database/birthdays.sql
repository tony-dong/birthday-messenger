-- -------------------------------------------------------------
-- Database: birthdays.db
-- Generation Time: 2022-08-16 02:55:11.6740
-- -------------------------------------------------------------


CREATE TABLE "emails" ("id" integer,"address" ,"friend_id" int,"is_active" boolean, PRIMARY KEY (id));

CREATE TABLE friends(id int, first_name varchar(255), last_name varchar(255), "birthday" date);

