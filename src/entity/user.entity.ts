import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { File } from './file.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'bigint',
    nullable: false,
    default: () => `(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`,
  })
  created_at: number;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
