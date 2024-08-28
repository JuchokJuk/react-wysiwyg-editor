import { cn } from '@/lib/utils'
import { memo, useCallback } from 'react'
import { Editor, generateHTML } from '@tiptap/react'
import { TableOfContents } from '../TableOfContents'
import { Node } from '@tiptap/pm/model'
import ExtensionKit from '@/extensions/extension-kit'
import ReactComponent from '@/extensions/ReactComponent/ReactComponent'

export const Sidebar = memo(
  ({ editor, isOpen, onClose }: { editor: Editor; isOpen?: boolean; onClose: () => void }) => {
    const handlePotentialClose = useCallback(() => {
      if (window.innerWidth < 1024) {
        onClose()
      }
    }, [onClose])

    const windowClassName = cn(
      'absolute top-0 left-0 bg-white lg:bg-white/30 lg:backdrop-blur-xl h-full lg:h-auto lg:relative z-[999] w-0 duration-300 transition-all',
      'dark:bg-black lg:dark:bg-black/30',
      !isOpen && 'border-r-transparent',
      isOpen && 'w-80 border-r border-r-neutral-200 dark:border-r-neutral-800',
    )

    const snippets = [
      {
        name: 'header',
        content: '<h1>Header</h1>',
      },
      {
        name: 'blockquote',
        content:
          '<figure data-type="blockquoteFigure"><div><blockquote><p>This is a test #2</p></blockquote><figcaption>Tester</figcaption></div></figure>',
      },
    ]

    const onDragStart = (event: DragEvent, snippet: number) => {
      event?.dataTransfer?.setData('text/html', snippets[snippet].content)
    }

    return (
      <div className={windowClassName}>
        <div className="w-full h-full overflow-hidden">
          <div className="w-full h-full p-6 overflow-auto">
            <TableOfContents onItemClick={handlePotentialClose} editor={editor} />

            <p className="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">snippets</p>
            <div draggable="true" onDragStart={e => onDragStart(e, 0)}>
              header
            </div>
            <div draggable="true" onDragStart={e => onDragStart(e, 1)}>
              blockquote
            </div>
          </div>
        </div>
      </div>
    )
  },
)

Sidebar.displayName = 'TableOfContentSidepanel'
