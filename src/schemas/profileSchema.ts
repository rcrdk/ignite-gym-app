import { z } from 'zod'

export const profileSchema = z
  .object({
    name: z.string().min(1, 'Informe o nome.'),
    email: z
      .string()
      .min(1, 'Informe o e-mail.')
      .email('Informe um email válido.'),
    password: z
      .string()
      .nullish()
      .transform((value) => (!!value ? value : null)),
    new_password: z
      .string()
      .nullish()
      .transform((value) => (!!value ? value : null)),
    confirm_password: z
      .string()
      .nullish()
      .transform((value) => (!!value ? value : null)),
  })
  .superRefine(({ password, confirm_password, new_password }, ctx) => {
    if (password && new_password && new_password.length < 6) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe a senha com ao menos 6 digitos.',
        path: ['new_password'],
      })
    }

    if (new_password && confirm_password !== new_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não são iguais.',
        path: ['confirm_password'],
      })
    }

    if (!password && new_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe sua senha atual.',
        path: ['password'],
      })
    }
  })

export type FormDataProps = z.infer<typeof profileSchema>
