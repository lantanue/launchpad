export default function ProjectCard({ project, index, onClick, onEdit, onDelete }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-stat">{index}</div>
      <div className="card-footer">
        <span className="card-name">{project.name}</span>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          {project.url && (
            <a className="icon-btn" href={project.url} target="_blank" rel="noopener noreferrer">↗</a>
          )}
          <button className="icon-btn" onClick={onEdit}>✎</button>
          <button className="icon-btn danger" onClick={onDelete}>✕</button>
        </div>
      </div>
    </div>
  )
}
