const cleanName = (name: string): string => name.split('/')[1] ?? name;
export default cleanName;
