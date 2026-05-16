import { useState, useEffect } from 'react'

export default function ProjectForm({ project, onSave, onClose }) {
  const [name, setName] = useState(project?.name ?? '')
  const [desc, setDesc] = useState(project?.desc ?? '')
  const [url, setUrl] = useState(project?.url ?? '')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), desc: desc.trim(), url: url.trim() })
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <p className="modal-title">{project ? 'Edit project' : 'New project'}</p>
        <input
          className="field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <textarea
          className="field"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
        />
        <input
          className="field"
          placeholder="Link (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
        />
        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Save</button>
        </div>
      </form>
    </div>
  )
}
