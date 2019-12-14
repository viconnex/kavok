import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToQuestionVoteRepository } from './userToQuestionVote.repository';
import { UserToQuestionVote } from './userToQuestionVote.entity';

import { QuestionService } from '../question/question.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UserToQuestionVoteService {
    constructor(
        @InjectRepository(UserToQuestionVoteRepository)
        private readonly userToQuestionVoteRepository: UserToQuestionVoteRepository,
        private readonly questionService: QuestionService,
    ) {}

    async saveVote(questionId: number, userId: number, isUpVote: boolean): Promise<UserToQuestionVote> {
        const initialVote = await this.userToQuestionVoteRepository.findOne({
            userId,
            questionId,
        });

        if (!initialVote) {
            this.questionService.updateQuestionVote(questionId, isUpVote ? 1 : 0, isUpVote ? 0 : 1);

            return this.userToQuestionVoteRepository.save({
                userId,
                questionId,
                isUpVote,
            });
        }

        if (initialVote && initialVote.isUpVote === isUpVote) {
            return;
        }

        this.questionService.updateQuestionVote(questionId, isUpVote ? 1 : -1, isUpVote ? -1 : 1);

        initialVote.isUpVote = isUpVote;

        return this.userToQuestionVoteRepository.save(initialVote);
    }

    async getAllUserVotes(userId: number): Promise<UserToQuestionVote[]> {
        return await this.userToQuestionVoteRepository.find({ userId });
    }

    async unVote(questionId: number, userId: number): Promise<DeleteResult> {
        const initialVote = await this.userToQuestionVoteRepository.findOne({
            userId,
            questionId,
        });
        this.questionService.updateQuestionVote(
            questionId,
            initialVote.isUpVote ? -1 : 0,
            initialVote.isUpVote ? 0 : -1,
        );
        return this.userToQuestionVoteRepository.delete({ userId, questionId });
    }
}