import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Box, FormControl, FormErrorMessage, Input, Select, useToast } from '@chakra-ui/react'
import * as Yup from 'yup'
import createUser from '../../service/createUser'

const FormRegister = () => {
  const typeDocuments = [
    { value: 'CC', name: 'CC - Cédula Ciudadanía' },
    { value: 'NIT', name: 'NIT - Número Identificación Tributaria' },
    { value: 'PA', name: 'A - Pasaporte' }
  ]

  const toast = useToast()

  const handleSubmit = (values) => {
    createUser(values)
      .then(data => {
        const { data: { result } } = data
        toast({
          position: 'top-right',
          title: result.records,
          status: 'success',
          isClosable: true,
          duration: 3000
        })
      }).catch(err => {
        toast({
          position: 'top-right',
          title: 'Ocurrió un error al crear el usuario',
          status: 'error',
          isClosable: true,
          duration: 3000
        })
        console.log('error', err)
      })
  }

  const initialValues = {
    documentType: '',
    document: '',
    names: '',
    surnames: '',
    phone: '',
    fullAddress: ''
  }

  const validateSchema = Yup.object().shape({
    documentType: Yup.string().required('Seleccione un tipo de documento'),
    document: Yup.string().required('El documento es obligatorio'),
    names: Yup.string().required('El nombre es obligatorio'),
    surnames: Yup.string().required('El apellido es obligatorio'),
    phone: Yup.string().required('El télefono es obligatorio'),
    fullAddress: Yup.string().required('la direccion es obligatoria')
  })

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.resetForm()
        }}
        children={({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={5} flexDir="column">

                <FormControl isInvalid={!!errors.documentType && touched.documentType} >
                  <Field
                    name="documentType"
                    as={Select}
                    variant="filled"
                    rounded="xl"
                    value={values.documentType}
                    placeholder="Seleccione el tipo de documento"
                  >
                    {typeDocuments.map(({ value, name }) => (
                      <option key={value} value={value}>{name} </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{errors.documentType}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.document && touched.document}>
                  <Field
                    as={Input}
                    name="document"
                    type="text"
                    placeholder="Documento"
                    variant="filled"
                    rounded="xl"
                    value={values.document}
                  />
                  <FormErrorMessage>{errors.document}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.names && touched.names}>
                  <Field
                    as={Input}
                    name="names"
                    type="text"
                    placeholder="Nombres"
                    variant="filled"
                    rounded="xl"
                    value={values.names}
                  />
                  <FormErrorMessage>{errors.names}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.surnames && touched.surnames}>
                  <Field
                    as={Input}
                    name="surnames"
                    type="text"
                    placeholder="Apellidos"
                    variant="filled"
                    rounded="xl"
                    value={values.surnames}
                  />
                  <FormErrorMessage>{errors.surnames}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.phone && touched.phone}>
                  <Field
                    as={Input}
                    name="phone"
                    type="number"
                    placeholder="Teléfono"
                    variant="filled"
                    rounded="xl"
                    value={values.phone}
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.fullAddress && touched.fullAddress}>
                  <Field
                    as={Input}
                    name="fullAddress"
                    type="text"
                    placeholder="Dirección"
                    variant="filled"
                    rounded="xl"
                    value={values.fullAddress}
                  />
                  <FormErrorMessage>{errors.fullAddress}</FormErrorMessage>
                </FormControl>
                <button type='submit' >Registrar</button>
              </Box>
            </Form>

          )
        }}
      />

    </Box>
  )
}

export default FormRegister
