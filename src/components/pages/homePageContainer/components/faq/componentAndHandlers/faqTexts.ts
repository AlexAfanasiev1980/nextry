interface IText {
  id: string;
  question: string;
  answer: string;
}

export const faqTexts: IText[] = [
  {
    id: "0",
    question: "How can I use the Nextry virtual fitting room?",
    answer:
      "To use the virtual fitting room, upload a full-body photo of yourself. Then, select the clothing you like from our catalog, and our neural network will automatically 'try on' this clothing on your image.",
  },
  {
    id: "1",
    question: "Do I need to pose in a specific way for the photo?",
    answer:
      "The pose can be relaxed, but it's best if you stand upright and your arms don't cover your body. This provides a more accurate representation of the clothing on your photo.",
  },
  {
    id: "2",
    question:
      "How accurately does the neural network select the size of the clothing?",
    answer:
      "Nextry adapts the chosen clothing to fit the proportions of your figure in the photo.",
  },
  {
    id: "3",
    question: "Can I save the image with the tried-on clothes?",
    answer:
      "Of course, you can save the image with the tried-on clothes on any of your devices.",
  },
  {
    id: "4",
    question: "Are there any limitations on the type of clothing I can try on?",
    answer:
      "Our site features a wide range of clothing, including outerwear, dresses, trousers, and much more.",
  },
];
