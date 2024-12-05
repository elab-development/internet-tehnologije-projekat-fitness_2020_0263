// migrations/[timestamp]-create-reviews-collection.js
module.exports = {
  async up(db, client) {
    // Kreiramo kolekciju 'reviews'
    await db.createCollection('reviews');

    // Dodajemo atribute 'desc' i 'userId' u kolekciju 'reviews'
    await db.collection('reviews').insertMany([
      {
        desc: 'Odlican sajt',
        userId: '66bcf00f4103da090f7df5a7',
        createdAt: new Date(), // audit kolona za datum kreiranja
        updatedAt: new Date()// primer ObjectId
      },
      {
        desc: 'Nisam zadovoljan ovim planom.',
        userId: '66bcf00f4103da090f7df5a7',
        createdAt: new Date(), // audit kolona za datum kreiranja
        updatedAt: new Date() // primer ObjectId
      },
     
    ]);
  },

  async down(db, client) {
    // Brisanje kolekcije 'reviews' u slučaju rollback-a
    await db.collection('reviews').drop();
  }
};
