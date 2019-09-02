# Flipermercado Sheets

I'm so sorry about this.

### Setup

You need some things. Start copying `config.sample.js` to `config.js`:

```sh
cd flipermercado-sheets
cp src/config.sample.js src/config.js
```

You need to script an endpoint using Google Script.
Then you need to update `config.js` with a password and your Google Script Web App URL. See below.

## Password

Replace `SHA256_PASSWORD_TO_PROTECT_YOUR_APP` with a real SHA256 password.

## GS API Example

https://script.google.com/d/12dyDIuBElz5XH98KsNhg5YrAAe0Is_1MD-0PF9v80aJXadKYExl2w1Kb/edit

## SpreadSheet Template

https://docs.google.com/spreadsheets/d/1fteT792oiPYxTLEb3dZTWZVQCpDDcoNXmlAdqzdAzyw/


## Running

In the project directory, you can run:

`yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Testing

`yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Building

`yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
