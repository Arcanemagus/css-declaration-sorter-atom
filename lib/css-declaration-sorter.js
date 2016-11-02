import postcss from 'postcss';
import cssdeclsort from 'css-declaration-sorter';
import scssSyntax from 'postcss-scss';
import lessSyntax from 'postcss-less';

const syntaxes = {
  SCSS: scssSyntax,
  Less: lessSyntax,
};

const sort = async (sortOrder) => {
  const editor = atom.workspace.getActiveTextEditor();
  const syntax = syntaxes[editor.getGrammar().name];

  let result;
  try {
    result = await postcss([cssdeclsort({ order: sortOrder })])
      .process(editor.getText(), { syntax });
    editor.setText(result.content);
  } catch (error) {
    atom.notifications.addError('Sorting CSS parsing error.', {
      detail: error,
      icon: 'zap',
    });
  }
};

export default {
  activate() {
    console.log('css-declaration-sorter:: Activated');
    // atom.commands.add("atom-text-editor[data-grammar~='css']"", {
    atom.commands.add('atom-text-editor', {
      'css-declaration-sorter:sort': async () => {
        const order = atom.config.get('css-declaration-sorter.sortOrder');
        console.log(`css-declaration-sorter:: Sorting via ${order} order`);
        await sort(order);
      },
      'css-declaration-sorter:sort-alphabetically': async () => {
        const order = 'alphabetically';
        console.log(`css-declaration-sorter:: Sorting via ${order} order`);
        await sort(order);
      },
      'css-declaration-sorter:sort-smacss': async () => {
        const order = 'smacss';
        console.log(`css-declaration-sorter:: Sorting via ${order} order`);
        await sort(order);
      },
      'css-declaration-sorter:sort-concentric-css': async () => {
        const order = 'concentric-css';
        console.log(`css-declaration-sorter:: Sorting via ${order} order`);
        await sort(order);
      },
    });
  },

  config: {
    sortOrder: {
      title: 'Default sorting order',
      description: 'Select the default sorting order.',
      type: 'string',
      default: 'alphabetically',
      enum: ['alphabetically', 'smacss', 'concentric-css'],
    },
  },
};
