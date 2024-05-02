import {Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required} from 'react-admin'

export const ChallengeEdit = ()=>{
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source='id' validate={[required()]} label="id" />
                <TextInput source='question' validate={[required()]} label="Question" />
                <SelectInput
                    source='type'
                    choices={[
                        {
                            id: "SELECT",
                            name: "SELECT"
                        },
                        {
                            id: "ASSIST",
                            name: "ASSIST"
                        },
                    ]}
                    validate={[required()]}
                />
                <ReferenceInput source='lessonId' reference='lessons'/>
                <NumberInput source='order' validate={[required()]} label="order" />
            </SimpleForm>
        </Edit>
    )
}