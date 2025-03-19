import React from 'react'
import CreateOffer from '../../components/offer/createOffer'
import RejectOffer from '../../components/offer/RejectOffer'
import CounterOffer from '../../components/offer/CounterOffer'
import AcceptOffer from '../../components/offer/AcceptOffer'

export default function OfferPage() {
  return (
    <div>
      
      <RejectOffer/>
      <CounterOffer/>
      <AcceptOffer/>
      <CreateOffer/>

    </div>
  )
}
