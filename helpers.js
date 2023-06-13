export function blockHasMark(el) {
  if (el.querySelector(".dot") || el.querySelector(".cross")) return true;
  return false;
}

export function setMark(el, turn) {
  if (!turn) {
    el.innerHTML = '<div class="dot"></div>';
  } else el.innerHTML = '<div class="cross">&times;</div>';
}

export function checkwinner(player) {
  const length = player.length;
  if (length < 3) return; // If there is less than 3 marks quit function because we can't have a winning patern with that

  // Number 4 and 5 marks can't make a pattern with their next marks so we slice our array
  const diff = player.slice(0, 3).map((el, i) => {
    const newArr = [];
    for (let index = i + 1; index < length; index++) {
      newArr.push(-(el - player[index]));
    }
    return [newArr, el];
  });

  console.log(diff);

  // Check horizontally
  if (
    diff.some((el) => {
      if (el[0].includes(1) && el[0].includes(2) && el[1] % 3 === 0)
        return true;
    })
  )
    return true;

  //Check vertically
  if (
    diff.some((el) => {
      if (el[0].includes(3) && el[0].includes(6)) return true;
    })
  )
    return true;

  // Check diagonally (start from first block)
  if (
    diff.some((el) => {
      if (el[0].includes(4) && el[0].includes(8)) return true;
    })
  )
    return true;

  // Check diagonally (start from 3th block)
  if (
    diff.some((el) => {
      if (el[0].includes(2) && el[0].includes(4) && el[1] === 2) return true;
    })
  )
    return true;
}
