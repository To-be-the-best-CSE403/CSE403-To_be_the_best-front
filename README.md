# ToBeTheBest Extension for Pokemon Showdown

A Chrome extension for [Pokemon Showdown](https://play.pokemonshowdown.com/) including features such as a team builder, damage calculator, and more! The extension aims to assist users in creating powerful teams, understanding move sets, and making informed decisions during battles.

## Quick Start
- **Step 1**: Install the ToBeTheBest Extension on the [Chrome Web Store](https://chromewebstore.google.com/) (Not yet available)
- **Step 2**: Go to [Pokemon Showdown](https://play.pokemonshowdown.com/) and activate the extension.

## Features
Learn more about the features of the Pokemon Showdown ToBeTheBest extension.

- **Team Builder**: Build your team with ease using the extension's team builder.
- **Common Movesets**: View common movesets for each Pokemon.
- **Damage Calculator**: Calculate the damage of a move based on the Pokemon's stats and the opponent's stats.

## Usage
- **Team Builder**: Click on the "Team Builder" button in the extension popup to open the team builder. It shows information about Pokemon usage and suggested movesets.

## Repository Layout
- public: contains the static files for the extension.
- src: contains the source code for the extension.
  - components: contains the React components for the extension.
- configs
  

## For Developers

You can clone this repo with the following commands:

```bash
git clone https://github.com/To-be-the-best-CSE403/CSE403-To_be_the_best-front
```

### Getting Started
First install the dependencies:

```bash
npm install
```

Then run the extension in development mode:

```bash
npm run dev
```
Open localhost in your browser to see the extension.

### Building the extension
To build the extension, run the following command:

```bash
npm run build
```

To see the extension in action, open Chrome and go to `chrome://extensions/`. Make sure that the `Developer mode` checkbox in the top right corner is checked. Then click `Load unpacked` and select the `dist` folder in the project directory.


## Coding Guidelines

### Linter
Use [ESLint](https://eslint.org/) to lint your code. You can run ESLint with the following command:

```bash
npm run lint
```

### Formatting
Use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension for VSCode to format your code.

### TypeScript
Follow the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html). The most important rules that the project will follow are:

#### Naming
| Style            | Category                                                     |
|------------------|--------------------------------------------------------------|
| UpperCamelCase   | Class / Interface / Type / Enum / Decorator / Type Parameters / Component Functions in TSX / JSXElement Type Parameter |
| lowerCamelCase   | Variable / Parameter / Function / Method / Property / Module Alias |
| CONSTANT_CASE    | Global Constant Values, Including Enum Values                 |

#### Documentation
There are two types of comments, JSDoc (`/** ... */`) and non-JSDoc ordinary comments (`// ...` or `/* ... */`).

- Use `/** JSDoc */` comments for documentation, i.e., comments a user of the code should read.
- Use `//` line comments for implementation comments, i.e., comments that only concern the implementation of the code itself.

#### Typing
- Do use TypeScript's types as much as possible.
- Do use `undefined` when necessary; **do not** use `null`.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
