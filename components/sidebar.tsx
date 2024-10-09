"use client"

import { Inbox, Send, File, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

const folders = [
  { name: 'Inbox', icon: Inbox },
  { name: 'Sent', icon: Send },
  { name: 'Drafts', icon: File },
  { name: 'Trash', icon: Trash },
]

export function Sidebar({ currentFolder, onFolderChange, onCompose }) {
  return (
    <div className="w-64 bg-secondary p-4 flex flex-col h-full">
      <Button className="mb-4 w-full" variant="default" onClick={onCompose}>Compose</Button>
      <nav>
        {folders.map((folder) => (
          <Button
            key={folder.name}
            variant={currentFolder === folder.name ? "secondary" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => onFolderChange(folder.name)}
          >
            <folder.icon className="mr-2 h-4 w-4" />
            {folder.name}
          </Button>
        ))}
      </nav>
    </div>
  )
}