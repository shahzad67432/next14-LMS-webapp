import {Create, Edit, SimpleForm, TextInput, required} from 'react-admin'

export const CourseEdit = ()=>{
    return (
        <Edit>
            <SimpleForm>
                <TextInput source='id' validate={[required()]} label="id" />
                <TextInput source='title' validate={[required()]} label="Title" />
                <TextInput source='imageSrc' validate={[required()]} label="ImageSrc" />
            </SimpleForm>
        </Edit>
    )
}