export interface Option<T = string, U = string> {
  label?: T;
  value?: U;
}

export const skillOptions: Option[] = [
  {label: 'Java', value: 'JAVA'},
  {label: 'NodeJs', value: 'NODE_JS'},
  {label: '.NET', value: 'DOT_NET'},
  {label: 'C++', value: 'CPP'},
  {label: 'Angular', value: 'ANGULAR'},
  {label: 'ReactJS', value: 'REACT_JS'},
  {label: 'VueJS', value: 'VUE_JS'},
  {label: 'Python', value: 'PYTHON'},
  {label: 'SQL', value: 'SQL'},
  {label: 'Business Analysis', value: 'BUSINESS_ANALYSIS'},
  {label: 'Docker', value: 'DOCKER'},
  {label: 'Git', value: 'GIT'},
  {label: 'Kubernetes', value: 'KUBERNETES'},
  {label: 'AWS', value: 'AWS'},
  {label: 'Azure', value: 'AZURE'},
  {label: 'Google Cloud', value: 'GCP'},
  {label: 'Linux', value: 'LINUX'},
  {label: 'Agile', value: 'AGILE'},
  {label: 'Scrum', value: 'SCRUM'},
  {label: 'CI/CD', value: 'CICD'},
  {label: 'Jenkins', value: 'JENKINS'},
  {label: 'MySQL', value: 'MYSQL'},
  {label: 'MongoDB', value: 'MONGODB'},
  {label: 'PostgreSQL', value: 'POSTGRESQL'},
  {label: 'Redis', value: 'REDIS'},
  {label: 'Firebase', value: 'FIREBASE'},
  {label: 'Swift', value: 'SWIFT'},
  {label: 'Kotlin', value: 'KOTLIN'},
  {label: 'PHP', value: 'PHP'},
  {label: 'Ruby', value: 'RUBY'},
  {label: 'Scala', value: 'SCALA'},
  {label: 'R', value: 'R'},
  {label: 'MATLAB', value: 'MATLAB'},
  {label: 'TensorFlow', value: 'TENSORFLOW'},
  {label: 'PyTorch', value: 'PYTORCH'},
  {label: 'JUnit', value: 'JUNIT'},
  {label: 'Selenium', value: 'SELENIUM'},
  {label: 'TestNG', value: 'TESTNG'},
  {label: 'Vagrant', value: 'VAGRANT'},
  {label: 'Terraform', value: 'TERRAFORM'},
  {label: 'Ansible', value: 'ANSIBLE'},
  {label: 'Nagios', value: 'NAGIOS'},
  {label: 'Prometheus', value: 'PROMETHEUS'},
  {label: 'Grafana', value: 'GRAFANA'},
  {label: 'Jira', value: 'JIRA'},
  {label: 'Trello', value: 'TRELLO'},
  {label: 'Slack', value: 'SLACK'},
  {label: 'Confluence', value: 'CONFLUENCE'},
  {label: 'Figma', value: 'FIGMA'},
  {label: 'Adobe XD', value: 'ADOBE_XD'},
  {label: 'Sketch', value: 'SKETCH'},
  {label: 'Tableau', value: 'TABLEAU'},
  {label: 'Power BI', value: 'POWER_BI'},
  {label: 'Salesforce', value: 'SALESFORCE'},
  {label: 'ERP Systems', value: 'ERP_SYSTEMS'},
  {label: 'Big Data', value: 'BIG_DATA'},
  {label: 'Machine Learning', value: 'MACHINE_LEARNING'},
  {label: 'Artificial Intelligence', value: 'AI'},
  {label: 'Blockchain', value: 'BLOCKCHAIN'},
  {label: 'IoT', value: 'IOT'},
  {label: 'Augmented Reality', value: 'AR'},
  {label: 'Virtual Reality', value: 'VR'}
];

export const levelOptions: Option[] = [
  {label: 'Intern', value: 'INTERN'},
  {label: 'Fresher', value: 'FRESHER'},
  {label: 'Junior', value: 'JUNIOR'},
  {label: 'Middle', value: 'MIDDLE'},
  {label: 'Senior', value: 'SENIOR'},
  {label: 'Lead', value: 'LEAD'},
  {label: 'Principal', value: 'PRINCIPAL'},
  {label: 'Expert', value: 'EXPERT'},
  {label: 'Manager', value: 'MANAGER'}
];

export const positionOptions: Option[] = [
  {label: 'Backend Developer', value: 'BACKEND_DEVELOPER'},
  {label: 'Frontend Developer', value: 'FRONTEND_DEVELOPER'},
  {label: 'Fullstack Developer', value: 'FULLSTACK_DEVELOPER'},
  {label: 'Mobile Developer', value: 'MOBILE_DEVELOPER'},
  {label: 'UI/UX Designer', value: 'UI_UX_DESIGNER'},
  {label: 'DevOps Engineer', value: 'DEVOPS_ENGINEER'},
  {label: 'Database Administrator', value: 'DBA'},
  {label: 'System Administrator', value: 'SYSTEM_ADMIN'},
  {label: 'IT Support', value: 'IT_SUPPORT'},
  {label: 'Product Manager', value: 'PRODUCT_MANAGER'},
  {label: 'Solution Architect', value: 'SOLUTION_ARCHITECT'},
  {label: 'QA Engineer', value: 'QA_ENGINEER'},
  {label: 'Security Engineer', value: 'SECURITY_ENGINEER'},
  {label: 'Technical Lead', value: 'TECH_LEAD'},
  {label: 'Software Architect', value: 'SOFTWARE_ARCHITECT'}
];

export const jobStatusOptions: Option[] = [
  {label: 'Hoạt động', value: 'OPEN'},
  {label: 'Đã kết thúc', value: 'CLOSED'}
];

export const candidateStatusOptions: Option[] = [
  {label: 'Hoạt động', value: 'OPEN'},
  {label: 'Chờ phỏng vấn', value: 'WAITING_FOR_INTERVIEW'},
  {label: 'Đang phỏng vấn', value: 'IN_PROGRESS'},
  {label: 'Phỏng vấn bị hủy', value: 'CANCELLED_INTERVIEW'},
  {label: 'Đậu phỏng vấn', value: 'PASSED_INTERVIEW'},
  {label: 'Rớt phỏng vấn', value: 'FAILED_INTERVIEW'},
  {label: 'Chờ phê duyệt', value: 'WAITING_FOR_APPROVAL'},
  {label: 'Offer được phê duyệt', value: 'APPROVED_OFFER'},
  {label: 'Offer bị từ chối', value: 'REJECTED_OFFER'},
  {label: 'Chờ phản hồi', value: 'WAITING_FOR_RESPONSE'},
  {label: 'Đã chấp nhận offer', value: 'ACCEPTED_OFFER'},
  {label: 'Từ chối offer', value: 'DECLINED_OFFER'},
  {label: 'Offer bị hủy', value: 'CANCELLED_OFFER'},
  {label: 'Bị cấm phỏng vấn', value: 'BANNED'}
]

export const genderOptions: Option[] = [
  {label: 'Nam', value: 'MALE'},
  {label: 'Nữ', value: 'FEMALE'}
];
