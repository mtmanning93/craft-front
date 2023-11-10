# Testing

[⏪ Main README](README.md)

## Contents

- [JavaScript/ JSX Testing](#javascript-jsx-testing)
    - [ESLint](#eslint)
        - [Install/ Run](#install-run-eslint)
    - [React Testing Library]()
        - [MSW]()
- [Html Validation](#html-validation)
- [CSS Validation](#css-validation)
    - [Stylelint](#stylelint)
        - [Install/ Run](#install-run-stylint)
- [Manual Testing]()
- [Screen Testing]()
- [Browser Testing]()
- [Lighthouse]()

## JavaScript/ JSX Testing

### ESLint
---
I tested the majority of the codebase using ESLint. After running the linter initially there were 3 errors, all of which were found in the `App.test.js`, and were due to there being an empty test. This was fixed by writing some simple tests within the file.

#### Install/ Run Eslint

As 'create-react-app' automatically installs ESLint it was already configured, however the configuration needed can be seen below. Lastly I added a line to the 'scripts' section in my package.json to define "lint" before running the linter

To install ESLint in the terminal:

    npm install eslint --save-dev

The `package.json` file extra configuration:

    "eslintConfig": {
        "extends": [
        "react-app",
        "react-app/jest"
        ]
    },

Extra line in 'scripts' section:

    "lint": "eslint ."

Finally to run the linter:

    npm run lint

[ESLint Docs](https://eslint.org/docs)

[⏫ contents](#contents)

### React Testing Library
---

#### Mock Service Worker

## Html Validation

In this particular application there is only one Html file, public/index.html. However it still needs to be validated, for this [W3C Validator](https://validator.w3.org/) was used. The file returned no warnings or errors just some 'info' regarding the trailing '/' as the JSX syntax was used.

![Html Validation](./README_images/testing/html_validation.png)

## CSS Validation

### Stylelint
---
All the CSS style files were validated using [Stylelint](https://stylelint.io/). It makes the validating of many style sheets quick and easy. After installing and setting the dependencies I was able to run the linter across all stylesheets with one simple command.

After runnning the linter for the first time I had 1 error, which was easily fixable in the `Buttons.module.css` file. The screenshot below shows the output from Stylelint.

![Stylelint Error](./README_images/testing/stylelint_error.png)

#### Install/ Run Stylint

To install Stylint I used the following command. To avoid setting up unecessary configurations I used the 'stylelint-config-recommended' extension on the command:

    npm install stylelint stylelint-config-recommended --save-dev

As the docs say the next step was to create a `.stylelintrc.json` file in the root directory, inside I added the following:

    {
        "extends": "stylelint-config-recommended"
    }

Next I added yet another new line to the 'scripts' section of the package.json file:

    "lint:css": "stylelint 'src/**/*.css'"

*(the src/**/*.css basically means the linter will check any files ending in .css in the src directory)*

Finally to run the linter I could use the custom script command:

    npm run lint:css

[For more on getting started with Stylelint](https://stylelint.io/user-guide/get-started)

[⏪ Main README](README.md)

[⏫ contents](#contents)