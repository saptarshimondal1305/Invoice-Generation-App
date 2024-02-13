import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { BiSolidPencil } from "react-icons/bi";
import { useProductListData } from "../../redux/hooks";
import ProductForm from "../../components/Product/ProductForm";
import HomeWrapper from "../HomeWrapper";

const ProductList = () => {
  const { productList } = useProductListData();
  const isListEmpty = productList.length === 0;
  const [productForm, setProductForm] = useState({
    open: false,
    edit: false,
    id: "",
  });
  const handleOpenProductForm = (edit, id) => {
    setProductForm({ open: true, edit: edit, id: id });
  };
  const closeProductForm = () => {
    setProductForm({ open: false, edit: false, id: "" });
  };
  return (
    <>
      <ProductForm
        showModal={productForm.open}
        closeModal={closeProductForm}
        edit={productForm.edit}
        id={productForm.id}
      />
      <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
        {isListEmpty ? (
          <div className="d-flex flex-column align-items-center">
            <h3 className="fw-bold pb-2 pb-md-4">No products present</h3>
            <Button
              variant="primary mb-2 mb-md-4"
              onClick={() => handleOpenProductForm(false, "")}
            >
              Create Product
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <h3 className="fw-bold pb-2 pb-md-4">Product List</h3>
              <Button
                variant="primary mb-2 mb-md-4"
                onClick={() => handleOpenProductForm(false, "")}
              >
                Create Product
              </Button>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product Id.</th>
                  <th>Product Name</th>
                  <th>Price Per Unit</th>
                  <th>Category</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((invoice) => {
                  return (
                    <ProductRow
                      key={invoice.id}
                      product={invoice}
                      openProductForm={handleOpenProductForm}
                    />
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </>
  );
};

const ProductRow = ({ product, openProductForm }) => {
  return (
    <tr>
      <td className="fw-normal">{product.id}</td>
      <td className="fw-normal">{product.name}</td>
      <td className="fw-normal">
        {product.currency}
        {product.price}
      </td>
      <td className="fw-normal">{product.unit}</td>
      <td style={{ width: "5%" }}>
        <Button variant="outline-primary"  onClick={() => openProductForm(true, product.id)}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
      </td>
    </tr>
  );
};

export default ProductList;
