export const useToast = () => {
  const toast = ({ title, description }: { title: string; description?: string }) => {
    alert(`${title}${description ? '\n' + description : ''}`);
  };
  return { toast };
}; 