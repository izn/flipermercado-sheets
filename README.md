# Flipermercado Sheets

I'm so sorry about this.

### Setup

You need some things. Start copying `config.sample.js` to `config.js`:

```sh
cd flipermercado-sheets
cp src/config.sample.js src/config.js
```

You need to get a Google API Client ID and a SpreadSheet ID to update `config.js`.

#### Google API Client ID

To create a Google API Console project and Client ID, go to [Google Console](https://console.cloud.google.com/) and start a new project.

When you configure the project, select the Web browser client type and specify the origin URI of your app.

#### SpreadSheet ID

Start copying [this spreadsheet](https://docs.google.com/spreadsheets/d/1fteT792oiPYxTLEb3dZTWZVQCpDDcoNXmlAdqzdAzyw/edit#gid=943550932) to your Google account.

Then copy the spreadsheet ID from the URL.

Example: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

#### That's it!

The application will request you to log-in with Google for the first time to grant write-access to your SpreadSheet.

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
