function useVirtualId(schema) {
  // _id -> id
  // https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}

module.exports = useVirtualId;
