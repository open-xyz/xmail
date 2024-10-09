"use client"

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { EmailList } from '@/components/email-list'
import { EmailView } from '@/components/email-view'
import { ModeToggle } from '@/components/mode-toggle'
import { ComposeModal } from '@/components/compose-modal'
import { Toaster } from "@/components/ui/toaster"

export default function XMailLayout() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [currentFolder, setCurrentFolder] = useState('Inbox')
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  const handleCompose = () => setIsComposeOpen(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentFolder={currentFolder} onFolderChange={setCurrentFolder} onCompose={handleCompose} />
      <div className="flex flex-col flex-grow">
        <header className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold">XMail</h1>
          <ModeToggle />
        </header>
        <div className="flex flex-grow overflow-hidden">
          <EmailList folder={currentFolder} onSelectEmail={setSelectedEmail} />
          <EmailView email={selectedEmail} />
        </div>
      </div>
      <ComposeModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
      <Toaster />
    </div>
  )
}