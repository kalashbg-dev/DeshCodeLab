// Extend the Window interface to include touch-related properties
declare global {
  // Define DocumentTouch interface first
  interface DocumentTouch {
    // Add any properties you need from DocumentTouch
  }

  // Then extend Window
  interface Window {
    DocumentTouch: {
      new (): DocumentTouch;
      prototype: DocumentTouch;
    };
  }
}

export {}; // This file needs to be a module
