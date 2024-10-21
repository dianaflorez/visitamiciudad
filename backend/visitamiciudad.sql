CREATE TABLE identification_type
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(30) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by  INT
)
ENGINE=InnoDB;

CREATE TABLE role
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(30) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT
)
ENGINE=InnoDB;

// 
CREATE TABLE usuario
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(70) NOT NULL,
  last_name   VARCHAR(70),
  identification_type_id  INT DEFAULT 1,
  identification          VARCHAR(30),
  username    VARCHAR(250) NOT NULL UNIQUE,
  email       VARCHAR(90) NOT NULL UNIQUE,
  password    VARCHAR(40),
  auth_key    VARCHAR(40),
  role_id     INT,
  activate    SMALLINT DEFAULT 0,
  state       BOOLEAN,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT,
  FOREIGN KEY (identification_type_id) REFERENCES identification_type(id),
  FOREIGN KEY (role_id) REFERENCES role(id)
)
ENGINE=InnoDB;


CREATE TABLE menu_type
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(20) NOT NULL,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT
)
ENGINE=InnoDB;


CREATE TABLE menu
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(33) NOT NULL,
  menu_type_id INT DEFAULT 0,
  parent_id   INT DEFAULT 0,
  link        TEXT,
  color_primary   VARCHAR(9),
  color_secondary VARCHAR(9),
  color_accent    VARCHAR(9),
  icon        TEXT,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT,
  FOREIGN KEY (menu_type_id) REFERENCES menu_type(id),
  FOREIGN KEY (updated_by) REFERENCES usuario(id)
)
ENGINE=InnoDB;

CREATE TABLE country(
  cod_country    char(3) NOT NULL,
  nombre         varchar(50),
  active         boolean DEFAULT FALSE
)
ENGINE=InnoDB;

CREATE TABLE departamento(
  cod_dep       char(3),
  cod_country    char(3),
  nombre        varchar(50)
) 
ENGINE=InnoDB;


CREATE TABLE city(
  id            int(11) NOT NULL auto_increment PRIMARY KEY,
  cod_country   char(3),
  cod_dep       char(3),
  cod_city      char(3),
  nombre        varchar(50),
  INDEX city (cod_country, cod_dep, cod_city)
)
ENGINE=InnoDB;

CREATE TABLE card_group
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(30) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT,
  FOREIGN KEY (updated_by) REFERENCES usuario(id)
)
ENGINE=InnoDB;


CREATE TABLE card
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  menu_id     INTEGER,
  created_id  INTEGER,
  city_id     INTEGER,
  order_no    SMALLINT DEFAULT 0,
  title       VARCHAR(70),
  image_url   VARCHAR(170),
  description TEXT,
  home        BOOLEAN DEFAULT FALSE, -- que se muestre en el home o no
  type        VARCHAR(10) DEFAULT 'Vertical', -- si se muestra en el home es horizontal o vertical
  card_group_id INTEGER,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT,
  FOREIGN KEY (menu_id) REFERENCES menu(id),
  FOREIGN KEY (city_id) REFERENCES city(id),
  FOREIGN KEY (created_id) REFERENCES usuario(id),
  FOREIGN KEY (card_group_id) REFERENCES card_group(id),
  FOREIGN KEY (updated_by) REFERENCES usuario(id)
)
ENGINE=InnoDB;

CREATE TABLE card_detail
(
  id        INT AUTO_INCREMENT PRIMARY KEY,
  card_id   INTEGER,
  title     VARCHAR(70),
  image_url VARCHAR(250),
  subtitle  TEXT,
  location  TEXT,
  longitude VARCHAR(24),
  latitude  VARCHAR(24),
  phone     VARCHAR(24),
  schedule  TEXT,
  prices    TEXT,
  description TEXT,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT,
  FOREIGN KEY (card_id) REFERENCES card(id),
  FOREIGN KEY (updated_by) REFERENCES usuario(id)
)
ENGINE=InnoDB;


CREATE TABLE card_detail_image
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  card_detail_id INTEGER,
  order_no    INTEGER,
  image_url   VARCHAR(170),
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT,
  FOREIGN KEY (card_detail_id) REFERENCES card_detail(id),
  FOREIGN KEY (updated_by) REFERENCES usuario(id)
)
ENGINE=InnoDB;


CREATE TABLE person_type
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(20) NOT NULL,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by  INT,
  FOREIGN KEY (updated_by) REFERENCES usuario(id)

)
ENGINE=InnoDB;


CREATE TABLE route
(
  id              INT AUTO_INCREMENT PRIMARY KEY,
  created_id      INTEGER,
  title           VARCHAR(170) NOT NULL,
  image_url       VARCHAR(170),
  person_type_id  INTEGER,
  number_people   INTEGER,
  number_days     INTEGER,
  recommendations TEXT,
  active          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by      INT,
  FOREIGN KEY (created_id) REFERENCES usuario(id),
  FOREIGN KEY (person_type_id) REFERENCES person_type(id),
  FOREIGN KEY (updated_by) REFERENCES usuario(id)
)
ENGINE=InnoDB;


CREATE TABLE route_card
(
  id INT AUTO_INCREMENT PRIMARY KEY,
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
)
ENGINE=InnoDB;



CREATE TABLE publicidad
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_id      INTEGER,
  orden smallint DEFAULT 0,
  title VARCHAR(40),
  urlimagen VARCHAR(170),
  active boolean DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INT,
  FOREIGN KEY (created_id) REFERENCES usuario(id),
  FOREIGN KEY (updated_by) REFERENCES usuario(id)
)
ENGINE=InnoDB;



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