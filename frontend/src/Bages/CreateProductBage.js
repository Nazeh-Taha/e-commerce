import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct, listProducts, deleteProduct } from "../actions/productActions";

function CreateProductBage(props) {


  const productSave = useSelector((state) => state.productSave);
  const productList = useSelector((state) => state.productList);
  const productDelete = useSelector((state)=>state.productDelete);

  const { loading, products, error } = productList;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(0);

  useEffect(() => {
    if(successSave){
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {};
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) =>{
  dispatch(deleteProduct(product._id));
  }
  
  return (
    
    <>
      <div className="content content-margined">
        <div className="products-header">
          <h3>products</h3>
          <button onClick={() => openModal({})}>Create Product</button>
        </div>
        {modalVisible && (
          <div className="form">
            <form onSubmit={submitHandler}>
              <ul className="form-container">
                <li>
                  <h2>Create Product</h2>
                </li>
                <li>
                  {loadingSave && <div>Loading....</div>}
                  {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                  <label htmlFor="name">name</label>
                  <input
                    value={name}
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="price">price</label>
                  <input
                    value={price}
                    type="text"
                    name="price"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="image">image</label>
                  <input
                    value={image}
                    type="text"
                    name="image"
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="brand">brand</label>
                  <input
                    value={brand}
                    type="text"
                    name="brand"
                    id="brand"
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="category">category</label>
                  <input
                    value={category}
                    type="text"
                    name="category"
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="countInStock">countInStock</label>
                  <input
                    value={countInStock}
                    type="text"
                    name="countInStock"
                    id="countInStock"
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="description">description</label>
                  <textarea
                    value={description}
                    name="description"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </li>
                <li>
                  <button type="submit">{id ? "Update" : "Create"}</button>
                  <button onClick={() => setModalVisible(false)}>Back</button>
                </li>
              </ul>
            </form>
          </div>
        )}
        <div className="product-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {products.map((product,i) => (<tr key={i}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <button onClick={() => openModal(product)}>Edit</button>
                      <button onClick={() => deleteHandler(product)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            
          </table>
        </div>
      </div>
    </>
  );
}

export default CreateProductBage;
