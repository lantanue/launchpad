import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ProjectForm({ project, onSave, onClose }) {
  const [name, setName] = useState(project?.name ?? '')
  const [desc, setDesc] = useState(project?.desc ?? '')
  const [url, setUrl] = useState(project?.url ?? '')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), desc: desc.trim(), url: url.trim() })
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-mono max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-sm font-normal">
            {project ? 'Edit project' : 'New project'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-3 mt-1">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="font-mono text-xs"
            autoFocus
          />
          <Textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            className="font-mono text-xs resize-none"
          />
          <Input
            placeholder="Link (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            className="font-mono text-xs"
          />
          <div className="flex justify-end gap-2 mt-1">
            <Button type="button" variant="outline" size="sm" onClick={onClose}
              className="font-mono text-xs uppercase tracking-wider">
              Cancel
            </Button>
            <Button type="submit" size="sm"
              className="font-mono text-xs uppercase tracking-wider">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
