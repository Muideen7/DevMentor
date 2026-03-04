import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  subValue?: string
  icon: string
  color: string
}

function StatCard({ label, value, subValue, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-soft hover:border-slate-200 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "size-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
          color
        )}>
          <span className="material-symbols-outlined text-2xl font-black">{icon}</span>
        </div>
        {subValue && (
          <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase tracking-widest">
            {subValue}
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-slate-900 mb-1">{value}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
        {label}
      </p>
    </div>
  )
}

interface ProgressStatsProps {
  stats: {
    totalCheckIns: number
    totalCodeReviews: number
    currentStreak: number
    bestStreak: number
  }
}

export default function ProgressStats({ stats }: ProgressStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StatCard 
        label="Total Check-ins" 
        value={stats.totalCheckIns} 
        icon="event_available" 
        color="bg-accent-coral/10 text-accent-coral" 
      />
      <StatCard 
        label="Code Reviews" 
        value={stats.totalCodeReviews} 
        icon="code_blocks" 
        color="bg-emerald-50 text-emerald-600" 
      />
      <StatCard 
        label="Current Streak" 
        value={stats.currentStreak} 
        subValue="Days"
        icon="local_fire_department" 
        color="bg-orange-50 text-orange-500" 
      />
      <StatCard 
        label="Best Streak" 
        value={stats.bestStreak} 
        subValue="Records"
        icon="workspace_premium" 
        color="bg-amber-50 text-amber-500" 
      />
    </div>
  )
}
