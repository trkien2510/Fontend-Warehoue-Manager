import React, { useState, useEffect } from 'react';
import '../Styles/ProductStyle.css';
import { getToken } from '../Service/TokenService';
import { getCategory } from '../Service/CategoryService';
import { getSupplier } from '../Service/SupplierService';
import { getProduct, createProduct, updateProduct, deleteProduct } from '../Service/ProductService';
import { createAuditlog } from '../Service/AuditLogService';
import ProductItem from '../Components/ProductItem';

const Product = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("Tất cả");
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [selectedSupplier, setSelectedSupplier] = useState("Tất cả");
    const [selectedPrice, setSelectedPrice] = useState("Tất cả");
    const [selectedQuantity, setSelectedQuantity] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    const [createNewProduct, setCreateNewProduct] = useState({
        name: "",
        price: "",
        note: "",
        quantity: "",
        category: "",
        supplier: "",
    });

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);

        if (token) {
            const fetchData = async () => {
                try {
                    const categoryResponse = await getCategory();
                    setCategories(categoryResponse.data);

                    const supplierResponse = await getSupplier();
                    setSuppliers(supplierResponse.data);

                    const productResponse = await getProduct();
                    setProducts(productResponse.data);
                } catch (error) {
                    console.error("Lỗi khi tải dữ liệu:", error);
                }
            };
            fetchData();
        }
    }, []);

    const handleCreateProduct = () => {
        if (!createNewProduct.name || !createNewProduct.price || !createNewProduct.quantity || !createNewProduct.category || !createNewProduct.supplier) {
            alert("Vui lòng nhập đầy đủ thông tin cần thiết (*) để tạo sản phẩm.");
            return;
        }
        const result = createProduct(createNewProduct);
        if (result.code === 999) {
            alert("Sản phẩm đã tồn tại");
            return;
        } else {
            createAuditlog(`đã thêm sản phẩm: ${createNewProduct.name}`)
            setShowCreatePopup(false);
            window.location.reload()
        }
    };

    const filteredProducts = products
        .filter(product => {
            const matchesCategory =
                selectedCategory === "Tất cả" ||
                (product.category && product.category.name === selectedCategory);

            const matchesSupplier =
                selectedSupplier === "Tất cả" ||
                (product.supplier && product.supplier.name === selectedSupplier);

            const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPrice = (() => {
                if (selectedPrice === "Tất cả") return true;
                if (selectedPrice === "<1000000") return product.price < 1000000;
                if (selectedPrice === "1000000-5000000") return product.price >= 1000000 && product.price <= 5000000;
                if (selectedPrice === ">5000000") return product.price > 5000000;
                return true;
            })();

            const matchesQuantity = (() => {
                if (selectedQuantity === "Tất cả") return true;
                if (selectedQuantity === "0") return product.quantity === 0;
                if (selectedQuantity === "0-10") return product.quantity > 0 && product.quantity <= 10;
                if (selectedQuantity === "10-50") return product.quantity > 10 && product.quantity <= 50;
                if (selectedQuantity === ">50") return product.quantity > 50;
                return true;
            })();

            return matchesCategory && matchesSupplier && matchesName && matchesPrice && matchesQuantity;
        }
        )
        .sort((a, b) => {
            if (sortOrder === "Tất cả") return 0; // Không sắp xếp
            if (sortOrder === "A-Z") return a.name.localeCompare(b.name); // Sắp xếp A-Z
            if (sortOrder === "Z-A") return b.name.localeCompare(a.name); // Sắp xếp Z-A
            return 0;
        }
    );


    return (
        <div className='product_component'>
            <div className='search_product'>
                <input
                    type="text"
                    className='search'
                    placeholder='Nhập tên sản phẩm'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='add_product' onClick={() => setShowCreatePopup(true)}>
                    <img src='https://cdn-icons-png.flaticon.com/512/32/32563.png' alt='' />
                </button>
            </div>

            <div className='filter'>
                <span className='filter_sort'>
                    <span>Sắp xếp </span>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="Tất cả">Tất cả</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </span>

                <span className='filter_category'>
                    <span>Loại </span>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="Tất cả">Tất cả</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </span>
                <span className='filter_supplier'>
                    <span>Nhà cung cấp </span>
                    <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
                        <option value="Tất cả">Tất cả</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.name}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </span>
                <span className='filter_price'>
                    <span>Giá </span>
                    <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                        <option value="Tất cả">Tất cả</option>
                        <option value="<1000000">Dưới 1,000,000</option>
                        <option value="1000000-5000000">1,000,000 - 5,000,000</option>
                        <option value=">5000000">Trên 5,000,000</option>
                    </select>
                </span>
                <span className='filter_quantity'>
                    <span>Số lượng </span>
                    <select value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)}>
                        <option value="Tất cả">Tất cả</option>
                        <option value="0">0</option>
                        <option value="0-10">0 - 10</option>
                        <option value="10-50">10 - 50</option>
                        <option value=">50">Trên 50</option>
                    </select>
                </span>

            </div>

            <div className='product_list'>
                {filteredProducts
                    .map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            onEdit={updateProduct}
                            onDelete={deleteProduct}
                            categories={categories}
                            suppliers={suppliers}
                        />
                    ))}
            </div>

            {showCreatePopup && (
                <div className="create_product_popup">
                    <div className="create_product_popup_content">
                        <h3>Thêm sản phẩm</h3>
                        <input
                            type="text"
                            placeholder="Tên sản phẩm *"
                            onChange={(e) => setCreateNewProduct({ ...createNewProduct, name: e.target.value })}
                        />

                        <input
                            type="number"
                            placeholder="Giá sản phẩm *"
                            onChange={(e) => setCreateNewProduct({ ...createNewProduct, price: e.target.value })}
                        />

                        <input
                            type="number"
                            placeholder="Số lượng *"
                            onChange={(e) => setCreateNewProduct({ ...createNewProduct, quantity: e.target.value })}
                        />

                        <select
                            value={createNewProduct.category}
                            onChange={(e) => setCreateNewProduct({ ...createNewProduct, category: e.target.value })}
                        >
                            <option value="">Loại *</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={createNewProduct.supplier}
                            onChange={(e) => setCreateNewProduct({ ...createNewProduct, supplier: e.target.value })}
                        >
                            <option value="">Nhà cung cấp *</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>

                        <textarea
                            type='text'
                            placeholder='Ghi chú'
                            onChange={(e) => setCreateNewProduct({ ...createNewProduct, note: e.target.value })}
                        />

                        <button onClick={handleCreateProduct}>Thêm</button>
                        <button onClick={() => setShowCreatePopup(false)}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
