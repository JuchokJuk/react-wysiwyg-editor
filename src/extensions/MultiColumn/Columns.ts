import { Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    columns: {
      setColumns: () => ReturnType
    }
  }
}

export const Columns = Node.create({
  name: 'columns',

  group: 'columns',

  content: 'column column',

  defining: true,

  isolating: true,

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }) =>
          commands.insertContent(
            `<div data-type="columns"><div data-type="column" data-position="left"><p></p></div><div data-type="column" data-position="right"><p></p></div></div>`,
          ),
    }
  },

  renderHTML() {
    return ['div', { 'data-type': 'columns', class: `layout-two-column` }, 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ]
  },
})

export default Columns
