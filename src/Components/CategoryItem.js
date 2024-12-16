import React, { useState } from 'react';
import '../Styles/CategoryItemStyle.css';

const CategoryItem = ({ id, name, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = () => {
        onDelete(name);
        setShowPopup(false);
    };

    return (
        <div className="category_item">
            <span>{name}</span>
            <button onClick={() => setShowPopup(true)}>Xóa</button>

            {showPopup && (
                <div className="delete_category_popup_overlay">
                    <div className="delete_category_popup_content">
                        <h3>Xác nhận xóa</h3>
                        <p>Bạn có chắc chắn muốn xóa "{name}" không?</p>
                        <div className="delete_category_popup_actions">
                            <button onClick={handleDelete}>Xóa</button>
                            <button onClick={() => setShowPopup(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryItem;
