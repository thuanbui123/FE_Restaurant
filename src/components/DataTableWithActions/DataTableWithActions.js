import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '~/utils/Pagination';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt, faSave, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '~/components/CustomModal';
import { ToastContainer } from 'react-bootstrap';
import CustomToastMessage from '~/components/CustomToastMessage';
import Spinner from '~/components/Spinner';
library.add(faEdit, faTrashAlt, faSave, faTimes, faCheck);

function DataTableWithActions({
    columns,
    fetchDataApi,
    fetchRowDataApi,
    updateDataApi,
    deleteDataApi,
    primaryKey = 'id',
    customRowAction,
    labelEditInput,
    excludedKeys,
    searchData,
}) {
    const [data, setData] = useState([]);
    const [selectRow, setSelectRow] = useState(null);
    const [totalRows, setTotalRows] = useState(0);
    const perPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    // Hàm lấy dữ liệu từ API
    const fetchData = useCallback(
        async (page, size) => {
            try {
                setLoading(true);
                const result = await fetchDataApi(page - 1, size);
                if (result) {
                    setData(result.data || []); // Đặt giá trị mặc định là mảng rỗng
                    setTotalRows(result.totalElements || 0);
                    setCurrentPage(result.currentPage + 1);
                }
            } catch (error) {
                CustomToastMessage.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        },
        [fetchDataApi],
    );

    // useEffect(() => {
    //     fetchData(currentPage, perPage);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentPage]);

    useEffect(() => {
        console.log(searchData);
        if (searchData) {
            if (searchData.data) {
                setData(searchData.data);
                setCurrentPage(searchData.currentPage + 1);
                setTotalRows(searchData.totalElements || 0);
            }
        } else {
            fetchData(currentPage, perPage);
        }
    }, [currentPage, fetchData, searchData]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const fetchRowData = async (row) => {
        try {
            const result = await fetchRowDataApi(row[primaryKey]);
            setSelectRow(result);
        } catch (error) {
            CustomToastMessage.error(error.response.data.message);
        }
    };

    const handleEdit = (row) => {
        fetchRowData(row);
        setIsEditModalOpen(true);
    };

    const handleDelete = (row) => {
        fetchRowData(row);
        setIsDeleteModalOpen(true);
    };

    const navigate = useNavigate();

    const location = useLocation();

    const handleSave = async (updateData) => {
        try {
            await updateDataApi(updateData);
            setIsEditModalOpen(false);
            CustomToastMessage.success('Cập nhật thành công.', () => {
                // Lưu currentPage và perPage vào URL trước khi refresh
                const queryParams = new URLSearchParams();
                queryParams.set('page', currentPage);
                queryParams.set('perPage', perPage);

                // Thêm các tham số vào URL
                navigate(`?${queryParams.toString()}`); // Điều hướng tới URL mới
                window.location.reload();
            });
        } catch (error) {
            CustomToastMessage.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pageToLoad = query.get('page') ? parseInt(query.get('page'), 10) : 1;
        const perPageToLoad = query.get('perPage') ? parseInt(query.get('perPage'), 10) : perPage;

        // Gọi hàm fetchData với các giá trị từ URL
        fetchData(pageToLoad, perPageToLoad);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const handleConfirmDelete = async () => {
        try {
            await deleteDataApi(selectRow[primaryKey]);
            setIsDeleteModalOpen(false);
            CustomToastMessage.success('Xoá thành công.', () => {
                // Lưu currentPage và perPage vào URL trước khi refresh
                const queryParams = new URLSearchParams();
                queryParams.set('page', currentPage);
                queryParams.set('perPage', perPage);

                // Thêm các tham số vào URL
                navigate(`?${queryParams.toString()}`); // Điều hướng tới URL mới
                window.location.reload();
            });
        } catch (error) {
            CustomToastMessage.error(error.response.data.message);
        }
    };

    const buttonStyle = {
        letterSpacing: 'normal',
        borderRadius: '5px',
        fontSize: '16px',
        width: '50px',
        textAlign: 'center',
    };

    const style = {
        fontSize: '16px',
    };

    const renderInputs = () => {
        return selectRow
            ? Object.keys(selectRow)
                  .filter((key) => !excludedKeys.includes(key))
                  .map((key) => (
                      <div className="form-group" style={inputContainerStyle} key={key}>
                          <label style={labelStyle}>{labelEditInput[key] || key}</label>
                          <input
                              style={inputStyle}
                              name={key}
                              value={selectRow[key]}
                              onChange={(e) => setSelectRow({ ...selectRow, [key]: e.target.value })}
                              className="form-control"
                              readOnly={key === primaryKey}
                          />
                      </div>
                  ))
            : null;
    };

    const editButtonStyle = {
        padding: '8px 20px',
        fontSize: '16px',
        borderRadius: '6px',
        marginTop: '10px',
    };

    const inputContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    };

    const labelStyle = {
        marginRight: '20px',
        minWidth: '100px',
        textAlign: 'left',
        fontSize: '16px',
        flex: 1,
    };

    const inputStyle = {
        flex: 4,
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        textAlign: 'left',
        width: '450px',
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <DataTable
                    columns={columns.map((col) => ({
                        ...col,
                        customStyles: col.customStyles,
                        name: <span style={style}>{col.name}</span>,
                        cell: col.cell
                            ? (row) => <div style={style}>{col.cell(row)}</div>
                            : (row) => (
                                  <div className="d-flex">
                                      <Button
                                          style={{ ...buttonStyle, marginRight: '3px' }}
                                          className="mr-2"
                                          variant="primary"
                                          size="sm"
                                          onClick={() => handleEdit(row)}
                                      >
                                          <FontAwesomeIcon icon="edit" />
                                      </Button>
                                      <Button
                                          style={buttonStyle}
                                          variant="danger"
                                          size="sm"
                                          onClick={() => handleDelete(row)}
                                      >
                                          <FontAwesomeIcon icon="trash-alt" />
                                      </Button>
                                  </div>
                              ),
                    }))}
                    data={data}
                    customStyles={{
                        rows: {
                            style: {
                                height: '70px',
                                lineHeight: '70px',
                            },
                        },
                    }}
                    onRowClicked={customRowAction}
                />
            )}

            {/* Modal sửa thông tin */}
            <CustomModal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Sửa thông tin"
                footer={
                    <>
                        <Button
                            style={{
                                ...editButtonStyle,
                                backgroundColor: '#007bff',
                                color: '#fff',
                                marginRight: '20px',
                            }}
                            variant="primary"
                            size="sm"
                            onClick={() => handleSave(selectRow)}
                        >
                            <FontAwesomeIcon icon="save" />
                        </Button>
                        <Button
                            style={{ ...editButtonStyle, backgroundColor: '#6c757d', color: '#fff' }}
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            <FontAwesomeIcon icon="times" />
                        </Button>
                    </>
                }
            >
                {selectRow && (
                    <div>
                        <div>{renderInputs()}</div>
                    </div>
                )}
            </CustomModal>

            <Pagination
                currentPage={currentPage - 1}
                totalPages={Math.ceil(totalRows / perPage)}
                onPageChange={(page) => handlePageChange(page + 1)}
            />

            <CustomModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                contentLabel="Xác nhận xóa"
                footer={
                    <>
                        <Button
                            style={{ ...buttonStyle, marginRight: '20px' }}
                            variant="danger"
                            size="sm"
                            onClick={handleConfirmDelete}
                        >
                            <FontAwesomeIcon icon="check" />
                        </Button>
                        <Button
                            style={buttonStyle}
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            <FontAwesomeIcon icon="times" />
                        </Button>
                    </>
                }
            >
                <h2>Bạn có chắc chắn muốn xóa không?</h2>
            </CustomModal>

            <ToastContainer />
        </>
    );
}

export default DataTableWithActions;
