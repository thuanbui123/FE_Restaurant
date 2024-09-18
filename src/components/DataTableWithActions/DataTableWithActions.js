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
    fetchDataApi, // Hàm để gọi API lấy dữ liệu phân trang
    fetchRowDataApi, // Hàm để lấy dữ liệu chi tiết cho từng hàng
    updateDataApi, // Hàm để cập nhật dữ liệu
    deleteDataApi, // Hàm để xóa dữ liệu
    primaryKey = 'id', // Thuộc tính khóa chính, mặc định là 'id'
    customRowAction, // Hàm xử lý click trên từng hàng
    labelEditInput,
    excludedKeys,
}) {
    const [data, setData] = useState([]); // Dữ liệu hiển thị trong bảng
    const [selectRow, setSelectRow] = useState(null); // Dữ liệu dòng được chọn
    const [totalRows, setTotalRows] = useState(0); // Tổng số bản ghi
    const perPage = 4; // Số bản ghi mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Trạng thái mở Modal sửa thông tin
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Trạng thái mở Modal xác nhận xóa

    // Hàm lấy dữ liệu từ API
    const fetchData = async (page, size) => {
        try {
            const result = await fetchDataApi(page - 1, size); // page - 1 để đúng với API trả về
            setData(result.data); // Dữ liệu của trang hiện tại
            setTotalRows(result.totalElements); // Tổng số bản ghi
            setCurrentPage(result.currentPage + 1); // +1 vì số trang trong API bắt đầu từ 0
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

    // const handlePerRowsChange = (newPerPage, page) => {
    //     setPerPage(newPerPage);
    //     fetchData(page, newPerPage);
    // };

    const fetchRowData = async (row) => {
        try {
            const result = await fetchRowDataApi(row[primaryKey]);
            setSelectRow(result);
        } catch (error) {
            alert('Error fetching row data: ', error);
        }
    };

    const handleEdit = (row) => {
        fetchRowData(row); // Lấy dữ liệu chi tiết của hàng cần sửa
        setIsEditModalOpen(true); // Mở Modal sửa
    };

    const handleDelete = (row) => {
        fetchRowData(row); // Lấy dữ liệu chi tiết của hàng cần xóa
        setIsDeleteModalOpen(true); // Mở Modal xác nhận xóa
    };

    const handleSave = async (updateData) => {
        try {
            await updateDataApi(updateData);
            setIsEditModalOpen(false); // Đóng Modal sửa
            alert('Cập nhật thành công.');
            fetchData(currentPage, perPage); // Lấy lại dữ liệu
        } catch (error) {
            console.log(error.response.data);
            alert(`Đã có lỗi khi cập nhật : ${error.response.data.message}`);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteDataApi(selectRow[primaryKey]);
            setIsDeleteModalOpen(false); // Đóng Modal xác nhận xóa
            alert('Xóa thành công.');
            fetchData(currentPage, perPage); // Lấy lại dữ liệu sau khi xóa
        } catch (error) {
            alert(`Đã có lỗi khi xóa: ${error.response.data.message}`);
        }
    };

    const buttonStyle = {
        letterSpacing: 'normal',
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
                  .filter((key) => !excludedKeys.includes(key)) // Loại bỏ các khóa không muốn render
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
            maxWidth: '500px',
            maxHeight: '200px', // Adjust the height to match the image more closely
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: 'none', // Remove border for a cleaner look
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the overlay a bit more
        },
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px', // Increase gap between buttons
        marginTop: '20px', // Add space between buttons and text
    };

    const headerStyle = {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
        fontSize: '18px', // Adjust font size to be more prominent
    };

    const editModalStyle = {
        content: {
            maxWidth: '500px',
            maxHeight: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: 'none',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    const editButtonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px',
    };

    const editHeaderStyle = {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
        fontSize: '18px',
    };

    const editButtonStyle = {
        padding: '8px 20px',
        fontSize: '16px',
        borderRadius: '6px',
        marginTop: '10px',
    };

    const inputContainerStyle = {
        display: 'flex',
        alignItems: 'center', // Vertically align label and input
        marginBottom: '15px', // Space between input rows
    };

    const labelStyle = {
        marginRight: '20px', // Add space between label and input
        minWidth: '100px', // Optional: set a width to align multiple labels
        textAlign: 'left', // Align text to the right to ensure it lines up with the input
        fontSize: '16px',
    };

    const inputStyle = {
        flex: 1, // Make the input take the remaining space
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        textAlign: 'left',
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
                                      style={buttonStyle}
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
                            height: '70px', // Chiều cao của dòng
                            lineHeight: '70px', // Đảm bảo văn bản nằm giữa dòng
                        },
                    },
                }}
                // pagination
                // paginationServer
                // paginationTotalRows={totalRows}
                // onChangeRowsPerPage={handlePerRowsChange}
                // onChangePage={handlePageChange}
                onRowClicked={customRowAction} // Bắt sự kiện khi click vào dòng
            />

            {/* Modal sửa thông tin */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Modal sửa thông tin"
                ariaHideApp={false}
                style={editModalStyle}
            >
                <h2 style={editHeaderStyle}>Sửa thông tin</h2>
                {selectRow && (
                    <div>
                        {renderInputs()}
                        <div style={editButtonContainerStyle}>
                            <Button
                                style={{ ...editButtonStyle, backgroundColor: '#007bff', color: '#fff' }}
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
                currentPage={currentPage - 1} // Trang của Pagination là 0-based
                totalPages={Math.ceil(totalRows / perPage)} // Tính tổng số trang
                onPageChange={(page) => handlePageChange(page + 1)} // Pagination là 1-based, cần cộng 1
            />

            {/* Modal xác nhận xóa */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                contentLabel="Modal xác nhận xóa"
                ariaHideApp={false}
                style={modalStyle}
            >
                <h2 style={headerStyle}>Bạn có chắc chắn muốn xóa không?</h2>
                <div style={buttonContainerStyle}>
                    <Button style={buttonStyle} variant="danger" size="sm" onClick={handleConfirmDelete}>
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
