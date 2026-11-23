const toast = ({ title, description }: { title: string; description?: string }) => {
  alert(`${title}${description ? '\n' + description : ''}`);
};

export const useToast = () => ({ toast });
