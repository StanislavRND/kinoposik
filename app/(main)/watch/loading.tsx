import { Skeleton, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ width: '100%', position: 'relative', marginTop: '-45px', marginBottom: '-50px'}}>
      <Skeleton variant="rectangular" width="100%" height='670px' sx={{backgroundColor: '#1c1b1b'}} />
			<Skeleton 
        variant="rectangular" 
        width={500} 
        height={200} 
        sx={{ backgroundColor: '#1c1b1b', position: 'absolute', bottom: 150, left: '290px', transform: 'translateX(-50%)', borderRadius: '20px' }} 
      />
      <Box sx={{ position: 'absolute', bottom: '40px', left: '280px', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
        <Skeleton sx={{backgroundColor: '#1c1b1b', borderRadius: '20px'}} variant="rectangular" width={320} height={60} />
        <Skeleton sx={{backgroundColor: '#1c1b1b', borderRadius: '20px'}} variant="rectangular" width={60} height={60} />
        <Skeleton sx={{backgroundColor: '#1c1b1b', borderRadius: '20px'}} variant="rectangular" width={60} height={60} />
      </Box>
    </Box>
  );
}