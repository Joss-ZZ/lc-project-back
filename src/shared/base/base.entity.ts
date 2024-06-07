// import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

// export abstract class BaseEntity {
// 	@Column({ name: 'created_at', type: 'timestamp', nullable: true })
// 	createdAt: Date;

// 	@Column({ name: 'modified_at', type: 'timestamp', nullable: true })
// 	modifiedAt: Date;

// 	@Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
// 	deletedAt: Date;

// 	@Column({ name: 'status', default: true, type: 'boolean' })
// 	status: boolean;

// 	@BeforeInsert()
// 	beforeInsert(): void {
// 		const now = new Date();
// 		this.createdAt = now;
// 		this.modifiedAt = now;
// 	}

// 	@BeforeUpdate()
// 	beforeUpdate(): void {
// 		const now = new Date();
// 		this.modifiedAt = now;
// 	}
// }
