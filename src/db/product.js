module.exports = {
  createProduct: (values) => {
    return {
      text: "INSERT INTO services (s_id, title, description, created_at) VALUES ($1, $2, $3, $4) RETURNING id, title, description, created_at",
      values: values,
    };
  },
  createProductView: (values) => {
    return {
      text: "INSERT INTO services_view (service_id, title, description, created_at) VALUES ($1, $2, $3, $4)",
      values: values,
    };
  },
  getProductViews: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getProductView: (values) => {
    return {
      text: "SELECT * FROM services_view WHERE id = $1",
      values: values,
    };
  },
  updateProductView: (values) => {
    return {
      text: "UPDATE services_view SET title = $2, description = $3, updated_at = $4 WHERE id = $1",
      values: values,
    };
  },
  deleteProductView: (values) => {
    return {
      text: "DELETE FROM services_view USING services WHERE services_view.service_id = $1",
      values: values,
    };
  },
};
