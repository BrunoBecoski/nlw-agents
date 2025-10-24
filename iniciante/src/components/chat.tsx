import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod/v4'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form as UiForm,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Answer } from './answer'
import { Question } from './question'

type ChatProps = {
  questions: string[]
  answers: string[] | null
}

const formSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'Pergunta deve ter menos de 500 caracteres'),
})

type FormData = z.infer<typeof formSchema>

export function Chat({ questions, answers }: ChatProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  async function handleForm(data: FormData) {
    console.log(data)
  }

  return (
    <section className="flex h-screen flex-col py-8">
      <div className="mb-2 space-y-1 overflow-y-scroll pr-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2">
        <Question question={questions[0]} />

        {answers && <Answer answer={answers[0]} />}
      </div>

      <UiForm {...form}>
        <form
          className="pace-y-4 rounded-lg bg-[#2A2634] p-4"
          onSubmit={form.handleSubmit(handleForm)}
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea {...field} placeholder="Faça outra pergunta" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button
            className="hover:-translate-y-0.5 w-full cursor-pointer bg-gradient-to-l from-[#9572FC] via-[#43E7AD] to-[#E2D45C] font-bold text-black uppercase hover:shadow-[#FFF86B33] hover:shadow-md "
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? 'Perguntando...' : 'Perguntar'}
          </Button>
        </form>
      </UiForm>
    </section>
  )
}
