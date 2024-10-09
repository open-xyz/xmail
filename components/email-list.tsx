"use client"

import { useState, useEffect } from 'react'
import { Avatar } from '@/components/ui/avatar'

const emailData = {
  Inbox: [
    { id: 1, sender: 'John Doe', subject: 'Meeting Tomorrow', preview: 'Hi, let\'s discuss the project...', avatar: 'JD' },
    { id: 2, sender: 'Jane Smith', subject: 'Project Update', preview: 'I\'ve finished the first phase...', avatar: 'JS' },
    { id: 3, sender: 'Bob Johnson', subject: 'Lunch Next Week?', preview: 'Are you free for lunch next...', avatar: 'BJ' },
  ],
  Sent: [
    { id: 4, sender: 'You', subject: 'Re: Project Proposal', preview: 'Here\'s the updated proposal...', avatar: 'YO' },
    { id: 5, sender: 'You', subject: 'Weekend Plans', preview: 'Are we still on for Saturday?', avatar: 'YO' },
  ],
  Drafts: [
    { id: 6, sender: 'Draft', subject: 'Unfinished Report', preview: 'The quarterly report is...', avatar: 'DR' },
    { id: 7, sender: 'Draft', subject: 'Vacation Request', preview: 'I would like to request...', avatar: 'DR' },
  ],
  Trash: [
    { id: 8, sender: 'Spam Service', subject: 'You\'ve Won!', preview: 'Click here to claim your prize...', avatar: 'SP' },
    { id: 9, sender: 'Old Newsletter', subject: 'Last Month\'s News', preview: 'Check out what happened...', avatar: 'NL' },
  ],
}

export function EmailList({ folder, onSelectEmail }) {
  const [selectedId, setSelectedId] = useState(null)
  const [emails, setEmails] = useState([])

  useEffect(() => {
    setEmails(emailData[folder] || [])
    setSelectedId(null)
  }, [folder])

  const handleSelectEmail = (email) => {
    setSelectedId(email.id)
    onSelectEmail(email)
  }

  return (
    <div className="w-1/3 border-r overflow-auto">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 border-b cursor-pointer ${
            selectedId === email.id ? 'bg-accent' : ''
          }`}
          onClick={() => handleSelectEmail(email)}
        >
          <div className="flex items-center mb-2">
            <Avatar className="h-8 w-8 mr-2">
              <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                {email.avatar}
              </div>
            </Avatar>
            <div className="font-semibold">{email.sender}</div>
          </div>
          <div className="font-medium">{email.subject}</div>
          <div className="text-sm text-muted-foreground">{email.preview}</div>
        </div>
      ))}
    </div>
  )
}