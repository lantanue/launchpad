import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
          className="field inline font-mono text-xs"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }}
          autoFocus
        />
        <Input
          className="field inline tag-field font-mono text-xs"
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
    <div className={`task${task.done ? ' done' : ''}`}>
      <Checkbox
        checked={task.done}
        onCheckedChange={onToggle}
        className="rounded-[2px] border-[#d5d5d2] data-[state=checked]:bg-[#111] data-[state=checked]:border-[#111]"
      />
      <span className="task-text">{task.text}</span>
      {task.tag && <span className="task-tag">{task.tag}</span>}
      <div className="task-actions">
        <button className="icon-btn" onClick={() => setEditing(true)}>✎</button>
        <button className="icon-btn danger" onClick={onDelete}>✕</button>
      </div>
    </div>
  )
}
