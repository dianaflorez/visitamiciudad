CREATE TABLE identification_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    last_name VARCHAR(70),
    identification_type_id INT DEFAULT 1,
    identification VARCHAR(30),
    username VARCHAR(250) NOT NULL UNIQUE,
    email VARCHAR(90) NOT NULL UNIQUE,
    password VARCHAR(40),
    auth_key VARCHAR(40),
    access_token VARCHAR(40),
    role_id INT,
    activate SMALLINT DEFAULT 0,
    state BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (identification_type_id) REFERENCES identification_type(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE menu_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT
);

CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(33) NOT NULL,
    menu_type_id INT DEFAULT 0,
    parent_id INT DEFAULT 0,
    link TEXT,
    color_primary VARCHAR(9),
    color_secondary VARCHAR(9),
    color_accent VARCHAR(9),
    icon TEXT,
    image_url VARCHAR(250),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (menu_type_id) REFERENCES menu_type(id),
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE country (
    cod_country CHAR(3) PRIMARY KEY,
    nombre VARCHAR(50),
    active BOOLEAN DEFAULT FALSE
);

CREATE TABLE departamento (
    cod_dep CHAR(3),
    cod_country CHAR(3),
    nombre VARCHAR(50),
    PRIMARY KEY (cod_dep, cod_country),
    FOREIGN KEY (cod_country) REFERENCES country(cod_country)
);

CREATE TABLE city (
    id SERIAL PRIMARY KEY,
    cod_country CHAR(3),
    cod_dep CHAR(3),
    cod_city CHAR(3),
    nombre VARCHAR(50),
    UNIQUE (cod_country, cod_dep, cod_city),
    FOREIGN KEY (cod_country, cod_dep) REFERENCES departamento(cod_country, cod_dep)
);

