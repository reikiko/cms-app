// (1) Name Validator

function validName(name) {
  const terms = name.split(' ');
  if (terms.length < 2 || terms.length > 3) return false;

  const isCapitalized = (word) => /^[A-Z][a-z]+$/.test(word);
  const isInitial = (term) => /^[A-Z]\.$/.test(term);
  const isWord = (term) => /^[A-Z][a-z]+$/.test(term);

  const last = terms[terms.length - 1];
  if (!isWord(last)) return false;

  if (terms.length === 2) {
    const [first, second] = terms;
    if (isInitial(first) && isWord(second)) return true;
    if (isWord(first) && isWord(second)) return true;
    return false;
  }

  if (terms.length === 3) {
    const [first, middle, last] = terms;

    if (isInitial(first) && isInitial(middle)) return true;
    if (isWord(first) && isInitial(middle)) return true;
    if (isWord(first) && isWord(middle)) return true;

    return false;
  }

  return false;
}

// (2) Find All Numbers Disappeared in an Array

function findDisappeared(nums) {
  const n = nums.length;
  const seen = new Set(nums);
  const result = [];

  for (let i = 1; i <= n; i++) {
    if (!seen.has(i)) result.push(i);
  }

  return result;
}

// --- Test ---

console.log('--- Name Validator ---');
console.log(validName('I. Tri'));
console.log(validName('I. T. Septian'));
console.log(validName('Ivan T. Septian'));
console.log(validName('Ivan Tri Septian'));

console.log(validName('Ivan'));
console.log(validName('i. Tri'));
console.log(validName('I Tri'));
console.log(validName('I. Tri Septian'));
console.log(validName('I. Tri P.'));
console.log(validName('Ivan. Tri Septian'));

console.log('\n--- Disappeared Numbers ---');
console.log(findDisappeared([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDisappeared([1, 1]));

// This Logic tests are also provided in the CMS App FE Test.
// You can find it on https://github.com/reikiko/cms-app
