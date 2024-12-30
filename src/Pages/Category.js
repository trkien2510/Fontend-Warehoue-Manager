import React, { useState, useEffect } from 'react';
import '../Styles/CategoryStyle.css';
import { getToken } from '../Service/TokenService';
import { getCategory, createCategory, deleteCategory } from '../Service/CategoryService';
import { createAuditlog } from '../Service/AuditLogService';
import CategoryItem from '../Components/CategoryItem';

const Category = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);

        const fetchCategories = async () => {
            try {
                const response = await getCategory();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const response = await createCategory(newCategory);
            await createAuditlog(`thêm loại sản phẩm: ${newCategory}`);
            setCategories([...categories, response.data]);
            setNewCategory("");
            setShowPopup(false);
        } catch (error) {
            alert("Tên loại sản phẩm đã tồn tại")
            
        }
    };

    const handleDeleteCategory = async (name) => {
        try {
            await deleteCategory(name);
            await createAuditlog(`xóa loại sản phẩm: ${name}`);
            setCategories(categories.filter((category) => category.name !== name));
        } catch (error) {
            alert("Đang tồn tại sản phẩm có loại này")
        }
    };

    if (!isLoggedIn) {
        return <div></div>;
    }

    return (
        <div className='category_container'>
            <span className='category_title'>Danh sách Loại Sản Phẩm</span>
            <button className='add_category' onClick={() => setShowPopup(true)}>
                <img src='https://cdn-icons-png.flaticon.com/512/32/32563.png' alt=''></img>
            </button>
            <div className="category_list">
                {categories.map(category => (
                    <CategoryItem
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        onDelete={handleDeleteCategory}
                    />
                ))}
            </div>


            {showPopup && (
                <div className="add_category_popup">
                    <div className="add_category_popup_content">
                        <h2>Thêm Loại Sản Phẩm</h2>
                        <input
                            type="text"
                            placeholder="Nhập tên loại sản phẩm"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <div className="add_category_popup_actions">
                            <button onClick={handleAddCategory}>Thêm</button>
                            <button onClick={() => setShowPopup(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
