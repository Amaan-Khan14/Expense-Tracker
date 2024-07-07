import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { api } from "../../lib/api";
import { ReloadIcon } from "@radix-ui/react-icons"



export const Route = createFileRoute("/_authenticated/createExpense")({
  component: createExpenses,
});


function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      <div className="text-zinc-300/80 text-sm text-starts">
        {field.state.meta.isValidating ? 'Validating...' : null}
      </div>
    </>
  )
}




function createExpenses() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const res = await api.expenses.$post({ json: value })
      if (!res.ok) {
        throw new Error('Failed to create expense')
      }
      navigate({ to: '/expenses' })
    },
  })
  return (
    <div>
      <div className="absolute w-screen flex items-center justify-center">
        <Card className="relative bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] mt-36 w-2/5 h-1/2 shadow-2xl border-2 border-white/5 text-md font-geistSans ">
          <div className="bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <section className="m-16">
            <form onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}>
              <div>
                <form.Field
                  name="title"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? 'A first name is required'
                        : value.length < 3
                          ? 'First name must be at least 3 characters'
                          : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      return (
                        value.includes('error') &&
                        'No "error" allowed in first name'
                      )
                    },
                  }}
                  children={(field) => {
                    // Avoid hasty abstractions. Render props are great!
                    return (
                      <>
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg">Title</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)
                          }
                          className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50"
                        />
                        <FieldInfo field={field} />
                      </>
                    )
                  }}
                />
              </div>
              <div>
                <form.Field
                  name="amount"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? 'An amount is required'
                        : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      return (
                        isNaN(Number(value)) &&
                        'Value must be a number'
                      )
                    },
                  }}
                  children={(field) => {
                    // Avoid hasty abstractions. Render props are great!
                    return (
                      <>
                        <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg">Amount</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          type="number"
                          onChange={(e) => field.handleChange(Number(e.target.value))}
                          className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50"
                        />
                        <FieldInfo field={field} />
                      </>
                    )
                  }}
                />
              </div>
              <div>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" className="text-lg my-2 mx-56 px-10 relative text-zinc-100 bg-page-gradient border-white/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/20 hover:shadow-inner hover:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:text-white" disabled={!canSubmit} variant="outline">
                      {isSubmitting ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Create'}
                    </Button>
                  )}
                />
              </div>
            </form>
          </section>
        </Card>
      </div>
    </div >)
}
