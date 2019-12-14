import config from 'utils/config.json';

export const API_BASE_URL = config[process.env.NODE_ENV].BACKEND_URL;

export const GOOGLE_AUTH_URI = '/auth/google';

export const USER_TO_QUESTIONS_CHOICES_URI = 'user_to_question_choices';
export const USER_TO_QUESTIONS_VOTES_URI = 'user_to_question_votes';