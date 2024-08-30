const bcrypt = require('bcrypt');
module.exports = {
  async up(db, client) {

    const hashPassword = async (password) => {
      const saltRounds = 10; 
      return bcrypt.hash(password, saltRounds);
    };

    const hashedPassword1 = await hashPassword('12345');
    const hashedPassword2 = await hashPassword('marko123');
    
    await db.collection('users').insertMany([
      {
        firstName: 'Milica',
        lastName: 'Markovic',
        email: 'milica1@gmail.com',
        password:hashedPassword1,
        admin:false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Marko',
        lastName: 'Markovic',
        email: 'marko1@gmail.com',
        password:hashedPassword2,
        admin:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     
    ]);
  },

  async down(db, client) {
    
    await db.collection('users').drop();
  }
};