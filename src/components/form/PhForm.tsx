import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  success?: boolean;
} & TFormConfig;
type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
const PhForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  success,
}: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    if (success) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PhForm;
