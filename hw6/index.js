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

// console.log(localizedGreeting);
// console.log(localizedIntroduction);

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
// console.log("=================");
// console.log(d);
// console.log(template);
// console.log(keywords);

// ========= Multiline Tagged Template =========

function multiline(code) {
  const temp = code.toString().split("\n");

  return temp.reduce((acc, item, i) => {
    if (i === 0) return (acc += "// Expected: \n");
    return acc + `// ${i}${item} \n`;
  }, "");
}

// console.log("=================");
// console.log(multiline`
// function add(a, b) {
// return a + b;
// }`);

// ====== Debounce Function =======

function inputData(query) {
  console.log("Data Fetched: ", query, " at ", new Date().toISOString());
}

function debounce(func, delay) {
  let timer;

  // Returning a func
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
// console.log("=================");
setTimeout(() => debouncedInput("Second"), 200);
setTimeout(() => debouncedInput("Third"), 400);
setTimeout(() => debouncedInput("Final"), 1200);

// ===== Throttle Function =======

function onScroll(event) {
  // Handle scroll event
  console.log("Scroll event:", event);
}

function throttle(func, interval) {
  let timerFlag = false; // Variable to keep track of the timer

  // Returning a throttled version
  return (...args) => {
    // If there is no timer currently running execute func
    if (!timerFlag) {
      func.apply(this, args);
      timerFlag = true;

      timerFlag = setTimeout(() => {
        timerFlag = false; // Clear the timerFlag to allow the main function to be executed again
      }, interval);
    }
  };
}

const throttledScrollHandler = throttle(onScroll, 1000);

throttledScrollHandler("First");
// console.log("======= Throttle ==========");
setTimeout(() => throttledScrollHandler("Second"), 200);
setTimeout(() => throttledScrollHandler("Third"), 400);
setTimeout(() => throttledScrollHandler("Final"), 1200);

// =========== Currying Function Implementation ==============

function mergeArgs(args, moreArgs) {
  let result = [];
  const rest = [...moreArgs]; // avoid mutating the original

  args.forEach((arg, idx) => {
    if (arg === _) {
      result.push(moreArgs.shift());
    } else {
      result.push(arg);
    }
  });

  return [...result, ...moreArgs];
}

function curry(func, arity = func.length) {
  if (typeof func !== "function") {
    throw new Error("Curry requires a function argument");
  }

  return function curried(...args) {
    console.log("args: ", args); // for debuging
    const hasPlaceholder = args.some((arg) => arg == _);

    if (!hasPlaceholder && args.length >= arity) {
      try {
        return func.apply(this, args);
      } catch (error) {
        throw new Error(`Error executing curried function: ${error.message}`);
      }
    }

    return function next(...moreArgs) {
      console.log("moreArgs: ", moreArgs); // for debuging
      const combinedArgs = args.map((arg) => (arg === curry.placeholder && moreArgs.length ? moreArgs.shift() : arg)).concat(moreArgs);
      return curried(...combinedArgs);
    };
  };
}
const _ = Symbol("placeholder");

curry.placeholder = _;
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// console.log(curriedAdd(_, _, _)(1)(2)(3));
// console.log(curriedAdd(_, 2, 3)(1));
// console.log(curriedAdd(1, 2)(3));
// console.log(curriedAdd(1)(2, 3));
// console.log(curriedAdd(1, 2, 3));
