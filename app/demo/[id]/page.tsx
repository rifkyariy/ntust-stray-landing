import { devices, getDevice } from '@/lib/devices'
import { notFound } from 'next/navigation'
import DeviceDetailClient from '@/components/Demo/DeviceDetailClient'

export function generateStaticParams() {
  return devices.map((d) => ({ id: d.id }))
}

export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const device = getDevice(params.id)
  if (!device) notFound()
  return <DeviceDetailClient device={device} allDevices={devices} />
}
