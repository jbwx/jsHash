// usage: node hashTestSuite.js

const HASH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const HASH_LENGTH = 8;
const NUM_RANDOM_STRINGS = 100000; // change at your leisure!

console.log("Generating a test corpus...");

const corpusSet = new Set();
const add = (item) => corpusSet.add(item);
const addAll = (items) => items.forEach((item) => corpusSet.add(item));

function addFoundationalCases() {
  addAll([
    "",
    null,
    undefined,
    0,
    1,
    -1,
    true,
    false,
    NaN,
    Infinity,
    -Infinity,
    "null",
    "undefined",
    "0",
    "1",
    "true",
    "false",
    " ",
    "\t",
    "\n",
    "\r\n",
    " \t \n ",
    "\0",
    "a\0b",
    "a",
    "b",
    "aa",
    "ab",
    "ba",
    "bb",
  ]);
}

function addIncrementalRepetitionCases() {
  for (let i = 0; i < 256; i++) {
    add("a".repeat(1000 + i));
  }
  for (let i = 0; i < 256; i++) {
    add("\0".repeat(1000 + i));
  }
  for (let i = 0; i < 128; i++) {
    add("ab".repeat(500 + i));
  }
}

function addInterruptedNoiseCases() {
  const noise = "x".repeat(2048);
  const interrupt = "-INTERRUPT-";
  for (let i = 0; i < 64; i++) {
    const pos = i * 32;
    add(noise.slice(0, pos) + interrupt + noise.slice(pos + interrupt.length));
  }
  add(noise); // The baseline
}

function addRealWorldCases() {
  const uuids = Array.from({ length: 50 }, () => crypto.randomUUID());
  const dates = Array.from({ length: 50 }, (_, i) =>
    new Date(Date.now() - i * 3600000).toISOString(),
  );
  const urls = [
    "https://example.com/path/to/resource",
    "https://example.com/path/to/resource?query=1",
    "http://example.com/path/to/resource",
    "https://example.org/path/to/resource",
    "https://example.com/path/to/another/resource",
  ];
  const filePaths = [
    "/usr/local/bin/node",
    "/usr/local/lib/node",
    "C:\\Users\\Test\\Documents\\file.txt",
    "C:\\Users\\Test\\Documents\\file.json",
  ];
  const dictionary = [
    "apple",
    "banana",
    "orange",
    "grape",
    "pear",
    "strawberry",
    "blueberry",
    "raspberry",
    "password",
    "123456",
    "admin",
    "root",
    "test",
    "guest",
  ];
  addAll([...uuids, ...dates, ...urls, ...filePaths, ...dictionary]);
}

function addCombinatorialCases() {
  // Test for weaknesses related to concatenation (e.g., hash(a+b) vs hash(b+a))
  const parts = [
    "user_id:",
    "session_token=",
    "item_name=",
    "category/",
    "article-",
  ];
  const values = ["12345", "abcdef", "98765", "fedcba", crypto.randomUUID()];
  for (const p1 of parts) {
    for (const p2 of values) {
      add(p1 + p2);
      add(p2 + p1);
    }
  }
}

function addStructuredDataCases() {
  // Test sensitivity to minor changes in structured data and character sets
  addAll([
    '{"id":123,"name":"test"}',
    '{"id":124,"name":"test"}',
    '{"id":123,"name":"Test"}',
    '{"name":"test","id":123}', // Anagrammatic JSON
    "stop",
    "pots",
    "tops",
    "spot", // Anagrams
    "üéñçß",
    "你好世界",
    "こんにちは",
    "안녕하세요",
    "Здравствуйте",
    "😀🚀👍❤️",
  ]);
  // Inputs that look like hashes
  for (let i = 0; i < 100; i++) {
    let fakeHash = "";
    for (let j = 0; j < HASH_LENGTH; j++)
      fakeHash += HASH_CHARS[Math.floor(Math.random() * HASH_CHARS.length)];
    add(fakeHash);
  }
}

function addRandomFillerCases(count) {
  const generateRandomString = (length) => {
    let result = "";
    const characters =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    for (let i = 0; i < length; i++)
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    return result;
  };
  for (let i = 0; i < count; i++) {
    const len = Math.floor(Math.random() * 200) + 1;
    add(generateRandomString(len));
  }
}

// --- Execute Generators ---
addFoundationalCases();
addIncrementalRepetitionCases();
addInterruptedNoiseCases();
addRealWorldCases();
addCombinatorialCases();
addStructuredDataCases();
addRandomFillerCases(NUM_RANDOM_STRINGS); // Add a small amount of pure randomness

