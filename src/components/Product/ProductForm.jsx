import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useProductListData } from "../../redux/hooks";
import { Button, Modal } from "react-bootstrap";
import { addProduct, updateProduct } from "../../redux/productsSlice";
import { updateInvoicesByProduct } from "../../redux/invoicesSlice";
import productCategories from "../../utils/categories.json";
import currencies from "../../utils/currencies.json";
import currencyConverter from "../../utils/currencyConverter"
const ProductForm = (props) => {
  const dispatch = useDispatch();
  const isEdit = props.edit;
  const { getOneProduct, listSize } = useProductListData();
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState(
    isEdit
      ? getOneProduct(props.id)
      : {
          id: listSize + 1,
          name: "",
          price: "0.00",
          category: "",
          currency: "$",
        },
  );

  useEffect(() => {
    if (isEdit && props.id) {
      setFormData(getOneProduct(props.id));
    } else {
      setFormData({
        id: listSize + 1,
        name: "",
        price: "0.00",
        category: "",
        currency: "$",
      });
    }
    // eslint-disable-next-line
  }, [props]);

  const editField = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: null });
  };
  const validateFormData = () => {
    const validationErrors = {};
    if (!formData.name || !formData.name.length) {
      validationErrors["name"] = "Name is required";
    }
    if (!formData.category || !formData.category.length) {
      validationErrors["category"] = "Please select a category";
    }
    if (!formData.price || formData.price <= 0) {
      validationErrors["price"] = "Price should be greater than 0";
    }
    setValidationErrors(validationErrors);
    return validationErrors;
  };
  const onCurrencyChange = (selectedOption) => {
    setFormData({ ...formData, currency: selectedOption.currency });
  };
  const handleAddProduct = () => {
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length) {
      return;
    }
    if (isEdit) {
      const initialProd = getOneProduct(props.id);
      const priceDiff =
        currencyConverter(parseFloat(formData.price),formData.currency,formData.currency) - currencyConverter(parseFloat(initialProd.price),initialProd.currency,formData.currency);
      dispatch(updateProduct({ id: props.id, updatedProduct: formData }));
      dispatch(
        updateInvoicesByProduct({ productId: props.id, diff: priceDiff, prodCurr:formData.currency }),
      );
      alert("Product updated successfuly 🥳");
    } else {
      dispatch(addProduct(formData));
      alert("Product added successfuly 🥳");
    }
    props.closeModal();
  };

  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Form onSubmit={props.closeModal}>
        <Row>
          <Col md={12} lg={12}>
            <Card className="p-4 p-xl-8 my-3 my-xl-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">
                      Product&nbsp;Name:
                    </span>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      name="name"
                      onChange={(e) => editField(e.target.name, e.target.value)}
                      style={{ maxWidth: "150px" }}
                      className={validationErrors.name ? "is-invalid" : ""}
                      required
                    />
                  </div>
                  <div className="text-danger">
                    {validationErrors.name || ""}
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">Product&nbsp;ID:&nbsp;</span>
                  <Form.Control
                    type="number"
                    value={formData.id}
                    name="id"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    min="1"
                    style={{ maxWidth: "70px" }}
                    readOnly
                    required
                  />
                </div>
              </div>
              <hr className="my-4" />
              <Row className="mb-1">
                <Col>
                  <Form.Label className="fw-bold">
                    Price Per {productCategories[formData.category] || "unit"}:
                  </Form.Label>
                  <Form.Control
                    placeholder="Price Per unit"
                    rows={3}
                    value={formData.price}
                    type="text"
                    name="price"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    autoComplete="name"
                    className={
                      "my-2 " + (validationErrors.price ? "is-invalid" : "")
                    }
                    required
                  />
                  <div className="text-danger">
                    {validationErrors.price || ""}
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Currency:</Form.Label>
                    <Form.Select
                      onChange={(event) =>
                        onCurrencyChange({ currency: event.target.value })
                      }
                      className="btn btn-light my-1"
                      aria-label="Change Currency"
                      value={formData.currency}
                    >
                      {Object.keys(currencies).map((currency, i) => (
                        <option key={i} value={currency}>
                          {currencies[currency]}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Category:</Form.Label>
                  <Form.Select
                    placeholder="Select Category"
                    value={formData.category}
                    name="category"
                    className={
                      "my-2 " + (validationErrors.category ? "is-invalid" : "")
                    }
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    {Object.keys(productCategories).map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="text-danger">
                    {validationErrors.category || ""}
                  </div>
                </Col>
                <Button
                  variant="primary"
                  onClick={handleAddProduct}
                  className="d-block w-100 mt-5"
                >
                  {isEdit ? "Update Product" : "Add Product"}
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductForm;
