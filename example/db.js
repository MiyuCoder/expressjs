// Require Modules
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default User 
db.defaults({ users: [] })
  .write();

module.exports = db;