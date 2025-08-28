import antCookie from "../images/ant-cookie2.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../state/AppState.jsx"


export default function GoalFormPage() {
  const { createGoal, user } = useApp()
  const navigate = useNavigate()
  
  // Sample goals data (keeping your original goals)
  const [goals, setGoals] = useState([
    {
      _id: '1',
      title: 'Study JavaScript',
      description: 'Practice JavaScript fundamentals daily',
      progress: [
        { date: '2025-08-10T10:00:00Z', completed: true },
        { date: '2025-08-09T10:00:00Z', completed: true }
      ]
    },
    {
      _id: '2',
      title: 'Read Technical Books',
      description: 'Read for 30 minutes each day',
      progress: []
    }
  ])

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    targetValue: "",
    unit: "",
  })
  const [dateError, setDateError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")
  const today = new Date().toISOString().split("T")[0]

  function update(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleStartDate(v) {
    setDateError("");
    update("startDate", v);
    if (form.endDate && v && form.endDate < v) update("endDate", "");
  }

  function handleEndDate(v) {
    setDateError("");
    if (form.startDate && v < form.startDate) {
      setDateError("End date cannot be before start date.");
      return;
    }
    update("endDate", v);
  }

  function handleDeleteGoal(goalId) {
    setGoals(goals.filter(goal => goal._id !== goalId))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      setDateError("End date cannot be before start date.");
      return;
    }
    setSaving(true);
    setErr("");

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category || undefined,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      targetValue: form.targetValue ? Number(form.targetValue) : undefined,
      unit: form.unit || undefined,
      userId: user?.id ?? user?._id ?? DEV_USER_ID,
    };

    try {
      if (editing) await apiUpdateGoal(id, payload);
      else await apiCreateGoal(payload);
      navigate("/goals");
    } catch (e2) {
      setErr(e2.message || "Internal Server Error");
    } finally {
      setSaving(false);
    }
    createGoal(form)

    const newGoal = {
      _id: Date.now().toString(),
      ...form,
      progress: []
    }
    setGoals([...goals, newGoal])
    setForm({
      title: "",
      description: "",
      category: "",
      startDate: "",
      endDate: "",
      targetValue: "",
      unit: "",
    })
    setShowAddForm(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-3xl font-extrabold mb-4">
        <img src={antCookie} alt="Goals" className="w-30 h-44" />
          My Goals
        </h1>
      </div>

      {!user && (
        <div className="text-3 font-light mb-2">
          (Tip: Log in from the sidebar to keep your goals saved to this browser.)
        </div>
      )}

      {/* Goal Form */}
        <div className="bg-white rounded shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Goal Title
              </label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                placeholder="Enter your goal..." 
                value={form.title} 
                onChange={(e) => update("title", e.target.value)} 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                rows="3" 
                placeholder="Describe your goal..." 
                value={form.description} 
                onChange={(e) => update("description", e.target.value)} 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                value={form.category} 
                onChange={(e) => update("category", e.target.value)}
              >
                <option value="">Category (select)</option>
                <option>Study</option>
                <option>Project</option>
                <option>Habit</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Date
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                value={form.startDate} 
                onChange={(e) => handleStartDate(e.target.value)} 
                min={today} 
                max={form.endDate || undefined} 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Date
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                value={form.endDate} 
                onChange={(e) => handleEndDate(e.target.value)} 
                min={form.startDate || today} 
                required 
              />
            </div>

            {dateError && <p className="text-sm text-red-500">{dateError}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Target Value
              </label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                placeholder="Target Value" 
                value={form.targetValue} 
                onChange={(e) => update("targetValue", e.target.value)} 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Unit
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                value={form.unit} 
                onChange={(e) => update("unit", e.target.value)}
              >
                <option value="">Unit (select)</option>
                <option>hours</option>
                <option>pages</option>
                <option>problems</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button 
                type="submit" 
                className="px-5 py-2 rounded text-sm font-semibold bg-[#E11D48] text-white"
              >
                Save Goal
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)} 
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals && goals.map((goal) => (
          <div key={goal._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{goal.title}</h3>
                <p className="text-gray-600 mt-1">{goal.description}</p>
                {goal.category && <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm mt-2">{goal.category}</span>}
                {goal.startDate && goal.endDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                  </p>
                )}
                {goal.targetValue && goal.unit && (
                  <p className="text-sm text-gray-500">Target: {goal.targetValue} {goal.unit}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteGoal(goal._id)}
                className="text-[#E11D48] hover:text-[#E11D48] font-medium text-sm"
              >
                Delete
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Progress: {goal.progress ? goal.progress.length : 0} check-ins
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#E11D48] h-2 rounded-full" 
                  style={{ width: `${goal.progress ? Math.min(goal.progress.length * 10, 100) : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {(!goals || goals.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No goals yet!</p>
            <p>Click "Add New Goal" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
