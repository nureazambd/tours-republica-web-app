// global.d.ts

// Define the structure of the TranslateElement class/constructor
interface TranslateElementConstructor {
  // This defines the constructor signature
  new (options: object, elementId: string): any;

  // This defines the static properties (properties accessible without 'new')
  InlineLayout: {
    SIMPLE: number;
    // Add other layout types if needed
  };
}

// Extend the global Window interface
interface Window {
  google: {
    translate: {
      TranslateElement: TranslateElementConstructor;
    };
  };
  googleTranslateElementInit: () => void;
}