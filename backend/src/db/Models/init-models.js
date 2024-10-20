var DataTypes = require("sequelize").DataTypes;
var _card = require("./card");
var _card_detail = require("./card_detail");
var _card_detail_image = require("./card_detail_image");
var _card_group = require("./card_group");
var _city = require("./city");
var _country = require("./country");
var _departamento = require("./departamento");
var _identification_type = require("./identification_type");
var _menu = require("./menu");
var _menu_type = require("./menu_type");
var _person_type = require("./person_type");
var _publicidad = require("./publicidad");
var _role = require("./role");
var _route = require("./route");
var _route_card = require("./route_card");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var card = _card(sequelize, DataTypes);
  var card_detail = _card_detail(sequelize, DataTypes);
  var card_detail_image = _card_detail_image(sequelize, DataTypes);
  var card_group = _card_group(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var country = _country(sequelize, DataTypes);
  var departamento = _departamento(sequelize, DataTypes);
  var identification_type = _identification_type(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var menu_type = _menu_type(sequelize, DataTypes);
  var person_type = _person_type(sequelize, DataTypes);
  var publicidad = _publicidad(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var route = _route(sequelize, DataTypes);
  var route_card = _route_card(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  card_detail.belongsTo(card, { as: "card", foreignKey: "card_id"});
  card.hasMany(card_detail, { as: "card_details", foreignKey: "card_id"});
  route_card.belongsTo(card, { as: "card", foreignKey: "card_id"});
  card.hasMany(route_card, { as: "route_cards", foreignKey: "card_id"});
  card_detail_image.belongsTo(card_detail, { as: "card_detail", foreignKey: "card_detail_id"});
  card_detail.hasMany(card_detail_image, { as: "card_detail_images", foreignKey: "card_detail_id"});
  card.belongsTo(card_group, { as: "card_group", foreignKey: "card_group_id"});
  card_group.hasMany(card, { as: "cards", foreignKey: "card_group_id"});
  card.belongsTo(city, { as: "city", foreignKey: "city_id"});
  city.hasMany(card, { as: "cards", foreignKey: "city_id"});
  departamento.belongsTo(country, { as: "cod_country_country", foreignKey: "cod_country"});
  country.hasMany(departamento, { as: "departamentos", foreignKey: "cod_country"});
  city.belongsTo(departamento, { as: "cod_country_departamento", foreignKey: "cod_country"});
  departamento.hasMany(city, { as: "cities", foreignKey: "cod_country"});
  city.belongsTo(departamento, { as: "cod_dep_departamento", foreignKey: "cod_dep"});
  departamento.hasMany(city, { as: "cod_dep_cities", foreignKey: "cod_dep"});
  usuario.belongsTo(identification_type, { as: "identification_type", foreignKey: "identification_type_id"});
  identification_type.hasMany(usuario, { as: "usuarios", foreignKey: "identification_type_id"});
  card.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(card, { as: "cards", foreignKey: "menu_id"});
  menu.belongsTo(menu_type, { as: "menu_type", foreignKey: "menu_type_id"});
  menu_type.hasMany(menu, { as: "menus", foreignKey: "menu_type_id"});
  route.belongsTo(person_type, { as: "person_type", foreignKey: "person_type_id"});
  person_type.hasMany(route, { as: "routes", foreignKey: "person_type_id"});
  usuario.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(usuario, { as: "usuarios", foreignKey: "role_id"});
  route_card.belongsTo(route, { as: "route", foreignKey: "route_id"});
  route.hasMany(route_card, { as: "route_cards", foreignKey: "route_id"});
  card.belongsTo(usuario, { as: "created", foreignKey: "created_id"});
  usuario.hasMany(card, { as: "cards", foreignKey: "created_id"});
  card.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(card, { as: "updated_by_cards", foreignKey: "updated_by"});
  card_detail.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(card_detail, { as: "card_details", foreignKey: "updated_by"});
  card_detail_image.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(card_detail_image, { as: "card_detail_images", foreignKey: "updated_by"});
  card_group.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(card_group, { as: "card_groups", foreignKey: "updated_by"});
  menu.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(menu, { as: "menus", foreignKey: "updated_by"});
  person_type.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(person_type, { as: "person_types", foreignKey: "updated_by"});
  publicidad.belongsTo(usuario, { as: "created", foreignKey: "created_id"});
  usuario.hasMany(publicidad, { as: "publicidads", foreignKey: "created_id"});
  publicidad.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(publicidad, { as: "updated_by_publicidads", foreignKey: "updated_by"});
  route.belongsTo(usuario, { as: "created", foreignKey: "created_id"});
  usuario.hasMany(route, { as: "routes", foreignKey: "created_id"});
  route.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(route, { as: "updated_by_routes", foreignKey: "updated_by"});
  route_card.belongsTo(usuario, { as: "updated_by_usuario", foreignKey: "updated_by"});
  usuario.hasMany(route_card, { as: "route_cards", foreignKey: "updated_by"});

  return {
    card,
    card_detail,
    card_detail_image,
    card_group,
    city,
    country,
    departamento,
    identification_type,
    menu,
    menu_type,
    person_type,
    publicidad,
    role,
    route,
    route_card,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
