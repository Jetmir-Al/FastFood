import AdminInfo from "./AdminBackEnd/AdminInfo"
import './ProfileStyles/Admin.css';

const Admin = () => {
    let show = null
    // if (dropDownVal == 'accInfo') {
    //     show = <CustomerInfo />
    // } else if (dropDownVal == 'orderHisto') {
    //     show = <OrderHistory />
    // } else if (dropDownVal == 'activOrder') {
    //     show = <ActiveOrder />
    // }
    return (
        <div className="admin-Container">
            <AdminInfo />
        </div>
    )
}

export default Admin