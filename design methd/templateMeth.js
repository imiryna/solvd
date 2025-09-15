/**
 * Abstract base class that defines the template method and skeleton
 * of our algorithm. In modern JavaScript, we can use comments and
 * throw errors to indicate abstract methods since there's no built-in
 * 'abstract' keyword like in some other languages.
 */

class DataProcessor {
  // The template method that defines the algorithm skeleton
  process(data) {
    // Step 1: Validate the data
    this.validateData(data);

    // Step 2:  Process the data

    const processedData = this.processData(data);

    // Step 3: Format the results (fixed implementation)
    const formattedData = this.formatResults(processedData);
    return formattedData;
  }

  // Abstract method - must be implemented by subclasses
  validateData(data) {
    throw new Error("validateData() must be implemented by subclasses");
  }

  // Abstract method - must be implemented by subclasses
  processData(data) {
    throw new Error("processData() must be implemented by subclasses");
  }

  // Concrete method - implementation shared by all subclasses
  formatResults(data) {
    return {
      processed: data,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * A concrete implementation for processing numerical data.
 * Notice how we only need to implement the abstract methods
 * and can optionally override hook methods.
 */

class NumberDataProcessor extends DataProcessor {
  // Implement validateData
  validateData(data) {
    if (!Array.isArray(data) || !data.every((item) => typeof item === "number")) {
      throw new Error("Input must be an array of numbers");
    }
  }

  // implementation processesData
  processData(data) {
    const sum = data.reduce((acc, cur) => acc + cur, 0);
    return sum;
  }
}

/**
 * Another concrete implementation for processing text data.
 * This demonstrates how different subclasses can implement
 * the same template method steps differently.
 */
class TextDataProcessor extends DataProcessor {
  validateData(data) {
    // Validate that all items are strings
    if (!Array.isArray(data) || !data.every((item) => typeof item === "string")) {
      throw new Error("Input must be an array of strings");
    }
  }

  processData(data) {
    // Process the text data
    const wordCount = data.reduce((acc, text) => {
      return acc + text.split(/\s+/).filter((word) => word.length > 0).length;
    }, 0);
    return wordCount;
  }
}

// Example usage
const numberProcessor = new NumberDataProcessor();
const result1 = numberProcessor.process([1, 5, 7, 3, 8, 9]);

console.log(JSON.stringify(result1));

const textProcessor = new TextDataProcessor();
const result2 = textProcessor.process(["The quick brown fox jumps over the lazy dog", "Design patterns are solutions to common problems in software design", "JavaScript is a versatile programming language"]);

console.log(JSON.stringify(result2));
