# Setup Guide

## Prerequisites
- [Cursor IDE](https://cursor.sh) installed
- Node.js and npm installed
- .NET 9 SDK installed
- Git installed

## Project Setup

### 1. Install
```bash
# Install frontend dependencies
cd ./packages/web
npm install

# Install backend dependencies
cd ./packages/api
dotnet restore
```

If you encounter an error with not having installed the `dotnet sdk` you can (on Mac OS) run 
```bash
brew tap isen-ng/dotnet-sdk-versions
brew install --cask dotnet-sdk8
```

### 2. Configure Cursor IDE

#### A. Set Up Model
1. Open Cursor Settings
   - Mac: `Cmd + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
2. Type "Settings" and select "Cursor Settings"
3. Find "Models" section
4. Enable "claude-3-5-sonnet-20241022"
5. Open the chat (`Cmd/Ctrl + L`)
6. Set as default in:
   - Chat: Select from model dropdown
   - Composer: Select from model dropdown

#### B. Add Documentation
1. Open Cursor Chat (`Cmd/Ctrl + L`)
2. Type `@docs`
3. Click "Add new doc"
4. Paste the URL: `https://46elks.com/docs/overview`
5. Wait for indexing to complete

#### C. Configure System Prompt
1. In Settings window
2. Find "Rules for AI"
3. Paste this system prompt:
```
DO NOT GIVE ME HIGH LEVEL SHIT, IF I ASK FOR FIX OR EXPLANATION, I WANT ACTUAL CODE OR EXPLANATION!!! I DON'T WANT "Here's how you can blablabla"

- Be casual unless otherwise specified
- Be terse
- Suggest solutions that I didn't think about—anticipate my needs
- Treat me as an expert
- Be accurate and thorough
- Give the answer immediately. Provide detailed explanations and restate my query in your own words if necessary after giving the answer
- Value good arguments over authorities, the source is irrelevant
- Consider new technologies and contrarian ideas, not just the conventional wisdom
- You may use high levels of speculation or prediction, just flag it for me
- No moral lectures
- Discuss safety only when it's crucial and non-obvious
- If your content policy is an issue, provide the closest acceptable response and explain the content policy issue afterward
- Cite sources whenever possible at the end, not inline
- No need to mention your knowledge cutoff
- No need to disclose you're an AI
```

## Verify Setup

### 1. Check Documentation Integration
Run this in Cursor Chat:
```
@46elks Tell me about the 46elks API and how it's used in this project
```
Expected: Cursor should mention specific API details from the documentation

### 2. Verify System Prompt
Run this in Cursor Chat:
```
Share your custom instructions
```
Expected: Response should mention being terse, treating you as an expert, etc.

### 3. Test Application
1. Start the backend:
```bash
cd ./packages/api
dotnet run
```

2. Start the frontend:
```bash
cd ./packages/web
npm run dev
```

1. Open browser to shown URL  `http://localhost:5173`

## Troubleshooting

### Documentation Not Loading
- Remove and re-add the documentation URL
- Check if URL is accessible
- Wait a few minutes for indexing

### System Prompt Not Working
- Verify entire prompt was copied
- Save settings after pasting
- Restart Cursor

### Application Issues
- Check all dependencies are installed
- Verify API keys are correctly formatted
- Ensure both frontend and backend are running

Need help? Please let me know!