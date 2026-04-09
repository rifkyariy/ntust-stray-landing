import Link from 'next/link'
import { devices } from '@/lib/devices'

const statusMeta = {
  online: { label: 'Online', dot: 'bg-green-400', text: 'text-green-400', badge: 'bg-green-500/15 border-green-500/30' },
  low: { label: 'Low Supply', dot: 'bg-orange-400', text: 'text-orange-400', badge: 'bg-orange-500/15 border-orange-500/30' },
  offline: { label: 'Offline', dot: 'bg-red-400', text: 'text-red-400', badge: 'bg-red-500/15 border-red-500/30' },
  maintenance: { label: 'Maintenance', dot: 'bg-yellow-400', text: 'text-yellow-400', badge: 'bg-yellow-500/15 border-yellow-500/30' },
}

function LevelBar({ value, warn }: { value: number; warn?: boolean }) {
  const color = value < 25 ? 'from-red-500 to-orange-400' : warn ? 'from-orange-400 to-yellow-400' : 'from-accent-cyan to-accent-indigo'
  return (
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all`} style={{ width: `${value}%` }} />
    </div>
  )
}

export default function DemoPage() {
  const online = devices.filter((d) => d.status === 'online').length
  const alerts = devices.filter((d) => d.status === 'low' || d.status === 'maintenance' || d.status === 'offline').length
  const totalCats = devices.reduce((a, d) => a + d.totalCatsToday, 0)
  const totalMeals = devices.reduce((a, d) => a + d.totalMealsToday, 0)

  return (
    <div className="min-h-screen bg-[#0f1419] text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1419]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-sm shadow-lg">🐾</div>
              <span className="font-bold text-lg hidden sm:block">Stray</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-slate-400 text-sm">Device Management</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
            <Link
              href="/mobile"
              className="text-xs px-3 py-1.5 rounded-lg border border-white/15 text-slate-300 hover:border-sky-400/50 hover:text-sky-400 transition-all"
            >
              📱 Mobile View
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-[var(--font-display)] mb-1">Device Dashboard</h1>
          <p className="text-slate-400 text-sm">Real-time overview of all deployed smart feeders across campus</p>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: '📦', label: 'Total Devices', value: devices.length.toString(), sub: `${online} online` },
            { icon: '⚠️', label: 'Alerts', value: alerts.toString(), sub: 'need attention', warn: alerts > 0 },
            { icon: '🐱', label: 'Cats Today', value: totalCats.toString(), sub: 'unique visits' },
            { icon: '🍽️', label: 'Meals Served', value: totalMeals.toString(), sub: 'today' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{s.icon}</span>
                {s.warn && <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />}
              </div>
              <div className={`text-2xl font-bold mb-0.5 ${s.warn ? 'text-orange-400' : 'text-white'}`}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
              <div className="text-xs text-slate-600 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Devices grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {devices.map((device) => {
            const st = statusMeta[device.status]
            return (
              <Link
                key={device.id}
                href={`/demo/${device.id}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.04] hover:border-sky-400/40 hover:bg-white/[0.07] transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Card header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-sky-400 font-semibold">{device.id}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${st.badge} ${st.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${device.status === 'online' ? 'animate-pulse' : ''}`} />
                          {st.label}
                        </span>
                      </div>
                      <h2 className="font-semibold text-white group-hover:text-sky-300 transition-colors">{device.name}</h2>
                      <p className="text-slate-500 text-xs mt-0.5">📍 {device.location}</p>
                    </div>
                    <div className="text-right text-xs text-slate-600 mt-0.5">
                      <div>🐱 {device.totalCatsToday} today</div>
                      <div className="mt-0.5">⏱ {device.lastSeen}</div>
                    </div>
                  </div>

                  {/* Level bars */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Food</span>
                        <span className={device.foodLevel < 25 ? 'text-orange-400 font-semibold' : 'text-slate-400'}>{device.foodLevel}%</span>
                      </div>
                      <LevelBar value={device.foodLevel} />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Water</span>
                        <span className={device.waterLevel < 25 ? 'text-orange-400 font-semibold' : 'text-slate-400'}>{device.waterLevel}%</span>
                      </div>
                      <LevelBar value={device.waterLevel} />
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>🍽️ {device.totalMealsToday} meals</span>
                    <span>🔋 {device.batteryLevel}%</span>
                    <span>📶 {device.firmware}</span>
                  </div>
                  <span className="text-sky-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Details →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
