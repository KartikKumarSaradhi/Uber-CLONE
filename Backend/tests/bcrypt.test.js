const bcrypt = require('bcrypt');

async function testPassword() {
  const password = 'kartik'; // the password you're trying to login with
  console.log('Original Password:', password);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);

  // Compare the password with the hashed one
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Password Match Test Result:', isMatch);
}

testPassword();
