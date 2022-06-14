function checkPalindroma() {
  const word = document.getElementById('string').value;
  string = word.toString();
  const arrayWord = string.split('');
  const reverseWord = arrayWord.reverse();
  const arrayReverse = reverseWord.join('');
  console.log(word);
  if (string == arrayReverse) {
    alert('La parola inseria è palindroma');
  } else {
    alert('La parola inserità non è palindroma');
  }
}
