module.exports = {
  async up(db, client) {
    // Kreiramo kolekciju 'plans'
    await db.createCollection('plans');

   
    await db.collection('plans').insertMany([
      {
        userId: '66bcf00f4103da090f7df5a7',
        exercises: [
         "0006", 
          "0007"  
        ],
        createdAt: new Date(), 
        updatedAt: new Date()  
      },
      {
        userId: '66bcf00f4103da090f7df5a7',
        exercises: [
          "0045",
          "0025"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(db, client) {
    // Uklanjanje kolekcije 'plans' u slučaju rollback-a
    await db.collection('plans').drop();
  }
};
