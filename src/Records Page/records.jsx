import React from 'react';
import Filters from '../Records Page/filters/filters.jsx'
import '../Records Page/records.css';

const Records = () => {
  return (
    <div className='recordsPage'>
        <div className="records-header">
            <h1>Header</h1>
        </div>
        <div className="records-filters">
            <Filters></Filters>
        </div>
        <div className="records-display">

        </div>
    </div>
  )
}

export default Records