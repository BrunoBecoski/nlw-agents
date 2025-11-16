import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod/v4'
import type { Animation } from '@/app'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form as UiForm,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
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
  animation: Animation
  handleTextareaSubmit: (question: string) => void
}

export function Form({ animation, handleTextareaSubmit }: FormProps) {
  const [currentAnimation, setCurrentAnimation] = useState('')

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  function handleForm(data: FormData) {
    handleTextareaSubmit(data.question)
  }

  useEffect(() => {
    switch (animation) {
      case 'chat-enter':
        setCurrentAnimation('animate-slide-in-bottom')
        break

      case 'chat-exit':
        setCurrentAnimation('animate-slide-out-bottom')
        break

      default:
        break
    }
  }, [animation])

  return (
    <UiForm {...form}>
      <form
        className={`animate-slide-in-bottom rounded-lg bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] pt-1' ${currentAnimation}`}
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
              disabled={form.formState.isSubmitting}
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
