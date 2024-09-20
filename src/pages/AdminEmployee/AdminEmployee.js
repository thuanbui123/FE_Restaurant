import { useEffect } from 'react';
import AddEmployee from '~/components/AddEmployee';
import EmployeeDataTable from '~/components/EmployeeDataTable';

function AdminEmployee() {
    useEffect(() => {
        document.title = 'Quản lý nhân viên';
    }, []);
    return (
        <>
            <AddEmployee />
            <EmployeeDataTable />
        </>
    );
}

export default AdminEmployee;
