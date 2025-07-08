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
