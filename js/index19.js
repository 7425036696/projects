// script.js

document.getElementById('generate-password').addEventListener('click', function() {
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    
    document.getElementById('password-display').innerText = password || 'Please select at least one option';
});

function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterSet = lowercaseChars;

    if (includeUppercase) characterSet += uppercaseChars;
    if (includeNumbers) characterSet += numberChars;
    if (includeSymbols) characterSet += symbolChars;

    if (characterSet.length === 0) return '';

    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    return password;
}

// Copy to clipboard functionality
document.getElementById('copy-password').addEventListener('click', function() {
   const passwordDisplay = document.getElementById('password-display');
   const passwordText = passwordDisplay.innerText;

   if (passwordText === 'Your Password Will Appear Here' || passwordText === 'Please select at least one option') {
       alert('Please generate a password first!');
       return; // Do not proceed if there's no valid password
   }

   navigator.clipboard.writeText(passwordText).then(() => {
       alert('Password copied to clipboard!');
   }).catch(err => {
       console.error('Error copying text:', err);
   });
});