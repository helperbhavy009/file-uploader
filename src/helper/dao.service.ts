import {
    DeepPartial,
    Repository,
    EntityManager,
    EntityTarget,
  } from 'typeorm';
  
  /**
   * A generic Data Access Object (DAO) service for managing database operations.
   * @template T - Represents the entity type this service will handle.
   */
  export class DaoServices<T> {
    /**
     * Creates and saves a new entity in the database.
     * @template T - The entity type.
     * @param repository - The TypeORM repository for the given entity.
     * @param data - The partial data object used to create the entity.
     * @returns A promise resolving to the created and saved entity.
     */
    createDao = async (
      repository: Repository<T>,
      data: DeepPartial<T>,
      queryRunner?: EntityManager,
    ): Promise<T> => {
      const entity = repository.create(data);
      return queryRunner
        ? await queryRunner.save(entity) // Use queryRunner for transaction
        : await repository.save(entity);
    };
  
    /**
     * Finds a single entity by its ID.
     * @param repository - The TypeORM repository for the given entity.
     * @param where - where condition from the Service
     * @param select - Selected Field Which need to return (optional)
     * @returns A promise resolving to the found entity or null if not found.
     */
    findOneDao = async (
      repository: Repository<T>,
      where: object,
      select?: (keyof T)[],
      queryRunner?: EntityManager,
    ): Promise<T> => {
      return queryRunner
        ? await queryRunner.findOne(repository.target as EntityTarget<T>, {
            where,
            select,
          }) // Use queryRunner for transaction
        : await repository.findOne({ where, select });
    };
  
    
  }
  