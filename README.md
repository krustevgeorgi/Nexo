# Getting Started

The project is configured to run with the Sepolia test network. 

To use on Main Net simply change the WETH and NEXO contract addresses in src/constants to:

WETH: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
NEXO: 0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206


## Available Scripts

In the project directory, you can start the dev server using:

### `yarn start-dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### `yarn start`

Starts an express server to serve the bundled app.