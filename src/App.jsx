import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import ProjectCard from './components/ProjectCard'
import ProjectDetail from './components/ProjectDetail'
import ProjectForm from './components/ProjectForm'

const uid = () => Math.random().toString(36).slice(2)

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

export default function App() {
  const [projects, setProjects] = useLocalStorage('lp_projects', [])
  const [tasks, setTasks] = useLocalStorage('lp_tasks', [])
  const [activeId, setActiveId] = useState(null)
  const [form, setForm] = useState(null) // null | 'new' | project object

  const activeProject = projects.find((p) => p.id === activeId) ?? null
  const activeTasks = tasks.filter((t) => t.projectId === activeId)

  // Projects
  const saveProject = ({ name, desc }) => {
    if (form && form.id) {
      setProjects((ps) => ps.map((p) => p.id === form.id ? { ...p, name, desc } : p))
    } else {
      setProjects((ps) => [...ps, { id: uid(), name, desc, createdAt: Date.now() }])
    }
    setForm(null)
  }

  const deleteProject = (id) => {
    setProjects((ps) => ps.filter((p) => p.id !== id))
    setTasks((ts) => ts.filter((t) => t.projectId !== id))
  }

  // Tasks
  const addTask = ({ text, tag }) => {
    setTasks((ts) => [...ts, { id: uid(), projectId: activeId, text, tag, done: false, createdAt: Date.now() }])
  }

  const toggleTask = (id) => {
    setTasks((ts) => ts.map((t) => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTasks((ts) => ts.filter((t) => t.id !== id))
  }

  const editTask = (id, data) => {
    setTasks((ts) => ts.map((t) => t.id === id ? { ...t, ...data } : t))
  }

  return (
    <>
      <main>
        <p className="date">{today}</p>

        {activeProject ? (
          <ProjectDetail
            project={activeProject}
            tasks={activeTasks}
            onBack={() => setActiveId(null)}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
          />
        ) : (
          <div className="home">
            <div className="cards">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  taskCount={tasks.filter((t) => t.projectId === p.id).length}
                  onClick={() => setActiveId(p.id)}
                  onEdit={() => setForm(p)}
                  onDelete={() => deleteProject(p.id)}
                />
              ))}
              <button className="card add-card" onClick={() => setForm('new')}>
                <span className="add-icon">+</span>
                <span className="add-label">Новый проект</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {form !== null && (
        <ProjectForm
          project={form === 'new' ? null : form}
          onSave={saveProject}
          onClose={() => setForm(null)}
        />
      )}
    </>
  )
}
