import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import ProjectCard from './components/ProjectCard'
import ProjectDetail from './components/ProjectDetail'
import ProjectForm from './components/ProjectForm'
import Logo from './assets/logo.svg'

const uid = () => Math.random().toString(36).slice(2)

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const TIPS = [
  "If you're stuck, zoom out first. Understand the whole before fixing the part.",
  "Ship something ugly today. Perfection is just procrastination in disguise.",
  "The blank page is not your enemy. Start anywhere — momentum will follow.",
  "One constraint unlocks more creativity than total freedom.",
  "Separate the day into making and editing. Never do both at once.",
  "Bad ideas lead to good ones. Write everything down anyway.",
  "When in doubt, remove something. Clarity lives in simplicity.",
  "Talk to one real user. It's worth more than a week of assumptions.",
  "Rest is part of the process. Boredom is where ideas live.",
  "The version you ship teaches you more than the one you planned.",
]

function useTip() {
  const [tip, setTip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)])
  useEffect(() => {
    const t = setInterval(() => {
      setTip(TIPS[Math.floor(Math.random() * TIPS.length)])
    }, 12000)
    return () => clearInterval(t)
  }, [])
  return tip
}

export default function App() {
  const [projects, setProjects] = useLocalStorage('lp_projects', [])
  const [tasks, setTasks] = useLocalStorage('lp_tasks', [])
  const [activeId, setActiveId] = useState(null)
  const [form, setForm] = useState(null)
  const tip = useTip()

  const activeProject = projects.find((p) => p.id === activeId) ?? null
  const activeTasks = tasks.filter((t) => t.projectId === activeId)

  const saveProject = ({ name, desc, url }) => {
    if (form && form.id) {
      setProjects((ps) => ps.map((p) => p.id === form.id ? { ...p, name, desc, url } : p))
    } else {
      setProjects((ps) => [...ps, { id: uid(), name, desc, url, createdAt: Date.now() }])
    }
    setForm(null)
  }

  const deleteProject = (id) => {
    setProjects((ps) => ps.filter((p) => p.id !== id))
    setTasks((ts) => ts.filter((t) => t.projectId !== id))
  }

  const addTask = ({ text, tag }) => {
    setTasks((ts) => [...ts, { id: uid(), projectId: activeId, text, tag, done: false, createdAt: Date.now() }])
  }

  const toggleTask = (id) => setTasks((ts) => ts.map((t) => t.id === id ? { ...t, done: !t.done } : t))
  const deleteTask = (id) => setTasks((ts) => ts.filter((t) => t.id !== id))
  const editTask = (id, data) => setTasks((ts) => ts.map((t) => t.id === id ? { ...t, ...data } : t))
  const editProject = (id, data) => setProjects((ps) => ps.map((p) => p.id === id ? { ...p, ...data } : p))

  return (
    <>
      <main>
        {activeProject ? (
          <ProjectDetail
            project={activeProject}
            tasks={activeTasks}
            onBack={() => setActiveId(null)}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
            onEditProject={(data) => editProject(activeId, data)}
          />
        ) : (
          <>
            <div className="intro">
              <img src={Logo} alt="logo" className="logo" />
              <p className="tip">{tip}</p>
            </div>

            <div className="cards">
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i + 1}
                  taskCount={tasks.filter((t) => t.projectId === p.id).length}
                  onClick={() => setActiveId(p.id)}
                  onEdit={() => setForm(p)}
                  onDelete={() => deleteProject(p.id)}
                />
              ))}
              <button className="card add-card" onClick={() => setForm('new')}>
                <span className="add-icon">+</span>
                <span className="add-label">New project</span>
              </button>
            </div>
          </>
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
