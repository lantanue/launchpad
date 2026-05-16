import { useState } from 'react'
import TaskItem from './TaskItem'

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
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="detail-header">
        <span className="card-label">Project</span>
        <h1 className="detail-title">{project.name}</h1>
        {project.desc && <p className="detail-desc">{project.desc}</p>}
        {project.url && (
          <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
            {project.url}
          </a>
        )}
      </div>

      <div>
        <p className="tasks-label">{done}/{tasks.length} done</p>
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
        <input
          className="field"
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="field tag-field"
          placeholder="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit" className="btn-primary">Add</button>
      </form>
    </div>
  )
}
