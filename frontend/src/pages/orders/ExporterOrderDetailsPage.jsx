import React from 'react'
import ExporterOrderDetails from '../../components/orders/exporter/ExporterOrderDetails'
import BackButton from '../../components/BackButton'

export default function ExporterOrderDetailsPage() {
  return (
    <div>
      <div className="pt-20"></div>
      <BackButton/>
      <ExporterOrderDetails/>
    </div>
  )
}
