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
import { useScreenAndAnimation } from '@/context/screenAndAnimation'
import { Card, CardContent } from '../ui/card'

const formSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(200, 'Pergunta deve ter menos de 200 caracteres'),
})

type FormData = z.infer<typeof formSchema>

interface FormProps {
  isLoadingAnswer: boolean
  handleTextareaSubmit: (question: string) => void
}

export function Form({ isLoadingAnswer, handleTextareaSubmit }: FormProps) {
  const { animation } = useScreenAndAnimation()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  function handleForm(data: FormData) {
    handleTextareaSubmit(data.question)
    form.reset()
  }

  return (
    <UiForm {...form}>
      <form
        className={`rounded-lg bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] pt-1 ${animation.slideBottom}`}
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
                        disabled={isLoadingAnswer}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && form.handleSubmit(handleForm)()
                        }
                        placeholder="Faça outra pergunta"
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <Button
              className="h-16 cursor-pointer text-md"
              disabled={isLoadingAnswer}
              variant="outline"
            >
              {form.formState.isSubmitting ? 'Perguntando...' : 'Perguntar'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </UiForm>
  )
}
