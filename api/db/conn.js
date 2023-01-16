const mongoose = require('mongoose')

mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/systemLogin')
  console.log('Connection with mongo works!! ');
}

main()
  .catch((err) => {
    console.log(err)
  })

module.exports = mongoose