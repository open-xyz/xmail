export function EmailView({ email }) {
  if (!email) {
    return (
      <div className="flex-grow p-4 flex items-center justify-center text-muted-foreground">
        Select an email to view
      </div>
    )
  }

  return (
    <div className="flex-grow p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">{email.subject}</h2>
      <div className="mb-4">
        <span className="font-semibold">From:</span> {email.sender}
      </div>
      <div className="whitespace-pre-wrap">{email.preview}</div>
    </div>
  )
}