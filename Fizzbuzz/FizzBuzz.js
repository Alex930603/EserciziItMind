function FizzBuzz() {
  var number = document.getElementById('numberInput').value;

  if (number % 3 == 0 && number % 5 != 0) {
    document.write('Fizz');
  } else if (number % 5 == 0 && number % 3 != 0) {
    document.write('Buzz');
  } else if (number % 5 == 0 && number % 3 == 0) {
    document.write('FizzBuzz');
  } else {
    document.write(number);
  }
}
