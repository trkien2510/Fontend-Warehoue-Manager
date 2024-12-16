import React, { useState } from 'react';
import '../Styles/ProductItemStyle.css';
import { createAuditlog } from '../Service/AuditLogService';

const ProductItem = ({ product, onEdit, onDelete, categories, suppliers }) => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const [editedProduct, setEditedProduct] = useState({
        name: product.name,
        price: product.price,
        note: product.note,
        quantity: product.quantity,
        category: product.category?.id,
        supplier: product.supplier?.id,
    });

    const handleEditChange = (key, value) => {
        setEditedProduct((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = () => {
        onEdit({ editedProduct });
        createAuditlog(`cập nhật thông tin sản phẩm ${product.name} thành công`)
        window.location.reload();
        setShowEditPopup(false);
    };

    const handleDelete = () => {
        onDelete(product)
        createAuditlog(`xóa sản phẩm ${product.name} thành công`)
        window.location.reload();
    }

    return (
        <div className="product_item">
            <h3>{product.name || "Tên không xác định"}</h3>
            <p>Giá: {product.price ? product.price.toLocaleString() + " VND" : "Không có thông tin giá"}</p>
            <p>Số lượng: {product.quantity ?? "Không xác định"}</p>
            <p>Loại: {product.category?.name || "Không xác định"}</p>
            <p>Nhà cung cấp: {product.supplier?.name || "Không xác định"}</p>
            <p>Ghi chú: {product.note || ""}</p>

            <div className="product_actions">
                <button onClick={() => setShowEditPopup(true)}>Sửa</button>
                <button onClick={() => setShowDeletePopup(true)}>Xóa</button>
            </div>

            {showEditPopup && (
                <div className="edit_product_popup">
                    <div className="edit_product_popup_content">
                        <h3>Sửa sản phẩm: {product.name}</h3>
                        <input
                            type="number"
                            value={editedProduct.price}
                            placeholder="Giá sản phẩm"
                            onChange={(e) => handleEditChange("price", e.target.value)}
                        />
                        <input
                            type="number"
                            value={editedProduct.quantity}
                            placeholder="Số lượng"
                            onChange={(e) => handleEditChange("quantity", e.target.value)}
                        />
                        <select
                            value={editedProduct.category}
                            onChange={(e) => handleEditChange("category", e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={editedProduct.supplier}
                            onChange={(e) => handleEditChange("supplier", e.target.value)}
                        >
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            type='text'
                            value={editedProduct.note}
                            onChange={(e) => handleEditChange("note", e.target.value)}
                        />

                        <button onClick={handleSave}>Lưu</button>
                        <button onClick={() => setShowEditPopup(false)}>Hủy</button>
                    </div>
                </div>
            )}

            {showDeletePopup && (
                <div className="delete_product_popup">
                    <div className="delete_product_popup_content">
                        <h4>Xóa sản phẩm</h4>
                        <p>Bạn có chắc chắn muốn xóa sản phẩm {product.name}?</p>
                        <button onClick={handleDelete}>Xóa</button>
                        <button onClick={() => setShowDeletePopup(false)}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductItem;
