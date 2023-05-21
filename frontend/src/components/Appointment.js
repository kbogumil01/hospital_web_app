import React from 'react'

const Appointment = ({appointment}) => {
  return (
    <tr key={appointment.id}>
    <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className='text-sm text-gray-700' >
            {appointment.id}
        </div>
    </td>
    <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className='text-sm text-gray-700' >
        {appointment.date}
        </div>
    </td>
</tr>
  )
}

export default Appointment