"use client"
import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import MonthReport from './pdf'

const page = () => {
  return (
    <PDFViewer width={'100%'} height={'1000px'}>
      <MonthReport/>
    </PDFViewer>
  )
}

export default page