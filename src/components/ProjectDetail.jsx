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

  return (
    <div className="detail">
      <button className="back-btn" onClick={onBack}>← Назад</button>

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

      <div className="tasks">
        {tasks.length === 0 && (
          <p className="empty">Нет задач. Добавь первую ↓</p>
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

      <form className="task-form" onSubmit={submit}>
        <input
          className="field"
          placeholder="Новая задача"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="field tag-field"
          placeholder="тег"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit" className="btn-primary">+</button>
      </form>
    </div>
  )
}
