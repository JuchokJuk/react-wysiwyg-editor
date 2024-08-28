import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { Component } from './Component'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    reactComponent: {
      insertReactComponent: () => ReturnType
    }
  }
}

export default Node.create({
  name: 'react-component',

  group: 'block',

  content: 'block+',

  draggable: true,

  addCommands() {
    return {
      insertReactComponent:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: 'react-component',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'test!' }] }],
          })
        },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'react-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})
