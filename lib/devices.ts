export type DeviceStatus = 'online' | 'low' | 'offline' | 'maintenance'

export interface FeedSchedule {
  time: string
  portion: number // grams
  enabled: boolean
}

export interface CatDetection {
  timestamp: string
  count: number
  ids: string[]
  confidence: number
}

export interface Device {
  id: string
  name: string
  location: string
  building: string
  coordinates: { lat: number; lng: number }
  status: DeviceStatus
  foodLevel: number        // 0–100 %
  waterLevel: number
  batteryLevel: number
  temperature: number      // °C
  humidity: number         // %
  totalCatsToday: number
  totalMealsToday: number
  lastFed: string
  lastSeen: string
  uptime: number           // days
  schedules: FeedSchedule[]
  recentDetections: CatDetection[]
  weeklyActivity: number[] // cats per day, Mon-Sun
  cameraFeed: string       // label for simulated feed
  firmware: string
  ipAddress: string
}

export const devices: Device[] = [
  {
    id: 'F-01',
    name: 'Main Gate Feeder',
    location: 'Main Entrance Plaza',
    building: 'Gate',
    coordinates: { lat: 25.0134, lng: 121.5401 },
    status: 'online',
    foodLevel: 91,
    waterLevel: 85,
    batteryLevel: 100,
    temperature: 24,
    humidity: 62,
    totalCatsToday: 12,
    totalMealsToday: 8,
    lastFed: '14 min ago',
    lastSeen: '2 min ago',
    uptime: 47,
    firmware: 'v2.4.1',
    ipAddress: '192.168.10.11',
    cameraFeed: 'Main Gate Cam',
    schedules: [
      { time: '07:00', portion: 120, enabled: true },
      { time: '12:00', portion: 100, enabled: true },
      { time: '18:00', portion: 150, enabled: true },
      { time: '22:00', portion: 80, enabled: false },
    ],
    recentDetections: [
      { timestamp: '14:32', count: 3, ids: ['CAT-007', 'CAT-019', 'CAT-041'], confidence: 0.97 },
      { timestamp: '12:01', count: 2, ids: ['CAT-007', 'CAT-055'], confidence: 0.94 },
      { timestamp: '07:05', count: 4, ids: ['CAT-007', 'CAT-019', 'CAT-022', 'CAT-041'], confidence: 0.91 },
    ],
    weeklyActivity: [9, 11, 7, 12, 10, 14, 12],
  },
  {
    id: 'F-07',
    name: 'Engineering Block A',
    location: 'Bldg. A East Corridor',
    building: 'Engineering',
    coordinates: { lat: 25.0141, lng: 121.5409 },
    status: 'online',
    foodLevel: 78,
    waterLevel: 70,
    batteryLevel: 87,
    temperature: 26,
    humidity: 58,
    totalCatsToday: 7,
    totalMealsToday: 5,
    lastFed: '2 hr ago',
    lastSeen: '8 min ago',
    uptime: 31,
    firmware: 'v2.4.1',
    ipAddress: '192.168.10.17',
    cameraFeed: 'Eng-A East Cam',
    schedules: [
      { time: '07:30', portion: 100, enabled: true },
      { time: '13:00', portion: 100, enabled: true },
      { time: '19:00', portion: 120, enabled: true },
    ],
    recentDetections: [
      { timestamp: '13:07', count: 2, ids: ['CAT-013', 'CAT-028'], confidence: 0.96 },
      { timestamp: '07:34', count: 1, ids: ['CAT-013'], confidence: 0.99 },
    ],
    weeklyActivity: [5, 6, 8, 7, 5, 9, 7],
  },
  {
    id: 'F-12',
    name: 'Central Library',
    location: 'Library South Entrance',
    building: 'Library',
    coordinates: { lat: 25.0128, lng: 121.5415 },
    status: 'online',
    foodLevel: 44,
    waterLevel: 52,
    batteryLevel: 73,
    temperature: 23,
    humidity: 65,
    totalCatsToday: 17,
    totalMealsToday: 11,
    lastFed: '38 min ago',
    lastSeen: '1 min ago',
    uptime: 62,
    firmware: 'v2.3.9',
    ipAddress: '192.168.10.22',
    cameraFeed: 'Library Cam',
    schedules: [
      { time: '06:30', portion: 150, enabled: true },
      { time: '11:30', portion: 130, enabled: true },
      { time: '17:00', portion: 150, enabled: true },
      { time: '21:30', portion: 100, enabled: true },
    ],
    recentDetections: [
      { timestamp: '14:51', count: 5, ids: ['CAT-003', 'CAT-011', 'CAT-033', 'CAT-047', 'CAT-062'], confidence: 0.88 },
      { timestamp: '11:32', count: 4, ids: ['CAT-003', 'CAT-011', 'CAT-033', 'CAT-062'], confidence: 0.93 },
      { timestamp: '06:31', count: 3, ids: ['CAT-003', 'CAT-033', 'CAT-047'], confidence: 0.95 },
    ],
    weeklyActivity: [14, 12, 16, 17, 13, 19, 17],
  },
  {
    id: 'F-18',
    name: 'East Dormitory',
    location: 'Dorm E Ground Floor',
    building: 'Dormitory',
    coordinates: { lat: 25.0119, lng: 121.5421 },
    status: 'low',
    foodLevel: 17,
    waterLevel: 23,
    batteryLevel: 61,
    temperature: 28,
    humidity: 70,
    totalCatsToday: 4,
    totalMealsToday: 2,
    lastFed: '4 hr ago',
    lastSeen: '22 min ago',
    uptime: 18,
    firmware: 'v2.4.0',
    ipAddress: '192.168.10.28',
    cameraFeed: 'Dorm-E Cam',
    schedules: [
      { time: '08:00', portion: 120, enabled: true },
      { time: '20:00', portion: 120, enabled: true },
    ],
    recentDetections: [
      { timestamp: '10:14', count: 2, ids: ['CAT-072', 'CAT-081'], confidence: 0.92 },
    ],
    weeklyActivity: [3, 4, 2, 4, 3, 5, 4],
  },
  {
    id: 'F-23',
    name: 'Sports Complex',
    location: 'Track & Field North',
    building: 'Sports',
    coordinates: { lat: 25.0112, lng: 121.5395 },
    status: 'online',
    foodLevel: 66,
    waterLevel: 74,
    batteryLevel: 95,
    temperature: 29,
    humidity: 55,
    totalCatsToday: 6,
    totalMealsToday: 4,
    lastFed: '1 hr ago',
    lastSeen: '5 min ago',
    uptime: 25,
    firmware: 'v2.4.1',
    ipAddress: '192.168.10.33',
    cameraFeed: 'Sports Cam',
    schedules: [
      { time: '06:00', portion: 100, enabled: true },
      { time: '15:00', portion: 100, enabled: true },
      { time: '21:00', portion: 80, enabled: true },
    ],
    recentDetections: [
      { timestamp: '14:02', count: 2, ids: ['CAT-090', 'CAT-091'], confidence: 0.89 },
      { timestamp: '06:03', count: 1, ids: ['CAT-090'], confidence: 0.97 },
    ],
    weeklyActivity: [4, 5, 6, 6, 5, 7, 6],
  },
  {
    id: 'F-29',
    name: 'Admin Building',
    location: 'Admin Block West Wing',
    building: 'Admin',
    coordinates: { lat: 25.0145, lng: 121.5388 },
    status: 'maintenance',
    foodLevel: 0,
    waterLevel: 0,
    batteryLevel: 12,
    temperature: 25,
    humidity: 60,
    totalCatsToday: 0,
    totalMealsToday: 0,
    lastFed: '2 days ago',
    lastSeen: '6 hr ago',
    uptime: 0,
    firmware: 'v2.3.8',
    ipAddress: '192.168.10.39',
    cameraFeed: 'Admin Cam (offline)',
    schedules: [
      { time: '08:00', portion: 100, enabled: false },
      { time: '17:00', portion: 100, enabled: false },
    ],
    recentDetections: [],
    weeklyActivity: [3, 3, 2, 1, 0, 0, 0],
  },
]

export function getDevice(id: string): Device | undefined {
  return devices.find((d) => d.id === id)
}
