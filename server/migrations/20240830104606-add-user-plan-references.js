module.exports = {
  async up(db, client) {
   
    await db.collection('plans').createIndex({ userId: 1 }, { unique: true });

   
  },

  async down(db, client) {
  
    await db.collection('plans').dropIndex({ userId: 1 });

   
  }
};
