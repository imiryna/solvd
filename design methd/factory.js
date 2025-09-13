/*є програма, яка виводить повідомлення користувачу.
Залежно від налаштувань вона має створювати два типи повідомлень:

Консольне повідомлення (у терміналі).

Діалогове повідомлення (умовно у вікні).

Треба реалізувати фабричний метод, який створює потрібний тип повідомлення.
*/

class FactoryClass {
  constructor(text) {
    if (!text) {
      throw new Error("Text can be null");
    }

    this.text = text;
  }

  printMessage() {
    throw new Error("You must implement createMessage()");
  }
}

class Console extends FactoryClass {
  constructor(text) {
    super(text);
  }
  printMessage() {
    console.log(`CONSOLE: ${this.text}`);
  }
}

class ALert extends FactoryClass {
  constructor(text) {
    super(text);
  }
  printMessage() {
    console.log(`ALERT: ${this.text}`);
  }
}

const c1 = new Console("hello world");
const c2 = new Console("console 2");
const a1 = new ALert("alert 1");
const a2 = new ALert("alert 2");

const ar = [c1, a2, a1, c2];

ar.forEach((el) => el.printMessage());
