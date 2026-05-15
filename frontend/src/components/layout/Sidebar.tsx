import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../lib/navigation';

export function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-slate-950 px-4 py-4 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:px-6 lg:py-8">
      <div className="flex items-center gap-3 lg:block">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
          AI
        </div>
        <div className="lg:mt-5">
          <p className="text-sm font-semibold text-white">AgentOS</p>
          <p className="text-xs text-slate-400">Sequential orchestration UI</p>
        </div>
      </div>

      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-10 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              `block min-w-fit rounded-xl px-4 py-3 text-sm transition lg:min-w-0 ${
                isActive
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="font-medium">{item.label}</span>
            <span className="mt-1 hidden text-xs opacity-70 lg:block">{item.description}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 lg:block">
        <p className="font-medium text-white">Current milestone</p>
        <p className="mt-2 leading-6">
          Frontend foundation with reusable layout, pages, and API client. Workflow visualization comes later.
        </p>
      </div>
    </aside>
  );
}
