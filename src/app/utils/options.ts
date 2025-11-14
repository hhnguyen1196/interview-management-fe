export interface Option<T = string, U = string> {
  label?: T;
  value?: U;
}

export const jobSkillOptions: Option[] = [
  { label: 'Java', value: 'JAVA' },
  { label: 'NodeJs', value: 'NODE_JS' },
  { label: '.NET', value: 'DOT_NET' },
  { label: 'C++', value: 'CPP' },
  { label: 'Angular', value: 'ANGULAR' },
  { label: 'ReactJS', value: 'REACT_JS' },
  { label: 'VueJS', value: 'VUE_JS' },
  { label: 'Python', value: 'PYTHON' },
  { label: 'SQL', value: 'SQL' },
  { label: 'Business Analysis', value: 'BUSINESS_ANALYSIS' },
  { label: 'Docker', value: 'DOCKER' },
  { label: 'Git', value: 'GIT' }
];

export const jobLevelOptions: Option[] = [
  { label: 'Fresher 1', value: 'FRESHER_1' },
  { label: 'Junior 2.1', value: 'JUNIOR_2_1' },
  { label: 'Junior 2.2', value: 'JUNIOR_2_2' },
  { label: 'Junior 2.3', value: 'JUNIOR_2_3' },
  { label: 'Senior 3.1', value: 'SENIOR_3_1' },
  { label: 'Senior 3.2', value: 'SENIOR_3_2' },
  { label: 'Leader', value: 'LEADER' }
];

export const jobStatusOptions: Option[] = [
  { label: 'Hoạt động', value: 'OPEN' },
  { label: 'Đã kết thúc', value: 'CLOSED' }
];
