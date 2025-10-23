import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod/v4'

import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
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
  game: string | null
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

export function Chat({ game, questions, answers }: ChatProps) {
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
      <div className="overflow-y-scroll bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] pl-1">
        <Card className="mb-1 rounded-r-none rounded-l-lg border-0 bg-[#2A2634]">
          <CardHeader>
            <p className="font-medium text-foreground">
              Pergunta sobre: {game}
            </p>
          </CardHeader>
        </Card>

        <div className="space-y-1">
          <Question question={questions[0]} />

          {answers && <Answer answer={answers[0]} />}
        </div>
      </div>

      <UiForm {...form}>
        <form
          className="bort my-3 space-y-4 bg-[#2A2634] p-4"
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
