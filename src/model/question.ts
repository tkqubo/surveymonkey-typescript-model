'use strict';

/**
 * single_choice
 *   - vertical, vertical_two_col, vertical_three_col, horiz, menu
 * multiple_choice
 *   - vertical
 * matrix
 *   - ranking
 *   - rating
 *   - menu
 *   - single, multi
 * open_ended
 *   - multi, numerical
 *   - single
 *   - essay
 * demographic
 *   - international, us
 * datetime
 *   - both, date_only, time_only
 * presentation
 *   - descriptive_text, image
 */

import {
  ChoiceAnswer,
  DemographicAnswer,
  MenuMatrixAnswer,
  RankingMatrixAnswer,
  ChoiceMatrixAnswer,
  MultiOpenEndedAnswer, DateTimeAnswer, RatingMatrixAnswer
} from "./answer";

export interface HeadingImage {
  url: string;
}

export interface NormalHeading {
  heading: string;
  image?: HeadingImage;
}

export interface RansomAssignment {
  percent: number;
  position: number;
  variable_name: string;
  id: string;
}

export interface RandomAssignmentHeading {
  heading: '';
  description: string;
  image?: HeadingImage;
  random_assignment: RansomAssignment;
}

export type Heading = NormalHeading | RandomAssignmentHeading;

export interface QuizOptions {
  score: number;
}

export interface Choice {
  position: number;
  visible: boolean;
  text: string;
  quiz_options: QuizOptions;
  id: string;
  is_na?: boolean;
  weight?: number;
  description: string;
}

export interface Row {
  position: number;
  visible: boolean;
  text: string;
  id: string;
}

export interface Answers {
  choices: Choice[];
  rows: Row[];
}

export interface QuestionListItem {
  id: string;
  heading: string;
  position: number;
  href: string;
}

export type QuestionSortingType = 'default' | 'textasc' | 'textdesc' | 'resp_count_asc' | 'resp_count_desc' | 'random' | 'flip';

export interface QuestionSorting {
  type: QuestionSortingType;
  ignore_last: boolean;
}

export type QuestionRequiredType = 'all' | 'at_least' | 'at_most' | 'exactly' | 'range';

export interface QuestionRequired {
  text: string;
  type: QuestionRequiredType;
  amount: string;
}

export type QuestionValidationType = 'any' | 'integer' | 'decimal' | 'date_us' | 'date_intl' | 'regex' | 'email' | 'text_length'