CREATE TABLE card_group (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    image_url VARCHAR(170),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE card (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER,
    created_id INTEGER,
    city_id INTEGER,
    order_no SMALLINT DEFAULT 0,
    title VARCHAR(170),
    image_url VARCHAR(170),
    description TEXT,
    home BOOLEAN DEFAULT FALSE,
    type VARCHAR(10) DEFAULT 'Vertical',
    card_group_id INTEGER,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (menu_id) REFERENCES menu(id),
    FOREIGN KEY (city_id) REFERENCES city(id),
    FOREIGN KEY (created_id) REFERENCES usuario(id),
    FOREIGN KEY (card_group_id) REFERENCES card_group(id),
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE card_detail (
    id SERIAL PRIMARY KEY,
    card_id INTEGER,
    title VARCHAR(70),
    image_url VARCHAR(250),
    subtitle TEXT,
    location TEXT,
    longitude VARCHAR(24),
    latitude VARCHAR(24),
    phone VARCHAR(24),
    schedule TEXT,
    prices TEXT,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (card_id) REFERENCES card(id),
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE card_detail_image (
    id SERIAL PRIMARY KEY,
    card_detail_id INTEGER,
    order_no INTEGER,
    image_url VARCHAR(170),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (card_detail_id) REFERENCES card_detail(id),
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE person_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE route (
    id SERIAL PRIMARY KEY,
    created_id INTEGER,
    title VARCHAR(170) NOT NULL,
    image_url VARCHAR(170),
    person_type_id INTEGER,
    number_people INTEGER,
    number_days INTEGER,
    recommendations TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (created_id) REFERENCES usuario(id),
    FOREIGN KEY (person_type_id) REFERENCES person_type(id),
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE route_card (
    id SERIAL PRIMARY KEY,
    route_id INTEGER,
    card_id INTEGER,
    day_number SMALLINT DEFAULT 1,
    orden INTEGER,
    recommendations TEXT,
    start_time TIME,
    end_time TIME,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (route_id) REFERENCES route(id),
    FOREIGN KEY (card_id) REFERENCES card(id),
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE publicidad (
    id SERIAL PRIMARY KEY,
    created_id INTEGER,
    orden SMALLINT DEFAULT 0,
    title VARCHAR(40),
    urlimagen VARCHAR(170),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (created_id) REFERENCES usuario(id),
    FOREIGN KEY (updated_by) REFERENCES usuario(id)
);




INSERT INTO identification_type(id, name) VALUES
(1, 'Cedula Ciudadanía'),
(2, 'Cedula Extranjería'),
(3, 'Tarjeta Identidad'),
(4, 'Pasaporte');

INSERT INTO role(id, name) VALUES
(1, 'SuperAdmin'),
(2, 'Admin'),
(3, 'Editor');


INSERT INTO menu_type(id, name) VALUES
(1, 'Home'),
(2, 'Submenu'),
(3, 'Estatico'),
(4, 'Rutas'),
(5, 'Card');

INSERT INTO menu(id, name, menu_type_id, parent_id) VALUES
(1, 'Inicio', 1, 0),
(2, 'Sitios Turístico', 2, 0),
(3, 'Sitios Historicos', 5, 2),
(4, 'Sitios Geográficos', 5, 2),
(5, 'Sitios de Valor Espiritual', 5, 2),
(6, 'Sitios de Impacto Economico', 5, 2),
(7, 'Sitios Culturales', 2, 0),
(8, 'Artesanias', 5, 7),
(9, 'Musica', 5, 7),
(10, 'Carnaval', 5, 7),
(11, 'Gastronomía', 2, 0),
(12, 'Comida Tipica', 5, 11),
(13, 'Restaurantes', 5, 11),
(14, 'Comida Rapida', 5, 11),
(15, 'Heladería', 5, 11),
(16, 'Entretenimiento', 2, 0),
(17, 'Bares', 5, 16),
(18, 'Cines', 5, 16),
(19, 'Discotekas', 5, 16),
(20, 'Juegos Grupales', 5, 16),
(21, 'Cafes', 5, 16),
(22, 'Que Compro?', 5, 0),
(23, 'Hoteles y Transporte', 5, 0),
(24, 'Quienes Somos', 3, 0);


INSERT INTO person_type(id, name) VALUES
(1, 'Familia'),
(2, 'Pareja'),
(3, 'Individual'),
(4, 'Institucional');


-- USUARIOS

INSERT INTO usuario( id, name, last_name, identification_type_id, identification,
  username, email, password,
  auth_key, access_token, role_id, activate, state, 
  created_at, updated_at, updated_by
)
VALUES (1, 'Diana', 'Florez', 1, '00000007',
  'DianaFlorez','dianaflorezbravo@gmail.com','diwVJvPs7M..6', 
  '0', '0', 1, 1, true,
  current_date, current_date, 1);


INSERT INTO usuario( id, name, last_name, identification_type_id, identification,
  username, email, password,
  auth_key, access_token, role_id, activate, state, 
  created_at, updated_at, updated_by
)
VALUES (2, 'Daniel', 'Burgues', 1, '00000008',
  'DianaBurgues','dianaBurgues@gmail.com','diwVJvPs7M..6', 
  '0', '0', 1, 1, true,
  current_date, current_date, 1);


INSERT INTO usuario( id, name, last_name, identification_type_id, identification,
  username, email, password,
  auth_key, access_token, role_id, activate, state, 
  created_at, updated_at, updated_by
)
VALUES (3, 'Esteban', 'Ramires', 1, '00000009',
  'EstebanRamires','EstebanRamires@gmail.com','diwVJvPs7M..6', 
  '0', '0', 1, 1, true,
  current_date, current_date, 1);




INSERT INTO country
(cod_country, nombre) VALUES
('170','Colombia');

INSERT INTO departamento
(cod_dep, cod_country, nombre) VALUES
('52','170','NARIÑO');

INSERT INTO city
(id, cod_dep, cod_country, cod_city, nombre) VALUES
(1, '52','170','001','PASTO');

INSERT INTO card_group(id, name) VALUES
(1, 'General');