var admin = require("firebase-admin");

var serviceAccount = require("./romario-tg-db-firebase-adminsdk-csizw-56446b3ae8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://romario-tg-db-default-rtdb.europe-west1.firebasedatabase.app"
});


module.exports = admin



