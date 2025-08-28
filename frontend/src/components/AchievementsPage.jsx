// import { useApp } from "../state/AppState.jsx"

// export default function AchievementsPage() {
//   const { goals } = useApp()
//   const locked = goals.filter(g => g.state !== "earned")

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-extrabold mb-1">Achievements</h1>
//       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Locked only. Details are hidden until earned.</p>

//       <div className="space-y-4">
//         {locked.map(g => <LockedCard key={g.id} />)}
//         {locked.length === 0 && (
//           <div className="text-sm text-gray-500 dark:text-gray-300 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
//             No locked achievements right now.
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// function LockedCard() {
//   return (
//     <div className="bg-white dark:bg-[#0F172A] rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
//       <div className="flex items-start gap-4">
//         <div className="w-10 h-10 rounded-sm bg-[#0F172A]" />
//         <div className="flex-1">
//           <div className="flex items-start justify-between gap-3">
//             <div>
//               <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
//               <div className="h-3 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
//             </div>
//             <span className="text-xs font-bold tracking-wider text-[#E11D48]">LOCKED</span>
//           </div>
//           <div className="mt-3 h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
//         </div>
//       </div>
//     </div>
//   )
// }
