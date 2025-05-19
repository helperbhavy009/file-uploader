import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export type FileStatus = 'uploaded' | 'processing' | 'processed' | 'failed';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'original_filename', length: 255 })
  originalFilename: string;

  @Column({ name: 'storage_path', type: 'text' })
  storagePath: string;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'uploaded',
  })
  status: FileStatus;

  @Column({ name: 'extracted_data', type: 'text', nullable: true })
  extracted_data: string;

  @CreateDateColumn({
    name: 'uploaded_at',
    type: 'bigint',
    nullable: false,
    default: () => `(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`,
  })
  uploaded_at: number;

}
