# Marty's

- Consumer App: https://martys.quanglam2807.com/
- Admin App: https://martys.quanglam2807.com/admin

The app can be installed as mobile or desktop app as [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_application).

## Team
- Quang Lam
- Jorge Contreras
- Laura Bailey

**Advisor**: Roman Yasinovskyy & Paul Mattson.

## Development
1. Install Git, [Node.js 14](https://nodejs.org/), [yarn 1 (classic)](https://classic.yarnpkg.com/).
2. Clone and set up the project:
```bash
git clone git@github.com:quanglam2807/senior-project.git
cd senior-project
yarn
```
3. Use one of these scripts:
  - Run the project for development: `yarn start`.
  - Build the project for prroduction: `yarn build`.
  - Run the linting check: `yarn lint`.
  - Run the tests: `yarn test`.

## Testing
Run `npx playwright test` to run the end-to-end tests.

If the required browsers are not installed, use the following command to install them

```bash
# install supported browsers
npx playwright install
```

You can also install a specific browser (e.g. run `npx playwright install firefox` to install Firefox).


## Project Structure
- `src`: the source code of the React app.
  - `index.js`: main starting point of the app, setting up service workers (for Progressive Web App), custom fonts, backend configuration, etc.
  - `components`: React components.
    - `App.js`: defining the routes of the app (including authentication check).
    - `layouts`: layouts used by the app.
      - `LayoutUser`: layout used by the consumer app.
      - `LayoutAdmin`: layout used by the admin app.
    - `pages`: code of each page in the app (organized into sub-folders).
  - `constants`: constants like app name, sample data, etc.
  - `images`: images files.
- `public`: the static files.
  - For example, file stored at `public/hello.jpg` can be accessed from the app at `/hello.jpg`.
- `functions`: backend code (cloud functions).
- `firebase.json`: deployment configurations for Firebase.
- `firestore.rules`: security rules for Firestore.
- `storage.rules`: security rules for Cloud Storage.
- `.github`: the configurations for GitHub Actions.
  - `firebase-hosting-merge.yml`: script to run when a commit is merged into the `master` branch.
  - `firebase-hosting-pull-request.yml`: script to run when a PR is created or changed.

## Library Documentation
- React (front-end library): https://reactjs.org/
- MUI v5 (UI library for React): https://mui.com/
- react-router v6: https://reactrouter.com/

## Development Cycle
The source code is stored on GitHub.

Whenever new commit is pushed to the `master` branch, GitHub Actions (continious integration) will automatically run, check for errors, and deploy the code to production server.

Code should NOT be pushed to the `master` branch directly. Instead, developers must create new branch and pull request for every change they want to make. Whenever a pull request is created, GitHub Actions will automatically run, check for errors and deploy the code to a temporarily endpoint. Other developers can review the code, preview the changes using the temporary endpoint. If the PR passes all the tests and is approved by other developers, the PR can then be merged to the `master` branch. After that, as mentioned above, the code will then be deployed automatically to production server.
