// Articulate! Card Creator JavaScript
// This handles all the interactive functionality for creating and managing cards

class CardCreator {
    constructor() {
        // Array to store all created cards
        this.cards = [];
        
        // Initialize the application
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Load any saved cards from localStorage
        this.loadCards();
        
        // Update the UI
        this.updateUI();
    }
    
    setupEventListeners() {
        // Form submission for adding new cards
        const form = document.getElementById('cardForm');
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // PDF generation button
        const generatePDFBtn = document.getElementById('generatePDF');
        generatePDFBtn.addEventListener('click', () => this.generatePDF());
        
        // Clear all cards button
        const clearCardsBtn = document.getElementById('clearCards');
        clearCardsBtn.addEventListener('click', () => this.clearAllCards());
        
        // Add input validation as user types
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateForm());
        });
        
        // Add validation for select field
        const select = form.querySelector('select');
        select.addEventListener('change', () => this.validateForm());
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const cardData = {
            person: formData.get('person').trim(),
            object: formData.get('object').trim(),
            world: formData.get('world').trim(),
            action: formData.get('action').trim(),
            nature: formData.get('nature').trim(),
            random: formData.get('random').trim(),
            spadeCategory: formData.get('spadeCategory'),
            id: Date.now() // Unique ID for each card
        };
        
        // Validate that all fields are filled
        if (this.validateCardData(cardData)) {
            // Add card to the array
            this.cards.push(cardData);
            
            // Save to localStorage
            this.saveCards();
            
            // Update the UI
            this.updateUI();
            
            // Clear the form
            e.target.reset();
            
            // Show success message
            this.showMessage('Card added successfully!', 'success');
        } else {
            this.showMessage('Please fill in all fields', 'error');
        }
    }
    
    validateCardData(cardData) {
        // Check that all text fields have content (exclude the id field)
        const textFields = ['person', 'object', 'world', 'action', 'nature', 'random'];
        const allTextFieldsFilled = textFields.every(field => 
            typeof cardData[field] === 'string' && cardData[field].length > 0
        );
        
        // Check that spade category is selected
        const spadeCategorySelected = cardData.spadeCategory && cardData.spadeCategory.length > 0;
        
        return allTextFieldsFilled && spadeCategorySelected;
    }
    
    validateForm() {
        // Enable/disable the submit button based on form completion
        const form = document.getElementById('cardForm');
        const inputs = form.querySelectorAll('input[required]');
        const select = form.querySelector('select[required]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        const allInputsFilled = Array.from(inputs).every(input => input.value.trim().length > 0);
        const selectFilled = select.value.length > 0;
        
        submitBtn.disabled = !(allInputsFilled && selectFilled);
    }
    
    updateUI() {
        // Update the cards display
        this.renderCards();
        
        // Update the PDF generation button state
        const generatePDFBtn = document.getElementById('generatePDF');
        generatePDFBtn.disabled = this.cards.length === 0;
        
        // Update card count display
        this.updateCardCount();
    }
    
    renderCards() {
        const cardsList = document.getElementById('cardsList');
        cardsList.innerHTML = '';
        
        if (this.cards.length === 0) {
            cardsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No cards created yet. Add your first card above!</p>';
            return;
        }
        
        // Create a card element for each card in the array
        this.cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            cardsList.appendChild(cardElement);
        });
    }
    
    createCardElement(cardData) {
        // Get the template and clone it
        const template = document.getElementById('cardTemplate');
        const cardElement = template.content.cloneNode(true);
        
        // Fill in the card data
        const card = cardElement.querySelector('.card');
        card.setAttribute('data-card-id', cardData.id);
        
        // Update each word in the card, adding Spade symbol if needed
        const spadeSymbol = '*** '; // Three asterisks for Spade category
        
        cardElement.querySelector('.person-word').textContent = 
            cardData.spadeCategory === 'person' ? spadeSymbol + cardData.person : cardData.person;
        cardElement.querySelector('.object-word').textContent = 
            cardData.spadeCategory === 'object' ? spadeSymbol + cardData.object : cardData.object;
        cardElement.querySelector('.world-word').textContent = 
            cardData.spadeCategory === 'world' ? spadeSymbol + cardData.world : cardData.world;
        cardElement.querySelector('.action-word').textContent = 
            cardData.spadeCategory === 'action' ? spadeSymbol + cardData.action : cardData.action;
        cardElement.querySelector('.nature-word').textContent = 
            cardData.spadeCategory === 'nature' ? spadeSymbol + cardData.nature : cardData.nature;
        cardElement.querySelector('.random-word').textContent = 
            cardData.spadeCategory === 'random' ? spadeSymbol + cardData.random : cardData.random;
        
        // Add remove functionality
        const removeBtn = cardElement.querySelector('.remove-card');
        removeBtn.addEventListener('click', () => this.removeCard(cardData.id));
        
        return cardElement;
    }
    
    removeCard(cardId) {
        // Remove card from the array
        this.cards = this.cards.filter(card => card.id !== cardId);
        
        // Save updated cards
        this.saveCards();
        
        // Update the UI
        this.updateUI();
        
        // Show confirmation message
        this.showMessage('Card removed', 'info');
    }
    
    clearAllCards() {
        // Confirm before clearing
        if (confirm('Are you sure you want to clear all cards? This action cannot be undone.')) {
            this.cards = [];
            this.saveCards();
            this.updateUI();
            this.showMessage('All cards cleared', 'info');
        }
    }
    
    updateCardCount() {
        // Update any card count displays (can be expanded later)
        const count = this.cards.length;
        console.log(`Total cards: ${count}`);
    }
    
    generatePDF() {
        if (this.cards.length === 0) {
            this.showMessage('No cards to generate PDF', 'error');
            return;
        }
        
        try {
            // Create new PDF document
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('portrait', 'mm', 'a4');
            
            // A4 dimensions in mm
            const pageWidth = 210;
            const pageHeight = 297;
            
            // Card dimensions in mm (as specified)
            const cardWidth = 72;
            const cardHeight = 52;
            
            // Calculate spacing for 2x4 grid
            const margin = 15; // Margin from page edges
            const spacing = 5; // Space between cards
            
            const totalWidth = (cardWidth * 2) + spacing;
            const totalHeight = (cardHeight * 4) + (spacing * 3);
            
            const startX = (pageWidth - totalWidth) / 2;
            const startY = (pageHeight - totalHeight) / 2;
            
            // Generate cards in batches of 8 (2x4 grid)
            const cardsPerPage = 8;
            let cardIndex = 0;
            
            while (cardIndex < this.cards.length) {
                // Add new page if not the first page
                if (cardIndex > 0) {
                    doc.addPage();
                }
                
                // Draw cards for this page
                for (let row = 0; row < 4; row++) {
                    for (let col = 0; col < 2; col++) {
                        if (cardIndex >= this.cards.length) break;
                        
                        const card = this.cards[cardIndex];
                        const x = startX + (col * (cardWidth + spacing));
                        const y = startY + (row * (cardHeight + spacing));
                        
                        // Draw card border
                        doc.setDrawColor(0, 0, 0);
                        doc.setLineWidth(0.5);
                        doc.rect(x, y, cardWidth, cardHeight);
                        
                        // Draw card content
                        this.drawCardContent(doc, card, x, y, cardWidth, cardHeight);
                        
                        cardIndex++;
                    }
                    if (cardIndex >= this.cards.length) break;
                }
            }
            
            // Save the PDF
            const filename = `articulate-cards-${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(filename);
            
            this.showMessage(`PDF generated successfully! (${this.cards.length} cards)`, 'success');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            this.showMessage('Error generating PDF. Please try again.', 'error');
        }
    }
    
    drawCardContent(doc, cardData, x, y, width, height) {
        // Set up text properties
        doc.setFontSize(7);
        doc.setTextColor(0, 0, 0);
        
        // Calculate positions for each category - fit within card height
        const padding = 1.5;
        const availableHeight = height - (padding * 2);
        const categoryHeight = availableHeight / 6; // 6 categories, equal height for each
        const textOffset = categoryHeight * 0.6; // Position text within category area
        
        const categories = [
            { key: 'person', letter: 'P', color: [231, 76, 60] },
            { key: 'object', letter: 'O', color: [52, 152, 219] },
            { key: 'world', letter: 'W', color: [46, 204, 113] },
            { key: 'action', letter: 'A', color: [243, 156, 18] },
            { key: 'nature', letter: 'N', color: [155, 89, 182] },
            { key: 'random', letter: 'R', color: [230, 126, 34] }
        ];
        
        categories.forEach((category, index) => {
            const categoryY = y + padding + (index * categoryHeight);
            
            // Draw category background
            doc.setFillColor(category.color[0], category.color[1], category.color[2]);
            doc.rect(x + padding, categoryY, 6, categoryHeight, 'F');
            
            // Draw category letter
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.setFont(undefined, 'bold');
            
            // Center the letter within the category box
            const letterWidth = doc.getTextWidth(category.letter);
            const boxWidth = 6;
            const letterX = x + padding + (boxWidth - letterWidth) / 2;
            doc.text(category.letter, letterX, categoryY + textOffset);
            
            // Draw word
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(6);
            doc.setFont(undefined, 'normal'); // Reset font to normal
            const word = cardData[category.key];
            const hasSpade = cardData.spadeCategory === category.key;
            const maxWidth = width - padding - 8;
            
            // Use a simple text-based spade symbol that works in PDF
            const spadeSymbol = '***'; // Three asterisks for Spade category
            const displayWord = hasSpade ? spadeSymbol + ' ' + word : word;
            
            // Split long words if necessary
            if (doc.getTextWidth(displayWord) > maxWidth) {
                const words = displayWord.split(' ');
                let currentLine = '';
                let lineY = categoryY + textOffset;
                
                for (let i = 0; i < words.length; i++) {
                    const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
                    if (doc.getTextWidth(testLine) > maxWidth && currentLine) {
                        doc.text(currentLine, x + padding + 8, lineY);
                        currentLine = words[i];
                        lineY += 2.5;
                    } else {
                        currentLine = testLine;
                    }
                }
                if (currentLine) {
                    doc.text(currentLine, x + padding + 8, lineY);
                }
            } else {
                doc.text(displayWord, x + padding + 8, categoryY + textOffset);
            }
        });
    }
    
    showMessage(message, type = 'info') {
        // Create a simple message display
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#2ecc71',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };
        messageDiv.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
    
    saveCards() {
        // Save cards to localStorage
        try {
            localStorage.setItem('articulateCards', JSON.stringify(this.cards));
        } catch (error) {
            console.error('Error saving cards:', error);
        }
    }
    
    loadCards() {
        // Load cards from localStorage
        try {
            const savedCards = localStorage.getItem('articulateCards');
            if (savedCards) {
                this.cards = JSON.parse(savedCards);
            }
        } catch (error) {
            console.error('Error loading cards:', error);
            this.cards = [];
        }
    }
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CardCreator();
});
