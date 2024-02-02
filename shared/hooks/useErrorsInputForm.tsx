import { useToast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';

export const useToastError = ({ errors }: { errors: Record<string, any> }) => {
    const [formErrors, setFormErrors] = useState<Record<string, any>>(errors || {});
    const { toast } = useToast();

    useEffect(() => {
        if (errors) {
            setFormErrors(errors);
        }
    }, [errors]);
    
    useEffect(() => {
        const errorMessages = Object.values(formErrors).map(
            (error) => error?.message
        );
        if (errorMessages.length > 0) {
            toast({
                variant: "destructive",
                title: "Erro ao atualizar perfil",
                description: errorMessages.join(", "),
            });
        }
    }, [formErrors, toast]);

    return { formErrors };
};
