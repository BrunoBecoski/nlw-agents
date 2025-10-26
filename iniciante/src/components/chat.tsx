import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Send } from 'lucide-react'
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
import { Card, CardContent } from './ui/card'

type ChatProps = {
  questions: string[]
  answers: string[] | null
}

const formSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(200, 'Pergunta deve ter menos de 200 caracteres'),
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
    <section className="flex h-screen flex-col py-4">
      <div className="mb-2 space-y-1 overflow-y-scroll pr-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2">
        <Question question={questions[0]} />

        {answers && <Answer answer={answers[0]} />}
      </div>

      <UiForm {...form}>
        <form onSubmit={form.handleSubmit(handleForm)}>
          <Card className="bg-[#2A2634]">
            <CardContent className="flex flex-row items-end gap-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormMessage />

                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-none focus:outline-none"
                          placeholder="Faça outra pergunta"
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />

              <Button
                className="size-12 items-center justify-center hover:cursor-pointer hover:text-[#9572FC]"
                disabled={form.formState.isSubmitting}
                title="Perguntar"
                variant="ghost"
              >
                {form.formState.isSubmitting ? (
                  <LoaderCircle className="size-8 animate-spin" />
                ) : (
                  <Send className="size-8" />
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </UiForm>
    </section>
  )
}
