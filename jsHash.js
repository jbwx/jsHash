function hash(input) {
  // 62 possibilities, 8 characters long. 62^8 = approx 218 trillion. Good enough for me
  const outputDomain = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
  const magic = "jsHashSeed"; // pad to ensure minimum length is met (8).

  // accumulators (backward, forward)
  let ac1 = 0;
  let ac2 = 0;

  let s = String(input) + // stringify input
          typeof input  + // append type of input (avoid)
          magic;          // append magic number

  // djb2-like mixing, two passes
  for (let i = 0; i < s.length; i++) {
    // mix the characters into the accumulators
    ac1 = (ac1 << 5) - ac1 + s.charCodeAt(i);
    ac2 = (ac2 << 5) - ac2 + s.charCodeAt(s.length - 1 - i);
    
    // coerce to 32-bit integers
    ac1 |= 0;
    ac2 |= 0;
  }

  // mix accumulators & generate the output
  let result = "";
  for (let i = 0; i < 8; i++) {
    let mixed = ac1 ^ (ac2 + i);

    // unsigned rightshifts
    mixed ^= mixed >>> 17;
    mixed ^= mixed >>> 8;

    // use the value to get an index
    const index = Math.abs(mixed) % outputDomain.length;
    result += outputDomain[index];

    // additional hashing rounds on the accumulators
    ac1 = ((ac1 << 3) - ac1) ^ ac2;
    ac1 |= 0;
    ac2 = ((ac2 << 3) - ac2) ^ ac1;
    ac2 |= 0;
  }

  return result;
}
