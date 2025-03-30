import { useForm, FormProvider } from 'react-hook-form'
import { render } from '@testing-library/react'
import { ReactNode, ReactElement } from 'react'

const renderWithReactHookForm = (
  ui: ReactElement,
  { defaultValues = {} } = {},
): any => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({ defaultValues })

    return <FormProvider {...methods}>{children}</FormProvider>
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
  }
}

export default renderWithReactHookForm
