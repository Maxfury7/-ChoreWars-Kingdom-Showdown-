const bcrypt = require('bcrypt');
const db = require('../db');

class User {
  static async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static async create(username, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (username, password, xp) VALUES (?, ?, 0)',
          [username, hashedPassword],
          function(err) {
            if (err) {
              console.error('User creation error:', {
                timestamp: new Date().toISOString(),
                error: {
                  name: err.name,
                  message: err.message,
                  code: err.code
                },
                username: username
              });
              return reject(new Error('Failed to create user: ' + err.message));
            }
            resolve(this.lastID);
          }
        );
      });
    } catch (error) {
      console.error('Password hashing error:', {
        timestamp: new Date().toISOString(),
        error: {
          name: error.name,
          message: error.message
        }
      });
      throw new Error('Failed to hash password: ' + error.message);
    }
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async getXP(userId) {
    return new Promise((resolve, reject) => {
      db.get('SELECT xp FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) return reject(err);
        resolve(row?.xp || 0);
      });
    });
  }

  static async addXP(userId, amount) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET xp = xp + ? WHERE id = ?',
        [amount, userId],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes);
        }
      );
    });
  }
}

module.exports = User;
