# IntelliBot for VSCode

![IntelliBot](./logo.png) <!-- Add a logo if you have one -->

IntelliBot for VSCode is an intelligent coding assistant that enhances your programming experience by providing real-time code suggestions. Powered by OpenAI's cutting-edge language model, this extension works with all programming languages supported by VSCode, offering you contextual and accurate code completions as you type.

## Features

- **Real-time Code Suggestions**: Receive intelligent code suggestions instantly while typing.
- **Multi-language Support**: Compatible with all programming languages supported by VSCode.
- **Seamless Integration**: Easy to install and integrates smoothly into your existing workflow.
- **Customization Options**: Adjust settings to match your coding style and preferences.

## Installation

1. Open Visual Studio Code.
2. Navigate to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for "IntelliBot".
4. Click "Install" on the extension named "IntelliBot".
5. Reload VSCode to activate the extension.

## Setup

1. Upon first activation, IntelliBot will prompt you to enter your OpenAI API key.
2. Enter your API key in the input box that appears.
3. Start typing in any programming language.
4. IntelliBot will provide real-time suggestions and autocompletions based on the context of your code.
5. Accept suggestions by pressing `Tab` .

## Development

If you want to contribute or modify the extension, follow these steps:

### Prerequisites

- Node.js
- Bun (a fast JavaScript runtime)
- Webpack
- VSCE (Visual Studio Code Extensions)

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/JoseSanchez54/intellibot.git
    cd intellibot
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Build the extension:
    ```sh
    npm run build
    ```

4. For development mode with watch:
    ```sh
    npm run watch
    ```

5. Package the extension:
    ```sh
    npm run package
    ```

### Scripts in `package.json`

- **build**: Compiles the extension using Webpack in production mode with hidden source maps.
- **watch**: Runs the build script in watch mode using Bun.
- **package**: Packages the extension using VSCE with the allow-star-activation flag.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive commit messages.
4. Push your branch to your forked repository.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

