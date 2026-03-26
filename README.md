# Vikram Portfolio

Portfolio website for Vikram Thakur with a built-in AI assistant and browser voice controls.

## Live Demo

https://vikram-portfolio-teal.vercel.app/

## Scripts

In the project directory, you can run:

### `npm start`

Runs only the React frontend on `http://localhost:3000`.

### `npm run dev`

Runs the React frontend plus Vercel serverless functions together. Use this when testing the chatbot locally because `/api/chat` is served from the `api/` folder.

### `npm run build`

Builds the production app.

### `npm test`

Runs the test suite.

## Chatbot Setup

The assistant uses a secure server-side `/api/chat` route and sends requests to OpenRouter.

1. Create `.env` from `.env.example`.
2. Set your OpenRouter key.
3. Optionally change the model.

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=stepfun/step-3.5-flash:free
```

## Important Local Note

If you run only `npm start`, the chat API will not exist and the assistant will fail.  
Use `npm run dev` for local chat testing.

## Voice Features

- Microphone input uses the browser Speech Recognition API.
- Voice output uses the browser Speech Synthesis API.
- Best support is usually in Chrome or Edge.
- On unsupported browsers, mic permission may work but live speech-to-text may still not work.

## Deploying on Vercel

1. Add `OPENROUTER_API_KEY` in the Vercel project settings.
2. Optionally set `OPENROUTER_MODEL` to another OpenRouter model if needed.
3. Redeploy.

## Security

Keep API keys only in server environment variables and never in frontend code. If a real key was exposed earlier, rotate it.
