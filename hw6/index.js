// ===== Quasi-Tagged Templates ========

const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

function localize(strings, ...values) {
  // take part of dictionary with specified language
  let localTranslation = translations[language];

  return strings.reduce((acc, str, i) => {
    //translate the string literals if they are presented, or add '' to result string
    const translatedStr = localTranslation[str] || str;

    // translate interpolated values if its presented in dictionary
    const translatedValue = localTranslation[values[i]] || "";
    return acc + translatedStr + (translatedValue || "");
  }, "");
}

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting);
console.log(localizedIntroduction);

// ========== Advanced Tagged Template ============

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

function highlightKeywords(str, arr) {
  let templateStr = str;

  arr.forEach((item, i) => {
    templateStr = templateStr.replace(`\${${i}}`, `<span class='highlight'>${item}</span>`);
  });

  return templateStr;
}
const d = highlightKeywords(template, keywords);
console.log("=================");
console.log(d);
console.log(template);
console.log(keywords);

// ========= Multiline Tagged Template =========

function multiline(code) {
  const temp = code.toString().split("\n");

  return temp.reduce((acc, item, i) => {
    if (i === 0) return (acc += "// Expected: \n");
    return acc + `// ${i}${item} \n`;
  }, "");
}

console.log("=================");
console.log(multiline`
    function add(a, b) {
    return a + b;
    }`);

// ====== Debounce Function =======

function inputData(query) {
  console.log("Data Fetched: ", query, " at ", new Date().toISOString());
}

function debounce(func, delay) {
  let timer;

  return function (...rest) {
    // clean previous timer
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, rest);
    }, delay);
  };
}
const debouncedInput = debounce(inputData, 1000);

debouncedInput("First");
setTimeout(() => debouncedInput("Second"), 200);
setTimeout(() => debouncedInput("Third"), 400);
setTimeout(() => debouncedInput("Final"), 1200);
