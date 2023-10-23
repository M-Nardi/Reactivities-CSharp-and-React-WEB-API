import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';


// Componente reutilizável para textArea de formulários (rows/textarea)

interface Props {
    placeholder: string;
    name: string;
    options: {text: string, value: string}[];
    label?: string;
}

// helpers auxilia na seleção manual dos valores e touch status

export default function MySelectInput(props: Props){
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable //clear na seleção dos elementos
                options={props.options} // lista de opções para o usuário selecionar
                value={field.value || null}
                onChange={(_, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null} 
        </Form.Field>
    )
}