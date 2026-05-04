import { useState, useEffect } from 'react'

export default function ProjectForm({ project, onSave, onClose }) {
  const [name, setName] = useState(project?.name ?? '')
  const [desc, setDesc] = useState(project?.desc ?? '')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), desc: desc.trim() })
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <p className="modal-title">{project ? 'Редактировать проект' : 'Новый проект'}</p>
        <input
          className="field"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <textarea
          className="field"
          placeholder="Описание"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
        />
        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onClose}>Отмена</button>
          <button type="submit" className="btn-primary">Сохранить</button>
        </div>
      </form>
    </div>
  )
}
