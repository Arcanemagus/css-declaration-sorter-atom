'use strict';

const cssDeclarationSorter = require('../lib/css-declaration-sorter');

describe('CSS Declaration Sorter', function () {
  let editor;
  let workspaceElement;
  
  beforeEach(function () {
    waitsForPromise(function () {
      return atom.workspace.open().then(function (result) {
        editor = result;
        workspaceElement = atom.views.getView(editor);
      })
    })
    
    waitsForPromise(function () {
      return Promise.all([
        atom.packages.activatePackage('grammar-selector'),
        atom.packages.activatePackage('language-css'),
      ])
    })
  })
  
  it('sorts CSS', function () {
    editor.setGrammar(atom.grammars.grammarForScopeName('source.css'));
    editor.setText(`
      a {
      flex: 0;
      border: 0;
      }
    `);

    waitsForPromise(function() {
      return atom.packages.activatePackage('css-declaration-sorter');
    });
    atom.commands.dispatch(workspaceElement, 'css-declaration-sorter:sort');
    
    expect(editor.getText()).toBe(`
      a {
        border: 0;
        flex: 0;
      }
    `);
  })
})
