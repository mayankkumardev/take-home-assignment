module.exports = plop => {
  // create your generators here
  plop.setGenerator('component', {
    description: 'Generates component',
    prompts: [
      { type: 'input', name: 'name', message: 'Name' },
      { type: 'input', name: 'path', message: 'Path of the component' },
    ],
    actions: data => {
      return [
        {
          type: 'add',
          path: `${data.path}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: '.plop/templates/components/component.hbs',
        },
        {
          type: 'add',
          path: `${data.path}/{{pascalCase name}}/{{pascalCase name}}.props.tsx`,
          templateFile: '.plop/templates/components/component.props.hbs',
        },
        {
          type: 'add',
          path: `${data.path}/{{pascalCase name}}/{{pascalCase name}}.styles.tsx`,
          templateFile: '.plop/templates/components/component.styles.hbs',
        },
      ];
    },
  });

  plop.setGenerator('query', {
    description: 'Generates REST ReactQuery query hook',
    prompts: [
      { type: 'input', name: 'name', message: 'Name (without Query suffix)' },
      { type: 'input', name: 'path', message: 'Path to the directory' },
    ],
    actions: data => {
      let path = data.path;
      if (!path.endsWith("/queries")) {
        path = `${path}/queries`;
      }

      return [
        {
          type: 'add',
          path: `${path}/use{{pascalCase name}}Query.ts`,
          templateFile: '.plop/templates/react-query/query.hbs',
        },
      ];
    },
  });

  plop.setGenerator('mutation', {
    description: 'Generates REST ReactQuery mutation hook',
    prompts: [
      { type: 'input', name: 'name', message: 'Name (without Mutation suffix)' },
      { type: 'input', name: 'path', message: 'Path to the directory' },
    ],
    actions: data => {
      let path = data.path;
      if (!path.endsWith("/queries")) {
        path = `${path}/queries`;
      }

      return [
        {
          type: 'add',
          path: `${path}/use{{pascalCase name}}Mutation.ts`,
          templateFile: '.plop/templates/react-query/mutation.hbs',
        },
      ];
    },
  });
};
