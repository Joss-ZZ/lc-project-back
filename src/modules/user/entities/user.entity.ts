// import { Country } from '@chirra/modules/country/entities/Country.entity';
// import { Profile } from '@chirra/modules/profile/entities/profile.entity';
// import { Subscription } from '@chirra/modules/subscription/entities/subscription.entity';
// import { BaseEntity } from '@chirra/shared/base/base.entity';
// import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// @Entity({ name: 'users' })
// export class User extends BaseEntity {
// 	@PrimaryGeneratedColumn({ name: 'id' })
// 	userId: number;

// 	@Column({ type: 'varchar', length: 20 })
// 	firstname: string;

// 	@Column({ type: 'varchar', length: 20 })
// 	lastname: string;

// 	@Column({ type: 'varchar', unique: true, length: 20 })
// 	email: string;

// 	@Column({ name: 'phone_number', type: 'int', unique: true })
// 	phoneNumber: number;

// 	@Column({ type: 'varchar', length: 200 })
// 	password: string;

// 	@Column({ name: 'confirm_email', type: 'bool', default: false })
// 	confirmEmail: boolean;

// 	@ManyToOne(() => Country, { eager: false })
// 	@JoinColumn({ name: 'country_id' })
// 	country: Country;

// 	@ManyToOne(() => Profile, { eager: false })
// 	@JoinColumn({ name: 'profile_id' })
// 	profile: Profile;

// 	@OneToMany(() => Subscription, (subscription) => subscription.user)
// 	subscription: Subscription[];
// }
