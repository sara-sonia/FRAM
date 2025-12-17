# Exam Project – Web Application with AI Chatbot

## Project Description

This project is a web-based application developed as part of the PRO1001 exam.  
The goal of the project was to build a responsive website based on a provided Figma design for a Sustainable Food Delivery Webshop called "FRAM". The application includes interactive features such as a shopping cart, an AI-powered chatbot, and a Google Maps integration to display location-based information.

The application includes:
- A responsive layout built with HTML and CSS
- Interactive functionality implemented with JavaScript
- A shopping cart feature
- An AI chatbot integrated using the OpenAI API
- A Google Maps integration
- Accessibility considerations such as keyboard navigation and ARIA attributes

The chatbot is designed to assist users with general website-related questions and improve user experience.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Node.js
- Express
- OpenAI API
- Google Maps API
- Git & GitHub

---

## Setup and Installation Instructions

## Prerequisites

Before running the project, make sure you have:
- Node.js installed  
  https://nodejs.org
- Git installed (optional, but recommended)

---

## Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/sara-sonia/FRAM/blob/master/README.md

2. Navigate into the project directory:
   ```bash
    cd EXAM_PROJECT

3. Install dependencies:
    ```bash
    npm install

## Environment Variables 

This project requires API keys for the OpenAI chatbot and Google Maps functionality.

1. Create a .env file in the root of your project directory.

2. Add the following environment variables:
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

Note: The .env file is not included in the repository for security reasons. Ensure your keys are kept private.


## Running the Application Locally

1. Start the Node.js server:
  ```bash 
   node server.js

2. Open your web browser and navigate to:
   http://localhost:3000

3. You should now see the website fully functional, including:
   Responsive layout
   Shopping cart with quantity selection
   AI chatbot
   Google Maps integration

## Accessibility Considerations

Accessibility has been implemented throughout the project, including:
- ARIA roles and labels for interactive elements

- Keyboard navigation for modals and chatbot

- Focus management to ensure a smooth user experience

- Semantic HTML structure to enhance screen reader compatibility

## Ethical Considerations

- The AI chatbot has been designed with responsible use in mind: Privacy: No personal data is stored.

- Transparency: Users are informed that the chatbot is AI-powered.

- Bias Mitigation: Limited to general website assistance; relies on OpenAI safety mechanisms.

- Responsible Usage: The chatbot is not used for sensitive or personal data collection.

## Known Limitations

- The chatbot requires a valid OpenAI API key and active billing.

- The chatbot is limited to simple queries and does not retain conversational context across sessions.

- The shopping cart data is stored locally and does not persist between devices.

- This project is intended for educational purposes and not production use.

## Future Improvements

- Expand the chatbot’s capabilities, including product recommendations and more complex queries.

- Implement persistent backend storage for the shopping cart.

- Enhance error handling and visual feedback for the chatbot and cart interactions.

- Conduct further accessibility testing with screen readers and other assistive technologies.

- Refine the responsive design for a wider range of devices.

## Author
     **Sara M.** – Student, PRO1001 Web Development Exam Project