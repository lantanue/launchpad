function shortUrl(url) {
  try {
    const u = new URL(url)
    if (u.protocol === 'file:') {
      const parts = decodeURIComponent(u.pathname).split('/')
      return parts[parts.length - 1] || url
    }
    return u.hostname
  } catch { return url }
}

export default function ProjectCard({ project, index, onClick, onEdit, onDelete }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-top">
        <span className="card-stat">{index}</span>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button className="icon-btn" onClick={onEdit}>✎</button>
          <button className="icon-btn danger" onClick={onDelete}>✕</button>
        </div>
      </div>

      <div className="card-bottom">
        <span className="card-name">{project.name}</span>
        {project.url
          ? <a
              className="card-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {shortUrl(project.url)} ↗
            </a>
          : <span className="card-link-empty">no link</span>
        }
      </div>
    </div>
  )
}
