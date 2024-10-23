export const validateWorkspaceName = (name: string): string => {
    const trimmedName = name.trim();
  
    // Check if the name is empty
    if (!trimmedName) {
      return "Workspace name cannot be empty";
    }
  
    // Check if the name is less than 4 characters
    if (trimmedName.length < 4) {
      return "At least 4 characters required";
    }
  
    // Check if the name exceeds 18 characters
    if (trimmedName.length > 15) {
      return "Workspace name cannot be longer than 15 characters";
    }
  
    // Check if the name contains only alphanumeric characters and spaces
    const validNameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!validNameRegex.test(trimmedName)) {
      return "Workspace name can only contain letters, numbers, and spaces";
    }
  
    return "";
  };