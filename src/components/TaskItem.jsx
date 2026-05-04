import { useState } from 'react'

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(task.text)
  const [tag, setTag] = useState(task.tag)

  const save = () => {
    if (text.trim()) onEdit({ text: text.trim(), tag: tag.trim() })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="task editing">
        <input
          className="field inline"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }}
          autoFocus
        />
        <input
          className="field inline tag-field"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="тег"
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }}
        />
        <button className="icon-btn" onClick={save}>✓</button>
      </div>
    )
  }

  return (
    <div className={`task${task.done ? ' done' : ''}`}>
      <button className="task-check" onClick={onToggle}>
        {task.done ? '✓' : ''}
      </button>
      <span className="task-text">{task.text}</span>
      {task.tag && <span className="task-tag">{task.tag}</span>}
      <div className="task-actions">
        <button className="icon-btn" onClick={() => setEditing(true)}>✎</button>
        <button className="icon-btn danger" onClick={onDelete}>✕</button>
      </div>
    </div>
  )
}
