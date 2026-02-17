import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import type { FormDataProps } from '@/app'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as UiForm,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useScreenAndAnimation } from '@/context/screenAndAnimation'
import { env } from '@/env'

const formSchema = z.object({
  apiKeyForm: z
    .string()
    .min(39, { message: 'Api Key inválida' })
    .startsWith('AIzaSy', { message: 'Api Key inválida' }),
  gameForm: z.string().min(1, { message: 'Por favor selecione im jogo' }),
  questionForm: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'Pergunta deve ter menos de 500 caracteres'),
})

type FormData = z.infer<typeof formSchema>

interface FormProps {
  handleFormSubmit: (formData: FormDataProps) => void
}

export function Form({ handleFormSubmit }: FormProps) {
  const { animation } = useScreenAndAnimation()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKeyForm: env.VITE_GEMINI_API_KEY,
      gameForm: '',
      questionForm: '',
    },
  })

  function handleForm(data: FormData) {
    handleFormSubmit({
      apiKeyForm: data.apiKeyForm,
      gameForm: data.gameForm,
      questionForm: data.questionForm,
    })
  }

  return (
    <div
      className={`w-full rounded-lg bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] pt-1 ${animation.slideBottom}`}
    >
      <Card className="rounded-sm border-0 bg-[#2A2634]">
        <CardHeader>
          <CardTitle className="text-2xl">Assistente de Meta</CardTitle>
          <CardDescription className="text-[#A1A1AA]">
            Pergunte sobre estratégias, build e dicas para seus jogos!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UiForm {...form}>
            <form
              className="my-3 space-y-4"
              onSubmit={form.handleSubmit(handleForm)}
            >
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="apiKeyForm"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>API KEY do Gemini</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Informe a API KEY do Gemini"
                            type="password"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name="gameForm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jogo</FormLabel>

                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um jogo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="Age of Empires II: Definitive Edition">
                            Age of Empires II: Definitive Edition
                          </SelectItem>

                          <SelectItem value="Minecraft">Minecraft</SelectItem>

                          <SelectItem value="Overwatch 2">
                            Overwatch 2
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="questionForm"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Pergunta</FormLabel>

                      <FormControl>
                        <Textarea
                          {...field}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && form.handleSubmit(handleForm)()
                          }
                          placeholder="EX: Como fazer um Fast Castle"
                        />
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
        </CardContent>
      </Card>
    </div>
  )
}
