import { Box, Typography } from '@mui/material'

const East = () => {
  return (
    <Box
      sx={{
        flex: '1',
        bgcolor: 'rgba(0,200,255,0.5)',
        borderRadius: '7.5px',
        padding: '22px',
        maxWidth: '400px',
        height: 'fit-content',
      }}
    >
      <img src={'/assets/place/east.png'} style={{ width: '100%' }} />
      <Typography sx={{ fontSize: '35px', fontWeight: '700' }}>East</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ fontSize: '12px', fontWeight: '700' }}>Rewards:</Box>
        <Box sx={{ fontSize: '17px', fontWeight: '700' }}>
          None - 5 $YRD-XP per day
        </Box>
        <Box sx={{ fontSize: '17px', fontWeight: '700' }}>
          5 Month Lock - 7.5 $YRD-XP + 125 $LUV per day
        </Box>
        <Box sx={{ fontSize: '17px', fontWeight: '700' }}>
          10 Month Lock - 10 $YRD-XP + 375 $LUV per day
        </Box>
      </Box>
    </Box>
  )
}

export default East
