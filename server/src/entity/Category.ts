import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm';
import Poi from './Poi';
import {Field, InputType, ObjectType} from "type-graphql";

@InputType()
export class CategoryInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    poiId: number;
}

@Entity()
@ObjectType()
export default class Category {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [Poi], {nullable: true})
    @OneToMany(() => Poi, (p) => p.category)
    poi?: Poi[];
}
