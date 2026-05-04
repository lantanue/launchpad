export default function ProjectCard({ project, taskCount, onClick, onEdit, onDelete }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <span className="card-label">Project</span>
        <span className="card-name">{project.name}</span>
        {project.desc && <span className="card-desc">{project.desc}</span>}
      </div>
      <div className="card-footer">
        <span className="card-meta">{taskCount} задач</span>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button className="icon-btn" title="Редактировать" onClick={onEdit}>✎</button>
          <button className="icon-btn danger" title="Удалить" onClick={onDelete}>✕</button>
        </div>
      </div>
    </div>
  )
}
