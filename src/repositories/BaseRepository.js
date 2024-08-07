class BaseRepository {
  /**
   * Constructs the BaseRepository instance with a specified model.
   *
   * @param {Model} model - The Sequelize model to be used for database operations.
   */
  constructor(model) {
    // Set the model for this repository.
    this.model = model;
  }

  /**
   * Find all records in the model.
   *
   * @returns {Promise<Array>} An array of all records.
   */
  async findAll() {
    // Use the model findAll method to retrieve all records.
    return this.model.findAll();
  }

  /**
   * Find a record by its primary key (ID).
   *
   * @param {number|string} id - The ID of the record to find.
   * @returns {Promise<Object|null>} The record found or null if no record is found.
   */
  async findById(id) {
    // Use the model findByPk method to find a record by its primary key.
    return this.model.findByPk(id);
  }

  /**
   * Find a record that matches specific criteria.
   *
   * @param {Object} criteria - The criteria to match for finding a record.
   * @returns {Promise<Object|null>} The record found or null if no record matches the criteria.
   */
  async findOneByCriteria(criteria) {
    // Use the model findOne method to find a record by criteria.
    return this.model.findOne({ where: criteria });
  }

  /**
   * Create a new record in the model.
   *
   * @param {Object} data - The data for the new record.
   * @returns {Promise<Object>} The newly created record.
   */
  async create(data) {
    // Use the model create method to add a new record.
    return this.model.create(data);
  }

  /**
   * Update a record by its ID.
   *
   * @param {number|string} id - The ID of the record to update.
   * @param {Object} data - The data to update the record with.
   * @returns {Promise<Object>} The updated record.
   */
  async update(id, data) {
    // Find the record by ID.
    const record = await this.findById(id);

    // Update the record with the new data.
    return record.update(data);
  }

  /**
   * Delete a record by its ID.
   *
   * @param {number|string} id - The ID of the record to delete.
   * @returns {Promise<void>} Resolves when the record is deleted.
   */
  async delete(id) {
    // Find the record by ID.
    const record = await this.findById(id);

    // Delete the record
    return record.destroy();
  }
}

// Export module
module.exports = BaseRepository;