const testCorpus = Array.from(corpusSet);
console.log(`Total unique test cases generated: ${testCorpus.length}`);

// execution time!
console.log("\nStarting hash execution...");
const allHashes = [];
const startTime = Date.now();

testCorpus.forEach((item, index) => {
  const inputStr = String(item);
  const result = hash(inputStr);

  if (typeof result !== "string" || result.length !== HASH_LENGTH) {
    console.error(
      `FATAL: Hash function returned an invalid value for input "${item}". Expected ${HASH_LENGTH}-char string, got:`,
      result,
    );
    return;
  }
  allHashes.push(result);

  if ((index + 1) % 2000 === 0) {
    console.log(`  ...processed ${index + 1} hashes`);
  }
});

const endTime = Date.now();
console.log(
  `Hashing complete. Processed ${allHashes.length} inputs in ${endTime - startTime}ms.`,
);

// data compilation and analysis
console.log("\n--- HASH OUTPUT ANALYSIS ---");

console.group("1. Total Character Frequency");
const totalFreq = {};
HASH_CHARS.split("").forEach((char) => (totalFreq[char] = 0));
for (const h of allHashes) for (const char of h) totalFreq[char]++;
const totalChars = allHashes.length * HASH_LENGTH;
const expectedTotal = (totalChars / HASH_CHARS.length).toFixed(2);
console.log(
  `Total characters analyzed: ${totalChars}. Expected count per char: ~${expectedTotal}.`,
);
console.log(
  "A good hash function should show all counts very close to the expected value.",
);
console.table(totalFreq);
console.groupEnd();

console.group("\n2. Consolidated Positional Frequency");
const positionalFreq = {};
HASH_CHARS.split("").forEach(
  (char) => (positionalFreq[char] = Array(HASH_LENGTH).fill(0)),
);
for (const h of allHashes) {
  for (let i = 0; i < HASH_LENGTH; i++) {
    const char = h[i];
    if (positionalFreq[char]) positionalFreq[char][i]++;
  }
}
const expectedPositional = (allHashes.length / HASH_CHARS.length).toFixed(2);
console.log(
  `Total hashes: ${allHashes.length}. Expected count per char at each position: ~${expectedPositional}.`,
);
console.log(
  "This table shows character counts for each of the 8 output positions. Uniformity across all columns is ideal.",
);
const positionalTableData = {};
HASH_CHARS.split("").forEach((char) => {
  positionalTableData[char] = {};
  for (let i = 0; i < HASH_LENGTH; i++) {
    positionalTableData[char][`Pos ${i}`] = positionalFreq[char][i];
  }
});
console.table(positionalTableData);
console.groupEnd();

console.group("\n3. Common Substring Analysis");
console.log("This test looks for repeating patterns inside the hashes.");
console.log("Score = (Substring Length) * (Number of Occurrences).");
console.log(
  "A good hash function should produce very few, low-scoring patterns.",
);
const substringCounts = new Map();
for (const h of allHashes) {
  for (let len = 2; len < HASH_LENGTH; len++) {
    for (let i = 0; i <= HASH_LENGTH - len; i++) {
      const sub = h.substring(i, i + len);
      substringCounts.set(sub, (substringCounts.get(sub) || 0) + 1);
    }
  }
}
const scoredSubstrings = [];
for (const [substring, count] of substringCounts.entries()) {
  if (count > 2) {
    // Only consider patterns that repeat more than twice
    scoredSubstrings.push({
      substring,
      count,
      score: substring.length * count,
    });
  }
}
scoredSubstrings.sort((a, b) => b.score - a.score);
console.table(scoredSubstrings.slice(0, 20)); // Display the top 20 most significant patterns
console.groupEnd();

console.log("\n--- Test Suite Complete ---");

function hash(input) {
  // 62 possibilities, 8 characters long. 62^8 = approx. 218 trillion. Good enough for me
  const outputDomain =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const magic = "jsHashSeed"; // pad to ensure minimum length is met (8).

  // accumulators (backward, forward)
  let ac1 = 0;
  let ac2 = 0;

  let s =
    String(input) + // stringify input
    typeof input + // append type of input (avoid)
    magic; // append magic number

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

const seenHashes = new Map();
for (i = 0; i < 15_000_000; i++) {
  const currentHash = hash(i);
  if (seenHashes.has(currentHash)) {
    console.log(
      `Collision found after ${i + 1} attempts: "${seenHashes.get(currentHash)}" and "${i}" (${currentHash})`,
    );
    break;
  }
  seenHashes.set(currentHash, i);
}
