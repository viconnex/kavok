import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Question } from '../question/question.entity'

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @OneToMany(
        type => Question,
        question => question.category,
    )
    question: Question[]

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
