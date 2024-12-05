module.exports = {
  async up(db, client) {
    // Create 'cache' collection
    await db.createCollection('cache');

    // Create 'cache_locks' collection
    await db.createCollection('cache_locks');

    // Optionally, you can create indexes if you have specific query requirements.
    await db.collection('cache').createIndex({ key: 1 }, { unique: true });
    await db.collection('cache_locks').createIndex({ key: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop 'cache' collection if rolling back
    await db.collection('cache').drop();

    // Drop 'cache_locks' collection if rolling back
    await db.collection('cache_locks').drop();
  }
};
