import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Informe o nome.'),
    email: z
      .string()
      .min(1, 'Informe o e-mail.')
      .email('Informe um email válido.'),
    password: z
      .string()
      .min(1, 'Informe a senha.')
      .min(6, 'Informe a senha com ao menos 6 digitos.'),
    password_confirm: z.string().min(1, 'Confirme a senha.'),
  })
  .superRefine(({ password_confirm, password }, ctx) => {
    if (password_confirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não são iguais.',
        path: ['password_confirm'],
      })
    }
  })

export type FormDataProps = z.infer<typeof signUpSchema>
