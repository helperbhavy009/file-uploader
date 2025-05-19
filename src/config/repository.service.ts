import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RepositoryService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Get repository for the given entity
   * @param entity - The entity class
   * @returns TypeORM Repository of the entity
   */
  getRepository<Entity>(entity: new () => Entity): Repository<Entity> {
    return this.dataSource.getRepository(entity);
  }
}
