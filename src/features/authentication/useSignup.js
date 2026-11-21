import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";
export function useSignup() { const { mutate: signup, isPending: isSigningUp } = useMutation({ mutationFn: signupApi, onSuccess: (data) => toast.success(`Account created for ${data.user.email}`), onError: (error) => toast.error(error.message) }); return { signup, isSigningUp }; }
