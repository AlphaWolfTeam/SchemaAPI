import axiosInstance from "../axiosConf";

class SchemaService {
  static async getSchemasList() {
    const { data } = await axiosInstance.get("/");
    return data;
  }

  // TODO: maybe delete
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

  static async deleteSchemaById(schemaId) {
    await axiosInstance.delete(`/${schemaId}`);
  }

  // TODO: maybe delete
  static async deletePropertyFromSchemaById(schemaId, propertyId) {
    await axiosInstance.delete(`/${schemaId}/${propertyId}`);
  }
}

export default SchemaService;
