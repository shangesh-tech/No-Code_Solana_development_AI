# Solana-AI - No-code Solana smart contract Generator

Solana-AI is a web application that uses AI to generate Solana smart contracts based on natural language descriptions. Simply describe the functionality you want, and this will generate the complete Anchor Rust code for your Solana program.

# Live-Demo - https://solana-ai-gray.vercel.app
# [YouTube live Demo](https://www.youtube.com/watch?v=cymhGz79y7g)


## Features

- **AI-Powered Code Generation**: Leverages the Groq llama 3.3 70b model to generate high-quality Solana smart contract code
- **Interactive UI**: User-friendly interface with a modern design
- **Code Viewer**: Syntax highlighting for Rust and other languages with line numbers
- **File Explorer**: Navigate through the generated project files easily
- **Copy Code**: One-click code copying with visual feedback

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **AI Integration**: Groq API with llama 3.3 70b model
- **Syntax Highlighting**: react-syntax-highlighter
- **API**: Next.js Edge API routes

## Example Prompts

- "Create a token staking program with rewards distribution"
- "Develop an NFT marketplace with royalties and auction functionality"
- "Build a DAO voting system with proposal creation and execution"

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components for the UI
- `/lib` - Utility functions for AI prompt building and response parsing
- `/public` - Static assets

## Acknowledgements

- [Groq](https://groq.com) for their powerful LLM API
- [Next.js](https://nextjs.org) for the React framework
- [TailwindCSS](https://tailwindcss.com) for styling
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) for code highlighting
