import styles from './Component.module.scss'

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'

export function Component() {
  return (
    <NodeViewWrapper className={styles.reactComponent}>
      <label contentEditable={false} data-drag-handle>
        React Component
      </label>

      <NodeViewContent className={`${styles.content} ${styles.isEditable}`} />
    </NodeViewWrapper>
  )
}
