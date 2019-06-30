import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './question.repository';
import { CategoryRepository } from '../category/category.repository';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Module({
    imports: [TypeOrmModule.forFeature([Question, QuestionRepository, CategoryRepository])],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule {}