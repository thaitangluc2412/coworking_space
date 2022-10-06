SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `role`
(
    role_id   VARCHAR(15),
    role_name VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (role_id)
);

CREATE TABLE `customer`
(
    customer_id   VARCHAR(15),
    customer_name VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    password      VARCHAR(255) NOT NULL,
    phone_number  VARCHAR(255) NOT NULL,
    role_id       VARCHAR(15) NOT NULL,
    CONSTRAINT PRIMARY KEY (customer_id),
    CONSTRAINT `fk_customer_role` FOREIGN KEY (role_id) REFERENCES `role` (role_id)
);

CREATE TABLE `price`
(
    price_id    VARCHAR(15),
    day_price   DOUBLE,
    month_price DOUBLE,
    year_price  DOUBLE,
    CONSTRAINT PRIMARY KEY (price_id)
);

CREATE TABLE `room_status`
(
    room_status_id   VARCHAR(15),
    room_status_name VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (room_status_id)
);

CREATE TABLE `image_storage`
(
    image_storage_id VARCHAR(15),
    CONSTRAINT PRIMARY KEY (image_storage_id)
);

CREATE TABLE `image`
(
    image_id         VARCHAR(15),
    image_storage_id VARCHAR(15)          NOT NULL,
    url              TEXT         NOT NULL,
    thumbnail        VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (image_id),
    CONSTRAINT `fk_image_image_storage` FOREIGN KEY (image_storage_id) REFERENCES `image_storage` (image_storage_id)
);

CREATE TABLE `room`
(
    room_id          VARCHAR(15),
    price_id         VARCHAR(15)          NOT NULL,
    room_name        VARCHAR(255) NOT NULL,
    size             VARCHAR(255),
    capacity         VARCHAR(255),
    room_status_id   VARCHAR(15) NOT NULL,
    description      TEXT,
    image_storage_id VARCHAR(15) NOT NULL,
    customer_id      VARCHAR(15) NOT NULL,
    CONSTRAINT PRIMARY KEY (room_id),
    CONSTRAINT `fk_room_price` FOREIGN KEY (price_id) REFERENCES price (price_id),
    CONSTRAINT `fk_room_room_status` FOREIGN KEY (room_status_id) REFERENCES room_status (room_status_id),
    CONSTRAINT `fk_room_image_storage` FOREIGN KEY (image_storage_id) REFERENCES image_storage (image_storage_id),
    CONSTRAINT `fk_room_customer` FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);

CREATE TABLE `review`
(
    review_id   VARCHAR(15),
    customer_id VARCHAR(15)      NOT NULL,
    room_id     VARCHAR(15)      NOT NULL,
    content     TEXT,
    createDate DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY (review_id),
    CONSTRAINT `fk_review_customer` FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT `fk_review_room` FOREIGN KEY (room_id) REFERENCES room (room_id)
);

CREATE TABLE `reservation_status`
(
    reservation_status_id VARCHAR(15),
    reservation_status_name VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (reservation_status_id)
);

CREATE TABLE `reservation`
(
    reservation_id     VARCHAR(15),
    room_id            VARCHAR(15)       NOT NULL,
    customer_id        VARCHAR(15)       NOT NULL,
    create_date        TIMESTAMP NOT NULL,
    start_date         TIMESTAMP NOT NULL,
    end_date           TIMESTAMP NOT NULL,
    reservation_status_id VARCHAR(15)    NOT NULL,
    total              DOUBLE    NOT NULL,
    deposit            DOUBLE    NOT NULL,
    CONSTRAINT PRIMARY KEY (reservation_id),
    CONSTRAINT `fk_reservation_room` FOREIGN KEY (room_id) REFERENCES room (room_id),
    CONSTRAINT `fk_reservation_customer` FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT `fk_reservation_reservation_status` FOREIGN KEY (reservation_status_id) REFERENCES reservation_status (reservation_status_id)
);

CREATE TABLE `inbox`
(
  inbox_id VARCHAR(15),
  seller_id VARCHAR(15),
  customer_id VARCHAR(15),
  message VARCHAR(255),
  seller_has_message BOOLEAN,
  customer_has_message BOOLEAN,
  CONSTRAINT PRIMARY KEY (inbox_id),
  CONSTRAINT `fk_inbox_seller` FOREIGN KEY (seller_id) REFERENCES customer (customer_id),
  CONSTRAINT `fk_inbox_customer` FOREIGN KEY (customer_id) REFERENCES customer (customer_id)

);

CREATE TABLE `message`
(
    message_id VARCHAR(15),
    inbox_id VARCHAR(15),
    message VARCHAR(255),
    sender_id VARCHAR(15),
    receiver_id VARCHAR(15),
    CONSTRAINT PRIMARY KEY (message_id),
    CONSTRAINT `fk_message_inbox` FOREIGN KEY (inbox_id) REFERENCES inbox (inbox_id)
);

CREATE TABLE `room_virtual`
(
    room_id          VARCHAR(15),
    price_id         VARCHAR(15)          NOT NULL,
    room_name        VARCHAR(255) NOT NULL,
    size             VARCHAR(255),
    capacity         VARCHAR(255),
    room_status_id   VARCHAR(15) NOT NULL,
    description      TEXT,
    image_storage_id VARCHAR(15) NOT NULL,
    customer_id      VARCHAR(15) NOT NULL,
    CONSTRAINT PRIMARY KEY (room_id)
);

INSERT INTO `role` VALUES ('IT04ZnPgBYSf3Qm', 'CUSTOMER'), ('ksWaZyhhDon1Niq', 'ADMIN');
INSERT INTO `room_status` VALUES ('7XdZzxWRzZhBBcb','ACTIVE'),('B3dVfrqwASWSVVb','INACTIVE');
INSERT INTO `reservation_status` VALUES ('eT4CxDVeDhP4TsF','PENDING'),('tngpi7zVKfwAY0N','APPROVED'),('0KT0vOJ9BzW8w79','PAYING'),('glG2CED3UAYrlHR','CANCELLED');
SET FOREIGN_KEY_CHECKS = 1;