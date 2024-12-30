import React, { useState, useEffect } from 'react';
import '../Styles/SupplierStyle.css';
import { getToken } from '../Service/TokenService';
import { getSupplier, createSupplier, deleteSupplier } from '../Service/SupplierService';
import { createAuditlog } from '../Service/AuditLogService';
import SupplierItem from '../Components/SupplierItem';

const Supplier = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [supplier, setSupplier] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newSupplierName, setNewSupplierName] = useState("");
    const [newSupplierContactInfo, setNewSupplierContactInfo] = useState("")

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);

        const fetchSupplier = async () => {
            try {
                const response = await getSupplier();
                setSupplier(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchSupplier();
    }, []);

    const handleAddCategory = async () => {
        try {
            const response = await createSupplier(newSupplierName, newSupplierContactInfo);
            await createAuditlog(`đã thêm nhà cung cấp: ${newSupplierName}`);
            setSupplier([...supplier, response.data]);
            setNewSupplierName("");
            setNewSupplierContactInfo("");
            setShowPopup(false);
        } catch (error) {
            alert("Tên nhà cung cấp đã tồn tại")
        }
    };

    const handleDeleteCategory = async (name) => {
        try {
            await deleteSupplier(name);
            await createAuditlog(`đã xóa nhà cung cấp: ${name}`)
            setSupplier(supplier.filter((category) => category.name !== name));
        } catch (error) {
            alert("Đang tồn tại sản phẩm có nhà cung cấp này")
        }
    };

    if (!isLoggedIn) {
        return <div></div>;
    }

    return (
        <div>
            <div className='supplier_container'>
                <span className='supplier_title'>Danh sách nhà cung cấp</span>
                <button className='add_supplier' onClick={() => setShowPopup(true)}>
                    <img src='https://cdn-icons-png.flaticon.com/512/32/32563.png' alt=''></img>
                </button>
                <div className="supplier_list">
                    {supplier.map(category => (
                        <SupplierItem
                            key={category.id}
                            name={category.name}
                            contactInfo={category.contactInfo}
                            onDelete={handleDeleteCategory}
                        />
                    ))}
                </div>
            </div>

            {showPopup && (
                <div className="add_supplier_popup">
                    <div className="add_supplier_popup_content">
                        <h2>Thêm Nhà Cung Cấp</h2>
                        <input
                            type="text"
                            placeholder="Nhập tên nhà cung cấp"
                            value={newSupplierName}
                            onChange={(e) => setNewSupplierName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập thông tin liên lạc"
                            value={newSupplierContactInfo}
                            onChange={(e) => setNewSupplierContactInfo(e.target.value)}
                        />
                        <div className="add_supplier_popup_actions">
                            <button onClick={handleAddCategory}>Thêm</button>
                            <button onClick={() => setShowPopup(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Supplier;