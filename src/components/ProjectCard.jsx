export default function ProjectCard({ project, taskCount, onClick, onEdit, onDelete }) {
  const done = 0 // will show task count as stat

  return (
    <div className="card" onClick={onClick}>
      <div className="card-stat">{taskCount}</div>
      <div className="card-body">
        <span className="card-name">{project.name}</span>
        {project.desc && <span className="card-desc">{project.desc}</span>}
      </div>
      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        {project.url && (
          <a className="icon-btn" href={project.url} target="_blank" rel="noopener noreferrer" title="Open link">↗</a>
        )}
        <button className="icon-btn" title="Edit" onClick={onEdit}>✎</button>
        <button className="icon-btn danger" title="Delete" onClick={onDelete}>✕</button>
      </div>
    </div>
  )
}
