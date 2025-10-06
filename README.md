# Articulate! Card Creator

A client-side web application for creating custom cards for the Articulate! board game. This tool allows you to enter your own custom answers and generate printable PDF cards.

## Features

- **Manual Card Entry**: Enter custom answers for all 6 categories (Person, Object, World, Action, Nature, Random)
- **Card Preview**: See your cards in real-time as you create them
- **PDF Generation**: Generate printable PDFs with cards arranged in a 2x4 grid on A4 pages
- **Proper Sizing**: Cards are sized exactly 52mm x 72mm as specified
- **Category Colors**: Each category has its distinct color matching the original game
- **Local Storage**: Your cards are automatically saved in your browser
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Open the Application**: Simply open `index.html` in your web browser
2. **Create Cards**: Fill in the form with your custom answers for each category:
   - **Person (P - Red)**: Names of people (real or fictional)
   - **Object (O - Blue)**: Physical objects or items
   - **World (W - Green)**: Places, countries, cities, or locations
   - **Action (A - Yellow)**: Verbs or actions
   - **Nature (N - Purple)**: Things from nature (animals, plants, natural phenomena)
   - **Random (R - Orange)**: Anything else that doesn't fit the other categories

3. **Preview Cards**: Your cards will appear in the preview section as you create them
4. **Generate PDF**: Click "Generate PDF" to create a printable file
5. **Print and Cut**: Print the PDF on A4 paper and cut out the cards along the guidelines

## Card Specifications

- **Size**: 52mm tall × 72mm wide (exactly as specified)
- **Layout**: 2×4 grid per A4 page (8 cards per page)
- **Spacing**: Proper spacing between cards for easy cutting
- **Colors**: Each category has its distinctive color:
  - Person: Red (#e74c3c)
  - Object: Blue (#3498db)
  - World: Green (#2ecc71)
  - Action: Yellow (#f39c12)
  - Nature: Purple (#9b59b6)
  - Random: Orange (#e67e22)

## Technical Details

- **Client-Side Only**: No server required - everything runs in your browser
- **PDF Generation**: Uses jsPDF library for PDF creation
- **Data Persistence**: Cards are saved in browser's localStorage
- **Responsive**: Adapts to different screen sizes
- **Modern Web Standards**: Uses HTML5, CSS3, and ES6+ JavaScript

## File Structure

```
CardCreator_Cursor/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and layout
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

The following features are planned for future versions:

1. **CSV Upload**: Import cards from CSV files
2. **Individual Card Format**: Generate individual cards for card printers
3. **Custom Decks**: Create and manage collections of cards
4. **Card Templates**: Pre-made templates for different game variants
5. **Export Options**: Additional export formats (PNG, SVG)

## Troubleshooting

- **PDF Not Generating**: Make sure you have cards created and try refreshing the page
- **Cards Not Saving**: Check if your browser allows localStorage
- **Print Issues**: Ensure your printer is set to A4 size and 100% scale

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this tool!
