import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';


// Componente reutilizável para textArea de formulários (rows/textarea)

export default function MyDateInput(props: Partial<ReactDatePickerProps>){ //Partial faz com que todas as propriedades sejam opcionais
    const [field, meta, helpers] = useField(props.name!); //Opcional
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field}
                {...props}
                selected = {(field.value && new Date(field.value)) || //sobrescrevendo props, se tiver algo no valor do field, especificamos que há uma data passando o valor do field
                null} // caso contrário, nulo
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null} 
        </Form.Field>
    )
}