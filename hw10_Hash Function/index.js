// ==== Hash Function ====

//For creating hash function we can use charCodeAt() method,
// that returns a Unicode character set code unit

function hashFunc(str) {
  let hash = 0;

  if (str.length === 0) return hash; // if the 'hash' is empty

  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);

    // use pseudo-hash for efficient calculation.

    hash = (hash << 5) - hash + char;
  }
  return hash;
}

const string = "qwutedfvugeduyRTDSF hghghghghgh uhu3268283t";

const hf = hashFunc("wfgsdvsdfhsdsdffsvjsdfsdfsdfvsdvsdsdfsdfsdfvkbvcxvlnhghcghvjbkncxf");
console.log(hf);
console.log(hf.toString().length);
