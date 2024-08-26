'use client'

import { EditorContent, PureEditorContent } from '@tiptap/react'
import React, { useMemo, useRef } from 'react'

import { LinkMenu } from '@/components/menus'

import { useBlockEditor } from '@/hooks/useBlockEditor'

import '@/styles/index.css'

import { Sidebar } from '@/components/Sidebar'
import { EditorContext } from '@/context/EditorContext'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
import { TiptapProps } from './types'
import { EditorHeader } from './components/EditorHeader'
import { TextMenu } from '../menus/TextMenu'
import { ContentItemMenu } from '../menus/ContentItemMenu'

export const BlockEditor = ({ ydoc, provider }: TiptapProps) => {
  const menuContainerRef = useRef(null)

  const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({ ydoc, provider })

  const displayedUsers = users.slice(0, 3)

  const providerValue = useMemo(() => {
    return {}
  }, [])

  if (!editor) {
    return null
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex h-full" ref={menuContainerRef}>
        <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
        <div className="relative flex flex-col flex-1 h-full overflow-hidden">
          <EditorHeader
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
            getJSON={editor.getJSON.bind(editor)}
          />
          <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default BlockEditor
