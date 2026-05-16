import { useState } from 'react'
import { Input } from '@/components/ui/input'

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
        <Input
          className="font-mono text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }}
          autoFocus
        />
        <Input
          className="font-mono text-sm w-20 shrink-0"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="tag"
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }}
        />
        <button className="icon-btn" onClick={save}>✓</button>
      </div>
    )
  }

  return (
    <div className={`task${task.done ? ' done' : ''}`} onClick={onToggle}>
      <button
        className="task-check"
        onClick={(e) => { e.stopPropagation(); onToggle() }}
      >
        {task.done && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      <span className="task-text">{task.text}</span>
      {task.tag && <span className="task-tag">{task.tag}</span>}
      <div className="task-actions" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn" onClick={() => setEditing(true)}>✎</button>
        <button className="icon-btn danger" onClick={onDelete}>✕</button>
      </div>
    </div>
  )
}
