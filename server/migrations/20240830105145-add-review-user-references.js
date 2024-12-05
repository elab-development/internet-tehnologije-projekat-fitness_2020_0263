module.exports = {
  async up(db, client) {
   
    await db.collection('reviews').createIndex({ userId: 1 });

   
  },

  async down(db, client) {
  
    await db.collection('reviews').dropIndex({ userId: 1 });

   
  }
};

