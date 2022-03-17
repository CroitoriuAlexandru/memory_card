// randomize array
export function shuffleArray(array) {
  let randomArray = [];
  let i = array.length - 1;
  while (i >= 0) {
    let randomPos = Math.floor(Math.random() * i);
    randomArray.push(array[randomPos]);
    array.splice(randomPos, 1);
    i--;
  }
  return randomArray;
}