export interface QuestionValidation {
  type: QuestionValidationType;
  text: string;
  min: string | null;
  max: string | null;
  sum: number | null;
  sum_text: string;
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | MatrixQuestion | OpenEndedQuestion | DemographicQuestion |
  DateTimeQuestion | PresentationQuestion;

export interface QuestionBase {
  headings: Heading[];
  position: number;
  visible: boolean;
  sorting: QuestionSorting | null;
  required: QuestionRequired | null;
  validation: QuestionValidation | null;
  forced_ranking: boolean;
  id: string;
  href: string;
}

export interface ChoiceQuizOptions {
  feedback: MultipleChoiceQuizOptionsFeedback;
  scoring_enabled: boolean;
}

export interface SingleChoiceDisplayOptions {
  display_type: 'image_choice';
}

export interface SingleChoiceQuestion extends QuestionBase {
  family: 'single_choice';
  subtype: 'vertical' | 'vertical_two_col' | 'vertical_three_col' | 'horiz' | 'menu';
  display_options?: SingleChoiceDisplayOptions;
  answers: ChoiceAnswer;
  quiz_options?: ChoiceQuizOptions;
}

export type MatrixQuestion = RatingMatrixQuestion | RankingMatrixQuestion | MenuMatrixQuestion | ChoiceMatrixQuestion;

export interface RatingMatrixDisplayOptionsCustomOptions {
  color?: string;
  option_set: string[];
}

export interface DisplayOptionsBase {
  display_type: string;
  display_subtype: string;
  custom_options?: any;
  show_display_number: boolean;
  right_label_id: string | null;
  right_label: string;
  left_label_id: string | null;
  left_label: string;
  middle_label_id: string | null;
  middle_label: string;
}

export interface RatingMatrixDisplayOptions extends DisplayOptionsBase {
  display_type: 'emoji';
  display_subtype: 'star' | 'smiley' | 'heart' | 'thumb';
  custom_options?: RatingMatrixDisplayOptionsCustomOptions;
}

export interface RatingMatrixQuestion extends QuestionBase {
  family: 'matrix';
  subtype: 'rating';
  display_options?: RatingMatrixDisplayOptions;
  answers: RatingMatrixAnswer;
}

export interface RankingMatrixQuestion extends QuestionBase {
  family: 'matrix';
  subtype: 'ranking';
  answers: RankingMatrixAnswer;
}

export interface MenuMatrixQuestion extends QuestionBase {
  family: 'matrix';
  subtype: 'menu';
  answers: MenuMatrixAnswer;
}

export interface ChoiceMatrixQuestion extends QuestionBase {
  family: 'matrix';
  subtype: 'single' | 'multi';
  answers: ChoiceMatrixAnswer;
}

export type OpenEndedQuestion = MultiOpenEndedQuestion | SingleOpenEndedQuestion | EssayOpenEndedQuestion;

export interface MultiOpenEndedDisplayOptions {
  display_type: 'slider';
}

export interface MultiOpenEndedQuestion extends QuestionBase {
  family: 'open_ended';
  subtype: 'multi' | 'numerical';
  display_options?: MultiOpenEndedDisplayOptions;
  answers: MultiOpenEndedAnswer;
}

export type SingleOpenEndedDisplayOptions = SliderSingleOpenEndedDisplayOptions | FileUploadSingleOpenEndedDisplayOptions;

export interface SliderSingleOpenEndedDisplayOptionsCustomOptions {
  starting_position?: number;
  step_size?: number;
  option_set: string[]; // adjusted_scale, hide_numeric_input
}

export interface SliderSingleOpenEndedDisplayOptions extends DisplayOptionsBase {
  display_type: 'slider';
  display_subtype: '';
  custom_options: SliderSingleOpenEndedDisplayOptionsCustomOptions;
}

export interface FileUploadSingleOpenEndedDisplayOptions {
  display_type: 'file_upload';
}

export interface SingleOpenEndedQuestion extends QuestionBase {
  family: 'open_ended';
  subtype: 'single';
  display_options?: SingleOpenEndedDisplayOptions;
}

export interface EssayOpenEndedQuestion extends QuestionBase {
  family: 'open_ended';
  subtype: 'essay';
}

export interface DemographicQuestion extends QuestionBase {
  family: 'demographic';
  subtype: 'international' | 'us';
  answers: DemographicAnswer;
}

export interface DateTimeQuestion extends QuestionBase {
  family: 'datetime';
  subtype: 'both' | 'date_only' | 'time_only';
  answers: DateTimeAnswer;
}

export interface MultipleChoiceDisplayOptions extends DisplayOptionsBase {
  display_type: 'image_choice';
  display_subtype: '';
  custom_options: {};
}

export interface MultipleChoiceQuizOptionsFeedback {
  correct_text: string;
  partial_text: string;
  incorrect_text: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  family: 'multiple_choice';
  subtype: 'vertical' | 'vertical_two_col' | 'vertical_three_col' | 'horiz';
  display_options?: MultipleChoiceDisplayOptions;
  answers: ChoiceAnswer;
  quiz_options?: ChoiceQuizOptions;
}

export interface PresentationDisplayOptions {
  show_display_number: boolean;
}

export interface PresentationQuestion extends QuestionBase {
  family: 'presentation';
  subtype: 'descriptive_text' | 'image';
  nickname: string;
  display_options: PresentationDisplayOptions;
}
