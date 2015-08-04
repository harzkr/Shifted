Orders = new Mongo.Collection("orders");

Orders.allow({
  insert: function (userId, order) {
    return userId && order.owner === userId;
  },
  update: function (userId, order, fields, modifier) {
    if (userId !== order.owner)
      return false;

    return true;
  },
  remove: function (userId, order) {
    if (userId !== order.owner)
      return false;

    return true;
  }
});
