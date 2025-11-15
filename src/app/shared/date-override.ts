const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

Date.prototype.toJSON = function(this: Date): string {
  return formatDate(this);
};

Date.prototype.toString = function(this: Date): string {
  return formatDate(this);
};
