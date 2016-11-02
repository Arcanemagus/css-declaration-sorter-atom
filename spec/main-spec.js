describe('CSS Declaration Sorter', () => {
  let editor;
  let workspaceElement;

  beforeEach(() =>
    waitsForPromise(() =>
      Promise.all([
        // atom.packages.activatePackage('grammar-selector'),
        atom.packages.activatePackage('language-css'),
        // atom.packages.activatePackage('css-declaration-sorter'),
      ]).then(() =>
        atom.workspace.open().then((result) => {
          editor = result;
          workspaceElement = atom.views.getView(editor);
        })
      )
    )
  );

  it('sorts CSS', () => {
    let done;

    const activationPromise = atom.packages.activatePackage('css-declaration-sorter');

    editor.setGrammar(atom.grammars.grammarForScopeName('source.css'));
    editor.setText('a {\n' +
      '  flex: 0;\n' +
      '  border: 0;\n' +
      '}'
    );
    editor.onDidChange(() => {
      expect(editor.getText()).toBe('a {\n' +
        '  border: 0;\n' +
        '  flex: 0;\n' +
        '}'
      );
      done = true;
    });

    atom.commands.dispatch(workspaceElement, 'css-declaration-sorter:sort');

    waitsForPromise(() => activationPromise);

    // expect(editor.getText()).toBe(`
    //   a {
    //     border: 0;
    //     flex: 0;
    //   }
    // `);
    waitsFor(() =>
      done,
      'editor contents to be checked after modification',
      500
    );
  });
});
