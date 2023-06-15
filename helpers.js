const blockElements = Array.from(document.querySelectorAll(".block"));

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

export function blurBlocks(player) {
  const patterNumber = [];
  const length = player.length;
  let currentEl;

  // Number 4 and 5 marks can't make a pattern with their next marks so we slice our array
  const diff = player.slice(0, 3).map((el, i) => {
    const newArr = [];
    for (let index = i + 1; index < length; index++) {
      newArr.push(-(el - player[index]));
    }
    return [newArr, el];
  });

  // Check horizontally
  if (
    diff.some((el) => {
      if (el[0].includes(1) && el[0].includes(2) && el[1] % 3 === 0) {
        currentEl = el[1];

        return true;
      }
    })
  )
    patterNumber.push([1, currentEl]);

  //Check vertically
  if (
    diff.some((el) => {
      if (el[0].includes(3) && el[0].includes(6)) {
        currentEl = el[1];

        return true;
      }
    })
  )
    patterNumber.push([2, currentEl]);

  // Check diagonally (start from first block)
  if (
    diff.some((el) => {
      if (el[0].includes(4) && el[0].includes(8)) {
        currentEl = el[1];

        return true;
      }
    })
  )
    patterNumber.push([3, currentEl]);

  // Check diagonally (start from 3th block)
  if (
    diff.some((el) => {
      if (el[0].includes(2) && el[0].includes(4) && el[1] === 2) {
        currentEl = el[1];

        return true;
      }
    })
  )
    patterNumber.push([4, currentEl]);

  const patternBlocks = blockFinder(patterNumber);
  const bluredBlocks = [];

  for (let i = 0; i < 9; i++) {
    if (!patternBlocks.includes(i)) {
      bluredBlocks.push(i);
    }
  }

  return bluredBlocks;
}

function blockFinder(patterns) {
  const patternBlocks = [];
  patterns.forEach((pattern) => {
    if (pattern[0] === 1)
      patternBlocks.push([pattern[1], pattern[1] + 1, pattern[1] + 2]);
    if (pattern[0] === 2)
      patternBlocks.push([pattern[1], pattern[1] + 3, pattern[1] + 6]);
    if (pattern[0] === 3)
      patternBlocks.push([pattern[1], pattern[1] + 4, pattern[1] + 8]);
    if (pattern[0] === 4)
      patternBlocks.push([pattern[1], pattern[1] + 2, pattern[1] + 4]);
  });

  const repeatedPattern = patternBlocks[1]
    ? patternBlocks[0].concat(patternBlocks[1])
    : patternBlocks[0];

  return [...new Set(repeatedPattern)].sort();
}

export function addBlurStyleToTable(blocks) {
  blocks.forEach((block) => {
    blockElements.forEach((blockEl) => {
      if (block === +blockEl.dataset.blockNumber) {
        blockEl.classList.add("blur");
      }
    });
  });
}
