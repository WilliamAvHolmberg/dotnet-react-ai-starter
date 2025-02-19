# Implementation Guide

## Starting Point
You have a basic application with:
- Frontend: React + Vite + TailwindCSS + shadcn/ui
- Backend: .NET 9 + SQLite + Entity Framework
- Current feature: CRUD operations for users

## Core Challenge: SMS Platform Implementation

### Implementation Steps

1. **Backend Implementation**
   - Create data models
   - Set up API endpoints
   - Integrate 46elks service
   - Add error handling

2. **Frontend Development**
   - Create new page/route
   - Build SMS form
   - Add API integration
   - Implement feedback UI

3. **Testing & Enhancement**
   - Test with real phone numbers
   - Add validation
   - Improve error handling
   - Add loading states

## Working with AI

### Best Practices
1. **Break Down Tasks**
   - Start small
   - Build incrementally
   - Test each step

2. **Effective Prompting**
   - Be specific
   - Reference documentation (@46elks)
   - Ask for explanations when needed
   - Use @codebase to reference existing code

3. **Code Review**
   - Review AI-generated code carefully
   - Test edge cases
   - Consider error scenarios
   - Think about user experience

### Common Patterns
1. Start with data structures:
   ```
   Help me create the SMS message model and DTOs for the backend
   ```

2. Build services step by step:
   ```
   Now, let's create the SMS service that will integrate with 46elks
   ```

3. Create API endpoints:
   ```
   Create the SMS controller with endpoints for sending messages
   ```

4. Add error handling:
   ```
   Add proper error handling and validation to the SMS endpoints
   ```

5. Create UI components:
   ```
   Create a form component for sending SMS with phone number validation
   ```

## Optional Enhancements
After basic SMS sending works, consider adding:
- Message history
- Message templates
- Delivery status tracking
- Emoji support

Need inspiration for enhancements? Check `nice-features.md` for ideas.

## Getting Help
- Share code snippets in Discord
- Ask specific questions
- Show what you've tried
- Share interesting approaches

## Success Criteria
Your implementation should:
- Successfully send SMS messages
- Handle errors gracefully
- Validate input
- Provide user feedback
- Follow good coding practices

Remember:
- There's no single "right" way
- Focus on learning the AI workflow
- Share your discoveries
- Help others when you can

Need inspiration? Check `cheatsheet.md` for more example prompts and patterns.