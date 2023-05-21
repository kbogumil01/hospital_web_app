import React from 'react'

const Prescription = ({prescription}) => {
  return (
    <tr key={prescription.id}>
    <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className='text-sm text-gray-700' >
            {prescription.id}
        </div>
    </td>
    <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className='text-sm text-gray-700' >
        {prescription.description}
        </div>
    </td>
</tr>
  )
}

export default Prescription