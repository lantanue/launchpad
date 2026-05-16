import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TaskItem from './TaskItem'

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

function shortUrl(url) {
  try {
    const u = new URL(url)
    if (u.protocol === 'file:') {
      const parts = decodeURIComponent(u.pathname).split('/')
      return parts[parts.length - 1] || url
    }
    return u.hostname + (u.pathname !== '/' ? u.pathname : '')
  } catch {
    return url
  }
}

export default function ProjectDetail({ project, tasks, onBack, onAddTask, onToggleTask, onDeleteTask, onEditTask }) {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAddTask({ text: text.trim(), tag: tag.trim() })
    setText('')
    setTag('')
  }

  const done = tasks.filter(t => t.done).length

  return (
    <div className="detail">
      <p className="detail-date">{today}</p>

      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="back-btn self-start font-mono text-[11px] uppercase tracking-wider text-[#aaa] hover:text-[#555] hover:bg-transparent px-0"
      >
        ← Back
      </Button>

      <div className="detail-header">
        <span className="detail-label">Project</span>
        <h1 className="detail-title">{project.name}</h1>
        {project.desc && <p className="detail-desc">{project.desc}</p>}
        {project.url && (
          <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
            {shortUrl(project.url)}
          </a>
        )}
      </div>

      <div>
        <p className="tasks-label">{done} / {tasks.length} done</p>
        <div className="tasks">
          {tasks.length === 0 && (
            <p className="empty">No tasks yet. Add one below.</p>
          )}
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
              onEdit={(data) => onEditTask(task.id, data)}
            />
          ))}
        </div>
      </div>

      <form className="task-form" onSubmit={submit}>
        <Input
          className="font-mono text-xs"
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          className="font-mono text-xs w-20 shrink-0"
          placeholder="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          type="submit"
          className="font-mono text-lg w-9 h-9 p-0 shrink-0"
        >
          +
        </Button>
      </form>
    </div>
  )
}
