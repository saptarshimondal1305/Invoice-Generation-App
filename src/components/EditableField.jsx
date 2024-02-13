import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const EditableField = (props) => {
  return (
    <InputGroup className="my-1 flex-nowrap">
      {props.cellData.leading != null && (
        <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
          <span
            className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
            style={{ width: "20px", height: "20px" }}
          >
            {props.cellData.leading}
          </span>
        </InputGroup.Text>
      )}
      {props.cellData.type === "select" ? (
        <Form.Select
          // as="select"
          className={props.cellData.textAlign}
          name={props.cellData.name}
          id={props.cellData.id}
          value={props.cellData.value||""}
          aria-label={props.cellData.name}
          onChange={props.onItemizedItemEdit}
          required
        >
          {props.options?.map((option,i) => (
              <option key={String(option.value)+i} value={option.value}>
                {option.label}
              </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          className={props.cellData.textAlign}
          type={props.cellData.type}
          placeholder={props.cellData.placeholder}
          min={props.cellData.min}
          name={props.cellData.name}
          id={props.cellData.id}
          value={props.cellData.value||""}
          step={props.cellData.step}
          precision={props.cellData.precision}
          aria-label={props.cellData.name}
          onChange={props.onItemizedItemEdit}
          required
          readOnly={props.readOnly || false}
        />
      )}
    </InputGroup>
  );
};

export default EditableField;
