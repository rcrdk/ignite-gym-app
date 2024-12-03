import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe o e-mail.')
    .email('Informe um email válido.'),
  password: z.string().min(1, 'Informe a senha.'),
})

export type FormDataProps = z.infer<typeof signInSchema>
