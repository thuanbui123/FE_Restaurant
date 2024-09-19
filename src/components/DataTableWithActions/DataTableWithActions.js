import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '~/utils/Pagination';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt, faSave, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
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
}) {
    const [data, setData] = useState([]);
    const [selectRow, setSelectRow] = useState(null);
    const [totalRows, setTotalRows] = useState(0);
    const perPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Hàm lấy dữ liệu từ API
    const fetchData = async (page, size) => {
        try {
            const result = await fetchDataApi(page - 1, size);
            setData(result.data);
            setTotalRows(result.totalElements);
            setCurrentPage(result.currentPage + 1);
        } catch (error) {
            alert('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData(currentPage, perPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const fetchRowData = async (row) => {
        try {
            const result = await fetchRowDataApi(row[primaryKey]);
            setSelectRow(result);
        } catch (error) {
            alert('Error fetching row data: ', error);
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

    const handleSave = async (updateData) => {
        try {
            await updateDataApi(updateData);
            setIsEditModalOpen(false);
            alert('Cập nhật thành công.');
            fetchData(currentPage, perPage);
        } catch (error) {
            console.log(error.response.data);
            alert(`Đã có lỗi khi cập nhật : ${error.response.data.message}`);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteDataApi(selectRow[primaryKey]);
            setIsDeleteModalOpen(false);
            alert('Xóa thành công.');
            fetchData(currentPage, perPage);
        } catch (error) {
            alert(`Đã có lỗi khi xóa: ${error.response.data.message}`);
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
                  .filter((key) => !excludedKeys.includes(key)) // Loại bỏ các key không muốn render
                  .map((key) => (
                      <div className="form-group" style={inputContainerStyle} key={key}>
                          <label style={labelStyle}>
                              {labelEditInput[key] || key} {/* Fallback to key if label is not defined */}
                          </label>
                          <input
                              style={inputStyle}
                              name={key}
                              value={selectRow[key]}
                              onChange={(e) => setSelectRow({ ...selectRow, [key]: e.target.value })}
                              className="form-control"
                              readOnly={key === primaryKey} // Khóa chính chỉ cho phép đọc
                          />
                      </div>
                  ))
            : null;
    };

    const modalStyle = {
        content: {
            position: 'relative',
            borderRadius: '0.3rem',
            backgroundColor: '#fff',
            border: '1px solid #dee2e6',
            boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.075)',
            padding: '0',
            maxWidth: '600px',
            margin: 'auto',
        },
        overlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #dee2e6',
        backgroundColor: '#f1f1f1',
        textAlign: '16px',
    };

    const bodyStyle = {
        padding: '1rem',
    };

    const footerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
        borderTop: '1px solid #dee2e6',
        backgroundColor: '#f1f1f1',
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
    };

    const inputStyle = {
        flex: 1,
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        textAlign: 'left',
        display: 'block',
        width: '450px',
    };

    return (
        <>
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

            {/* Modal sửa thông tin */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Modal sửa thông tin"
                ariaHideApp={false}
                style={modalStyle}
            >
                <h2 style={headerStyle}>Sửa thông tin</h2>
                {selectRow && (
                    <div>
                        <div style={bodyStyle}>{renderInputs()}</div>
                        <div style={footerStyle}>
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
                        </div>
                    </div>
                )}
            </Modal>

            <Pagination
                currentPage={currentPage - 1}
                totalPages={Math.ceil(totalRows / perPage)}
                onPageChange={(page) => handlePageChange(page + 1)}
            />

            {/* Modal xác nhận xóa */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                contentLabel="Modal xác nhận xóa"
                ariaHideApp={false}
                style={modalStyle}
            >
                <div style={headerStyle}>Xác nhận xóa</div>
                <h2 style={bodyStyle}>Bạn có chắc chắn muốn xóa không?</h2>
                <div style={footerStyle}>
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
                </div>
            </Modal>
        </>
    );
}

export default DataTableWithActions;
