import { useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";
import StatusPill from "./StatusPill.jsx";
import { useApp } from "../state/AppState.jsx";
import { deleteGoal as apiDeleteGoal } from "../api/goals";

function clampPct(v) {
    const n = Number(v) || 0
    return Math.max(0, Math.min(100, Math.round(n)))
}


function clampPct(v) {
    const n = Number(v) || 0
    return Math.max(0, Math.min(100, Math.round(n)))
}


export default function GoalCard({ id, title, description, progress = 0, status = "high", editable = false }) {
    const { updateGoalProgress } = useApp()
    const pct = clampPct(progress)

  const onSlide = (e) => editable && id && updateGoalProgress(id, Number(e.target.value));
  const markDone = () => editable && id && updateGoalProgress(id, 100);
  const reset = () => editable && id && updateGoalProgress(id, 0);

    const todayCheckedIn = goal && goal.progress && goal.progress.some(p => {
        const progressDate = new Date(p.date);
        const today = new Date();
        return (
            progressDate.getFullYear() === today.getFullYear() &&
            progressDate.getMonth() === today.getMonth() &&
            progressDate.getDate() === today.getDate()
        );
    });
        
    return (
      <div>
      <div className="bg-white dark:bg-[#0F172A] rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#0F172A]" />
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-[17px] font-extrabold text-[#0F172A] dark:text-gray-100 leading-tight">{title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300 -mt-0.5">{description}</p>
                        </div>
                        <StatusPill variant={status} />
                    </div>

                    <div className="mt-3">
                        <ProgressBar value={pct} />
                    </div>

                    {editable && (
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <input type="range" min={0} max={100} value={pct} onChange={onSlide} className="w-48" aria-label="Progress" />
                            <span className="text-sm text-gray-600 dark:text-gray-300 tabular-nums w-12 text-right">{pct}%</span>
                            <button type="button" onClick={markDone} className="px-3 py-1.5 rounded bg-[#10B981] text-white text-xs font-semibold">Mark done</button>
                            <button type="button" onClick={reset} className="px-3 py-1.5 rounded bg-gray-200 text-[#0F172A] text-xs font-semibold dark:bg-gray-700 dark:text-gray-100">Reset</button>
                            <button
                                onClick={() => onDailyCheckin(id)}
                                disabled={todayCheckedIn}
                                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-200
                                  ${todayCheckedIn
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-white border-gray-400 hover:bg-gray-100'
                                    } `}
                            >
                                {todayCheckedIn && (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
<<<<<<< HEAD
            <StatusPill variant={status} />
          </div>

          <div className="mt-3">
            <ProgressBar value={pct} />
          </div>

          {editable && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input type="range" min={0} max={100} value={pct} onChange={onSlide} className="w-48" />
              <span className="text-sm text-gray-600 dark:text-gray-300 tabular-nums w-12 text-right">
                {pct}%
              </span>
              <button onClick={markDone} className="px-3 py-1.5 rounded bg-[#10B981] text-white text-xs font-semibold">
                Mark done
              </button>
              <button onClick={reset} className="px-3 py-1.5 rounded bg-gray-200 text-[#0F172A] text-xs font-semibold dark:bg-gray-700 dark:text-gray-100">
                Reset
              </button>
            </div>
          )}

          <div className="mt-3 flex gap-2">
            {id && <Link to={`/goals/${id}/edit`} className="px-2 py-1 border rounded">Edit</Link>}
            <button onClick={handleDelete} disabled={deleting} className="px-2 py-1 border rounded">
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>

            )
}
=======
        </div>
    )
}
>>>>>>> 40020147c2d85220b24b58a55ccfc0966bd412ea
