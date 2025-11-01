import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
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
  handleReset: () => void
}

const formSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(200, 'Pergunta deve ter menos de 200 caracteres'),
})

type FormData = z.infer<typeof formSchema>

export function Chat({ questions, answers, handleReset }: ChatProps) {
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
    <section className="flex h-screen w-1/2 flex-col py-6">
      <Button
        className="absolute top-6 left-6 size-12 animate-scale cursor-pointer rounded-full"
        onClick={handleReset}
        title="Voltar"
        variant="outline"
      >
        <ChevronLeft className="size-10" />
      </Button>

      <div className="mask-b-from-80% mask-b-to-100% mb-2 h-full space-y-1 overflow-x-hidden overflow-y-scroll pr-2 pb-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2">
        <Question question={questions[0]} />

        {answers && <Answer answer={answers[0]} />}
      </div>

      <UiForm {...form}>
        <form
          className="animate-down-to-up rounded-lg bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] pt-1"
          onSubmit={form.handleSubmit(handleForm)}
        >
          <Card className="rounded-lg bg-[#2A2634]">
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
                className="h-16 cursor-pointer text-md"
                disabled={form.formState.isSubmitting}
                variant="outline"
              >
                {form.formState.isSubmitting ? 'Perguntando...' : 'Perguntar'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </UiForm>
    </section>
  )
}
