import { Icon } from '@iconify/react/dist/iconify.js'
import { NavLink, useParams } from 'react-router-dom'

const BusinessLineDetailHeader = () => {
    const { id: business_line_id } = useParams();

    return (
        <div className="border-b border-gray-200 mb-6">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
                <li className="me-2">
                    <NavLink to={`/is-kollari/detay/${business_line_id}/duzenle`} className="fb-tab inline-flex items-center justify-center p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 ">
                        <Icon icon="bx:edit" className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 " />
                        İş Kolu bilgileri
                    </NavLink>
                </li>
                <li className="me-2">
                    <NavLink to={`/is-kollari/detay/${business_line_id}/degiskenler`} className="fb-tab inline-flex items-center justify-center p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 ">
                        <Icon icon="pepicons-pop:info-circle" className="w-4 h-4 me-2 " />

                        Değişkenler
                    </NavLink>
                </li>

            </ul>
        </div>
    )
}

export default BusinessLineDetailHeader