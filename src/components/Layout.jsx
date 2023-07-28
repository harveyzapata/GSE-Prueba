import { Box } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <Box w='100vw' h='full' position={'relative'}>
        {children}
    </Box>
  )
}
export default Layout
