import React, { useState } from 'react';
import '../Styles/SupplierItemStyle.css'

const SupplierItem = ({ id, name, contactInfo, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = () => {
        onDelete(name);
        setShowPopup(false);
    };

    return (
        <div className="supplier_item">
            <span className='supplier_name'>{name}</span>
            <span className='supplier_contactinfo'>{contactInfo}</span>
            <button onClick={() => setShowPopup(true)}>Xóa</button>

            {showPopup && (
                <div className="delete_supplier_popup_overlay">
                    <div className="delete_supplier_popup_content">
                        <h3>Xác nhận xóa</h3>
                        <p>Bạn có chắc chắn muốn xóa "{name}" không?</p>
                        <div className="delete_supplier_popup_actions">
                            <button onClick={handleDelete}>Xóa</button>
                            <button onClick={() => setShowPopup(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierItem;