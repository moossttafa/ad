const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const mapActions = (id, resource) => ([
  {
    "name": "edit",
    "icon": "far fa-edit",
    "class": `${resource}-edit`,
    "link": `http://localhost:3000/${resource}/${id}/`
  },
  {
    "name": "delete",
    "icon": "far fa-trash-alt",
    "class": `${resource}-delete toggle-dialog`,
    "link": `http://localhost:3000/${resource}/${id}/`,
  }
])

const mapItem = (item, resource) => {
  let {_id, _v, ...data} = item._doc
  return {...data, id: _id, actions: mapActions(_id, resource)}
}

const mapItems = (items, resource) => items.map(item => mapItem(item, resource))



module.exports = {
  mapActions, mapItems, mapItem, validator
}
