# Marty's
Production URL: https://senior-project-5475e.web.app/

## Team
- Quang Lam
- Jorge Contreras
- Laura Bailey

**Advisor**: Roman Yasinovskyy.

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
- `.github`: the configurations for GitHub Actions.

## Development Cycle
The source code is stored on GitHub.

Whenever new commit is pushed to the `master` branch, GitHub Actions (continious integration) will automatically run, check for errors, and deploy the code to production server.

Code should NOT be pushed to the `master` branch directly. Instead, developers must create new branch and pull request for every change they want to make. Whenever a pull request is created, GitHub Actions will automatically run, check for errors and deploy the code to a temporarily endpoint. Other developers can review the code, preview the changes using the temporary endpoint. If the PR passes all the tests and is approved by other developers, the PR can then be merged to the `master` branch. After that, as mentioned above, the code will then be deployed automatically to production server.
