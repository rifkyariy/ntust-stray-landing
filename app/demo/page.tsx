import Link from 'next/link'
import {
  PawPrint, ChevronRight, Wifi, WifiOff, AlertTriangle, Wrench,
  Package, UtensilsCrossed, BatteryMedium, MapPin, Clock, ArrowRight,
  Smartphone, Activity,
} from 'lucide-react'
import { devices } from '@/lib/devices'

const statusMeta = {
  online:      { label: 'Online',      Icon: Wifi,           dot: 'bg-green-400',  text: 'text-green-400',  badge: 'bg-green-500/15  border-green-500/30'  },
  low:         { label: 'Low Supply',  Icon: AlertTriangle,   dot: 'bg-orange-400', text: 'text-orange-400', badge: 'bg-orange-500/15 border-orange-500/30' },
  offline:     { label: 'Offline',     Icon: WifiOff,         dot: 'bg-red-400',    text: 'text-red-400',    badge: 'bg-red-500/15    border-red-500/30'    },
  maintenance: { label: 'Maintenance', Icon: Wrench,          dot: 'bg-yellow-400', text: 'text-yellow-400', badge: 'bg-yellow-500/15 border-yellow-500/30' },
}

function LevelBar({ value }: { value: number }) {
  const color = value < 25 ? 'from-red-500 to-orange-400' : 'from-sky-500 to-indigo-500'
  return (
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all`} style={{ width: `${value}%` }} />
    </div>
  )
}

export default function DemoPage() {
  const online = devices.filter(d => d.status === 'online').length
  const alerts = devices.filter(d => d.status !== 'online').length
  const totalCats  = devices.reduce((a, d) => a + d.totalCatsToday, 0)
  const totalMeals = devices.reduce((a, d) => a + d.totalMealsToday, 0)

  return (
    <div className="min-h-screen bg-[#0f1419] text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1419]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg">
                <PawPrint size={15} className="text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block">Stray</span>
            </Link>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-slate-400 text-sm">Device Management</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
            <Link href="/mobile" className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/15 text-slate-300 hover:border-sky-400/50 hover:text-sky-400 transition-all">
              <Smartphone size={12} /> Mobile View
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Device Dashboard</h1>
          <p className="text-slate-400 text-sm">Real-time overview of all deployed smart feeders across campus</p>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { Icon: Package,        label: 'Total Devices', value: String(devices.length), sub: `${online} online`,         warn: false },
            { Icon: AlertTriangle,  label: 'Alerts',        value: String(alerts),          sub: 'need attention',           warn: alerts > 0 },
            { Icon: PawPrint,       label: 'Cats Today',    value: String(totalCats),        sub: 'unique visits',            warn: false },
            { Icon: UtensilsCrossed,label: 'Meals Served',  value: String(totalMeals),       sub: 'today',                    warn: false },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between mb-3">
                <s.Icon size={18} className={s.warn ? 'text-orange-400' : 'text-slate-500'} />
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
          {devices.map(device => {
            const st = statusMeta[device.status]
            const SI = st.Icon
            return (
              <Link key={device.id} href={`/demo/${device.id}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.04] hover:border-sky-400/40 hover:bg-white/[0.07] transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">

                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs text-sky-400 font-semibold">{device.id}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${st.badge} ${st.text}`}>
                          <SI size={9} />
                          {st.label}
                        </span>
                      </div>
                      <h2 className="font-semibold text-white group-hover:text-sky-300 transition-colors">{device.name}</h2>
                      <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                        <MapPin size={10} /> {device.location}
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-600 mt-0.5 space-y-1">
                      <div className="flex items-center gap-1 justify-end"><PawPrint size={10} /> {device.totalCatsToday} today</div>
                      <div className="flex items-center gap-1 justify-end"><Clock size={10} /> {device.lastSeen}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span className="flex items-center gap-1"><UtensilsCrossed size={10} /> Food</span>
                        <span className={device.foodLevel < 25 ? 'text-orange-400 font-semibold' : 'text-slate-400'}>{device.foodLevel}%</span>
                      </div>
                      <LevelBar value={device.foodLevel} />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span className="flex items-center gap-1"><Activity size={10} /> Water</span>
                        <span className={device.waterLevel < 25 ? 'text-orange-400 font-semibold' : 'text-slate-400'}>{device.waterLevel}%</span>
                      </div>
                      <LevelBar value={device.waterLevel} />
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><UtensilsCrossed size={10} /> {device.totalMealsToday}</span>
                    <span className="flex items-center gap-1"><BatteryMedium size={10} /> {device.batteryLevel}%</span>
                    <span className="text-slate-600">{device.firmware}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sky-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Details <ArrowRight size={10} />
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
