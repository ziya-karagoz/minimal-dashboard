import React from 'react'

export default function Empty() {
    return (
        <div className='d-flex align-items-center justify-content-center flex-column text-center p-5'>
            <img className="mb-3" src="/assets/svg/nodata.svg" alt="Kayıt Yok Maalesef" style={{ width: '7rem' }} />
            <p className="mb-0">Kayıt bulunamadı..</p>
        </div>
    )
}
