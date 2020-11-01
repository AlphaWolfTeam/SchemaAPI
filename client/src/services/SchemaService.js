import axiosInstance from "../axiosConf";

class SchemaService {
  static async getSchemasList() {
    const { data } = await axiosInstance.get("/");
    return data;
  }

  static async getSchemasById(schemaId) {
    const { data } = await axiosInstance.get(`/${schemaId}`);
    return data;
  }

  static async createSchema(schema) {
    return await axiosInstance.post("/", {
      ...schema
    });
  }

  static async updateSchema(schemaId, updatedSchema) {
    return await axiosInstance.put(`/${schemaId}`, {
      ...updatedSchema
    });
  }

  static deleteSchemaById(schemaId) {
    axiosInstance.delete(`/${schemaId}`);
  }

  static deletePropertyFromSchemaById(schemaId, propertyId) {
    axiosInstance.delete(`/${schemaId}/${propertyId}`);
  }
}

export default SchemaService;
