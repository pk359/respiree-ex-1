export type IFieldNames =
  | 'age'
  | 'sex'
  | 'cp'
  | 'trestbps'
  | 'chol'
  | 'fbs'
  | 'restecg'
  | 'thalach'
  | 'exang'
  | 'oldpeak'
  | 'slope'
  | 'ca'
  | 'thal'
  | 'num';

export const HEADERS: Array<IFieldNames> = [
  'age',
  'sex',
  'cp',
  'trestbps',
  'chol',
  'fbs',
  'restecg',
  'thalach',
  'exang',
  'oldpeak',
  'slope',
  'ca',
  'thal',
  'num',
];

export const SORT_ORDER = ['asc', 'desc'];
export const CONSTRAINTS = ['eq', 'gte'];
export type IData = Array<{ [key in IFieldNames]: number }>;
