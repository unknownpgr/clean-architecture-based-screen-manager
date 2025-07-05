# RM-IT TypeScript Project

This is a TypeScript version of the Express.js server application.

## Project Structure

```
rm-it/
├── src/
│   └── main.ts          # Main TypeScript source file
├── dist/                # Compiled JavaScript output
├── public/
│   └── index.html       # Static HTML file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Features

- **TypeScript**: Full type safety with interfaces for data structures
- **Express.js**: RESTful API server
- **Real-time data**: Data updates every second
- **Screen connections**: Dynamic screen-to-data mapping

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm run dev` - Run in development mode with hot reload

## API Endpoints

- `GET /` - Serves the HTML page
- `GET /data/:id` - Get data for a specific ID
- `GET /data?screenId=<id>` - Get data for a connected screen
- `GET /connections` - Get all screen connections
- `GET /connect?screenId=<id>&dataId=<id>` - Connect a screen to data

## Development

1. Install dependencies: `npm install`
2. Run in development mode: `npm run dev`
3. Build for production: `npm run build`
4. Start production server: `npm start`

## TypeScript Benefits

- **Type Safety**: All data structures are properly typed
- **Better IDE Support**: Enhanced autocomplete and error detection
- **Interface Definitions**: Clear contracts for data structures
- **Compile-time Error Checking**: Catch errors before runtime
