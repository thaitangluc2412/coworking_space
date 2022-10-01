SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `role`
(
    role_id   INT AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (role_id)
);

CREATE TABLE `customer`
(
    customer_id   INT AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    password      VARCHAR(255) NOT NULL,
    phone_number  VARCHAR(255) NOT NULL,
    role_id       INT NOT NULL,
    CONSTRAINT PRIMARY KEY (customer_id),
    CONSTRAINT `fk_customer_role` FOREIGN KEY (role_id) REFERENCES `role` (role_id)
);

CREATE TABLE `price`
(
    price_id    INT AUTO_INCREMENT,
    day_price   DOUBLE,
    month_price DOUBLE,
    year_price  DOUBLE,
    CONSTRAINT PRIMARY KEY (price_id)
);

CREATE TABLE `room_status`
(
    room_status_id   INT AUTO_INCREMENT,
    room_status_name VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (room_status_id)
);

CREATE TABLE `image_storage`
(
    image_storage_id INT AUTO_INCREMENT,
    CONSTRAINT PRIMARY KEY (image_storage_id)
);

CREATE TABLE `image`
(
    image_id         INT          AUTO_INCREMENT,
    image_storage_id INT          NOT NULL,
    url              TEXT         NOT NULL,
    thumbnail        VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (image_id),
    CONSTRAINT `fk_image_image_storage` FOREIGN KEY (image_storage_id) REFERENCES `image_storage` (image_storage_id)
);

CREATE TABLE `room`
(
    room_id          INT AUTO_INCREMENT,
    price_id         INT          NOT NULL,
    room_name        VARCHAR(255) NOT NULL,
    size             VARCHAR(255),
    capacity         VARCHAR(255),
    room_status_id   INT NOT NULL,
    description      TEXT,
    image_storage_id INT NOT NULL,
    customer_id      INT NOT NULL,
    CONSTRAINT PRIMARY KEY (room_id),
    CONSTRAINT `fk_room_price` FOREIGN KEY (price_id) REFERENCES price (price_id),
    CONSTRAINT `fk_room_room_status` FOREIGN KEY (room_status_id) REFERENCES room_status (room_status_id),
    CONSTRAINT `fk_room_image_storage` FOREIGN KEY (image_storage_id) REFERENCES image_storage (image_storage_id),
    CONSTRAINT `fk_room_customer` FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);

CREATE TABLE `review`
(
    review_id   INT AUTO_INCREMENT,
    customer_id INT      NOT NULL,
    room_id     INT      NOT NULL,
    content     TEXT,
    createDate DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY (review_id),
    CONSTRAINT `fk_review_customer` FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT `fk_review_room` FOREIGN KEY (room_id) REFERENCES room (room_id)
);

CREATE TABLE `reservation_status`
(
    reservation_status_id INT AUTO_INCREMENT,
    reservation_status_name VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (reservation_status_id)
);

CREATE TABLE `reservation`
(
    reservation_id     INT AUTO_INCREMENT,
    room_id            INT       NOT NULL,
    customer_id        INT       NOT NULL,
    create_date        TIMESTAMP NOT NULL,
    start_date         TIMESTAMP NOT NULL,
    end_date           TIMESTAMP NOT NULL,
    reservation_status_id INT    NOT NULL,
    total              DOUBLE    NOT NULL,
    deposit            DOUBLE    NOT NULL,
    CONSTRAINT PRIMARY KEY (reservation_id),
    CONSTRAINT `fk_reservation_room` FOREIGN KEY (room_id) REFERENCES room (room_id),
    CONSTRAINT `fk_reservation_customer` FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT `fk_reservation_reservation_status` FOREIGN KEY (reservation_status_id) REFERENCES reservation_status (reservation_status_id)
);

INSERT INTO `role` VALUES (1, 'CUSTOMER'), (2, 'ADMIN');
INSERT INTO `room_status` VALUES (1,'ACTIVE'),(2,'INACTIVE');
INSERT INTO `reservation_status` VALUES (1,'PENDING'),(2,'APPROVED'),(3,'PAYING'),(4,'CANCELLED');
SET FOREIGN_KEY_CHECKS = 1;