const vscode = require("vscode");
const OpenAI = require("openai");

module.exports = {
  activate: (ctx) => {
    let api;
    const initAPI = async () => {
      const apiKey = await ctx.secrets.get("openai-key");
      if (apiKey) {
        api = new OpenAI({ apiKey });
      } else {
        vscode.window.showWarningMessage(
          "You must configure an OpenAI API Key to use this extension."
        );
      }
    };

    ctx.secrets.onDidChange((event) => {
      if (event.key === "openai-key") initAPI();
    });

    initAPI();

    vscode.languages.registerInlineCompletionItemProvider(
      { pattern: "**" },
      {
        provideInlineCompletionItems: async (document, position) => {
          if (!api) {
            vscode.window.showErrorMessage(
              "OpenAI API Key is missing or invalid. Please configure it."
            );
            return;
          }

          const prefix = document.getText(
            new vscode.Range(new vscode.Position(0, 0), position)
          );
          const suffix = document.getText(
            new vscode.Range(
              position,
              document.positionAt(document.getText().length)
            )
          );

          const prompt =
            vscode.workspace.getConfiguration("intellibot").get("prompt") ||
            `Generate code completions based on the provided prefix and suffix. Return a JSON object with a 'completion' key containing a suggestion to insert between them. Ensure the suggestion adheres to the existing code style guidelines. Pay attention to any comments at the end of the prefix. The language context is "${document.languageId}".`;

          try {
            const response = await api.chat.completions.create({
              messages: [
                {
                  role: "system",
                  content: prompt.replace("{language}", document.languageId),
                },
                { role: "user", content: prefix },
                { role: "user", content: suffix },
              ],
              model: "gpt-4o",
              max_tokens: 500,
              response_format: { type: "json_object" },
            });

            const resp = JSON.parse(response.choices[0].message.content);
            return {
              items: [{ insertText: resp.completion.trim() }],
            };
          } catch (error) {
            vscode.window.showErrorMessage(
              `OpenAI API request failed: ${error.message}`
            );
            return;
          }
        },
      }
    );

    vscode.commands.registerCommand("intellibot.token", async () => {
      await vscode.env.openExternal(
        vscode.Uri.parse("https://platform.openai.com/api-keys")
      );

      const apiKeyInput = await vscode.window.showInputBox({
        title: "OpenAI API Key",
        prompt: "Paste your OpenAI API Key:",
        ignoreFocusOut: true,
        password: true,
      });

      if (apiKeyInput) {
        await ctx.secrets.store("openai-key", apiKeyInput);
        vscode.window.showInformationMessage(
          "OpenAI API Key saved successfully."
        );
        initAPI();
      }
    });
  },
};
