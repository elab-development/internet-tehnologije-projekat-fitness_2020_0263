module.exports = {
  async up(db, client) {
    // Dodaj jedinstveni indeks za `userId` u kolekciji `plans`
    await db.collection('plans').createIndex({ userId: 1 }, { unique: true });

    // Ova migracija ne zahteva promene na kolekciji `users`
    // jer `userId` referencira korisnike u kolekciji `plans`
  },

  async down(db, client) {
    // Ukloni jedinstveni indeks za `userId` u kolekciji `plans`
    await db.collection('plans').dropIndex({ userId: 1 });

    // Ova migracija ne zahteva promene na kolekciji `users`
  }
};
